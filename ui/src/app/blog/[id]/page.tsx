import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import DOMPurify from "isomorphic-dompurify"; // For sanitizing HTML content

export const revalidate = 60; // ISR: Rebuild every 60 seconds

interface Blog {
  id: string; // Standardized to match BlogPage
  title: string;
  content: string;
  image?: string; // Optional to allow fallback
  createdAt: string;
}

async function getBlog(id: string): Promise<Blog | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/blog/${id}`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      console.error(`Fetch failed with status: ${res.status}`);
      return null;
    }
    const data = await res.json();
    // Map _id to id for consistency
    return { ...data, id: data._id || id };
  } catch (err) {
    console.error("Error fetching blog:", err);
    return null;
  }
}

export default async function BlogDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const blog = await getBlog(id);
  
  
  
  const {title,image,content , createdAt} = blog?.data;

  if (!blog) {
    notFound(); // Use Next.js notFound for better 404 handling
  }

  // Sanitize content if it contains HTML

  console.log(blog?.data)
  

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      {/* Back Button */}
      <Link
        href="/blog"
        className="text-blue-600 hover:underline mb-6 inline-block"
      >
        ← Back to Blogs
      </Link>

      {/* Blog Header */}
      <div className="text-center mb-8">

        <h1 className="text-3xl md:text-5xl font-bold mb-2">{title}</h1>
        <p className="text-gray-500 text-sm">
          Published on {new Date(createdAt).toLocaleDateString()}
        </p>
      </div>

      {/* Blog Image */}
      <div className="w-full h-64 md:h-96 mb-6 overflow-hidden rounded-xl shadow-md">
        <Image
          src={image || "https://via.placeholder.com/400x400.png?text=Demo+Image"}
          alt={title 
            || "title"
          }
         
          width={672} // Matches max-w-3xl (3xl = 672px)
          height={384} // Matches md:h-96
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      <p>{content}</p>


    </div>
  );
}