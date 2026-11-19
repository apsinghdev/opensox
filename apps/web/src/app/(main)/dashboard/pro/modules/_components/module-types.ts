export type ModuleCategory =
  | "open_source"
  | "build_in_public"
  | "indie_hacking"
  | "first_principles";

export interface ModuleLink {
  id: string;
  label: string;
  url: string;
  order: number;
}

// Mirrors the public shape returned by trpc.modules.list. Note there is no
// video id here: the server only hands that out as a signed embed URL on play.
export interface ProModule {
  id: string;
  title: string;
  description: string | null;
  category: ModuleCategory;
  order: number;
  createdAt: Date;
  links: ModuleLink[];
}

export const CATEGORY_LABELS: Record<ModuleCategory, string> = {
  open_source: "Open Source",
  build_in_public: "Build in Public",
  indie_hacking: "Indie Hacking",
  first_principles: "First Principles",
};

// Order the tabs are shown in.
export const CATEGORY_ORDER: ModuleCategory[] = [
  "open_source",
  "build_in_public",
  "indie_hacking",
  "first_principles",
];
