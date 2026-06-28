"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { FolderGit, User, Compass, Layers, Edit2, X, Search, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/ToastProvider";

interface Project {
  id: string;
  projectName: string;
  clientName: string;
  email: string;
  phone: string;
  company: string | null;
  service: string;
  status: string;
  description: string | null;
  progress: number;
  createdAt: any;
}

interface ProjectsClientProps {
  initialProjects: Project[];
}

export default function ProjectsClient({ initialProjects }: ProjectsClientProps) {
  const router = useRouter();
  const { toast } = useToast();
  
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [search, setSearch] = useState("");
  
  // Modal states
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editName, setEditName] = useState("");
  const [editStatus, setEditStatus] = useState("");
  const [editProgress, setEditProgress] = useState(0);
  const [saving, setSaving] = useState(false);

  const filteredProjects = projects.filter((p) => {
    const term = search.toLowerCase();
    return (
      p.projectName.toLowerCase().includes(term) ||
      p.clientName.toLowerCase().includes(term) ||
      (p.company || "").toLowerCase().includes(term) ||
      p.service.toLowerCase().includes(term)
    );
  });

  const openEditModal = (project: Project) => {
    setEditingProject(project);
    setEditName(project.projectName);
    setEditStatus(project.status);
    setEditProgress(project.progress);
  };

  const closeEditModal = () => {
    setEditingProject(null);
  };

  const handleUpdateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;

    try {
      setSaving(true);
      const res = await fetch(`/api/projects/${editingProject.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectName: editName,
          status: editStatus,
          progress: editProgress,
        }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Project updated and client notified.");
        
        // Update local state
        setProjects((prev) =>
          prev.map((p) => (p.id === editingProject.id ? { ...p, projectName: editName, status: editStatus, progress: editProgress } : p))
        );
        closeEditModal();
        router.refresh();
      } else {
        toast.error(data.message || "Failed to update project");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred during save");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Search and Filters Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between select-none">
        <div className="relative w-full sm:max-w-xs">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500 pointer-events-none">
            <Search size={14} />
          </span>
          <input
            type="text"
            placeholder="Search projects or clients..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#0B1120]/75 border border-[#1E293B] rounded-lg pl-9 pr-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-[#2563EB]"
          />
        </div>
        <p className="text-[11px] text-slate-500 font-medium">
          Showing {filteredProjects.length} of {projects.length} projects
        </p>
      </div>

      {/* 1. DESKTOP/TABLET TABLE VIEW */}
      <div className="hidden md:block overflow-hidden rounded-xl border border-[#1E293B] bg-[#111827]/40 backdrop-blur-sm shadow-xl shadow-black/10">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-[#1E293B] bg-[#111827]/70 text-xs font-semibold uppercase tracking-wider text-slate-400 select-none">
                <th className="py-4 px-5 font-semibold">Project Name</th>
                <th className="py-4 px-5 font-semibold">Client</th>
                <th className="py-4 px-5 font-semibold">Service</th>
                <th className="py-4 px-5 font-semibold">Status</th>
                <th className="py-4 px-5 font-semibold text-center">Progress</th>
                <th className="py-4 px-5 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1E293B]/50 text-sm">
              {filteredProjects.map((project) => (
                <tr key={project.id} className="hover:bg-[#1E293B]/20 transition-colors duration-150">
                  <td className="py-3 px-5 font-semibold text-slate-200">{project.projectName}</td>
                  <td className="py-3 px-5 text-slate-400">
                    <div className="font-semibold text-slate-300">{project.clientName}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">{project.company || "Individual"}</div>
                  </td>
                  <td className="py-3 px-5 text-slate-400">{project.service}</td>
                  <td className="py-3 px-5">
                    <Badge variant={project.status === "COMPLETED" ? "green" : "blue"}>
                      {project.status.replaceAll("_", " ")}
                    </Badge>
                  </td>
                  <td className="py-3 px-5">
                    <div className="flex items-center justify-center gap-3">
                      <div className="w-24 bg-[#0B1120] border border-[#1E293B] rounded-full h-1.5 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-[#2563EB] to-[#38BDF8] h-full rounded-full"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                      <span className="font-mono text-xs font-semibold text-slate-300 w-8 text-right">
                        {project.progress}%
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-5 text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openEditModal(project)}
                      className="text-slate-400 hover:text-slate-200 hover:bg-[#1E293B] h-8 w-8 p-0"
                    >
                      <Edit2 size={13} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredProjects.length === 0 && (
          <div className="p-12 text-center text-slate-500 font-medium select-none">
            No active client projects matched your search.
          </div>
        )}
      </div>

      {/* 2. MOBILE CARD LIST VIEW */}
      <div className="block md:hidden space-y-4">
        {filteredProjects.map((project) => (
          <Card key={project.id} className="border border-[#1E293B] bg-[#111827]/50 p-5 rounded-xl flex flex-col gap-4" hoverEffect>
            <div className="flex justify-between items-start border-b border-[#1E293B]/60 pb-3">
              <div>
                <h3 className="font-semibold text-slate-200 text-sm flex items-center gap-1.5">
                  <FolderGit size={14} className="text-blue-400" />
                  {project.projectName}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Client: {project.clientName} ({project.company || "Individual"})
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => openEditModal(project)}
                className="text-slate-400 hover:text-slate-200 hover:bg-[#1E293B] h-8 w-8 p-0"
              >
                <Edit2 size={13} />
              </Button>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs text-slate-400">
                <span className="flex items-center gap-1"><Compass size={12} /> Service:</span>
                <span className="font-medium text-slate-300">{project.service}</span>
              </div>

              <div className="flex justify-between items-center text-xs text-slate-400">
                <span>Status:</span>
                <Badge variant={project.status === "COMPLETED" ? "green" : "blue"}>
                  {project.status.replaceAll("_", " ")}
                </Badge>
              </div>

              <div className="space-y-1.5 pt-1">
                <div className="flex justify-between items-center text-[10px] font-semibold text-slate-400">
                  <span className="flex items-center gap-1"><Layers size={10} /> Progress Rate</span>
                  <span className="font-mono">{project.progress}%</span>
                </div>
                <div className="w-full bg-[#0B1120] border border-[#1E293B]/60 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-[#2563EB] to-[#38BDF8] h-full rounded-full"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>
            </div>
          </Card>
        ))}

        {filteredProjects.length === 0 && (
          <div className="p-12 text-center text-slate-500 border border-[#1E293B] rounded-xl bg-[#111827]/30">
            No active client projects matched your search.
          </div>
        )}
      </div>

      {/* Edit Project Status Modal */}
      {editingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-[#111827] border border-[#1E293B] rounded-xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center bg-[#1E293B]/20 border-b border-[#1E293B]/70 px-5 py-4 select-none">
              <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">Update Project Status</h3>
              <button onClick={closeEditModal} className="text-slate-400 hover:text-slate-200 transition-colors">
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleUpdateProject} className="p-5 space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Project Name</label>
                <input
                  type="text"
                  required
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full bg-[#0B1120]/75 border border-[#1E293B] rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-[#2563EB]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Project Status</label>
                <select
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value)}
                  className="w-full bg-[#0B1120]/75 border border-[#1E293B] rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-[#2563EB]"
                >
                  <option value="PLANNING">Planning</option>
                  <option value="DESIGN">Design</option>
                  <option value="DEVELOPMENT">Development</option>
                  <option value="TESTING">Testing</option>
                  <option value="DEPLOYMENT">Deployment</option>
                  <option value="COMPLETED">Completed</option>
                  <option value="MAINTENANCE">Maintenance</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  <span>Progress Rate</span>
                  <span className="font-mono text-xs font-semibold text-slate-300">{editProgress}%</span>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={editProgress}
                    onChange={(e) => setEditProgress(parseInt(e.target.value) || 0)}
                    className="w-full h-1.5 bg-[#0B1120] border border-[#1E293B]/60 rounded-lg appearance-none cursor-pointer accent-[#2563EB]"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2.5">
                <Button type="button" variant="secondary" size="sm" onClick={closeEditModal} disabled={saving} className="h-9">
                  Cancel
                </Button>
                <Button type="submit" variant="indigo" size="sm" disabled={saving} className="gap-1 h-9">
                  {saving ? (
                    <>
                      <Loader2 size={13} className="animate-spin" /> Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
