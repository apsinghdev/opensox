# Opensox Design System

## Overview

This document outlines the design system for Opensox, including colors, typography, spacing, and component guidelines. All design tokens are centralized in `/src/lib/design-tokens.ts` to ensure consistency across the application.

---

## 🎨 Colors

### Brand Colors

Our primary brand color is purple, used for CTAs, highlights, and key brand elements.

#### Purple

```tsx
// Usage in Tailwind
className="bg-brand-purple"
className="text-brand-purple"
className="border-brand-purple"

// Available variants
brand-purple          // #9455f4 - Primary brand purple
brand-purple-light    // #a675f5 - Lighter variant for hover states
brand-purple-dark     // #7A45C3 - Darker variant for depth
```

**When to use:**
- Primary CTAs and action buttons
- Links and interactive elements
- Brand highlights and accents
- Focus states

**Examples:**
```tsx
// Button
<button className="bg-brand-purple hover:bg-brand-purple-dark">

// Link
<a className="text-brand-purple hover:text-brand-purple-light">

// Border focus
<input className="border focus:border-brand-purple">
```

### Surface Colors

Background colors for different surfaces and elevation levels.

```tsx
surface-primary    // #101010 - Main app background
surface-secondary  // #141414 - Sidebars, navigation
surface-tertiary   // #1A1A1A - Content containers
surface-elevated   // #1E1E1E - Cards, modals
surface-hover      // #15161A - Hover states for dark surfaces
surface-card       // #111111 - Card backgrounds
```

**Hierarchy:**
1. `surface-primary` - Base background (furthest back)
2. `surface-secondary` - Navigation, sidebars
3. `surface-tertiary` - Content areas
4. `surface-elevated` - Cards and modals (closest to user)

**Examples:**
```tsx
// Page background
<main className="bg-surface-primary">

// Sidebar
<aside className="bg-surface-secondary">

// Card
<div className="bg-surface-elevated border border">

// Hover state
<div className="bg-surface-tertiary hover:bg-surface-hover">
```

### Border Colors

```tsx
border         // #252525 - Primary border (DEFAULT)
border-light   // #363636 - Lighter borders for nested elements
border-dark    // #292929 - Darker borders
border-focus   // #9455f4 - Focus states (brand purple)
```

**Examples:**
```tsx
// Default border
<div className="border">

// Lighter border for nested content
<div className="border border-light">

// Focus state
<input className="border focus:border-focus">
```

### Text Colors

```tsx
text-primary    // #ffffff - Primary white text
text-secondary  // #e1e1e1 - Secondary text
text-tertiary   // #d1d1d1 - Tertiary/muted text
text-muted      // #a1a1a1 - Very muted text
```

**Hierarchy:**
- `text-primary` - Headings, important content
- `text-secondary` - Body text, descriptions
- `text-tertiary` - Helper text, labels
- `text-muted` - Timestamps, metadata

**Examples:**
```tsx
<h1 className="text-primary">Main Heading</h1>
<p className="text-secondary">Body text goes here.</p>
<span className="text-tertiary">Helper text</span>
<time className="text-muted">2 hours ago</time>
```

### Status Colors

```tsx
// Success (green)
bg-success-bg       // #002d21 - Success background
text-success-text   // #00bd7c - Success text
border-success-border // #00bd7c - Success border

// Error (red)
bg-error-bg         // #2d0000
text-error-text     // #ff4444
border-error-border // #ff4444

// Warning (yellow)
bg-warning-bg       // #2d2400
text-warning-text   // #ffcc00
border-warning-border // #ffcc00

// Info (blue)
bg-info-bg          // #00182d
text-info-text      // #4499ff
border-info-border  // #4499ff
```

**Examples:**
```tsx
// Success tag
<span className="bg-success-bg text-success-text border border-success-border">
  Active
</span>

// Error message
<div className="bg-error-bg text-error-text border border-error-border">
  Error: Something went wrong
</div>
```

---

## 📝 Typography

### Font Families

We use two primary font families:

#### Geist Sans (Primary)
- **Usage:** Body text, UI elements, headings
- **Class:** `font-sans` (default)
- **Loaded in:** `layout.tsx`

#### DM Mono (Code/Technical)
- **Usage:** Code snippets, terminal output, technical content
- **Class:** `font-mono`
- **Loaded in:** `layout.tsx`

### Font Usage Guidelines

```tsx
// Body text (default - no class needed)
<p>This uses Geist Sans by default</p>

// Headings (explicit)
<h1 className="font-sans">Heading</h1>

// Code/Terminal
<code className="font-mono">const x = 42;</code>

// Terminal sections
<div className="font-mono">
  $ npm install opensox
</div>
```

### Font Weights

```tsx
font-light    // 300 - Subtle text
font-normal   // 400 - Body text
font-medium   // 500 - Emphasized text
font-semibold // 600 - Subheadings
font-bold     // 700 - Headings
```

### Text Sizes

```tsx
text-xs      // 0.75rem (12px)
text-sm      // 0.875rem (14px)
text-base    // 1rem (16px) - Body text
text-lg      // 1.125rem (18px)
text-xl      // 1.25rem (20px)
text-2xl     // 1.5rem (24px)
text-3xl     // 1.875rem (30px)
text-5xl     // 3rem (48px) - Section headings
text-7xl     // 4.5rem (72px) - Hero headings
```

---

## 📏 Spacing

Use Tailwind's spacing scale for consistency:

```tsx
// Padding
p-2   // 0.5rem (8px)
p-4   // 1rem (16px)
p-6   // 1.5rem (24px)
p-10  // 2.5rem (40px)

// Margin
m-2, m-4, m-6, m-10

// Gap (for flex/grid)
gap-2, gap-4, gap-6
```

### Common Patterns

```tsx
// Button padding
className="px-5 py-3"

// Card padding
className="p-6"

// Section padding
className="p-10 lg:p-[60px]"

// Component spacing
className="space-y-4"  // Vertical spacing between children
className="gap-2"      // Flex/grid gap
```

---

## 🎯 Component Guidelines

### Buttons

#### Primary Button (CTA)

```tsx
import PrimaryButton from '@/components/ui/custom-button';

<PrimaryButton>
  <Icon />
  Button Text
</PrimaryButton>
```

**Features:**
- Brand purple gradient background
- Rounded corners (16px)
- Hover opacity effect
- Inner shadow for depth

#### Ghost/Outline Buttons

```tsx
<button className="border border-brand-purple text-brand-purple hover:bg-brand-purple hover:text-white transition-colors px-4 py-2 rounded-lg">
  Secondary Action
</button>
```

### Cards

```tsx
<div className="bg-surface-elevated border border rounded-lg p-6">
  <h3 className="text-primary font-medium">Card Title</h3>
  <p className="text-secondary mt-2">Card content goes here.</p>
</div>
```

**Card Variants:**
- `surface-elevated` - Standard cards
- `surface-card` - Alternative card background
- Add `hover:bg-surface-hover` for interactive cards

### Tags/Badges

```tsx
// Success tag
<ActiveTag text="active" />

// Custom badge
<span className="px-2 py-1 rounded-lg bg-brand-purple-dark text-white text-xs">
  Pro
</span>
```

### Forms

```tsx
<input
  className="w-full px-4 py-2 bg-surface-tertiary border border focus:border-focus rounded-lg text-primary placeholder:text-muted"
  placeholder="Enter text..."
/>
```

---

## 🚫 What NOT to Do

### ❌ DON'T: Use Hardcoded Colors

```tsx
// BAD
<div className="bg-[#101010] border-[#252525]">

// GOOD
<div className="bg-surface-primary border">
```

### ❌ DON'T: Mix Different Purple Variants

```tsx
// BAD
<div className="text-[#9159E2]">
<div className="text-purple-600">
<div className="text-[#7A45C3]">

// GOOD - Use consistent brand colors
<div className="text-brand-purple">
```

### ❌ DON'T: Use Inconsistent Fonts

```tsx
// BAD
<p style={{ fontFamily: 'Arial' }}>

// GOOD
<p className="font-sans">
```

### ❌ DON'T: Create Custom Spacing

```tsx
// BAD
<div style={{ marginTop: '13px' }}>

// GOOD - Use Tailwind spacing scale
<div className="mt-3">  // 0.75rem (12px)
```

---

## ✅ Best Practices

### 1. Always Use Design Tokens

```tsx
// Import when needed
import { colors } from '@/lib/design-tokens';

// Use in inline styles (when necessary)
style={{ color: colors.brand.purple.DEFAULT }}
```

### 2. Maintain Color Hierarchy

```tsx
// Layer surfaces properly
<div className="bg-surface-primary">          {/* Base */}
  <aside className="bg-surface-secondary">    {/* Navigation */}
    <div className="bg-surface-elevated">     {/* Card */}
      Content
    </div>
  </aside>
</div>
```

### 3. Use Semantic Naming

```tsx
// GOOD - Describes purpose
<div className="bg-surface-elevated">

// BAD - Describes appearance
<div className="bg-dark-gray-2">
```

### 4. Leverage Tailwind Utilities

```tsx
// Combine utilities for complex styles
<button className="
  bg-brand-purple 
  hover:bg-brand-purple-dark 
  text-white 
  px-4 py-2 
  rounded-lg 
  border border-brand-purple
  transition-colors 
  duration-200
">
```

---

## 🔄 Migration Guide

If you find old code with hardcoded colors, follow this guide:

### Color Replacements

| Old Hardcoded Value | New Token |
|---------------------|-----------|
| `#101010` | `bg-surface-primary` |
| `#141414` | `bg-surface-secondary` |
| `#1A1A1A` | `bg-surface-tertiary` |
| `#1E1E1E` | `bg-surface-elevated` |
| `#252525` | `border` |
| `#363636` | `border-light` |
| `#9455f4`, `#9159E2` | `brand-purple` |
| `#7A45C3` | `brand-purple-dark` |
| `#e1e1e1` | `text-secondary` |
| `#d1d1d1` | `text-tertiary` |

### Font Replacements

| Old | New |
|-----|-----|
| `font-MonaSans` | `font-sans` |
| `font-DMfont` | `font-mono` |

---

## 📦 Exporting Design Tokens

Design tokens are available for import:

```tsx
import { 
  colors, 
  gradients, 
  shadows, 
  fonts 
} from '@/lib/design-tokens';

// Use in components
const Component = () => (
  <div style={{ 
    backgroundColor: colors.background.primary,
    color: colors.text.primary 
  }}>
)
```

---

## 🎨 Figma Integration (Future)

_Coming soon: Export design tokens to Figma for designer-developer consistency._

---

## 📚 Additional Resources

- **Tailwind CSS Documentation:** https://tailwindcss.com/docs
- **Shadcn/ui Components:** https://ui.shadcn.com
- **Design Tokens Source:** `/src/lib/design-tokens.ts`
- **Tailwind Config:** `/tailwind.config.ts`

---

## ❓ FAQ

### Q: Can I use Tailwind's default colors like `purple-500`?

**A:** Avoid using default Tailwind colors for brand elements. Use `brand-purple` instead. For semantic/language colors (like in ProjectsContainer), Tailwind defaults are acceptable.

### Q: What if I need a color not in the design system?

**A:** First, check if an existing token can work. If you genuinely need a new color, add it to `/src/lib/design-tokens.ts` and update `tailwind.config.ts`.

### Q: How do I add dark mode support?

**A:** The CSS variables in `globals.css` already support light/dark modes via the `.dark` class. Update token values there for theme switching.

### Q: Can I use inline styles?

**A:** Minimize inline styles. Use Tailwind classes when possible. If you must use inline styles (e.g., dynamic values), import from `design-tokens.ts`.

---

## 📝 Changelog

### v1.0.0 (Current)
- ✅ Created centralized design tokens
- ✅ Updated Tailwind config with new color system
- ✅ Fixed font loading (removed Mona Sans references)
- ✅ Migrated core components (buttons, headers, navbar, etc.)
- ✅ Established design system documentation

---

**Last Updated:** November 19, 2025  
**Maintained by:** Opensox Team  
**Questions?** Open an issue or reach out to the maintainers.

