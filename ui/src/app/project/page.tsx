import React from "react";
import Link from "next/link";


export const revalidate = 60; // ISR every 60 seconds

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

async function fetchProjects(): Promise<Project[]> {
 

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/project/all-project`,
      {
        headers: {
          "Content-Type": "application/json",
       
        },
        next: { revalidate: 60 },
      }
    );

    if (!res.ok) return [];
    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}

export default async function ProjectsPage() {
  const projects = await fetchProjects();

  if (!projects.length) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">
          No projects found 😢
        </h2>
        <p className="text-gray-500">
          Please add some projects to see them listed here.
        </p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-10 text-center">
          All Projects
        </h1>

        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col"
            >
           
              <div className="relative w-full h-48">
                
              </div>

              
              <div className="flex-1 flex flex-col justify-between p-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-1">
                    {project.title}
                  </h2>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {project.description || "No description available."}
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

                  <span
                    className={`inline-block text-xs font-medium px-3 py-1 rounded-full ${
                      project.status?.toLowerCase() === "completed"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {project.status || "In Progress"}
                  </span>
                </div>

           
                <div className="mt-6 flex flex-wrap gap-3">
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
                    href={`project/${project.id}`}
                    className="flex-1 text-center bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition"
                  >
                    Details
                  </Link>

                 
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
