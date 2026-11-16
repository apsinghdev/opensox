import { isIP } from "node:net";
import type { Request } from "express";

// railway's socket peer is the proxy, so req.ip is shared by every visitor.
// cloudflare overwrites this header, which makes it the real client address.
function cloudflareClientIp(req: Request): string | undefined {
  if (typeof req.headers["cf-ray"] !== "string") return undefined;

  const header = req.headers["cf-connecting-ip"];
  if (typeof header !== "string") return undefined;

  const ip = header.trim();
  if (!isIP(ip)) return undefined;
  return ip;
}

function expandIpv6(ip: string): string[] {
  const [head = "", tail] = ip.split("::");
  const parse = (part: string): string[] => {
    if (!part) return [];
    return part.split(":").flatMap((group) => {
      if (!group.includes(".")) return [group];
      const [a = 0, b = 0, c = 0, d = 0] = group.split(".").map(Number);
      return [((a << 8) | b).toString(16), ((c << 8) | d).toString(16)];
    });
  };

  const headGroups = parse(head);
  const tailGroups = tail === undefined ? [] : parse(tail);
  const missing = Math.max(0, 8 - headGroups.length - tailGroups.length);
  return [...headGroups, ...Array(missing).fill("0"), ...tailGroups].map((group) =>
    group.padStart(4, "0")
  );
}

// one ipv6 host can rotate the interface id. a /64 is one subscriber prefix.
// ipv4-mapped addresses stay individual v4 keys so they are not collapsed together.
function rateLimitKey(ip: string): string {
  const mapped = ip.match(/^::ffff:(\d{1,3}(?:\.\d{1,3}){3})$/i);
  if (mapped?.[1] && isIP(mapped[1]) === 4) return mapped[1];
  if (isIP(ip) === 4) return ip;
  if (isIP(ip) !== 6) return "unknown";

  const groups = expandIpv6(ip);
  const isV4Mapped =
    groups.slice(0, 5).join(":") === "0000:0000:0000:0000:0000" && groups[5] === "ffff";
  if (isV4Mapped) {
    const hi = Number.parseInt(groups[6] ?? "0", 16);
    const lo = Number.parseInt(groups[7] ?? "0", 16);
    return `${(hi >> 8) & 255}.${hi & 255}.${(lo >> 8) & 255}.${lo & 255}`;
  }

  return `${groups.slice(0, 4).join(":")}::/64`;
}

export function clientIp(req: Request): string {
  const ip = cloudflareClientIp(req) ?? req.ip ?? "";
  return rateLimitKey(ip);
}
