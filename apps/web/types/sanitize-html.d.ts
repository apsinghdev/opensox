declare module "sanitize-html" {
  export interface IOptions {
    allowedTags?: string[];
    allowedAttributes?: Record<string, string[]>;
    allowedSchemes?: string[];
    [key: string]: any;
  }

  function sanitizeHtml(dirty: string, options?: IOptions): string;
  export default sanitizeHtml;
}

