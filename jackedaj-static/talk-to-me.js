(function () {
  const API_BASE = "https://api2.opensox.ai";
  const CONFIRM_URL = "talk-to-me-confirmed.html";

  const form = document.getElementById("ttm-form");
  const statusEl = document.getElementById("ttm-status");
  const buyBtn = document.getElementById("ttm-buy-btn");
  const priceEl = document.getElementById("ttm-price");
  const durationEl = document.getElementById("ttm-duration");

  if (!form || !statusEl || !buyBtn) return;

  let config = null;
  let razorpayReady = null;

  function setStatus(message) {
    statusEl.textContent = message || "";
  }

  function formatPrice(amount, currency) {
    const major = amount / 100;
    try {
      return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: currency || "INR",
        maximumFractionDigits: major % 1 === 0 ? 0 : 2,
      }).format(major);
    } catch {
      return `${currency || "INR"} ${major}`;
    }
  }

  function loadRazorpayScript() {
    if (window.Razorpay) return Promise.resolve(true);
    if (razorpayReady) return razorpayReady;

    razorpayReady = new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

    return razorpayReady;
  }

  async function fetchConfig() {
    const res = await fetch(`${API_BASE}/talk-to-me/config`);
    if (!res.ok) throw new Error("config failed");
    const data = await res.json();
    if (!data || data.ok !== true || !data.razorpayKeyId) {
      throw new Error("config unavailable");
    }
    return data;
  }

  function applyConfig(nextConfig) {
    config = nextConfig;
    if (priceEl) priceEl.textContent = formatPrice(config.amount, config.currency);
    if (durationEl) {
      durationEl.textContent = `${config.durationMinutes} minutes`;
    }
    buyBtn.textContent = `buy · ${formatPrice(config.amount, config.currency)}`;
  }

  async function ensureConfig() {
    if (config) return config;
    const next = await fetchConfig();
    applyConfig(next);
    return config;
  }

  ensureConfig().catch(() => {
    setStatus("payments unavailable right now. try again later.");
    buyBtn.disabled = true;
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = String(new FormData(form).get("name") || "").trim();
    const email = String(new FormData(form).get("email") || "").trim();

    if (!name || !email) {
      setStatus("enter your name and email.");
      return;
    }

    buyBtn.disabled = true;
    setStatus("starting checkout…");

    try {
      const liveConfig = await ensureConfig();
      const scriptOk = await loadRazorpayScript();
      if (!scriptOk || !window.Razorpay) {
        throw new Error("razorpay failed to load");
      }

      const orderRes = await fetch(`${API_BASE}/talk-to-me/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });

      const orderData = await orderRes.json().catch(() => null);
      if (!orderRes.ok || !orderData || orderData.ok !== true) {
        throw new Error(
          (orderData && orderData.error) || "could not create order"
        );
      }

      setStatus("complete payment in the razorpay window…");

      const checkout = new window.Razorpay({
        key: orderData.razorpayKeyId || liveConfig.razorpayKeyId,
        amount: String(orderData.amount),
        currency: orderData.currency,
        name: "jackedAJ",
        description: orderData.productName || "talk to me",
        order_id: orderData.orderId,
        prefill: { name, email },
        notes: {
          product: "talk_to_me",
          purchase_id: orderData.purchaseId,
        },
        theme: { color: "#01242e" },
        handler: async function (response) {
          setStatus("confirming payment…");
          try {
            const verifyRes = await fetch(`${API_BASE}/talk-to-me/verify`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            const verifyData = await verifyRes.json().catch(() => null);
            if (!verifyRes.ok || !verifyData || verifyData.ok !== true) {
              throw new Error(
                (verifyData && verifyData.error) || "verification failed"
              );
            }

            window.location.href = verifyData.redirectUrl || CONFIRM_URL;
          } catch (err) {
            console.error(err);
            setStatus(
              "payment may have gone through — check your email, or ping ajeetpratap517@gmail.com."
            );
            buyBtn.disabled = false;
          }
        },
        modal: {
          ondismiss: function () {
            setStatus("checkout closed. you can try again whenever.");
            buyBtn.disabled = false;
          },
        },
      });

      checkout.open();
    } catch (err) {
      console.error(err);
      setStatus("something went wrong. try again.");
      buyBtn.disabled = false;
    }
  });
})();
