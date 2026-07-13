"use client";

import { useEffect, useRef, useState } from "react";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { Reorder, useDragControls } from "framer-motion";
import { GripVertical, Pencil, Plus, Trash2 } from "lucide-react";

import { trpc } from "@/lib/trpc";

import { ProjectForm, type ProjectFormValues } from "./_components/ProjectForm";

type AdminProject = {
  id: string;
  name: string;
  url: string;
  qualities: string;
  order: number;
};

type View =
  | { mode: "list" }
  | { mode: "create" }
  | { mode: "edit"; project: AdminProject };

function toFormValues(project: AdminProject): ProjectFormValues {
  return {
    name: project.name,
    url: project.url,
    qualities: project.qualities,
  };
}

const ProjectsCmsPage = (): JSX.Element => {
  const { status } = useSession();
  const [view, setView] = useState<View>({ mode: "list" });

  const authenticated = status === "authenticated";

  const {
    data: isAdmin,
    isLoading: adminCheckLoading,
    isError: adminCheckError,
    error: adminCheckErrorData,
  } = trpc.proProjects.isAdmin.useQuery(undefined, { enabled: authenticated });

  if (status === "loading" || (authenticated && adminCheckLoading)) {
    return (
      <CenteredMessage>
        <div
          role="status"
          aria-label="Checking admin access"
          className="flex flex-col items-center gap-3"
        >
          <div
            aria-hidden="true"
            className="w-8 h-8 border-2 border-brand-purple border-t-transparent rounded-full animate-spin"
          />
          <span className="sr-only">Checking admin access.</span>
        </div>
      </CenteredMessage>
    );
  }

  if (!authenticated) {
    return (
      <CenteredMessage>
        <p className="text-text-secondary">You need to sign in to continue.</p>
        <Link href="/login" className="text-brand-purple-light hover:underline">
          Go to login
        </Link>
      </CenteredMessage>
    );
  }

  if (adminCheckError) {
    return (
      <CenteredMessage>
        <p className="text-text-primary font-semibold text-lg">
          Couldn&apos;t verify admin access
        </p>
        <p className="text-text-secondary text-sm">
          {adminCheckErrorData?.message ??
            "A temporary error occurred. Please try again."}
        </p>
      </CenteredMessage>
    );
  }

  if (!isAdmin) {
    return (
      <CenteredMessage>
        <p className="text-text-primary font-semibold text-lg">Access denied</p>
        <p className="text-text-secondary text-sm">
          This area is restricted to administrators.
        </p>
      </CenteredMessage>
    );
  }

  return (
    <div className="min-h-screen bg-ox-content">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 md:py-12">
        <div className="flex items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-text-primary">
              Pro Projects CMS
            </h1>
            <p className="text-text-secondary text-sm mt-1">
              Add, edit, and drag to reorder projects shown to Pro members.
            </p>
          </div>
          {view.mode === "list" ? (
            <button
              type="button"
              onClick={() => setView({ mode: "create" })}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-brand-purple hover:bg-brand-purple/90 text-text-primary text-sm font-medium transition-colors"
            >
              <Plus className="w-4 h-4" />
              New project
            </button>
          ) : null}
        </div>

        {view.mode === "list" ? (
          <ProjectList
            onCreate={() => setView({ mode: "create" })}
            onEdit={(project) => setView({ mode: "edit", project })}
          />
        ) : (
          <ProjectEditor view={view} onDone={() => setView({ mode: "list" })} />
        )}
      </div>
    </div>
  );
};

function CenteredMessage({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div className="min-h-screen bg-ox-content flex items-center justify-center">
      <div className="flex flex-col items-center gap-3 text-center px-4">
        {children}
      </div>
    </div>
  );
}

function ProjectList({
  onCreate,
  onEdit,
}: {
  onCreate: () => void;
  onEdit: (project: AdminProject) => void;
}): JSX.Element {
  const utils = trpc.useUtils();
  const { data, isLoading, isError, error } =
    trpc.proProjects.adminList.useQuery();

  const reorder = trpc.proProjects.adminReorder.useMutation({
    onError: (e) => window.alert(`Couldn't save the new order: ${e.message}`),
    onSettled: () => utils.proProjects.adminList.invalidate(),
  });
  const deleteProject = trpc.proProjects.adminDelete.useMutation({
    onSuccess: () => utils.proProjects.adminList.invalidate(),
    onError: (e) => window.alert(`Couldn't delete the project: ${e.message}`),
  });

  // Local, drag-controlled copy of the list. Server order is the source of
  // truth; we sync from it whenever the query resolves or is invalidated.
  const [items, setItems] = useState<AdminProject[]>([]);
  const dirtyRef = useRef(false);

  useEffect(() => {
    if (data) setItems(data);
  }, [data]);

  const commitOrder = () => {
    if (!dirtyRef.current) return;
    dirtyRef.current = false;
    reorder.mutate({ ids: items.map((p) => p.id) });
  };

  // Keyboard equivalent of a drag step: move one project up (-1) or down (+1),
  // marking the list dirty so it commits like a pointer drag does.
  const moveByKeyboard = (id: string, delta: number) => {
    setItems((prev) => {
      const from = prev.findIndex((p) => p.id === id);
      const to = from + delta;
      if (from === -1 || to < 0 || to >= prev.length) return prev;
      const next = [...prev];
      const [moved] = next.splice(from, 1);
      next.splice(to, 0, moved);
      dirtyRef.current = true;
      return next;
    });
  };

  if (isError) {
    return (
      <p className="text-text-secondary">
        {error?.message ?? "Failed to load projects. Please try again."}
      </p>
    );
  }

  if (isLoading) {
    return <p className="text-text-secondary">Loading projects...</p>;
  }

  if (items.length === 0) {
    return (
      <div className="border border-dash-border rounded-xl p-10 text-center">
        <p className="text-text-secondary">No projects yet.</p>
        <button
          type="button"
          onClick={onCreate}
          className="mt-4 text-brand-purple-light hover:underline text-sm"
        >
          Add your first project
        </button>
      </div>
    );
  }

  return (
    <>
      <p className="text-text-muted text-xs mb-3">
        Drag the handle to reorder. The order here is exactly what Pro members
        see (numbered 1 to {items.length}).
      </p>
      <Reorder.Group
        axis="y"
        values={items}
        onReorder={(next: AdminProject[]) => {
          setItems(next);
          dirtyRef.current = true;
        }}
        className="space-y-3"
      >
        {items.map((project, index) => (
          <ProjectRow
            key={project.id}
            project={project}
            position={index + 1}
            onEdit={onEdit}
            onCommit={commitOrder}
            onMove={moveByKeyboard}
            onDelete={(id) => {
              if (window.confirm(`Delete "${project.name}"? This can't be undone.`)) {
                deleteProject.mutate({ id });
              }
            }}
            deleting={
              deleteProject.isPending &&
              deleteProject.variables?.id === project.id
            }
          />
        ))}
      </Reorder.Group>
    </>
  );
}

function ProjectRow({
  project,
  position,
  onEdit,
  onDelete,
  onCommit,
  onMove,
  deleting,
}: {
  project: AdminProject;
  position: number;
  onEdit: (project: AdminProject) => void;
  onDelete: (id: string) => void;
  onCommit: () => void;
  onMove: (id: string, delta: number) => void;
  deleting: boolean;
}): JSX.Element {
  const controls = useDragControls();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      onMove(project.id, -1);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      onMove(project.id, 1);
    } else if (e.key === "Enter") {
      e.preventDefault();
      onCommit();
    }
  };

  return (
    <Reorder.Item
      value={project}
      dragListener={false}
      dragControls={controls}
      onDragEnd={onCommit}
      className="bg-dash-surface border border-dash-border rounded-xl p-4 flex items-center justify-between gap-4"
    >
      <div className="flex items-center gap-3 min-w-0">
        <button
          type="button"
          onPointerDown={(e) => controls.start(e)}
          onKeyDown={handleKeyDown}
          aria-label={`Reorder ${project.name}. Use arrow up and down to move, Enter to save.`}
          className="cursor-grab active:cursor-grabbing touch-none text-text-muted hover:text-text-secondary shrink-0 rounded focus-visible:ring-2 focus-visible:ring-brand-purple/50 focus-visible:outline-none"
        >
          <GripVertical className="w-4 h-4" />
        </button>
        <div className="min-w-0">
          <span className="text-xs text-brand-purple-light bg-brand-purple/10 rounded-full px-2 py-0.5">
            #{position}
          </span>
          <p className="text-text-primary font-medium mt-1.5 truncate">
            {project.name}
          </p>
          <p className="text-text-muted text-xs mt-0.5 truncate">
            {project.url}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <button
          type="button"
          onClick={() => onEdit(project)}
          aria-label={`Edit ${project.name}`}
          className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-dash-raised hover:bg-dash-hover transition-colors"
        >
          <Pencil className="w-4 h-4 text-text-secondary" />
        </button>
        <button
          type="button"
          disabled={deleting}
          onClick={() => onDelete(project.id)}
          aria-label={`Delete ${project.name}`}
          className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-dash-raised hover:bg-red-500/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Trash2 className="w-4 h-4 text-text-secondary" />
        </button>
      </div>
    </Reorder.Item>
  );
}

function ProjectEditor({
  view,
  onDone,
}: {
  view: { mode: "create" } | { mode: "edit"; project: AdminProject };
  onDone: () => void;
}): JSX.Element {
  const utils = trpc.useUtils();
  const [error, setError] = useState<string | null>(null);

  const onSuccess = () => {
    utils.proProjects.adminList.invalidate();
    onDone();
  };

  const createProject = trpc.proProjects.adminCreate.useMutation({
    onSuccess,
    onError: (e) => setError(e.message),
  });
  const updateProject = trpc.proProjects.adminUpdate.useMutation({
    onSuccess,
    onError: (e) => setError(e.message),
  });

  const isSubmitting = createProject.isPending || updateProject.isPending;

  const handleSubmit = (values: ProjectFormValues) => {
    setError(null);
    const payload = {
      name: values.name,
      url: values.url,
      qualities: values.qualities,
    };

    if (view.mode === "edit") {
      updateProject.mutate({ id: view.project.id, data: payload });
    } else {
      createProject.mutate(payload);
    }
  };

  return (
    <div className="bg-dash-surface border border-dash-border rounded-xl p-5 md:p-6">
      <h2 className="text-text-primary font-semibold text-lg mb-5">
        {view.mode === "edit" ? "Edit project" : "New project"}
      </h2>

      {error ? (
        <p className="text-red-400 text-sm mb-4 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
          {error}
        </p>
      ) : null}

      <ProjectForm
        initialValues={
          view.mode === "edit" ? toFormValues(view.project) : undefined
        }
        submitLabel={view.mode === "edit" ? "Save changes" : "Create project"}
        isSubmitting={isSubmitting}
        onSubmitAction={handleSubmit}
        onCancelAction={onDone}
      />
    </div>
  );
}

export default ProjectsCmsPage;
