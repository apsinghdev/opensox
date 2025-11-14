/**
 * Newsletter data structure
 * 
 * To add a new newsletter:
 * 1. Create a new NewsletterPost object
 * 2. Add it to the newsletters array
 * 3. Ensure date is in YYYY-MM-DD format
 * 4. Use content array with supported content types
 */

export type NewsletterContentType =
  | { type: "text"; content: string }
  | { type: "heading"; level: 1 | 2 | 3; content: string }
  | { type: "bold"; content: string }
  | { type: "link"; text: string; url: string }
  | { type: "image"; src: string; alt: string }
  | { type: "paragraph"; content: string };

export interface NewsletterPost {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD format
  headerImage?: string; // Optional header image URL
  category?: string; // Optional category (e.g., "Updates", "Features", "Announcements")
  content: NewsletterContentType[];
}

export const newsletters: NewsletterPost[] = [
  {
    id: "2025-01-15-welcome",
    title: "Welcome to Opensox AI Newsletter",
    date: "2025-01-15",
    headerImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1600&h=900&fit=crop&q=80",
    content: [
      { type: "heading", level: 1, content: "Welcome to Opensox AI!" },
      { type: "paragraph", content: "We're thrilled to launch our exclusive newsletter for pro users. This is your go-to destination for the latest updates, deep insights, and exclusive content that will help you make the most of Opensox AI." },
      { type: "paragraph", content: "In this inaugural edition, we're excited to share what we've been building, the vision behind Opensox AI, and how we're revolutionizing the way developers discover and contribute to open-source projects." },
      { type: "image", src: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1600&h=900&fit=crop&q=80", alt: "Open source collaboration and development" },
      { type: "heading", level: 2, content: "What's New This Month" },
      { type: "paragraph", content: "We've been hard at work, and this month brings several game-changing features:" },
      { type: "bold", content: "Enhanced Project Search" },
      { type: "text", content: " - Our new AI-powered search algorithm understands context better than ever. Find projects that match your exact needs in seconds, not minutes. The search now considers project activity, community health, and contribution opportunities." },
      { type: "paragraph", content: "" },
      { type: "image", src: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1600&h=900&fit=crop&q=80", alt: "AI-powered search technology" },
      { type: "paragraph", content: "" },
      { type: "bold", content: "Newsletter Feature" },
      { type: "text", content: " - You're reading it! We're committed to keeping you in the loop with regular updates, tips, and exclusive insights. Expect monthly newsletters packed with valuable content." },
      { type: "paragraph", content: "" },
      { type: "bold", content: "Improved Filtering System" },
      { type: "text", content: " - Filter by language, framework, difficulty level, and more. Our advanced filters help you discover projects that align perfectly with your skills and interests." },
      { type: "heading", level: 2, content: "Why Opensox AI Matters" },
      { type: "paragraph", content: "Open source is the backbone of modern software development. Yet, finding the right project to contribute to can be overwhelming. Opensox AI solves this by using intelligent matching to connect developers with projects that need their exact skills." },
      { type: "image", src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&h=900&fit=crop&q=80", alt: "Team collaboration and coding together" },
      { type: "paragraph", content: "Whether you're looking to build your portfolio, learn new technologies, or give back to the community, Opensox AI makes the journey seamless." },
      { type: "heading", level: 2, content: "Resources & Next Steps" },
      { type: "paragraph", content: "Ready to dive in? Check out our " },
      { type: "link", text: "comprehensive documentation", url: "https://opensox.ai" },
      { type: "text", content: " to learn more about all the features and how to get started." },
      { type: "paragraph", content: "" },
      { type: "paragraph", content: "Have questions or feedback? We'd love to hear from you. Your input helps us build a better platform for everyone." },
      { type: "paragraph", content: "" },
      { type: "paragraph", content: "Happy coding! 🚀" },
    ],
  },
  {
    id: "2025-01-10-updates",
    title: "January 2025 Updates: Performance & New Features",
    date: "2025-01-10",
    headerImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&h=900&fit=crop&q=80",
    content: [
      { type: "heading", level: 1, content: "January 2025 Updates" },
      { type: "paragraph", content: "Happy New Year! We're kicking off 2025 with some incredible updates that will make your Opensox AI experience faster, smoother, and more powerful than ever." },
      { type: "image", src: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1600&h=900&fit=crop&q=80", alt: "Performance improvements and analytics dashboard" },
      { type: "heading", level: 2, content: "Performance Improvements" },
      { type: "paragraph", content: "We've made significant performance improvements that will make your experience noticeably faster and smoother. Our engineering team has been working tirelessly to optimize every aspect of the platform." },
      { type: "heading", level: 3, content: "What Changed" },
      { type: "paragraph", content: "Database queries are now optimized with intelligent caching and query optimization. We've reduced page load times by 40%, meaning you can browse and discover projects faster than ever before." },
      { type: "paragraph", content: "Search results now appear almost instantly, thanks to our new indexing system. The search experience is now 3x faster, allowing you to find what you're looking for without any delays." },
      { type: "image", src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&h=900&fit=crop&q=80", alt: "Data visualization and analytics" },
      { type: "heading", level: 3, content: "Behind the Scenes" },
      { type: "paragraph", content: "We've implemented advanced caching strategies, optimized our database schema, and introduced lazy loading for images and content. These changes might seem invisible, but you'll definitely notice the difference in speed." },
      { type: "heading", level: 2, content: "New Features Coming Soon" },
      { type: "paragraph", content: "We're not stopping here. In the coming months, you can expect:" },
      { type: "bold", content: "Project Recommendations" },
      { type: "text", content: " - AI-powered suggestions based on your skills and interests" },
      { type: "paragraph", content: "" },
      { type: "image", src: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1600&h=900&fit=crop&q=80", alt: "AI and machine learning technology" },
      { type: "paragraph", content: "" },
      { type: "bold", content: "Contribution Tracking" },
      { type: "text", content: " - Keep track of your open-source contributions in one place" },
      { type: "paragraph", content: "" },
      { type: "bold", content: "Community Insights" },
      { type: "text", content: " - Get insights into project health, activity levels, and contribution opportunities" },
      { type: "heading", level: 2, content: "Thank You" },
      { type: "paragraph", content: "Thank you for being part of the Opensox AI community. Your feedback and contributions help us build a better platform every day." },
      { type: "paragraph", content: "Stay tuned for more exciting updates!" },
    ],
  },
];

