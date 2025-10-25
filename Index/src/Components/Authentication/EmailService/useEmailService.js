// // import { useCallback } from "react";

// // const API_BASE = import.meta.env.VITE_API_BASE_URL || "";

// // export function useEmailService() {
// //   const sendVerificationEmail = useCallback(async (to, code, username) => {
// //     if (!API_BASE) {
// //       console.error("❌ VITE_API_BASE_URL is not set");
// //       return { ok: false, error: "API base URL not configured" };
// //     }

// //     try {
// //       const res = await fetch(`${API_BASE}/api/send-verification`, {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({ to, code, username }),
// //       });

// //       const data = await res.json();

// //       if (!res.ok) {
// //         return { ok: false, error: data?.error || "Failed to send email" };
// //       }

// //       return { ok: true, id: data?.id }; // matches backend response
// //     } catch (err) {
// //       console.error("❌ sendVerificationEmail failed:", err);
// //       return { ok: false, error: "Network or server error" };
// //     }
// //   }, []);

// //   return { sendVerificationEmail };
// // }


// import { useCallback } from "react";

// const API_BASE = import.meta.env.VITE_API_BASE_URL || "";
// const EMAIL_SERVICE_URL = import.meta.env.VITE_EMAIL_SERVICE_URL || 
//                          import.meta.env.VITE_API_BASE_URL || 
//                          (import.meta.env.PROD 
//                            ? 'https://your-backend-app-name.vercel.app' 
//                            : 'http://localhost:3001');

// export function useEmailService() {
//   const sendVerificationEmail = useCallback(async (to, code, username) => {
//     if (!API_BASE) {
//       console.error("❌ VITE_API_BASE_URL is not set");
//       return { ok: false, error: "API base URL not configured" };
//     }

//     try {
//       const res = await fetch(`${API_BASE}/api/send-verification`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ to, code, username }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         return { ok: false, error: data?.error || "Failed to send email" };
//       }

//       return { ok: true, messageId: data?.messageId }; // Fixed: use messageId
//     } catch (err) {
//       console.error("❌ sendVerificationEmail failed:", err);
//       return { ok: false, error: "Network or server error" };
//     }
//   }, []);

//   return { sendVerificationEmail };
// }

import { useCallback } from "react";

const API_BASE =
  import.meta.env.VITE_API_BASE_URL ||
  (import.meta.env.PROD
    ? '' // Empty means same domain as frontend (Vercel)
    : 'http://localhost:3001');

export function useEmailService() {
  const sendVerificationEmail = useCallback(async (to, code, username) => {
    try {
      const res = await fetch(`${API_BASE}/api/send-verification`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ to, code, username }),
      });

      const data = await res.json();
      if (!res.ok) {
        return { ok: false, error: data?.error || "Failed to send email" };
      }

      return { ok: true, messageId: data?.messageId };
    } catch (err) {
      console.error("❌ sendVerificationEmail failed:", err);
      return { ok: false, error: "Network or server error" };
    }
  }, []);

  return { sendVerificationEmail };
}
