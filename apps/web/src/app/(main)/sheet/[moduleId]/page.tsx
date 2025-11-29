import { notFound } from "next/navigation";
import { getSheetModules } from "@/data/sheet";
import { SheetModuleHeader } from "@/components/sheet/SheetModuleHeader";
import { SheetContentRenderer } from "@/components/sheet/SheetContentRenderer";
import styles from "./sheet-content.module.css";

interface PageProps {
  params: Promise<{ moduleId: string }>;
}

export default async function SheetModulePage({ params }: PageProps) {
  const { moduleId } = await params;
  const sheetModules = getSheetModules();
  const sheetModule = sheetModules.find((m) => m.id === moduleId);

  if (!sheetModule) {
    notFound();
  }

  return (
    <>
      <div className="min-h-screen bg-surface-primary">
        <div className="max-w-4xl mx-auto px-4 py-8 md:px-8">
          <SheetModuleHeader
            moduleName={sheetModule.name}
            docContent={sheetModule.docContent}
          />
          <article>
            <header className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
                {sheetModule.name}
              </h1>
              {sheetModule.videoUrl && (
                <div className="mb-6">
                  <a
                    href={sheetModule.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-brand-purple-light hover:text-brand-purple transition-colors"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                    <span>watch video</span>
                  </a>
                </div>
              )}
            </header>

            <SheetContentRenderer
              className={styles.sheetContent}
              content={sheetModule.docContent}
            />
          </article>
        </div>
      </div>
    </>
  );
}
