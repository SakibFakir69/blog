// app/projects/page.tsx
import React from "react";
import Link from "next/link";
import { cookies } from "next/headers";
import DeleteButton from "./_components/DeleteButton";

export const revalidate = 60; // ISR

interface Project {
  id: string;
  title: string;
  description?: string;
  image?: string;
  githubUrl?: string;
  liveUrl?: string;
  techStack: string[];
  status?: string;
  createdAt: string;
  updatedAt: string;
}

const fetchProjects = async (): Promise<Project[]> => {
  const cookieStore = cookies();
  const allCookies = cookieStore.getAll();
  const cookieString = allCookies.map(c => `${c.name}=${c.value}`).join("; ");

  const res = await fetch("http://localhost:5000/api/v1/project/all-project", {
    headers: {
      "Content-Type": "application/json",
      ...(cookieString && { Cookie: cookieString }),
    },
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    console.error("Failed to fetch projects:", res.status);
    return [];
  }

  const data = await res.json();
  return data.data || [];
};

export default async function ProjectsPage() {
  const allProjects = await fetchProjects();

  // Optional: prefer to show "AI Customer Support System" first if present
  const featuredTitle = "AI Customer Support System";
  const featuredIndex = allProjects.findIndex(
    (p) => p.title?.toLowerCase() === featuredTitle.toLowerCase()
  );
  if (featuredIndex > -1) {
    const [featured] = allProjects.splice(featuredIndex, 1);
    allProjects.unshift(featured);
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-10 text-center">
          All Projects
        </h1>

        {allProjects.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
            {allProjects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                <image
                  src={project.image || "/placeholder.png"}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />

                <div className="p-6 flex flex-col justify-between h-full">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                      {project.title}
                    </h2>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {project.description || "No description provided."}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-3">
                      {project.techStack?.map((tech, index) => (
                        <span
                          key={index}
                          className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Show actual status */}
                    <span className={`inline-block text-xs font-medium px-3 py-1 rounded-full
                      ${project.status?.toLowerCase() === "completed"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {project.status || "in-progress"}
                    </span>
                  </div>

                  <div className="mt-6 flex gap-3">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                      >
                        Live
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 text-center bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-900 transition"
                      >
                        Code
                      </a>
                    )}
                    <Link
                      href={`/dashboard/project/${project.id}`}
                      className="flex-1 text-center bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition"
                    >
                      Details
                    </Link>

                    <DeleteButton id={project?.id}/>

                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-600 text-lg">No projects found.</p>
            <p className="text-sm text-gray-400 mt-3">
              Ensure your database contains projects.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
