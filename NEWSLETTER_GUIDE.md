# newsletter feature documentation

## overview
newsletters are premium content available exclusively to subscribed users on opensox.ai. they provide insights on ai, coding, open source, and developer tools.

---

## 📝 adding a new newsletter

### step 1: open the data file
navigate to: `apps/web/src/data/newsletters.ts`

### step 2: add your newsletter entry
add a new object to the `newsletters` array:

```typescript
{
  id: "4", // increment from last id
  date: "DD-MM-YY", // e.g., "20-11-25" for nov 20, 2025
  title: "your newsletter title",
  slug: "url-friendly-slug", // lowercase, hyphens only
  excerpt: "a compelling 1-2 sentence description",
  content: ```html
    <h2>main section heading</h2>
    <p>your paragraph content here. use <strong>bold text</strong> for emphasis.</p>
    
    <img src="https://your-image-url.com/image.jpg" alt="descriptive alt text" />
    
    <p>add <a href="https://example.com">external links</a> for references.</p>
    
    <h3>subsection heading</h3>
    <ul>
      <li><strong>list item title</strong> - description of the item</li>
      <li><strong>another item</strong> - more details here</li>
    </ul>
  ```,
  tags: ["relevant", "topic", "tags"],
  readTime: 6 // optional: estimated minutes to read
}
```

### step 3: save and test
1. save the file
2. the dev server will auto-reload (or run `npm run dev`)
3. visit `/newsletters` to see your new entry
4. click through to verify content displays correctly

---

## 🎨 content formatting guide

### headings
```html
<h2>main section heading</h2>
<h3>subsection heading</h3>
```
- use h2 for main sections
- use h3 for subsections
- keep headings descriptive and concise

### paragraphs
```html
<p>regular paragraph text goes here.</p>
<p>use <strong>bold text</strong> to emphasize key points.</p>
```
- keep paragraphs 2-4 sentences for readability
- use bold sparingly for impact

### links
```html
<a href="https://example.com">descriptive link text</a>
```
- always use https://
- make link text descriptive (avoid "click here")

### images
```html
<img src="https://your-image-url.com/image.jpg" alt="descriptive alt text" />
```
- use high-quality images (minimum 1200px wide)
- always include descriptive alt text
- use unsplash for free stock photos
- images should be relevant to surrounding content

### lists
```html
<ul>
  <li><strong>item title</strong> - description or explanation</li>
  <li><strong>another item</strong> - more details here</li>
  <li><strong>third item</strong> - keep it concise</li>
</ul>
```
- use bold for list item titles
- follow with a dash and description
- keep list items parallel in structure

---

## 🔒 access control

newsletters are **automatically protected** for premium users:
- non-premium users see a subscription prompt
- authentication handled by `useSubscription` hook
- no additional configuration needed

---

## 🐛 troubleshooting

### newsletter not appearing?
- verify date format is `DD-MM-YY`
- check for syntax errors in the typescript
- ensure the newsletter is in the `newsletters` array
- restart dev server if needed

### images not loading?
- use absolute urls starting with `https://`
- verify the url works in a browser
- check that alt text is provided
- try a different image source if loading fails

### formatting looks wrong?
- ensure all html tags are properly closed
- check for typos in tag names
- use the examples above as templates
- view in dev environment before committing

### content overflowing or breaking?
- avoid extremely long words
- break up long paragraphs
- ensure images have proper dimensions
- check responsive display on mobile

---

## 📂 file structure

```
apps/web/src/
├── app/(main)/newsletters/
│   ├── page.tsx              # newsletter list page
│   └── [slug]/page.tsx       # individual newsletter page
└── data/
    └── newsletters.ts         # ✏️ edit this file to add newsletters
```
