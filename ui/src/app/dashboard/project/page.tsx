// app/projects/page.tsx
import React from "react";
import Link from "next/link";
import { cookies } from "next/headers";
import DeleteButton from "./_components/DeleteButton";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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
  const cookieStore = await cookies();
  const allCookies = cookieStore.getAll();
  const cookieString = allCookies.map(c => `${c.name}=${c.value}`).join("; ");

  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/project/all-project`, {
    headers: { "Content-Type": "application/json", ...(cookieString && { Cookie: cookieString }) },
    next: { revalidate: 60 },
  });

  if (!res.ok) return [];

  const data = await res.json();
  return data.data || [];
};

export default async function ProjectsPage() {
  const allProjects = await fetchProjects();

  // Featured first
  const featuredTitle = "AI Customer Support System";
  const featuredIndex = allProjects.findIndex(p => p.title?.toLowerCase() === featuredTitle.toLowerCase());
  if (featuredIndex > -1) {
    const [featured] = allProjects.splice(featuredIndex, 1);
    allProjects.unshift(featured);
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-10 text-center">All Projects</h1>

        {allProjects.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {allProjects.map(project => (
              <Card key={project.id} className="hover:shadow-lg transition-shadow duration-300 flex flex-col">
                
                {/* Image */}
                <div className="relative w-full h-48 rounded-t-xl overflow-hidden bg-gray-100">
                  <Image
                    src={project.image || "/placeholder.png"}
                    alt={project.title || "Project Image"}
                    fill
                    className="object-cover"
                  />
                </div>

                <CardContent className="flex-1 flex flex-col justify-between">
                  <div>
                    <CardHeader className="p-0 mb-2">
                      <CardTitle className="text-lg font-semibold">{project.title}</CardTitle>
                    </CardHeader>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                      {project.description || "No description provided."}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-3">
                      {project.techStack.map((tech, idx) => (
                        <Badge key={idx} variant="secondary">
                          {tech}
                        </Badge>
                      ))}
                    </div>

                    <Badge
                      
                      className="uppercase text-xs font-medium"
                    >
                      {project.status || "in-progress"}
                    </Badge>
                  </div>
                </CardContent>

                <CardFooter className="flex flex-wrap gap-2 justify-between mt-4">
                  {project.liveUrl && (
                    <Button asChild className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        Live
                      </a>
                    </Button>
                  )}

                  {project.githubUrl && (
                    <Button asChild className="flex-1 bg-gray-800 hover:bg-gray-900 text-white">
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        Code
                      </a>
                    </Button>
                  )}

                  <Button asChild className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700">
                    <Link href={`/dashboard/project/${project.id}`}>Details</Link>
                  </Button>

                  <DeleteButton id={project.id} />
                </CardFooter>
              </Card>
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
