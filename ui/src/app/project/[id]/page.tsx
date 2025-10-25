

import React from "react";
import Image from "next/image";
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

async function getProject(id: string): Promise<Project | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/project/${id}`,
      { next: { revalidate: 60 } }
    );

    if (!res.ok) return null;

    const data = await res.json();
    return data?.data || null;
  } catch (error) {
    console.error("Error fetching project details:", error);
    return null;
  }
}

export default async function ProjectDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await getProject(id);

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Project not found 😢
        </h2>
        <Link
          href="/dashboard/project"
          className="text-blue-600 hover:underline"
        >
          ← Back to Projects
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md overflow-hidden">
        {/* Project Banner */}
        <div className="relative w-full h-64 md:h-80">
          
        </div>

        {/* Project Info */}
        <div className="p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            {project.title}
          </h1>

          <p className="text-sm text-gray-500 mb-5">
            Created on{" "}
            {new Date(project.createdAt).toLocaleDateString("en-US", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>

          <p className="text-gray-700 leading-relaxed mb-6">
            {project.description || "No description available for this project."}
          </p>

          {/* Tech Stack */}
          {project.techStack && project.techStack.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold text-gray-800 mb-2">Tech Stack:</h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech, index) => (
                  <span
                    key={index}
                    className="text-sm bg-gray-100 text-gray-800 px-3 py-1 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Status */}
          <div className="mb-6">
            <span
              className={`inline-block text-sm font-medium px-3 py-1 rounded-full ${
                project.status?.toLowerCase() === "completed"
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {project.status || "In Progress"}
            </span>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-3 mt-6">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
              >
                View Live
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-900 transition"
              >
                View Code
              </a>
            )}
          </div>

          {/* Back Link */}
          <div className="mt-8">
            <Link
              href="/project"
              className="inline-block text-blue-600 hover:underline"
            >
              ← Back to Projects
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
