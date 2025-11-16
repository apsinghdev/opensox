export interface Newsletter {
  id: string;
  slug: string;
  title: string;
  content: string; // markdown content
  publishedAt: Date;
  author?: string;
  image?: string;
}

// sample newsletters data
export const newsletters: Newsletter[] = [
  {
    id: "1",
    slug: "november-2024-updates",
    title: "November 2024 Updates",
    content: `# Welcome to November Updates

We're excited to share what we've been working on this month!

## New Features

**Project Discovery** - We've improved our search algorithm to help you find the perfect open-source projects faster.

**Enhanced Filters** - New filtering options make it easier to discover projects based on:
- Technology stack
- Project size
- Activity level
- Community engagement

## Community Highlights

This month, we saw amazing contributions from our community. Thank you to everyone who's been sharing projects and helping others get started!

## What's Next

We're working on:
- Newsletter system (you're reading the first one!)
- Improved dashboard experience
- Better project recommendations

Stay tuned for more updates!

[Check out our latest projects](https://opensox.ai/dashboard/projects)`,
    publishedAt: new Date("2024-11-15"),
    author: "Ajeet",
  },
  {
    id: "2",
    slug: "october-2024-launch",
    title: "October 2024 - Opensox Launch",
    content: `# Opensox is Live! 🎉

We're thrilled to announce the launch of **Opensox** - your gateway to discovering amazing open-source projects.

## What is Opensox?

Opensox helps you find the perfect open-source project to contribute to within 10 minutes. We've curated thousands of projects and made it easy to discover ones that match your interests and skills.

## Getting Started

1. **Browse Projects** - Explore our curated collection
2. **Use Filters** - Narrow down by technology, size, and more
3. **Start Contributing** - Find your perfect match and get involved!

## Our Mission

We believe everyone should have easy access to open-source opportunities. Opensox makes it simple to:
- Discover projects aligned with your interests
- Understand project requirements quickly
- Connect with maintainers and communities

## Join Us

We're building a community of passionate open-source contributors. [Join our Discord](https://discord.gg/37ke8rYnRM) to connect with others and share your journey!

Happy contributing! 🚀`,
    publishedAt: new Date("2024-10-01"),
    author: "Ajeet",
  },
  {
    id: "3",
    slug: "december-2024-preview",
    title: "December 2024 Preview",
    content: `# What's Coming in December

As we wrap up 2024, we're planning some exciting features for the new year!

## Upcoming Features

### Newsletter System
You're reading our new newsletter feature! We'll be sharing regular updates about:
- New projects added to Opensox
- Community highlights
- Tips for open-source contributors
- Platform updates

### Enhanced Search
We're working on smarter search that understands:
- Your coding preferences
- Project complexity
- Time commitment you're looking for

### Community Features
- Project recommendations based on your activity
- Contribution tracking
- Achievement badges

## Thank You

Thank you to everyone who's been part of our journey this year. Your feedback and contributions make Opensox better every day.

## Stay Connected

Follow us on [Twitter](https://x.com/ajeetunc) for the latest updates and open-source tips!

See you in 2025! 🎊`,
    publishedAt: new Date("2024-12-01"),
    author: "Ajeet",
  },
];

// helper function to get newsletter by slug
export function getNewsletterBySlug(slug: string): Newsletter | undefined {
  return newsletters.find((newsletter) => newsletter.slug === slug);
}

// helper function to get newsletters grouped by month and year
export function getNewslettersByDate(): Record<string, Newsletter[]> {
  const grouped: Record<string, Newsletter[]> = {};

  newsletters.forEach((newsletter) => {
    const date = new Date(newsletter.publishedAt);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    
    if (!grouped[key]) {
      grouped[key] = [];
    }
    grouped[key].push(newsletter);
  });

  // sort each group by date (latest first)
  Object.keys(grouped).forEach((key) => {
    grouped[key].sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  });

  return grouped;
}

// helper function to format date for display
export function formatDate(date: Date): string {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// helper function to get month/year label
export function getMonthYearLabel(key: string): string {
  const [year, month] = key.split("-");
  const date = new Date(parseInt(year), parseInt(month) - 1);
  return date.toLocaleDateString("en-US", { year: "numeric", month: "long" });
}

