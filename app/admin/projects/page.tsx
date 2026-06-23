import { prisma } from "@/lib/prisma";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { FolderGit, User, Compass, Layers, CheckCircle2 } from "lucide-react";

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

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

      {/* 1. DESKTOP/TABLET TABLE VIEW (Hidden on Mobile) */}
      <div className="hidden md:block overflow-hidden rounded-xl border border-[#0E204A] bg-[#060F24]/30 backdrop-blur-sm shadow-xl shadow-black/10">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-[#0E204A] bg-[#0C1A3D]/40 text-xs font-semibold uppercase tracking-wider text-slate-400 select-none">
                <th className="p-4.5 font-semibold">Project Name</th>
                <th className="p-4.5 font-semibold hidden lg:table-cell">Client</th>
                <th className="p-4.5 font-semibold hidden lg:table-cell">Service</th>
                <th className="p-4.5 font-semibold">Status</th>
                <th className="p-4.5 font-semibold text-right">Progress</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#0E204A]/60 text-sm">
              {projects.map((project) => (
                <tr key={project.id} className="hover:bg-[#0C1A3D]/25 transition-colors duration-150">
                  {/* Project Name */}
                  <td className="p-4.5 font-medium text-slate-200">{project.projectName}</td>

                  {/* Client */}
                  <td className="p-4.5 text-slate-400 hidden lg:table-cell">{project.clientName}</td>

                  {/* Service */}
                  <td className="p-4.5 text-slate-400 hidden lg:table-cell">{project.service}</td>

                  {/* Status Badge */}
                  <td className="p-4.5">
                    <Badge variant={project.status === "COMPLETED" ? "green" : "blue"}>
                      {project.status.replaceAll("_", " ")}
                    </Badge>
                  </td>

                  {/* Progress Slider */}
                  <td className="p-4.5">
                    <div className="flex items-center justify-end gap-3">
                      <div className="w-32 bg-[#020612] border border-[#0E204A]/60 rounded-full h-2 overflow-hidden shadow-inner hidden xl:block">
                        <div
                          className="bg-gradient-to-r from-[#0066FF] to-[#38BDF8] h-full rounded-full shadow-lg shadow-blue-500/20"
                          style={{
                            width: `${project.progress}%`,
                          }}
                        />
                      </div>
                      <span className="font-mono text-xs font-semibold text-slate-300 w-8 text-right">
                        {project.progress}%
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {projects.length === 0 && (
          <div className="p-12 text-center text-slate-500 font-medium select-none">
            No active client projects available.
          </div>
        )}
      </div>

      {/* 2. MOBILE CARD LIST VIEW (Hidden on Tablet/Desktop) */}
      <div className="block md:hidden space-y-4">
        {projects.map((project) => (
          <Card key={project.id} className="border border-[#0E204A] bg-[#060F24]/50 p-5 rounded-xl flex flex-col gap-4" hoverEffect>
            {/* Card Header (Project Title & Client) */}
            <div className="flex justify-between items-start border-b border-[#0E204A]/60 pb-3">
              <div>
                <h3 className="font-semibold text-slate-200 text-sm flex items-center gap-1.5">
                  <FolderGit size={14} className="text-blue-400" />
                  {project.projectName}
                </h3>
                <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                  <User size={11} />
                  {project.clientName}
                </p>
              </div>
              <Badge variant={project.status === "COMPLETED" ? "green" : "blue"}>
                {project.status.replaceAll("_", " ")}
              </Badge>
            </div>

            {/* Card Body (Service & Progress) */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Compass size={12} className="text-slate-500" />
                <span>Service:</span>
                <span className="font-medium text-slate-300">{project.service}</span>
              </div>

              {/* Mobile Progress Bar */}
              <div className="space-y-1.5 pt-1">
                <div className="flex justify-between items-center text-[10px] font-semibold text-slate-400">
                  <span className="flex items-center gap-1">
                    <Layers size={10} /> Progress Rate
                  </span>
                  <span className="font-mono">{project.progress}%</span>
                </div>
                <div className="w-full bg-[#020612] border border-[#0E204A]/60 rounded-full h-2 overflow-hidden shadow-inner">
                  <div
                    className="bg-gradient-to-r from-[#0066FF] to-[#38BDF8] h-full rounded-full shadow-lg shadow-blue-500/20"
                    style={{
                      width: `${project.progress}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </Card>
        ))}

        {projects.length === 0 && (
          <div className="p-12 text-center text-slate-500 border border-[#0E204A] rounded-xl bg-[#060F24]/30">
            No active client projects available.
          </div>
        )}
      </div>

    </div>
  );
}