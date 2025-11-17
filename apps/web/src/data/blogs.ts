export type BlogTag =
  | "engineering"
  | "startup"
  | "distribution"
  | "misc"
  | "all";

export interface BlogPost {
  date: string;
  linkText: string;
  link: string;
  tag: BlogTag;
}

export const blogs: BlogPost[] = [
  {
    date: "24-08-25",
    linkText: "how to build an online presense?",
    link: "https://x.com/ajeetunc/status/1959480811293708369?s=20",
    tag: "distribution",
  },
  {
    date: "30-07-24",
    linkText: "how to get into gsoc (part-2)",
    link: "https://x.com/ajeetunc/status/1818130583509156163?s=20",
    tag: "misc",
  },
  {
    date: "29-07-24",
    linkText: "how to get into gsoc (part-1)",
    link: "https://x.com/ajeetunc/status/1817760248599634314?s=20",
    tag: "misc",
  },
  {
    date: "02-08-24",
    linkText: "how to get into gsoc (part-3)",
    link: "https://x.com/ajeetunc/status/1819209955330666623?s=20",
    tag: "misc",
  },
  {
    date: "02-12-23",
    linkText: "why you should do open source?",
    link: "https://x.com/ajeetunc/status/1987490955298230369?s=20",
    tag: "engineering",
  },
  {
    date: "10-11-25",
    linkText: "ugly execution wins",
    link: "https://x.com/ajeetunc/status/1987931607102341182?s=20",
    tag: "misc",
  },
  {
    date: "08-11-25",
    linkText: "why you shouln't register a company?",
    link: "https://x.com/ajeetunc/status/1987125877985968217?s=20",
    tag: "startup",
  },
  {
    date: "08-11-25",
    linkText: "tiny habits that changed my life",
    link: "https://x.com/ajeetunc/status/1987043154974154762?s=20",
    tag: "misc",
  },
  {
    date: "29-10-25",
    linkText: "how to be layoff proof?",
    link: "https://x.com/ajeetunc/status/1983389367327699032?s=20",
    tag: "misc",
  },
  {
    date: "16-11-25",
    linkText: "snapshot of my life so far",
    link: "https://x.com/ajeetunc/status/1989355142081065468?s=20",
    tag: "misc",
  },
];
