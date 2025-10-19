import React from "react";
import { cookies } from "next/headers";
import Link from "next/link";


export const revalidate = 60; // ✅ ISR: rebuild every 60 seconds

interface Blog {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

// ✅ Fetch all blogs from backend (SSR + ISR)
async function getAllBlogs(): Promise<Blog[]> {
  try {
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
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
}

export default async function BlogPage() {
  const blogs = await getAllBlogs();

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4 sm:mb-0">
            📰 All Blogs
          </h1>

          
        </div>

        {/* Blog Grid */}
        {blogs.length === 0 ? (
          <div className="text-center text-gray-500 py-10">
            No blogs found 😔
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {blogs.map((b) => (
              <div
                key={b.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-5 flex flex-col justify-between"
              >
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-1">
                    {b.title}
                  </h2>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {b.content.slice(0,30)}...
                  </p>
                </div>

                <div>
                  <span className="text-gray-400 text-xs block mb-3">
                    {new Date(b.createdAt).toLocaleDateString()}
                  </span>

                  <div className="flex items-center justify-between">
                    <Link
                      href={`/blog/${b.id}`}
                      className="px-3 py-1.5 bg-gray-800 text-white text-sm rounded-lg hover:bg-gray-900 transition"
                    >
                      View Details
                    </Link>

                   
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
