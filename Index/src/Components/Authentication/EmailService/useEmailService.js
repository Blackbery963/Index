// // // import { useCallback } from "react";

// // // const API_BASE = import.meta.env.VITE_API_BASE_URL || "";

// // // export function useEmailService() {
// // //   const sendVerificationEmail = useCallback(async (to, code, username) => {
// // //     if (!API_BASE) {
// // //       console.error("❌ VITE_API_BASE_URL is not set");
// // //       return { ok: false, error: "API base URL not configured" };
// // //     }

// // //     try {
// // //       const res = await fetch(`${API_BASE}/api/send-verification`, {
// // //         method: "POST",
// // //         headers: { "Content-Type": "application/json" },
// // //         body: JSON.stringify({ to, code, username }),
// // //       });

// // //       const data = await res.json();

// // //       if (!res.ok) {
// // //         return { ok: false, error: data?.error || "Failed to send email" };
// // //       }

// // //       return { ok: true, id: data?.id }; // matches backend response
// // //     } catch (err) {
// // //       console.error("❌ sendVerificationEmail failed:", err);
// // //       return { ok: false, error: "Network or server error" };
// // //     }
// // //   }, []);

// // //   return { sendVerificationEmail };
// // // }


// // import { useCallback } from "react";

// // const API_BASE = import.meta.env.VITE_API_BASE_URL || "";
// // const EMAIL_SERVICE_URL = import.meta.env.VITE_EMAIL_SERVICE_URL || 
// //                          import.meta.env.VITE_API_BASE_URL || 
// //                          (import.meta.env.PROD 
// //                            ? 'https://your-backend-app-name.vercel.app' 
// //                            : 'http://localhost:3001');

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

// //       return { ok: true, messageId: data?.messageId }; // Fixed: use messageId
// //     } catch (err) {
// //       console.error("❌ sendVerificationEmail failed:", err);
// //       return { ok: false, error: "Network or server error" };
// //     }
// //   }, []);

// //   return { sendVerificationEmail };
// // }


import { useCallback } from "react";

// Dynamic API base URL that works in both environments
const API_BASE = import.meta.env.VITE_API_BASE_URL || 
                (import.meta.env.PROD 
                  ? 'https://api.thepaintersdiary.com' 
                  : 'http://localhost:3001');

export function useEmailService() {
  const sendVerificationEmail = useCallback(async (to, code, username) => {
    try {
      console.log('📨 Sending verification email to:', to);
      console.log('🌐 Using API base:', API_BASE);
      
      const res = await fetch(`${API_BASE}/api/send-verification`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ to, code, username }),
      });

      console.log('📨 Response status:', res.status);

      // Check if response is OK before parsing JSON
      if (!res.ok) {
        // Try to get error message from response
        let errorMessage = `HTTP ${res.status}`;
        try {
          const errorData = await res.json();
          errorMessage = errorData.error || errorMessage;
        } catch {
          // If response isn't JSON, use status text
          errorMessage = res.statusText || errorMessage;
        }
        throw new Error(errorMessage);
      }

      const data = await res.json();
      
      if (!data.ok) {
        throw new Error(data.error || "Failed to send email");
      }

      console.log('✅ Email sent successfully:', data.messageId);
      return { ok: true, messageId: data.messageId };
      
    } catch (err) {
      console.error("❌ sendVerificationEmail failed:", err);
      return { 
        ok: false, 
        error: err.message || "Network or server error" 
      };
    }
  }, []);

  return { sendVerificationEmail };
}