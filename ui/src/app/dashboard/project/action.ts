// app/dashboard/project/actions.ts
"use server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function deleteProjectAction(id: string) {
    const cookieStore = cookies();
  const allCookies = cookieStore.getAll();
  const cookieString = allCookies.map(c => `${c.name}=${c.value}`).join("; ");
  try {
    // Call your existing backend API
    const res = await fetch(`http://localhost:5000/api/v1/project/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
          ...(cookieString && { Cookie: cookieString }),
      },
      credentials: "include", // if your backend uses cookies
    });
console.log(res , "res")
    if (!res.ok) {
      console.error("Failed to delete project:", res.status);
      return { success: false };
    }

    revalidatePath("/dashboard/project"); // refresh the page data
    return { success: true };
  } catch (error) {
    console.error("Error deleting project:", error);
    return { success: false };
  }
}
