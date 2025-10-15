"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";

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
  userId: string;
}

export default function ProjectDetailPage() {
  const params = useParams();
  const projectId = params?.id;

  console.log(params?.id, "id", projectId);
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    githubUrl: "",
    liveUrl: "",
    techStack: "",
    status: "in-progress",
  });

  useEffect(() => {
  if (!projectId) return;

  const fetchProject = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/v1/project/${projectId}`
      );
      const data = await res.json();
      console.log("Fetched project data:", data);

      if (!data.status || !data.data) { // ✅ check for data.data
        console.error("Failed to fetch project:", data);
        setProject(null);
        return;
      }

      setProject(data.data); // ✅ use data.data

      setFormData({
        title: data.data.title,
        description: data.data.description || "",
        image: data.data.image || "",
        githubUrl: data.data.githubUrl || "",
        liveUrl: data.data.liveUrl || "",
        techStack: data.data.techStack?.join(", ") || "",
        status: data.data.status || "in-progress",
      });
    } catch (err) {
      console.error("Error fetching project:", err);
      setProject(null);
    } finally {
      setLoading(false);
    }
  };

  fetchProject();
}, [projectId]);



  if (loading) return <div>Loading project...</div>;
  if (!project) return <div>Project not found.</div>;

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit
 const handleUpdate = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    const res = await fetch(`http://localhost:5000/api/v1/project/project-update`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
   
      body: JSON.stringify({
        id: projectId, // backend expects id here
        data: {
          ...formData,
          techStack: formData.techStack.split(",").map((t) => t.trim()),
        },
      }),
    });
    console.log(res , " res ")

    if (!res.ok) {
      alert("❌ Failed to update project!");
      return;
    }

    const updated = await res.json();
    setProject(updated.data); // backend sends data
    setEditing(false);
    alert("✅ Project updated successfully!");
  } catch (err) {
    console.error(err);
    alert("❌ Error updating project!");
  }
};


  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{project.title}</h1>

      {project.image && (
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-60 object-cover rounded mb-4"
        />
      )}

      {!editing ? (
        <>
          <p className="mb-2">
            {project.description || "No description available."}
          </p>
          <div className="mb-2">
            <strong>Status:</strong> {project.status || "in-progress"}
          </div>
          <div className="mb-2">
            <strong>Tech Stack:</strong>{" "}
            {project.techStack.length > 0
              ? project.techStack.join(", ")
              : "Not specified"}
          </div>
          <div className="flex gap-4 mt-4">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="text-blue-500 hover:underline"
              >
                Live Site
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="text-green-500 hover:underline"
              >
                GitHub Repo
              </a>
            )}
          </div>

          <div className="mt-4">
            <button
              onClick={() => setEditing(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Update Project
            </button>
          </div>
        </>
      ) : (
        <form onSubmit={handleUpdate} className="flex flex-col gap-3 mt-4">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={formData.image}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="liveUrl"
            placeholder="Live URL"
            value={formData.liveUrl}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="githubUrl"
            placeholder="GitHub URL"
            value={formData.githubUrl}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="techStack"
            placeholder="Tech Stack (comma separated)"
            value={formData.techStack}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>

          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => setEditing(false)}
              className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="mt-4 text-gray-500 text-sm">
        <div>Created at: {new Date(project.createdAt).toLocaleString()}</div>
        <div>Updated at: {new Date(project.updatedAt).toLocaleString()}</div>
      </div>
    </div>
  );
}
