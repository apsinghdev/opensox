export interface SheetModule {
  id: string; // e.g., "module-0"
  name: string; // Module name
  docContent: string; // HTML content for documentation (rendered from markdown)
  videoUrl: string; // YouTube URL
  comingSoon?: boolean; // If true, module is not yet available
}

