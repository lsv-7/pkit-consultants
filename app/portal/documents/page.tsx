"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { FileText, Download, Calendar, HardDrive, ExternalLink } from "lucide-react";

interface Document {
  id: string;
  title: string;
  fileUrl: string;
  fileSize: string;
  category: string;
  createdAt: string;
}

export default function PortalDocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDocs() {
      try {
        const res = await fetch("/api/portal/documents");
        const data = await res.json();
        if (data.success) {
          setDocuments(data.documents);
        }
      } catch (err) {
        console.error("Error fetching documents:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchDocs();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center text-slate-400 font-medium">
        Loading document archive...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="mb-6 select-none">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-slate-100 tracking-tight">
          Secure Documents
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Access signed agreements, project proposals, specifications, and deployment records securely.
        </p>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {documents.map((doc) => (
          <Card key={doc.id} className="border border-[#0E204A] bg-[#060F24]/50 p-5 rounded-xl flex flex-col justify-between gap-4" hoverEffect>
            
            <div className="flex gap-3.5 items-start">
              {/* File Icon */}
              <div className="w-10 h-10 rounded-lg bg-[#0C1A3D] border border-[#142D66] flex items-center justify-center text-blue-400 flex-shrink-0">
                <FileText size={20} />
              </div>
              
              <div className="min-w-0 space-y-1">
                <h4 className="font-bold text-slate-200 text-xs leading-snug truncate" title={doc.title}>
                  {doc.title}
                </h4>
                
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="blue" className="text-[9px] px-1 py-0 shadow-none uppercase font-mono">
                    {doc.category}
                  </Badge>
                  <span className="text-[10px] text-slate-500 font-semibold">{doc.fileSize}</span>
                </div>
              </div>
            </div>

            {/* Actions Part */}
            <div className="flex justify-between items-center pt-3 border-t border-[#0E204A]/60 text-[10px] text-slate-500 font-medium">
              <div className="flex items-center gap-1">
                <Calendar size={11} />
                <span>Uploaded {new Date(doc.createdAt).toLocaleDateString()}</span>
              </div>

              <a
                href={doc.fileUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 border border-[#0E204A] hover:bg-[#0C1A3D] rounded-lg text-slate-300 hover:text-white transition-all text-xs font-semibold"
              >
                <Download size={12} />
                <span>Download</span>
              </a>
            </div>

          </Card>
        ))}

        {documents.length === 0 && (
          <div className="col-span-full p-12 text-center text-slate-500 border border-dashed border-[#0E204A] rounded-xl bg-[#060F24]/30 font-medium select-none italic">
            No files or deliverables have been registered in your document repository.
          </div>
        )}
      </div>

    </div>
  );
}
