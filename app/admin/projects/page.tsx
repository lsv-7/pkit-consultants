import { prisma } from "@/lib/prisma";

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-4xl font-bold">
          Projects
        </h1>

        <p className="text-slate-400 mt-2">
          Manage all active client projects.
        </p>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-800">
        <table className="w-full">

          <thead className="bg-slate-900">
            <tr>
              <th className="text-left p-4">Project</th>
              <th className="text-left p-4">Client</th>
              <th className="text-left p-4">Service</th>
              <th className="text-left p-4">Status</th>
              <th className="text-left p-4">Progress</th>
            </tr>
          </thead>

          <tbody>

            {projects.map((project) => (

              <tr
                key={project.id}
                className="border-t border-slate-800 hover:bg-slate-900"
              >
                <td className="p-4 font-medium">
                  {project.projectName}
                </td>

                <td className="p-4">
                  {project.clientName}
                </td>

                <td className="p-4">
                  {project.service}
                </td>

                <td className="p-4">
                  {project.status}
                </td>

                <td className="p-4">

                  <div className="w-40 bg-slate-700 rounded-full h-3">

                    <div
                      className="bg-blue-600 h-3 rounded-full"
                      style={{
                        width: `${project.progress}%`,
                      }}
                    />

                  </div>

                  <span className="text-sm text-slate-400">
                    {project.progress}%
                  </span>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

        {projects.length === 0 && (
          <div className="p-10 text-center text-slate-400">
            No projects available.
          </div>
        )}

      </div>

    </div>
  );
}