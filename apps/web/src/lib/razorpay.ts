export interface RazorpayOptions {
  key: string;
  amount?: string | number;
  currency?: string;
  name: string;
  description: string;
  image?: string;
  order_id?: string;
  subscription_id?: string;
  callback_url?: string;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  notes?: Record<string, string>;
  theme?: {
    color?: string;
  };
  handler?: (response: RazorpaySuccessResponse) => void;
  modal?: {
    ondismiss?: () => void;
  };
}

export interface RazorpaySuccessResponse {
  razorpay_payment_id: string;
  razorpay_order_id?: string;
  razorpay_subscription_id?: string;
  razorpay_signature: string;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

/**
 * Load Razorpay script dynamically
 */
export const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    // Check if script is already loaded
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

/**
 * Open Razorpay checkout
 */
export const openRazorpayCheckout = async (
  options: RazorpayOptions
): Promise<void> => {
  const isLoaded = await loadRazorpayScript();

  if (!isLoaded) {
    throw new Error("Failed to load Razorpay SDK");
  }

  const razorpay = new window.Razorpay(options);
  razorpay.open();
};
