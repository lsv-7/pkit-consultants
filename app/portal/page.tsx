"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  Briefcase,
  FileText,
  Clock,
  UserCheck,
  Calendar,
  Layers,
  TrendingUp,
  FileCheck2,
  PhoneCall,
  Mail,
} from "lucide-react";
import { COMPANY, getAddressLine } from "@/lib/company";

interface Project {
  id: string;
  projectName: string;
  service: string;
  status: string;
  progress: number;
}

interface Document {
  id: string;
  title: string;
  category: string;
  createdAt: string;
}

interface ClientUser {
  fullName: string;
  client: {
    company: string;
  };
}

export default function PortalDashboard() {
  const [profile, setProfile] = useState<ClientUser | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [profileRes, projectsRes, docsRes] = await Promise.all([
          fetch("/api/portal/profile"),
          fetch("/api/portal/projects"),
          fetch("/api/portal/documents"),
        ]);

        const profileData = await profileRes.json();
        const projectsData = await projectsRes.json();
        const docsData = await docsRes.json();

        if (profileData.success) setProfile(profileData.clientUser);
        if (projectsData.success) setProjects(projectsData.projects);
        if (docsData.success) setDocuments(docsData.documents);
      } catch (err) {
        console.error("Error loading dashboard data:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center text-slate-400 font-medium">
        Loading workspace dashboard...
      </div>
    );
  }

  const activeProjects = projects.filter(p => p.status !== "COMPLETED");
  const completedProjectsCount = projects.filter(p => p.status === "COMPLETED").length;

  return (
    <div className="space-y-8 select-none">
      
      {/* Welcome Header */}
      <div>
        <h2 className="font-display text-2xl md:text-3xl font-bold text-slate-100 tracking-tight">
          Welcome back, {profile?.fullName || "Client"}
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Monitor your projects, access deliverables, and connect with your engineering team.
        </p>
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Projects */}
        <Card className="border border-[#0E204A] bg-[#060F24]/50 p-5 rounded-xl flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Total Projects</span>
            <span className="text-2xl font-bold text-slate-100">{projects.length}</span>
          </div>
          <div className="w-10 h-10 rounded-lg bg-[#0C1A3D] border border-[#142D66] flex items-center justify-center text-blue-400">
            <Briefcase size={18} />
          </div>
        </Card>

        {/* Active Solutions */}
        <Card className="border border-[#0E204A] bg-[#060F24]/50 p-5 rounded-xl flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">In Progress</span>
            <span className="text-2xl font-bold text-slate-100">{activeProjects.length}</span>
          </div>
          <div className="w-10 h-10 rounded-lg bg-[#0C1A3D] border border-[#142D66] flex items-center justify-center text-sky-400">
            <TrendingUp size={18} />
          </div>
        </Card>

        {/* Completed Deliverables */}
        <Card className="border border-[#0E204A] bg-[#060F24]/50 p-5 rounded-xl flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Completed</span>
            <span className="text-2xl font-bold text-slate-100">{completedProjectsCount}</span>
          </div>
          <div className="w-10 h-10 rounded-lg bg-[#0C1A3D] border border-[#142D66] flex items-center justify-center text-emerald-400">
            <FileCheck2 size={18} />
          </div>
        </Card>

        {/* Secure Documents */}
        <Card className="border border-[#0E204A] bg-[#060F24]/50 p-5 rounded-xl flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Documents</span>
            <span className="text-2xl font-bold text-slate-100">{documents.length}</span>
          </div>
          <div className="w-10 h-10 rounded-lg bg-[#0C1A3D] border border-[#142D66] flex items-center justify-center text-purple-400">
            <FileText size={18} />
          </div>
        </Card>
      </div>

      {/* Main Grid: Projects & PM card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Active Projects progress */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Solutions</h3>
          
          {activeProjects.length === 0 ? (
            <Card className="border border-[#0E204A] bg-[#060F24]/30 p-8 rounded-xl text-center text-slate-500 text-xs italic">
              No solutions are currently active. All projects completed or pending scheduling.
            </Card>
          ) : (
            <div className="space-y-4">
              {activeProjects.slice(0, 3).map(project => (
                <Card key={project.id} className="border border-[#0E204A] bg-[#060F24]/50 p-5 rounded-xl space-y-4" hoverEffect>
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold text-slate-200 text-sm">{project.projectName}</h4>
                      <span className="text-[10px] text-slate-500 font-semibold uppercase block mt-0.5">{project.service}</span>
                    </div>
                    <Badge variant="blue">{project.status.replaceAll("_", " ")}</Badge>
                  </div>

                  {/* Progress rate slider */}
                  <div className="space-y-1.5 pt-1">
                    <div className="flex justify-between items-center text-[10px] font-semibold text-slate-400">
                      <span className="flex items-center gap-1"><Layers size={10} /> Progress Rate</span>
                      <span className="font-mono text-slate-200">{project.progress}%</span>
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
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Project Manager Details & Upcoming meetings */}
        <div className="space-y-6">
          {/* PM Card */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">PKIT Support</h3>
            <Card className="border border-[#0E204A] bg-[#060F24]/50 p-5 rounded-xl space-y-4">
              <div className="flex items-center gap-3.5 pb-2 border-b border-[#0E204A]/60">
                <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#0066FF] to-[#38BDF8] flex items-center justify-center text-sm font-bold text-white shadow-md shadow-blue-500/10">
                  PK
                </div>
                <div>
                  <h4 className="font-bold text-slate-200 text-sm">{COMPANY.name}</h4>
                  <span className="text-[10.5px] text-slate-500 font-semibold block uppercase">Client Delivery Team</span>
                </div>
              </div>

              <div className="text-xs space-y-2 text-slate-400">
                <div className="flex items-center gap-2">
                  <Clock size={13} className="text-slate-500" />
                  <span>{COMPANY.workingHours}</span>
                </div>
                <div className="flex items-center gap-2">
                  <UserCheck size={13} className="text-slate-500" />
                  <span>{getAddressLine()}</span>
                </div>
              </div>

              <a href={`mailto:${COMPANY.email}`} className="block">
                <Button variant="secondary" size="sm" className="w-full text-xs font-semibold gap-1.5 border border-[#0E204A] hover:border-[#142D66] justify-center">
                  <Mail size={13} />
                  Email {COMPANY.name}
                </Button>
              </a>
              <a href={`tel:${COMPANY.phone.replace(/\s+/g, "")}`} className="block">
                <Button variant="secondary" size="sm" className="w-full text-xs font-semibold gap-1.5 border border-[#0E204A] hover:border-[#142D66] justify-center">
                  <PhoneCall size={13} />
                  Call {COMPANY.phone}
                </Button>
              </a>
            </Card>
          </div>

          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Upcoming Interactions</h3>
            <Card className="border border-[#0E204A] bg-[#060F24]/30 p-5 rounded-xl text-center text-slate-500 text-xs">
              <Calendar size={16} className="mx-auto mb-2 text-slate-600" />
              No scheduled meetings yet. Your project manager will share calendar invites here when sessions are booked.
            </Card>
          </div>

        </div>

      </div>

    </div>
  );
}
