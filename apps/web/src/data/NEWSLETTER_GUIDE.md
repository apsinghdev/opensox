# Newsletter Guide

## Overview

The newsletter feature allows pro users to access exclusive newsletters on Opensox AI. Newsletters are stored as code in `newsletters.ts` for easy content management.

## Adding a New Newsletter

### Step 1: Create the Newsletter Object

Open `apps/web/src/data/newsletters.ts` and add a new `NewsletterPost` object to the `newsletters` array:

```typescript
{
  id: "2025-01-20-unique-id",  // Unique identifier (recommended: date-description)
  title: "Your Newsletter Title",
  date: "2025-01-20",  // Format: YYYY-MM-DD
  content: [
    // Content items go here
  ],
}
```

### Step 2: Add Content

Use the following content types to build your newsletter:

#### Text
```typescript
{ type: "text", content: "Regular text content" }
```

#### Paragraph
```typescript
{ type: "paragraph", content: "A full paragraph of text" }
```

#### Headings (H1, H2, H3)
```typescript
{ type: "heading", level: 1, content: "Main Heading" }
{ type: "heading", level: 2, content: "Subheading" }
{ type: "heading", level: 3, content: "Sub-subheading" }
```

#### Bold Text
```typescript
{ type: "bold", content: "Bold text" }
```

#### Links
```typescript
{ type: "link", text: "Link Text", url: "https://example.com" }
```

#### Images
```typescript
{ type: "image", src: "/path/to/image.jpg", alt: "Image description" }
```

### Step 3: Example Newsletter

```typescript
{
  id: "2025-01-20-example",
  title: "Example Newsletter",
  date: "2025-01-20",
  content: [
    { type: "heading", level: 1, content: "Welcome!" },
    { type: "paragraph", content: "This is a paragraph with " },
    { type: "bold", content: "bold text" },
    { type: "text", content: " and a " },
    { type: "link", text: "link", url: "https://opensox.ai" },
    { type: "text", content: "." },
    { type: "paragraph", content: "" }, // Empty paragraph for spacing
    { type: "heading", level: 2, content: "Section Title" },
    { type: "paragraph", content: "More content here." },
  ],
}
```

## Content Organization Tips

1. **Group inline content**: Text, bold, and links can be combined in the same paragraph
2. **Use empty paragraphs**: Add `{ type: "paragraph", content: "" }` for spacing between sections
3. **Headings break paragraphs**: Headings automatically start a new paragraph
4. **Images are standalone**: Images are rendered as separate blocks

## Date Format

- Always use `YYYY-MM-DD` format (e.g., "2025-01-20")
- Newsletters are automatically sorted by date (latest first)
- Newsletters are grouped by month and year on the listing page

## File Location

- Newsletter data: `apps/web/src/data/newsletters.ts`
- Newsletter component: `apps/web/src/components/newsletters/NewsletterContent.tsx`
- Listing page: `apps/web/src/app/(main)/dashboard/newsletters/page.tsx`
- Detail page: `apps/web/src/app/(main)/dashboard/newsletters/[id]/page.tsx`

## Access Control

- Newsletters are only visible to pro users (users with active subscriptions)
- Non-pro users are redirected to the pricing page
- The newsletter link in the sidebar only appears for pro users

