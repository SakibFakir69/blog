"use client";

import React from "react";
import { deleteProjectAction } from "../action";


export default function DeleteButton({ id }: { id: string }) {
  const handleDelete = async () => {
    const confirmDelete = confirm(`Are you sure you want to delete project ${id}?`);
    if (!confirmDelete) return;

    const { success } = await deleteProjectAction(id);
    console.log(success,deleteProjectAction(id) )

    if (success) {
      alert("✅ Project deleted successfully!");
      window.location.reload(); // refresh page to reflect deletion
    } else {
      alert("❌ Failed to delete project!");
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="text-red-500 hover:text-red-700"
    >
      Delete
    </button>
  );
}
