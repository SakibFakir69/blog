import React from "react";
import { cookies } from "next/headers"; // get cookies on server
import Link from "next/link";
import DeleteButton from "./_component/DeleteButton";

interface Blog {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export const revalidate = 60; // ISR

async function getAllBlogs(): Promise<Blog[]> {

  const cookieStore = await cookies(); // Add await here
  const allCookies = cookieStore.getAll(); // Now getAll() works
  const cookieString = allCookies
    .map((c: { name: string; value: string }) => `${c.name}=${c.value}`)
    .join("; ");

  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/blog/all-blog`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...(cookieString && { Cookie: cookieString }),
    },
    next: { revalidate: 60 },
  });

  if (!res.ok) return [];

  const data = await res.json();
  return data?.status && Array.isArray(data.data) ? data.data : [];
}

export default async function BlogPage() {
  const blogs = await getAllBlogs();

  return (
    <main className="min-h-screen py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">All Blogs</h1>
        {blogs.length === 0 ? (
          <div>No blogs found</div>
        ) : (
          blogs.map((b) => (
            <div key={b.id} className="mb-4 p-4 border rounded-lg shadow">
              <h2 className="font-semibold text-xl mb-2">{b.title}</h2>
              <p className="mb-2">{b.content}</p>
              <span className="text-gray-400 text-sm mb-3 block">{new Date(b.createdAt).toLocaleDateString()}</span>
              
              <div className="flex gap-3">
                <DeleteButton id={b.id}/>

                <Link
                  href={`/dashboard/blog/${b.id}`}
                  className="px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-700 transition"
                >
                  Details
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
