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
  description: string;

}

export const blogs: BlogPost[] = [
  {
    date: "24-08-25",
    linkText: "how to build an online presense?",
    link: "https://x.com/ajeetunc/status/1959480811293708369?s=20",
    tag: "distribution",
    description: "o far, i've got around 13 offers (the ones i joined + the ones i didn't.11 of them came from my connections and online presence."


  },
  {
    date: "30-07-24",
    linkText: "how to get into gsoc (part-2)",
    link: "https://x.com/ajeetunc/status/1818130583509156163?s=20",
    tag: "misc",
    description: " How I prepared for GSoC'24?and the mistakes I did (Part-2 : Making solid Contributions) ",

  },
  {
    date: "29-07-24",
    linkText: "how to get into gsoc (part-1)",
    link: "https://x.com/ajeetunc/status/1817760248599634314?s=20",
    tag: "misc",
    description: "How I prepared for GSoC'24?(and the mistakes I did)(Part-1 : Selecting the right organisation)",
  },
  {
    date: "02-08-24",
    linkText: "how to get into gsoc (part-3)",
    link: "https://x.com/ajeetunc/status/1819209955330666623?s=20",
    tag: "misc",
    description: "How I prepared for GSoC'24? (and the mistakes I did)(Part-3 : Writing a solid proposal )",
  },
  {
    date: "02-12-23",
    linkText: "why you should do open source?",
    link: "https://x.com/ajeetunc/status/1987490955298230369?s=20",
    tag: "engineering",
    description: "many people don't realise that contributing to open source has asymmetric results. most of us think, it's linear (for a job/internship only) but it's not.",
  },
  {
    date: "10-11-25",
    linkText: "ugly execution wins",
    link: "https://x.com/ajeetunc/status/1987931607102341182?s=20",
    tag: "misc",
    description: "ugly execution - i use this term to define a state when you don't care about the perfectness in anything and just act. ",
  },
  {
    date: "08-11-25",
    linkText: "why you shouln't register a company?",
    link: "https://x.com/ajeetunc/status/1987125877985968217?s=20",
    tag: "startup",
    description: "if you are planning to build a revenue-first business (without any external funding), only register your company when you cross 2-3 lakhs in net profits.",
  },
  {
    date: "08-11-25",
    linkText: "tiny habits that changed my life",
    link: "https://x.com/ajeetunc/status/1987043154974154762?s=20",
    tag: "misc",
    description: "tiny health habits that changed my life not eating anything three hrs before going to bed drinking two glasses of water after waking up in the morning",
  },
 
];
