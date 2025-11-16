# Newsletter Management

This document explains how to add new newsletters to the Opensox platform.

## Overview

Newsletters are stored as static data in `apps/web/src/data/newsletters.ts`. Each newsletter is a blog post that displays in the dashboard under the "Newsletter" section.

## Adding a New Newsletter

### Step 1: Open the Newsletter Data File

Navigate to `apps/web/src/data/newsletters.ts`

### Step 2: Create a New Newsletter Object

Add a new object to the `newsletters` array with the following structure:

```typescript
{
  id: string;              // unique identifier (e.g., "4")
  slug: string;            // url-friendly identifier (e.g., "january-2025-updates")
  title: string;           // newsletter title
  content: string;         // markdown content
  publishedAt: Date;       // publication date
  author?: string;         // optional author name
  image?: string;          // optional image URL
}
```

### Step 3: Example Newsletter

```typescript
{
  id: "4",
  slug: "january-2025-updates",
  title: "January 2025 Updates",
  content: `# Welcome to January Updates

We're excited to share what we've been working on!

## New Features

**Feature Name** - Description of the feature.

## What's Next

- Upcoming feature 1
- Upcoming feature 2

[Learn more](https://example.com)`,
  publishedAt: new Date("2025-01-15"),
  author: "Ajeet",
}
```

### Step 4: Content Formatting

The `content` field supports **Markdown** syntax:

- **Bold text**: `**text**`
- *Italic text*: `*text*`
- Headings: `# H1`, `## H2`, `### H3`
- Links: `[text](url)`
- Lists: `- item` or `1. item`
- Code: `` `code` ``

### Step 5: Important Notes

1. **ID**: Must be unique. Use the next sequential number.
2. **Slug**: Should be lowercase, use hyphens for spaces (e.g., `january-2025-updates`)
3. **Published Date**: Use `new Date("YYYY-MM-DD")` format
4. **Content**: Use markdown for formatting. The content will be automatically rendered with proper styling.

## Newsletter Organization

Newsletters are automatically organized by **month and year** on the listing page. The latest newsletters appear first within each month.

## File Structure

```
apps/web/src/
├── data/
│   └── newsletters.ts          # Newsletter data and helper functions
├── app/(main)/dashboard/newsletter/
│   ├── page.tsx                # Newsletter listing page
│   └── [slug]/
│       └── page.tsx            # Individual newsletter page
└── components/newsletter/
    └── MarkdownRenderer.tsx    # Markdown rendering component
```

## Testing

After adding a newsletter:

1. Start the development server: `pnpm dev`
2. Navigate to `/dashboard/newsletter` in your browser
3. Verify the new newsletter appears in the correct month/year section
4. Click on the newsletter to view the full content
5. Check that markdown formatting renders correctly

## Best Practices

- Keep newsletter content concise and engaging
- Use clear headings to organize content
- Include links to relevant resources
- Add publication dates that make sense chronologically
- Test markdown rendering before finalizing content

## Questions?

If you need help or have questions about adding newsletters, please reach out to the team or check the code comments in `newsletters.ts`.

