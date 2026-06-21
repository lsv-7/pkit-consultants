import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-slate-900 border-r border-slate-800">

      <div className="p-6 border-b border-slate-800">
        <h1 className="text-2xl font-bold text-white">
          PKIT Admin
        </h1>

        <p className="text-slate-400 text-sm mt-1">
          CRM Dashboard
        </p>
      </div>

      <nav className="flex flex-col p-4 gap-2">

        <Link
          href="/admin"
          className="p-3 rounded-lg hover:bg-slate-800"
        >
          Dashboard
        </Link>

        <Link
          href="/admin/leads"
          className="p-3 rounded-lg hover:bg-slate-800"
        >
          Leads
        </Link>

        <Link
          href="/admin/projects"
          className="p-3 rounded-lg hover:bg-slate-800"
        >
          Projects
        </Link>

        <Link
          href="/admin/clients"
          className="p-3 rounded-lg hover:bg-slate-800"
        >
          Clients
        </Link>

        <Link
          href="/admin/settings"
          className="p-3 rounded-lg hover:bg-slate-800"
        >
          Settings
        </Link>

      </nav>

    </aside>
  );
}