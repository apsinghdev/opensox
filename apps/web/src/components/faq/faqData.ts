export interface FAQLink {
  text: string;
  href: string;
}

export interface FAQ {
  question: string;
  answer: string;
  links?: FAQLink[];
}

export const faqs: FAQ[] = [
  {
    question: "What is Opensox AI?",
    answer:
      "Started as a platform to find Open Source projects, now it's a small and limited community of people learning Open Source, Building in Public and Indie Hacking.",
  },
  {
    question: "Is it a course?",
    answer:
      "It's more like a paid community where you get access to ask me anything 24*7 and some really cracked peers doing incredibly interesting stuff. Other than that, I also create modules on open source, building in public and indie hacking exclusively for the members of this community.",
  },
  {
    question: "How does this work?",
    answer:
      "You subscribe to Opensox Pro or Pro+. You get access to all the benefits of it. You mog in open source, building in public and indie hacking.",
    links: [{ text: "all the benefits", href: "/pricing#explore-features" }],
  },
  {
    question: "Is it compulsory to join to learn these things?",
    answer:
      "Nope. You can do things on your own. It's just that you'll have to learn everything through trial and error and will have to spend years, as I did.",
  },
  {
    question: "Did people who joined see the results?",
    answer: "Yes. You can take their word here.",
    links: [{ text: "here", href: "/testimonials" }],
  },
];
