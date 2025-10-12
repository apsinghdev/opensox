export interface FAQ {
  question: string;
  answer: string;
}

export const faqs: FAQ[] = [
  {
    question: "What is OpenSox?",
    answer:
      "OpenSox is a platform to help developers find and contribute to open-source projects that match their skills and interests.",
  },
  {
    question: "How can I find a project to contribute to?",
    answer:
      "You can browse the list of projects on our main page. We provide filters to help you narrow down the projects based on language, popularity, and activity.",
  },
  {
    question: "Is OpenSox free to use?",
    answer: "Yes, OpenSox is completely free for both developers and project maintainers.",
  },
  {
    question: "How are projects ranked?",
    answer:
      "Projects are ranked based on a combination of factors including recent activity, number of open issues, and community engagement.",
  },
  {
    question: "How do I get started contributing?",
    answer:
      "Simply create an account, set your preferences, and start browsing projects. Our platform will help match you with projects that fit your skill level.",
  },
  {
    question: "Can I suggest new features?",
    answer:
      "Absolutely! We welcome feedback and feature suggestions. You can reach out to us through our contact form or GitHub repository.",
  },
];