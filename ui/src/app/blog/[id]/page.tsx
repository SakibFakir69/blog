// app/blog/[id]/page.tsx
import React from "react";
import Image from "next/image";

export const revalidate = 60; // ISR: Rebuild every 60 seconds

interface Blog {
  _id: string;
  title: string;
  content: string;
  image?: string;
  createdAt: string;
}

async function getBlog(id: string): Promise<Blog | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/blog/${id}`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    console.error("Error fetching blog:", err);
    return null;
  }
}

export default async function BlogDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  // ✅ Await params first
  const { id } = await params;

  const blog = await getBlog(id);
  console.log(blog)

  if (!blog) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-600 text-lg">Blog not found 😢</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      {/* Blog Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-5xl font-bold mb-2">{blog.title}</h1>
        <p className="text-gray-500 text-sm">
          Published on {new Date(blog.createdAt).toLocaleDateString()}
        </p>
      </div>

      {/* Blog Image */}
      {blog.image && (
        <div className="w-full h-64 md:h-96 mb-6 overflow-hidden rounded-xl shadow-md">
          <Image
            src={blog.image}
            alt={blog.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}

      {/* Blog Content */}
      <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed">
        {blog.content}
      </div>

      {/* Optional back button */}
      
    </div>
  );
}
