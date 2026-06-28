"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useToast } from "@/components/ui/ToastProvider";
import {
  Users,
  Search,
  Building,
  User,
  Phone,
  Mail,
  FileText,
  Trash2,
  Plus,
  Key,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Check,
  Copy,
  ExternalLink,
  ChevronRight,
  X,
  Briefcase,
  Upload,
  Calendar,
  AlertCircle,
  Globe
} from "lucide-react";

interface Project {
  id: string;
  projectName: string;
  status: string;
  progress: number;
}

interface ClientUser {
  id: string;
  email: string;
  active: boolean;
  lastLogin: string | null;
}

interface Document {
  id: string;
  title: string;
  fileUrl: string;
  fileSize: string;
  category: string;
  createdAt: string;
}

interface Client {
  id: string;
  company: string;
  contactPerson: string;
  email: string;
  phone: string;
  website?: string;
  address?: string;
  industry?: string;
  notes?: string;
  projects: Project[];
  clientUsers: ClientUser[];
}

export default function ClientsPage() {
  const { toast } = useToast();
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [activeTab, setActiveTab] = useState<"portal" | "documents" | "projects">("portal");

  // Portal creation form state
  const [portalEmail, setPortalEmail] = useState("");
  const [portalName, setPortalName] = useState("");
  const [tempPassword, setTempPassword] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);

  // Document upload state
  const [docTitle, setDocTitle] = useState("");
  const [docCategory, setDocCategory] = useState("PROPOSAL");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [docsLoading, setDocsLoading] = useState(false);

  // General action processing indicators
  const [submittingPortal, setSubmittingPortal] = useState(false);
  const [togglingPortal, setTogglingPortal] = useState(false);
  const [resettingPassword, setResettingPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function fetchClients() {
    try {
      const res = await fetch("/api/admin/clients");
      const data = await res.json();
      if (data.success) {
        setClients(data.clients);
        // Refresh selected client if open
        if (selectedClient) {
          const updated = data.clients.find((c: Client) => c.id === selectedClient.id);
          if (updated) {
            setSelectedClient(updated);
          }
        }
      }
    } catch (err) {
      console.error("Error fetching clients:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchClients();
  }, []);

  // Fetch documents when selected client changes or documents tab is loaded
  useEffect(() => {
    if (selectedClient && activeTab === "documents") {
      fetchDocuments(selectedClient.id);
    }
  }, [selectedClient?.id, activeTab]);

  async function fetchDocuments(clientId: string) {
    setDocsLoading(true);
    try {
      const res = await fetch(`/api/admin/clients/${clientId}/documents`);
      const data = await res.json();
      if (data.success) {
        setDocuments(data.documents);
      }
    } catch (err) {
      console.error("Error fetching documents:", err);
    } finally {
      setDocsLoading(false);
    }
  }

  const handleOpenClient = (client: Client) => {
    setSelectedClient(client);
    setActiveTab("portal");
    setTempPassword("");
    setErrorMessage("");
    setPortalEmail(client.email);
    setPortalName(client.contactPerson);
    setCopySuccess(false);
  };

  const handleCloseClient = () => {
    setSelectedClient(null);
    setTempPassword("");
    setCopySuccess(false);
  };

  // 1. Enable Portal Access
  const handleEnablePortal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedClient) return;

    setSubmittingPortal(true);
    setErrorMessage("");
    setTempPassword("");

    try {
      const res = await fetch(`/api/admin/clients/${selectedClient.id}/portal`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: portalEmail,
          fullName: portalName,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setTempPassword(data.tempPassword);
        await fetchClients();
      } else {
        setErrorMessage(data.message || "Failed to enable portal");
      }
    } catch (err) {
      setErrorMessage("An error occurred. Please try again.");
    } finally {
      setSubmittingPortal(false);
    }
  };

  // 2. Toggle Portal Status
  const handleTogglePortal = async (active: boolean) => {
    if (!selectedClient) return;

    setTogglingPortal(true);
    setErrorMessage("");

    try {
      const res = await fetch(`/api/admin/clients/${selectedClient.id}/portal`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ active }),
      });

      const data = await res.json();
      if (data.success) {
        await fetchClients();
      } else {
        setErrorMessage(data.message || "Failed to update portal status");
      }
    } catch (err) {
      setErrorMessage("An error occurred. Please try again.");
    } finally {
      setTogglingPortal(false);
    }
  };

  // 3. Reset Password
  const handleResetPassword = async () => {
    if (!selectedClient) return;
    if (!confirm("Are you sure you want to reset the client portal password?")) return;

    setResettingPassword(true);
    setErrorMessage("");
    setTempPassword("");
    setCopySuccess(false);

    try {
      const res = await fetch(`/api/admin/clients/${selectedClient.id}/portal`, {
        method: "PUT",
      });

      const data = await res.json();
      if (data.success) {
        setTempPassword(data.tempPassword);
        await fetchClients();
      } else {
        setErrorMessage(data.message || "Failed to reset password");
      }
    } catch (err) {
      setErrorMessage("An error occurred. Please try again.");
    } finally {
      setResettingPassword(false);
    }
  };

  // 4. Add Document Metadata (Mock Upload)
  const handleAddDocument = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedClient) return;

    if (!docTitle) {
      setErrorMessage("Document Title is required");
      return;
    }

    setDocsLoading(true);
    setErrorMessage("");

    try {
      // Create mock file info if selected, else default mock values
      const fileName = selectedFile ? selectedFile.name : `${docTitle.toLowerCase().replace(/ /g, "_")}.pdf`;
      const rawSize = selectedFile ? selectedFile.size : 1024 * 1024 * 1.5; // 1.5MB default
      const fileSize = rawSize > 1024 * 1024
        ? `${(rawSize / (1024 * 1024)).toFixed(1)} MB`
        : `${(rawSize / 1024).toFixed(0)} KB`;
      const fileUrl = `/uploads/${fileName}`;

      const res = await fetch(`/api/admin/clients/${selectedClient.id}/documents`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: docTitle,
          category: docCategory,
          fileSize,
          fileUrl,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setDocTitle("");
        setSelectedFile(null);
        // Refetch documents
        await fetchDocuments(selectedClient.id);
      } else {
        setErrorMessage(data.message || "Failed to log document");
      }
    } catch (err) {
      setErrorMessage("An error occurred while logging document");
    } finally {
      setDocsLoading(false);
    }
  };

  // 5. Delete Document
  const handleDeleteDocument = async (docId: string) => {
    if (!selectedClient) return;
    if (!confirm("Are you sure you want to delete this document?")) return;

    try {
      const res = await fetch(`/api/admin/documents/${docId}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (data.success) {
        await fetchDocuments(selectedClient.id);
      } else {
        toast.error(data.message || "Failed to delete document");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  // Filter clients list
  const filteredClients = clients.filter((client) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      client.company.toLowerCase().includes(searchLower) ||
      client.contactPerson.toLowerCase().includes(searchLower) ||
      client.email.toLowerCase().includes(searchLower)
    );
  });

  const portalUser = selectedClient?.clientUsers?.[0];

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center text-slate-400 font-medium">
        Loading clients database...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="mb-6 select-none flex justify-between items-center">
        <div>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-slate-100 tracking-tight">
            Client Accounts
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Manage provisioned client accounts, portal permissions, document repositories, and communication channels.
          </p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-[#111827]/40 border border-[#1E293B] p-4 rounded-xl backdrop-blur-sm shadow-xl">
        <div className="relative w-full sm:max-w-xs">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-500">
            <Search size={16} />
          </span>
          <input
            type="text"
            placeholder="Search company, contact..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-[#0B1120]/75 border border-[#1E293B] rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-[#2563EB] transition-all"
          />
        </div>
        <div className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">
          Total Accounts: <span className="text-slate-300 font-bold">{filteredClients.length}</span>
        </div>
      </div>

      {/* Clients Desktop Table */}
      <div className="hidden md:block overflow-hidden rounded-xl border border-[#1E293B] bg-[#111827]/40 backdrop-blur-sm shadow-xl">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-[#1E293B] bg-[#111827]/70 text-xs font-semibold uppercase tracking-wider text-slate-400 select-none">
              <th className="py-4 px-5 font-semibold">Company / Client</th>
              <th className="py-4 px-5 font-semibold">Contact Person</th>
              <th className="py-4 px-5 font-semibold">Email & Phone</th>
              <th className="py-4 px-5 font-semibold">Portal Access</th>
              <th className="py-4 px-5 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1E293B]/50 text-sm">
            {filteredClients.map((client) => {
              const user = client.clientUsers?.[0];
              return (
                <tr
                  key={client.id}
                  onClick={() => handleOpenClient(client)}
                  className="hover:bg-[#1E293B]/20 transition-colors duration-150 cursor-pointer group"
                >
                  <td className="py-3 px-5 font-semibold text-slate-200">
                    <div className="flex items-center gap-2.5">
                      <Building size={16} className="text-blue-400" />
                      <span>{client.company}</span>
                    </div>
                  </td>
                  <td className="py-3 px-5 text-slate-300">{client.contactPerson}</td>
                  <td className="py-3 px-5 text-slate-400">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1.5 text-xs">
                        <Mail size={12} className="text-slate-500" />
                        <span>{client.email}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                        <Phone size={12} className="text-slate-600" />
                        <span>{client.phone}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-5">
                    {user ? (
                      <Badge variant={user.active ? "green" : "red"}>
                        {user.active ? "Enabled" : "Disabled"}
                      </Badge>
                    ) : (
                      <span className="text-xs text-slate-500 font-medium">Not Provisioned</span>
                    )}
                  </td>
                  <td className="py-3 px-5 text-right" onClick={(e) => e.stopPropagation()}>
                    <Button
                      onClick={() => handleOpenClient(client)}
                      variant="secondary"
                      size="sm"
                      className="gap-1 border border-[#1E293B] hover:border-[#2563EB]"
                    >
                      Manage
                      <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filteredClients.length === 0 && (
          <div className="p-12 text-center text-slate-500 font-medium select-none">
            No client records matching search filters.
          </div>
        )}
      </div>

      {/* Mobile Card List */}
      <div className="block md:hidden space-y-4">
        {filteredClients.map((client) => {
          const user = client.clientUsers?.[0];
          return (
            <Card
              key={client.id}
              onClick={() => handleOpenClient(client)}
              className="border border-[#1E293B] bg-[#111827]/50 p-5 rounded-xl cursor-pointer hover:bg-[#1E293B]/20 transition-colors"
            >
              <div className="flex justify-between items-start border-b border-[#1E293B]/60 pb-3 mb-3">
                <div>
                  <h3 className="font-semibold text-slate-200 text-sm flex items-center gap-1.5">
                    <Building size={14} className="text-blue-400" />
                    {client.company}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                    <User size={11} />
                    {client.contactPerson}
                  </p>
                </div>
                {user ? (
                  <Badge variant={user.active ? "green" : "red"}>
                    {user.active ? "Enabled" : "Disabled"}
                  </Badge>
                ) : (
                  <span className="text-[11px] text-slate-500 font-medium bg-[#0B1120]/40 px-2 py-0.5 rounded border border-[#1E293B]/40">
                    Not Provisioned
                  </span>
                )}
              </div>
              <div className="space-y-1.5 text-xs text-slate-400">
                <div className="flex items-center gap-1.5">
                  <Mail size={12} className="text-slate-500" />
                  <span>{client.email}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Phone size={12} className="text-slate-500" />
                  <span>{client.phone}</span>
                </div>
              </div>
            </Card>
          );
        })}
        {filteredClients.length === 0 && (
          <div className="p-8 text-center text-slate-500 border border-[#1E293B] rounded-xl bg-[#111827]/30">
            No client records matching search filters.
          </div>
        )}
      </div>

      {/* Details Side-Over Modal */}
      {selectedClient && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div
            onClick={handleCloseClient}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
          />

          {/* Modal Panel */}
          <div className="relative w-full max-w-2xl bg-[#111827] border-l border-[#1E293B] h-full flex flex-col shadow-2xl z-10 transition-transform duration-300 overflow-hidden">
            {/* Header */}
            <div className="p-6 border-b border-[#1E293B] flex justify-between items-center select-none bg-[#1E293B]/20">
              <div>
                <h3 className="font-display font-bold text-lg text-slate-100 flex items-center gap-2">
                  <Building className="text-blue-500" size={20} />
                  {selectedClient.company}
                </h3>
                <span className="text-xs text-slate-500 font-medium block mt-0.5">
                  Primary Contact: {selectedClient.contactPerson}
                </span>
              </div>
              <button
                onClick={handleCloseClient}
                className="p-1.5 rounded-lg border border-[#1E293B] hover:bg-[#1E293B] text-slate-400 hover:text-slate-200 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Error Message banner */}
            {errorMessage && (
              <div className="mx-6 mt-4 p-3.5 bg-rose-500/10 border border-rose-500/20 text-rose-300 rounded-lg text-xs flex items-center gap-2">
                <AlertCircle size={15} className="flex-shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Tabs */}
            <div className="px-6 border-b border-[#1E293B] flex gap-4 text-xs select-none">
              <button
                onClick={() => { setActiveTab("portal"); setErrorMessage(""); }}
                className={`py-3.5 font-semibold border-b-2 transition-all ${
                  activeTab === "portal"
                    ? "border-[#2563EB] text-[#2563EB]"
                    : "border-transparent text-slate-400 hover:text-slate-200"
                }`}
              >
                Portal Settings
              </button>
              <button
                onClick={() => { setActiveTab("documents"); setErrorMessage(""); }}
                className={`py-3.5 font-semibold border-b-2 transition-all ${
                  activeTab === "documents"
                    ? "border-[#2563EB] text-[#2563EB]"
                    : "border-transparent text-slate-400 hover:text-slate-200"
                }`}
              >
                Documents Register
              </button>
              <button
                onClick={() => { setActiveTab("projects"); setErrorMessage(""); }}
                className={`py-3.5 font-semibold border-b-2 transition-all ${
                  activeTab === "projects"
                    ? "border-[#2563EB] text-[#2563EB]"
                    : "border-transparent text-slate-400 hover:text-slate-200"
                }`}
              >
                Assigned Projects ({selectedClient.projects?.length || 0})
              </button>
            </div>

            {/* Content Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Tab 1: Portal Settings */}
              {activeTab === "portal" && (
                <div className="space-y-6">
                  {/* Temp password panel */}
                  {tempPassword && (
                    <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 rounded-lg text-xs space-y-3">
                      <div className="flex items-center gap-2 font-bold text-emerald-400">
                        <Check size={16} />
                        <span>Portal Credentials Created Successfully!</span>
                      </div>
                      <p className="text-[11px] text-emerald-300/80">
                        Please copy the temporary login credentials below. For security, this password will NOT be shown again.
                      </p>
                      
                      <div className="bg-[#0B1120] p-4 rounded-lg border border-[#1E293B] space-y-2.5 font-mono text-slate-200">
                        <div className="flex justify-between items-center pb-1.5 border-b border-[#1E293B]/60">
                          <span><span className="text-slate-500">Email:</span> {portalEmail}</span>
                        </div>
                        <div className="flex justify-between items-center pb-1.5 border-b border-[#1E293B]/60">
                          <span><span className="text-slate-500">Temp Password:</span> {tempPassword}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span><span className="text-slate-500">Portal Status:</span> <span className="text-emerald-400 font-bold">ACTIVE</span></span>
                          <button
                            type="button"
                            onClick={() => copyToClipboard(`Email: ${portalEmail}\nPassword: ${tempPassword}`)}
                            className="flex items-center gap-1.5 px-2.5 py-1 bg-[#1E293B] hover:bg-[#142D66] border border-[#1E293B] hover:border-[#1F4599] rounded text-[11px] text-slate-300 font-semibold transition-all"
                            title="Copy Credentials"
                          >
                            {copySuccess ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                            <span>{copySuccess ? "Copied" : "Copy Credentials"}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {!portalUser ? (
                    /* Provision Access Form */
                    <div className="space-y-4">
                      <div className="space-y-1">
                        <h4 className="text-slate-200 text-sm font-semibold flex items-center gap-1.5">
                          <Shield size={16} className="text-blue-500" />
                          Provision Client Portal Access
                        </h4>
                        <p className="text-xs text-slate-500">
                          Grant the client a separate, authenticated workspace to download documents and monitor projects.
                        </p>
                      </div>

                      <form onSubmit={handleEnablePortal} className="space-y-4 pt-2">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                              Full Name
                            </label>
                            <Input
                              type="text"
                              value={portalName}
                              onChange={(e) => setPortalName(e.target.value)}
                              required
                              className="text-xs"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                              Login Email
                            </label>
                            <Input
                              type="email"
                              value={portalEmail}
                              onChange={(e) => setPortalEmail(e.target.value)}
                              required
                              className="text-xs"
                            />
                          </div>
                        </div>

                        <Button
                          type="submit"
                          disabled={submittingPortal}
                          className="w-full text-xs py-2 bg-[#2563EB] hover:bg-[#3B82F6] font-semibold"
                        >
                          {submittingPortal ? "Enabling..." : "Generate Portal Credentials"}
                        </Button>
                      </form>
                    </div>
                  ) : (
                    /* Manage Active Access */
                    <div className="space-y-5">
                      <div className="flex justify-between items-start bg-[#1E293B]/20 border border-[#1E293B] p-4.5 rounded-xl">
                        <div className="space-y-1.5">
                          <h4 className="text-sm font-bold text-slate-200 flex items-center gap-2">
                            {portalUser.active ? (
                              <ShieldCheck size={18} className="text-emerald-500" />
                            ) : (
                              <ShieldAlert size={18} className="text-rose-500" />
                            )}
                            Portal Authorization: {portalUser.active ? "Active" : "Suspended"}
                          </h4>
                          <div className="text-xs space-y-1 text-slate-400">
                            <div>
                              Email Account: <span className="font-mono text-slate-200">{portalUser.email}</span>
                            </div>
                            {portalUser.lastLogin ? (
                              <div>
                                Last Session:{" "}
                                <span className="font-medium text-slate-300">
                                  {new Date(portalUser.lastLogin).toLocaleString()}
                                </span>
                              </div>
                            ) : (
                              <div className="text-slate-500 italic">User has not logged in yet.</div>
                            )}
                          </div>
                        </div>

                        <Badge variant={portalUser.active ? "green" : "red"}>
                          {portalUser.active ? "Access Enabled" : "Access Disabled"}
                        </Badge>
                      </div>

                      {/* Controls Grid */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-[#111827]/50 border border-[#1E293B] p-4 rounded-xl flex flex-col justify-between gap-3">
                          <div>
                            <h5 className="text-xs font-bold text-slate-200">Toggle Account Access</h5>
                            <p className="text-[10.5px] text-slate-500 mt-1">
                              Disable portal access immediately without deleting client data logs.
                            </p>
                          </div>
                          <Button
                            onClick={() => handleTogglePortal(!portalUser.active)}
                            disabled={togglingPortal}
                            variant={portalUser.active ? "danger" : "secondary"}
                            size="sm"
                            className="w-full text-xs font-semibold"
                          >
                            {togglingPortal
                              ? "Processing..."
                              : portalUser.active
                              ? "Disable Access"
                              : "Enable Access"}
                          </Button>
                        </div>

                        <div className="bg-[#111827]/50 border border-[#1E293B] p-4 rounded-xl flex flex-col justify-between gap-3">
                          <div>
                            <h5 className="text-xs font-bold text-slate-200">Reset Credentials</h5>
                            <p className="text-[10.5px] text-slate-500 mt-1">
                              Force a credentials overwrite and obtain a new temp password.
                            </p>
                          </div>
                          <Button
                            onClick={handleResetPassword}
                            disabled={resettingPassword}
                            variant="secondary"
                            size="sm"
                            className="w-full text-xs font-semibold gap-1.5 border border-[#1E293B] hover:border-[#2563EB]"
                          >
                            <Key size={14} className="text-amber-500" />
                            {resettingPassword ? "Resetting..." : "Reset Password"}
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Tab 2: Documents Register */}
              {activeTab === "documents" && (
                <div className="space-y-6">
                  {/* Upload Form */}
                  <div className="bg-[#111827]/60 border border-[#1E293B] p-4.5 rounded-xl space-y-4">
                    <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                      <Upload size={14} className="text-blue-500" />
                      Add Document to Repository
                    </h4>

                    <form onSubmit={handleAddDocument} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5 col-span-2 sm:col-span-1">
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                            Document Title
                          </label>
                          <Input
                            type="text"
                            placeholder="e.g. System Architecture Design"
                            value={docTitle}
                            onChange={(e) => setDocTitle(e.target.value)}
                            required
                            className="text-xs bg-[#0B1120]/70 border-[#1E293B] text-slate-200"
                          />
                        </div>
                        <div className="space-y-1.5 col-span-2 sm:col-span-1">
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                            Category
                          </label>
                          <select
                            value={docCategory}
                            onChange={(e) => setDocCategory(e.target.value)}
                            className="w-full bg-[#0B1120]/75 border border-[#1E293B] rounded-lg px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-[#2563EB] transition-all"
                          >
                            <option value="PROPOSAL">PROPOSAL</option>
                            <option value="AGREEMENT">AGREEMENT</option>
                            <option value="INVOICE">INVOICE</option>
                            <option value="REQUIREMENTS">REQUIREMENTS</option>
                            <option value="SRS">SRS</option>
                            <option value="DEPLOYMENT">DEPLOYMENT</option>
                            <option value="OTHER">OTHER</option>
                          </select>
                        </div>
                      </div>

                      {/* Mock File Selection */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                          File Attachment (Local Mock)
                        </label>
                        <div className="flex items-center gap-3">
                          <label className="flex items-center gap-2 px-4 py-2 border border-[#1E293B] bg-[#0B1120] hover:bg-[#1E293B]/20 rounded-lg text-xs font-semibold text-slate-300 cursor-pointer transition-all">
                            <Upload size={14} className="text-slate-400" />
                            Choose File
                            <input
                              type="file"
                              onChange={(e) => {
                                if (e.target.files && e.target.files[0]) {
                                  setSelectedFile(e.target.files[0]);
                                  if (!docTitle) {
                                    // Autofill title with file basename without ext
                                    const name = e.target.files[0].name.split(".")[0];
                                    setDocTitle(name.replace(/[-_]/g, " "));
                                  }
                                }
                              }}
                              className="hidden"
                            />
                          </label>
                          <span className="text-xs text-slate-500 font-medium truncate max-w-xs">
                            {selectedFile ? selectedFile.name : "No file chosen (will simulate)"}
                          </span>
                        </div>
                      </div>

                      <Button
                        type="submit"
                        disabled={docsLoading}
                        className="w-full text-xs font-semibold py-2 bg-[#2563EB] hover:bg-[#3B82F6]"
                      >
                        {docsLoading ? "Uploading..." : "Save and Register Document"}
                      </Button>
                    </form>
                  </div>

                  {/* Registered Documents List */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Document Archive
                    </h4>

                    {docsLoading && documents.length === 0 ? (
                      <div className="text-center p-6 text-xs text-slate-500">Loading documents...</div>
                    ) : documents.length === 0 ? (
                      <div className="text-center p-8 border border-dashed border-[#1E293B] rounded-xl text-xs text-slate-500 italic">
                        No documents uploaded for this client yet.
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {documents.map((doc) => (
                          <div
                            key={doc.id}
                            className="flex justify-between items-center bg-[#111827]/50 border border-[#1E293B]/60 p-3.5 rounded-xl"
                          >
                            <div className="flex gap-3 items-center min-w-0">
                              <div className="w-9 h-9 rounded-lg bg-[#1E293B]/50 border border-[#1E293B] flex items-center justify-center flex-shrink-0">
                                <FileText size={16} className="text-blue-400" />
                              </div>
                              <div className="min-w-0">
                                <h5 className="text-xs font-bold text-slate-200 truncate">{doc.title}</h5>
                                <div className="flex items-center gap-2 mt-1 text-[10px] text-slate-500 font-semibold uppercase">
                                  <Badge variant="blue" className="text-[9px] px-1 py-0 shadow-none">
                                    {doc.category}
                                  </Badge>
                                  <span>{doc.fileSize}</span>
                                  <span>•</span>
                                  <span>{new Date(doc.createdAt).toLocaleDateString()}</span>
                                </div>
                              </div>
                            </div>

                            <div className="flex gap-1.5 items-center">
                              <a
                                href={doc.fileUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="p-1.5 border border-[#1E293B] hover:bg-[#1E293B] rounded-lg text-slate-400 hover:text-slate-200 transition-all"
                                title="View/Download Document"
                              >
                                <ExternalLink size={14} />
                              </a>
                              <button
                                onClick={() => handleDeleteDocument(doc.id)}
                                className="p-1.5 border border-rose-950 hover:bg-rose-950/40 rounded-lg text-rose-500 hover:text-rose-400 transition-all"
                                title="Delete Document"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Tab 3: Assigned Projects */}
              {activeTab === "projects" && (
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Client Solutions
                  </h4>

                  {selectedClient.projects?.length === 0 ? (
                    <div className="text-center p-8 border border-dashed border-[#1E293B] rounded-xl text-xs text-slate-500 italic">
                      No active projects are linked to this client entity.
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {selectedClient.projects?.map((proj) => (
                        <div
                          key={proj.id}
                          className="bg-[#111827]/50 border border-[#1E293B] p-4.5 rounded-xl space-y-3.5"
                        >
                          <div className="flex justify-between items-center">
                            <h5 className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                              <Briefcase size={14} className="text-blue-500" />
                              {proj.projectName}
                            </h5>
                            <Badge variant={proj.status === "COMPLETED" ? "green" : "blue"}>
                              {proj.status.replaceAll("_", " ")}
                            </Badge>
                          </div>

                          {/* Progress Rate */}
                          <div className="space-y-1.5">
                            <div className="flex justify-between items-center text-[10px] font-semibold text-slate-400">
                              <span>Work Completion Rate</span>
                              <span className="font-mono text-slate-200">{proj.progress}%</span>
                            </div>
                            <div className="w-full bg-[#0B1120] border border-[#1E293B]/60 rounded-full h-2 overflow-hidden shadow-inner">
                              <div
                                className="bg-gradient-to-r from-[#2563EB] to-[#38BDF8] h-full rounded-full shadow-lg shadow-blue-500/20"
                                style={{
                                  width: `${proj.progress}%`,
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
