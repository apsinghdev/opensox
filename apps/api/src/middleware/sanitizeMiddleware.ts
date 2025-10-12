import sanitizeHtml from "sanitize-html";
import type { Request, Response, NextFunction } from "express";

export function sanitizeMiddleware(req: Request, res: Response, next: NextFunction) {
  const sanitize = (obj: any) => {
    if (!obj || typeof obj !== "object") return;
    for (const key in obj) {
      if (typeof obj[key] === "string") {
        obj[key] = sanitizeHtml(obj[key]);
      } else if (typeof obj[key] === "object") {
        sanitize(obj[key]);
      }
    }
  };

  sanitize(req.body);
  sanitize(req.query);
  sanitize(req.params);
  next();
}
