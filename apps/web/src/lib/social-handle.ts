export function getSocialHandle(
  url: string | null | undefined
): string | null {
  if (!url) return null;

  try {
    const parsed = new URL(url);
    const parts = parsed.pathname.split("/").filter(Boolean);
    if (parts.length === 0) return null;

    const host = parsed.hostname.replace(/^www\./, "");
    let handle = parts[parts.length - 1];

    if (host.endsWith("linkedin.com")) {
      const inIndex = parts.indexOf("in");
      if (inIndex >= 0 && parts[inIndex + 1]) {
        handle = parts[inIndex + 1];
      }
    }

    handle = decodeURIComponent(handle).replace(/\/+$/, "");
    if (!handle || handle === "in") return null;
    if (!handle.startsWith("@")) {
      handle = `@${handle}`;
    }
    return handle;
  } catch {
    return null;
  }
}
