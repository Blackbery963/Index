export function middleware(req) {
  const origin = req.headers.get("origin");

  const allowed = [
    "https://thepaintersdiary.com",
    "https://www.thepaintersdiary.com",
    "http://localhost:5173",
  ];

  const res = new Response(null, {
    headers: {
      "Access-Control-Allow-Origin": allowed.includes(origin)
        ? origin
        : "https://www.thepaintersdiary.com",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers":
        "Content-Type, Authorization, X-Requested-With",
      "Access-Control-Allow-Credentials": "true",
    },
  });

  if (req.method === "OPTIONS") return res; // handle preflight globally
  return res; // let normal requests pass
}

export const config = {
  matcher: "/api/:path*",
};
