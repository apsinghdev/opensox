export interface NewsletterItem {
    id: number,
    date: string,
    title: string,
    tags: string[],
    content: string,
}

export const newsletterposts: NewsletterItem[] = [
  {
    id: 1,
    date: "2024-01-12",
    title: "Welcome to Our First Newsletter!",
    tags: ["announcement", "update", "community"],
    content: `
      <h2>🎉 A New Beginning</h2>
      <p>Welcome to the very first edition of our monthly newsletter. We're thrilled to have you onboard as we begin this journey of sharing insights, behind-the-scenes updates, product improvements, and exclusive announcements.</p>

      <p>Our mission is simple: keep you informed, inspired, and involved in everything we build. This month marks the foundation of an ongoing conversation with you — our community.</p>

      <p>Check out our website for more updates:
        <a href="https://example.com" target="_blank">Visit Our Homepage</a>
      </p>

      <img src="https://plus.unsplash.com/premium_photo-1683121713210-97667d2e83c8?q=80&w=2064&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
           alt="Welcome banner" 
           style="width:100%; margin-top:16px;" />
    `
  },
  {
    id: 2,
    date: "2025-02-05",
    title: "Top Tools We Recommend This Month",
    tags: ["resources", "insights", "featured"],
    content: `
      <h2>🛠️ Productivity Tools You Should Try</h2>
      <p>This month, our team handpicked a set of tools that significantly boost productivity and streamline your daily workflow. Whether you’re designing, planning, or writing — there’s something here for you.</p>

      <ul>
        <li><strong>Notion</strong> — A powerful all-in-one workspace for planning, knowledge management, and collaboration.</li>
        <li><strong>Figma</strong> — The leader in collaborative UI design, now even faster with the new Figma Dev Mode.</li>
        <li><strong>Readwise</strong> — Capture, sync, and resurface your highlights from books, articles, and PDFs.</li>
      </ul>

      <p>Explore our full tool breakdown here:
        <a href="https://example.com/tools-review" target="_blank">Full Tools Breakdown</a>
      </p>

      <img src="https://images.unsplash.com/photo-1557264337-e8a93017fe92?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
           alt="Productivity tools" 
           style="width:100%; margin-top:16px;" />
    `
  },
  {
    id: 3,
    date: "2025-03-19",
    title: "Behind the Scenes: How We Build Our Features",
    tags: ["insights", "update", "engineering"],
    content: `
      <h2>🔍 Inside Our Development Process</h2>
      <p>Every feature begins with a problem worth solving. This month, we’re giving you an exclusive look into our product lifecycle — from initial concept to final release.</p>

      <h3>Research & Planning</h3>
      <p>We start by analyzing feedback across our channels. User interviews and analytics help us understand what truly matters.</p>

      <h3>Design & Prototypes</h3>
      <p>With clarity on the problem, the design team crafts wireframes and clickable prototypes to validate user flows.</p>

      <img src="https://images.unsplash.com/photo-1568952433726-3896e3881c65?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
           alt="Development workflow" 
           style="width:100%; margin: 16px 0;" />

      <h3>Development & Testing</h3>
      <p>Features move through sprints with rigorous testing — unit tests, integration tests, and accessibility checks.</p>

      <p>Learn more in our blog:
        <a href="https://example.com/dev-process" target="_blank">How We Build</a>
      </p>
    `
  },
  {
    id: 4,
    date: "2025-04-02",
    title: "Special Announcement: New Features Are Live!",
    tags: ["update", "announcement", "release"],
    content: `
      <h2>🚀 Major Update Released</h2>
      <p>Thanks to your feedback, we’ve released one of the biggest updates yet. Here’s a quick overview of what’s new:</p>

      <ul>
        <li>📌 <strong>Dark Mode</strong> — More contrast, less eye strain, and a clean, modern aesthetic.</li>
        <li>⚡ <strong>Performance Boosts</strong> — Up to 40% faster load times across key sections of the platform.</li>
        <li>🔔 <strong>Smarter Notifications</strong> — Prioritized alerts so you only see what matters.</li>
      </ul>

      <p>Under the hood, we’ve also optimized caching, added new analytics dashboards, and improved accessibility across the board.</p>

      <img src="https://images.unsplash.com/photo-1683064325134-3acfdef9c6d7?q=80&w=1712&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
           alt="Feature update" 
           style="width:100%; margin-top:16px;" />

      <p>See full details:
        <a href="https://example.com/release-notes" target="_blank">Release Notes</a>
      </p>
    `
  },
  {
    id: 5,
    date: "2025-05-15",
    title: "Community Spotlight: Amazing Projects From Readers",
    tags: ["community", "featured", "insights"],
    content: `
      <h2>🌟 Celebrating Our Community</h2>
      <p>Every month, we highlight outstanding projects built by our amazing community. This month’s picks show creativity, passion, and technical excellence.</p>

      <h3>1. Portfolio Website by Jane Doe</h3>
      <p>A clean and elegant portfolio designed with Next.js, featuring smooth animations and impeccable responsive design.</p>
      <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop" 
           alt="Portfolio preview" 
           style="width:100%; margin: 10px 0;" />

      <h3>2. Mobile App Prototype by Alex Smith</h3>
      <p>An intuitive financial tracking app, crafted in Figma with a focus on minimal UI and seamless user flows.</p>
      <img src="https://images.unsplash.com/photo-1559742811-822e0d81005d?q=80&w=1200&auto=format&fit=crop" 
           alt="Mobile app prototype" 
           style="width:100%; margin: 10px 0;" />

      <p>Want your project featured?
        <a href="https://example.com/submit" target="_blank">Submit your work here</a>.
      </p>
    `
  }
];
