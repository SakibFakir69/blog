

"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function deleteBlogAction(id: string) {
 const cookieStore = await cookies(); // Add await here
  const allCookies = cookieStore.getAll(); // Now getAll() works
  const cookieString = allCookies
    .map((c: { name: string; value: string }) => `${c.name}=${c.value}`)
    .join("; ");

  try {
    // ✅ Call your existing backend DELETE API
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/blog/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...(cookieString && { Cookie: cookieString }), // send all cookies
      },
      credentials: "include",
    });

    if (!res.ok) {
      console.error("Failed to delete blog:", res.status);
      return { success: false };
    }

    // ✅ Revalidate ISR page cache so deleted blog disappears
    revalidatePath("/dashboard/blog");

    return { success: true };
  } catch (error) {
    console.error("Error deleting blog:", error);
    return { success: false };
  }
}
