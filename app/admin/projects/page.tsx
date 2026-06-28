import { prisma } from "@/lib/prisma";
import ProjectsClient from "./ProjectsClient";

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  // Map Decimal or Date types to plain JSON fields if necessary
  const serializedProjects = projects.map(p => ({
    ...p,
    createdAt: p.createdAt.toISOString(),
  }));

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="mb-6 select-none">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-slate-100 tracking-tight">
          Active Projects
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Monitor timelines, services, and execution progress for active client solutions.
        </p>
      </div>

      <ProjectsClient initialProjects={serializedProjects} />
    </div>
  );
}