"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { FolderGit, Compass, Calendar, Layers, Clock } from "lucide-react";

interface Project {
  id: string;
  projectName: string;
  service: string;
  status: string;
  description: string | null;
  progress: number;
  createdAt: string;
}

export default function PortalProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch("/api/portal/projects");
        const data = await res.json();
        if (data.success) {
          setProjects(data.projects);
        }
      } catch (err) {
        console.error("Error fetching projects:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center text-slate-400 font-medium">
        Loading projects list...
      </div>
    );
  }

  // Helper to generate mock tech badges based on project service
  const getTechBadges = (service: string) => {
    const s = service.toLowerCase();
    if (s.includes("ai") || s.includes("intelligence")) {
      return ["Python", "PyTorch", "OpenAI API", "Vector DB"];
    }
    if (s.includes("web") || s.includes("software") || s.includes("app")) {
      return ["React", "Next.js", "TypeScript", "Node.js"];
    }
    if (s.includes("cloud") || s.includes("devops") || s.includes("infrastructure")) {
      return ["AWS", "Terraform", "Docker", "Kubernetes"];
    }
    if (s.includes("cybersecurity") || s.includes("security") || s.includes("audit")) {
      return ["ISO 27001", "WAF", "IAM", "SOC 2"];
    }
    return ["Enterprise Suite", "Custom Arch"];
  };

  // Helper to calculate expected timeline
  const getExpectedDelivery = (createdAtStr: string) => {
    const date = new Date(createdAtStr);
    date.setMonth(date.getMonth() + 3); // Assume 3-month cycle
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="mb-6 select-none">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-slate-100 tracking-tight">
          Linked Solutions
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Review execution phases, development status, and milestones for your contracted systems.
        </p>
      </div>

      {/* Grid of Projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="border border-[#0E204A] bg-[#060F24]/50 p-6 rounded-xl flex flex-col justify-between gap-5 relative overflow-hidden" hoverEffect>
            
            {/* Top header part */}
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <div className="flex gap-2.5 items-center">
                  <div className="w-9 h-9 rounded-lg bg-[#0C1A3D] border border-[#142D66] flex items-center justify-center text-blue-400">
                    <FolderGit size={18} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-200 text-sm leading-none">{project.projectName}</h3>
                    <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider block mt-1.5">{project.service}</span>
                  </div>
                </div>
                <Badge variant={project.status === "COMPLETED" ? "green" : "blue"}>
                  {project.status.replaceAll("_", " ")}
                </Badge>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-400 leading-relaxed min-h-[40px]">
                {project.description || "Engineering integration of modular enterprise components tailored for maximum performance and elasticity."}
              </p>
            </div>

            {/* Badges and metadata */}
            <div className="space-y-4 pt-2 border-t border-[#0E204A]/60">
              
              {/* Tech Stack */}
              <div className="flex flex-wrap gap-1.5">
                {getTechBadges(project.service).map((tech) => (
                  <span key={tech} className="text-[9.5px] bg-[#020612] border border-[#0E204A]/60 px-2 py-0.5 rounded text-slate-400 font-medium">
                    {tech}
                  </span>
                ))}
              </div>

              {/* Progress Slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-[10px] font-semibold text-slate-500">
                  <span className="flex items-center gap-1"><Layers size={10} /> Progress Rate</span>
                  <span className="font-mono text-slate-300">{project.progress}%</span>
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

              {/* Timeline Metadata */}
              <div className="flex justify-between items-center text-[10.5px] text-slate-500 font-medium pt-1">
                <div className="flex items-center gap-1.5">
                  <Calendar size={12} />
                  <span>Delivery: {getExpectedDelivery(project.createdAt)}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock size={12} />
                  <span>Began: {new Date(project.createdAt).toLocaleDateString()}</span>
                </div>
              </div>

            </div>

          </Card>
        ))}

        {projects.length === 0 && (
          <div className="col-span-2 p-12 text-center text-slate-500 border border-dashed border-[#0E204A] rounded-xl bg-[#060F24]/30 font-medium select-none italic">
            No projects have been provisioned on this client user profile yet.
          </div>
        )}
      </div>

    </div>
  );
}
