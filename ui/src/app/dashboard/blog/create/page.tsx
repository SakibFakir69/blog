"use client";

import Image from "next/image";
import React, { useState } from "react";


export default function CreateBlogPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [imageURL, setImageURL] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "info" | "error" | "success"; text: string } | null>(null);

  // ✅ Add tag manually
  function addTagFromInput() {
    const raw = tagsInput.trim();
    if (!raw) return;
    const parts = raw
      .split(",")
      .map((p) => p.trim())
      .filter(Boolean);
    const newTags = Array.from(new Set([...tags, ...parts])).slice(0, 10);
    setTags(newTags);
    setTagsInput("");
  }

  // ✅ Remove tag
  function removeTag(t: string) {
    setTags(tags.filter((x) => x !== t));
  }

  // ✅ Submit blog
  async function submit(e?: React.FormEvent) {
    e?.preventDefault();
    setMessage(null);

    if (!title.trim() || !content.trim()) {
      setMessage({ type: "error", text: "Title and content are required." });
      return;
    }

    setLoading(true);

    try {
      const payload = {
        title: title.trim(),
        content: content.trim(),
        tags,
        image: imageURL.trim(),
      };

      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/blog/create-blog`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok && data?.status) {
        setMessage({ type: "success", text: "Blog created successfully!" });
        setTitle("");
        setContent("");
        setTags([]);
        setImageURL("");
      } else {
        setMessage({ type: "error", text: data?.message || data?.messgage || "Failed to create blog" });
      }
    } catch (err) {
      setMessage({ type: "error", text: (err as Error).message || "Network error" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/80 backdrop-blur-sm border border-gray-100 shadow-xl rounded-2xl">
          <div className="p-8 sm:p-12 space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">Create a New Blog</h1>
                <p className="mt-1 text-sm text-gray-500">Write something inspiring and helpful for your readers.</p>
              </div>

              <div className="hidden sm:flex gap-3">
                <button
                  onClick={() => {
                    setTitle("How I Improved Web Performance");
                    setContent("Write your story here...");
                    setTags(["performance", "web", "tips"]);
                    setImageURL("https://images.unsplash.com/photo-1507525428034-b723cf961d3e");
                  }}
                  className="px-3 py-1 rounded-lg border text-sm hover:bg-gray-50"
                >
                  Load Demo
                </button>
                <button
                  onClick={() => {
                    setTitle("");
                    setContent("");
                    setTags([]);
                    setTagsInput("");
                    setImageURL("");
                  }}
                  className="px-3 py-1 rounded-lg bg-gray-100 text-sm hover:bg-gray-200"
                >
                  Clear
                </button>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={submit} className="space-y-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="A clear, searchable title"
                  className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                />
              </div>

              {/* Content */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Content</label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Start writing your blog post here..."
                  rows={10}
                  className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                />
              </div>

              {/* Image URL */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Cover Image URL</label>
                <input
                  type="url"
                  value={imageURL}
                  onChange={(e) => setImageURL(e.target.value)}
                  placeholder="https://example.com/your-image.jpg"
                  className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                />

                {imageURL && (
                  <Image
  src={imageURL}
  alt="preview"
  width={160}   // px
  height={112}  // px
  className="rounded-md object-cover"
/>

                )}
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Tags</label>
                <div className="mt-2 flex gap-2">
                  <input
                    value={tagsInput}
                    onChange={(e) => setTagsInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addTagFromInput();
                      }
                    }}
                    placeholder="Type tags and press Enter or comma"
                    className="flex-1 rounded-xl border border-gray-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                  />
                  <button
                    type="button"
                    onClick={addTagFromInput}
                    className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700"
                  >
                    Add
                  </button>
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  {tags.map((t) => (
                    <span
                      key={t}
                      className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-sm"
                    >
                      <span>#{t}</span>
                      <button
                        type="button"
                        onClick={() => removeTag(t)}
                        className="opacity-70 hover:opacity-100"
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(content);
                    setMessage({ type: "info", text: "Content copied to clipboard" });
                  }}
                  className="px-4 py-2 rounded-xl border hover:bg-gray-50"
                >
                  Copy Content
                </button>

                <button
                  onClick={submit}
                  disabled={loading}
                  type="button"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-semibold shadow-md hover:scale-[1.02] transition disabled:opacity-60"
                >
                  {loading ? "Creating..." : "Create Blog"}
                </button>
              </div>

              {/* Preview */}
              <div className="mt-6 bg-gray-50 border border-dashed border-gray-200 rounded-lg p-5">
                <h3 className="text-sm font-medium text-gray-700">Live Preview</h3>
                <div className="mt-3 prose max-w-none">
                  {imageURL && (
                    <Image
  src={imageURL}
  alt="preview"
  width={160}   // px
  height={112}  // px
  className="rounded-md object-cover"
/>
                  )}
                  {title ? (
                    <h2 className="text-xl font-bold text-gray-900">{title}</h2>
                  ) : (
                    <p className="text-gray-400">Your title preview will appear here.</p>
                  )}
                  {content ? (
                    <p className="mt-2 text-gray-700 whitespace-pre-wrap">{content}</p>
                  ) : (
                    <p className="text-gray-400">Your content preview will appear here.</p>
                  )}
                  {tags.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {tags.map((t) => (
                        <span
                          key={t}
                          className="inline-block px-2 py-1 bg-gray-100 text-sm rounded text-gray-600"
                        >
                          #{t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Messages */}
              {message && (
                <div
                  className={`rounded-md px-4 py-3 ${
                    message.type === "error"
                      ? "bg-red-50 border border-red-100 text-red-700"
                      : message.type === "success"
                      ? "bg-green-50 border border-green-100 text-green-700"
                      : "bg-blue-50 border border-blue-100 text-blue-700"
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
