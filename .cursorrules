# Opensox AI - Cursor Rules

## Code Style

### Comments
- always use lowercase when writing comments
- avoid unnecessary comments; code should be self-documenting when possible
- use comments to explain "why", not "what"

## UI Component Guidelines

### Design System - CRITICAL
**Always follow the design system defined in `apps/web/src/lib/design-tokens.ts` and `apps/web/tailwind.config.ts`**

#### Color Usage
- **NEVER** use hardcoded hex values (e.g., `#5519f7`) directly in components
- **ALWAYS** reference colors from the design token system using Tailwind classes
- Use semantic color names that describe purpose, not appearance

#### Available Color Palettes

**Brand Colors:**
- `bg-brand-purple` - primary brand color for ctas, highlights
- `bg-brand-purple-light` - hover states
- `bg-brand-purple-dark` - depth and contrast

**Background/Surface Colors (Landing Page):**
- `bg-surface-primary` - main app background (#101010)
- `bg-surface-secondary` - sidebar, secondary surfaces (#141414)
- `bg-surface-tertiary` - content areas, cards (#1A1A1A)
- `bg-surface-elevated` - elevated cards, modals (#1E1E1E)
- `bg-surface-hover` - hover states for dark surfaces
- `bg-surface-card` - card backgrounds

**Background/Surface Colors (Dashboard):**
- `bg-dash-base` - page background (darkest)
- `bg-dash-surface` - panels, cards, navbars
- `bg-dash-raised` - buttons, inputs, interactive surfaces
- `bg-dash-hover` - hover states for raised items
- `bg-dash-border` - thin dividers, borders

**Border Colors:**
- `border` or `border-border` - primary border (#252525)
- `border-light` - lighter borders for nested elements
- `border-dark` - darker borders
- `border-focus` - focus states (brand purple)

**Text Colors:**
- `text-text-primary` - primary white text (#ffffff)
- `text-text-secondary` - secondary text (#e1e1e1)
- `text-text-tertiary` - tertiary/muted text (#d1d1d1)
- `text-text-muted` - very muted text (#a1a1a1)
- `text-text-light` - light gray for copyright/footer

**Link Colors:**
- `text-link` - default link color (blue-400)
- `text-link-hover` - hover state (blue-300)

**Status Colors:**
- Success: `bg-success-bg`, `text-success-text`, `border-success-border`
- Error: `bg-error-bg`, `text-error-text`, `border-error-border`
- Warning: `bg-warning-bg`, `text-warning-text`, `border-warning-border`
- Info: `bg-info-bg`, `text-info-text`, `border-info-border`

#### Typography
- Use `font-sans` for standard UI text (Geist Sans)
- Use `font-mono` for code, technical content, or monospace needs (DM Mono)

#### Spacing
- Follow Tailwind's spacing scale (0.25rem increments)
- For section padding:
  - Mobile: `p-4` (1rem)
  - Desktop: `p-[60px]`

#### Border Radius
- Small elements: `rounded-lg` (0.5rem)
- Medium elements: `rounded-xl` (1rem)
- Large elements: `rounded-2xl` (1.5rem)
- Buttons: `rounded-[16px]`

#### Animations
- Fast transitions: `duration-100` (0.1s)
- Normal transitions: `duration-300` (0.3s)
- Slow transitions: `duration-600` (0.6s)
- Available custom animations:
  - `animate-accordion-down`, `animate-accordion-up`
  - `animate-scrollRight`, `animate-scrollLeft`
  - `animate-customspin`, `animate-spin-slow`, `animate-spin-slow-reverse`
  - `animate-marquee`, `animate-marquee-vertical`
  - `animate-shine`

### Component Structure
- prefer functional components with typescript
- use proper typescript types, avoid `any`
- extract reusable logic into custom hooks
- keep components focused and single-responsibility

### Props & State
- use descriptive prop names
- define prop types using typescript interfaces or types
- prefer controlled components over uncontrolled
- use zustand for global state (located in `src/store/`)

### Imports
- organize imports: react → third-party → local components → utils → types
- use absolute imports from `@/` prefix when available
- remove unused imports

## File Organization
- place shared components in `apps/web/src/components/`
- place page-specific components near their page
- co-locate tests with the code they test
- keep utility functions in `apps/web/src/lib/` or `apps/web/src/utils/`

## Naming Conventions
- components: PascalCase (e.g., `UserProfile.tsx`)
- files/folders: kebab-case or camelCase for utilities
- constants: UPPER_SNAKE_CASE
- functions/variables: camelCase
- types/interfaces: PascalCase with descriptive names

## Accessibility
- include proper aria labels
- ensure keyboard navigation works
- maintain proper heading hierarchy
- provide alt text for images

## Performance
- use dynamic imports for code splitting when appropriate
- optimize images (use next/image)
- memoize expensive computations
- avoid unnecessary re-renders

## Monorepo Structure
- this is a turborepo monorepo
- shared packages live in `packages/`
- apps live in `apps/` (web, api, backend, docs)
- respect package boundaries
- use workspace dependencies properly

