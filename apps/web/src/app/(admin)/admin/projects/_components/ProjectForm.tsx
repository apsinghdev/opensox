"use client";

import { useState } from "react";

export type ProjectFormValues = {
  name: string;
  url: string;
  qualities: string;
};

type ProjectFormProps = {
  initialValues?: ProjectFormValues;
  submitLabel: string;
  isSubmitting: boolean;
  onSubmitAction: (values: ProjectFormValues) => void;
  onCancelAction: () => void;
};

const EMPTY: ProjectFormValues = {
  name: "",
  url: "",
  qualities: "",
};

const inputClass =
  "w-full bg-dash-base border border-dash-border rounded-lg px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus-visible:ring-2 focus-visible:ring-brand-purple/50 focus-visible:outline-none";

export function ProjectForm({
  initialValues,
  submitLabel,
  isSubmitting,
  onSubmitAction,
  onCancelAction,
}: ProjectFormProps): JSX.Element {
  const [values, setValues] = useState<ProjectFormValues>(
    initialValues ?? EMPTY
  );
  const [submitError, setSubmitError] = useState<string | null>(null);

  const update = <K extends keyof ProjectFormValues>(
    key: K,
    value: ProjectFormValues[K]
  ) => setValues((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const name = values.name.trim();
    const url = values.url.trim();
    const qualities = values.qualities.trim();

    if (!name || !url || !qualities) {
      setSubmitError("Name, link, and qualities are required.");
      return;
    }

    setSubmitError(null);
    onSubmitAction({ name, url, qualities });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {submitError ? (
        <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
          {submitError}
        </p>
      ) : null}

      <div>
        <label
          htmlFor="project-name"
          className="block text-sm text-text-secondary mb-1.5"
        >
          Name
        </label>
        <input
          id="project-name"
          className={inputClass}
          value={values.name}
          onChange={(e) => update("name", e.target.value)}
          placeholder="e.g. pebbleOS"
          required
        />
      </div>

      <div>
        <label
          htmlFor="project-url"
          className="block text-sm text-text-secondary mb-1.5"
        >
          Link
        </label>
        <input
          id="project-url"
          type="url"
          className={inputClass}
          value={values.url}
          onChange={(e) => update("url", e.target.value)}
          placeholder="https://github.com/..."
          required
        />
      </div>

      <div>
        <label
          htmlFor="project-qualities"
          className="block text-sm text-text-secondary mb-1.5"
        >
          Qualities
        </label>
        <textarea
          id="project-qualities"
          rows={7}
          className={`${inputClass} resize-y`}
          value={values.qualities}
          onChange={(e) => update("qualities", e.target.value)}
          placeholder={
            "an operating system for pebble smartwatches\n\n- low level project\n- core lang: C\n- active community"
          }
          required
        />
        <p className="text-text-muted text-xs mt-1.5">
          Free-form text. Line breaks are preserved when shown to members.
        </p>
      </div>

      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-brand-purple hover:bg-brand-purple/90 text-text-primary text-sm font-medium transition-colors disabled:opacity-60"
        >
          {isSubmitting ? "Saving..." : submitLabel}
        </button>
        <button
          type="button"
          onClick={onCancelAction}
          className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-dash-surface border border-dash-border text-text-secondary hover:bg-dash-hover text-sm transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
