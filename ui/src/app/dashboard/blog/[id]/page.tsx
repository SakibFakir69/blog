"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Blog {
  id: number;
  title: string;
  content: string;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}

interface PageProps {
  params: {
    id: string;
  };
}

export default function BlogDetailsPage({ params }: PageProps) {
 
  const [blog, setBlog] = useState<Blog | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  console.log(params)

  const fetchBlog = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/blog/${params.id}`, {
        headers: { "Content-Type": "application/json" },
        credentials: "include", // send cookies
      });
      const data = await res.json();
      if (res.ok) {
        setBlog(data.data);
        setTitle(data.data.title);
        setContent(data.data.content);
      } else {
        setMessage({ type: "error", text: data.message || "Failed to fetch blog" });
      }
    } catch (err: any) {
      setMessage({ type: "error", text: err.message || "Network error" });
    }
  };

  const handleUpdate = async () => {
    if (!title || !content) return setMessage({ type: "error", text: "Title and content are required" });
    setLoading(true);

    const datapayload={
        title:title, 
        content:content

    }
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/blog/update-blog`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({...datapayload,id:params?.id}),

      });
      const data = await res.json();
      if (res.ok) {
        setBlog(data.data);
        setMessage({ type: "success", text: "Blog updated successfully" });
      } else {
        setMessage({ type: "error", text: data.message || "Failed to update blog" });
      }
    } catch (err: any) {
      setMessage({ type: "error", text: err.message || "Network error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, [params.id]);

  if (!blog) return <div className="p-10">Loading...</div>;

  return (
    <main className="min-h-screen py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold mb-4">Blog Details</h1>

        {message && (
          <div className={`mb-4 p-3 rounded ${message.type === "error" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
            {message.text}
          </div>
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={8}
            className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />
        </div>

        {blog.tags && blog.tags.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {blog.tags.map((tag) => (
              <span key={tag} className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm">
                #{tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex justify-between items-center">
          <span className="text-gray-500 text-sm">Created at: {new Date(blog.createdAt).toLocaleString()}</span>
          <button
            onClick={handleUpdate}
            disabled={loading}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-60"
          >
            {loading ? "Updating..." : "Update Blog"}
          </button>
        </div>
      </div>
    </main>
  );
}
