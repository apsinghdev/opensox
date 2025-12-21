"use client";

import { useState } from "react";
import { trpc } from "@/lib/trpc";
import TutorialGenerator from "@/components/tutorial/TutorialGenerator";
import TutorialViewer from "@/components/tutorial/TutorialViewer";
import TutorialHistory from "@/components/tutorial/TutorialHistory";
import { BookOpenIcon } from "@heroicons/react/24/outline";

export default function TutorialPage() {
  const [selectedTutorialId, setSelectedTutorialId] = useState<string | null>(null);
  const [generatedTutorial, setGeneratedTutorial] = useState<any>(null);

  // Fetch user's tutorial history
  const { data: tutorials, refetch: refetchTutorials } = trpc.tutorial.getUserTutorials.useQuery();

  const handleTutorialGenerated = (tutorial: any) => {
    setGeneratedTutorial(tutorial);
    setSelectedTutorialId(tutorial.id);
    refetchTutorials();
  };

  const handleSelectTutorial = (id: string) => {
    setSelectedTutorialId(id);
    setGeneratedTutorial(null); // Clear any generated tutorial to load from DB
  };

  const handleBack = () => {
    setSelectedTutorialId(null);
    setGeneratedTutorial(null);
  };

  return (
    <div className="min-h-screen bg-ox-content p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-brand-purple/10 rounded-lg">
              <BookOpenIcon className="w-6 h-6 text-brand-purple" />
            </div>
            <h1 className="text-2xl font-bold text-text-primary">
              Code Tutorial Generator
            </h1>
            <span className="px-2 py-0.5 text-xs font-medium bg-brand-purple/20 text-brand-purple rounded-full">
              AI Powered
            </span>
          </div>
          <p className="text-text-secondary text-sm">
            Transform any GitHub repository into a beginner-friendly tutorial with AI-powered analysis
          </p>
        </div>

        {/* Main Content */}
        {selectedTutorialId ? (
          <TutorialViewer
            tutorialId={selectedTutorialId}
            generatedTutorial={generatedTutorial}
            onBack={handleBack}
          />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Generator Panel */}
            <div className="lg:col-span-2">
              <TutorialGenerator onTutorialGenerated={handleTutorialGenerated} />
            </div>

            {/* History Panel */}
            <div className="lg:col-span-1">
              <TutorialHistory
                tutorials={(tutorials || []) as any}
                onSelectTutorial={handleSelectTutorial}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
