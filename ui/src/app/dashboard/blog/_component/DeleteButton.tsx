


"use client";

import React from "react";
import { toast } from "sonner";
import { deleteBlogAction } from "../action";

export default function DeleteButton({ id }: { id: string }) {
  const handleDelete = async () => {
    const confirmDelete = confirm(`Are you sure you want to delete blog ${id}?`);
    if (!confirmDelete) return;

    try {
      const { success } = await deleteBlogAction(id);

      if (success) {
        toast.success("🗑️ Blog deleted successfully!");
        // Refresh page to reflect the deletion immediately (while ISR revalidates)
        window.location.reload();
      } else {
        toast.error("❌ Failed to delete blog!");
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
      toast.error("⚠️ Something went wrong while deleting the blog!");
    }
  };

  return (
     <button
      onClick={handleDelete}
      className="btn h-9 text-white w-20 rounded bg-red-500  hover:text-red-700"
    >
      Delete
    </button>
  );
}
