// "use client"

// import { useState } from "react";




// const [isUser, setIsUser] = useState(false);

//   // Fetch current user info on mount
//   useEffect(() => {
//     const UserData = async () => {
//       try {
//         const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/me`, {
//           headers: {
//             "Content-Type": "application/json",
//           },
//           credentials: "include", // send cookies
//         });

//         const data = await res.json();
//         setIsUser(data?.data || false);
//       } catch (error) {
//         setIsUser(false);
//         console.error("Fetching user failed:", error);
//       }
//     };

//     UserData();
//   }, []);