// middleware.js
export function middleware(req) {
  const origin = req.headers.get("origin");
  const allowedOrigins = [
    "https://www.thepaintersdiary.com",
    "https://thepaintersdiary.com",
    "https://api.thepaintersdiary.com",
    "http://localhost:5173",
  ];

  const isAllowed = allowedOrigins.includes(origin);

  // Respond to preflight CORS request
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": isAllowed ? origin : "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With",
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Max-Age": "86400",
      },
    });
  }

  // For all other requests, just continue
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Origin": isAllowed ? origin : "*",
      "Access-Control-Allow-Credentials": "true",
    },
  });
}

export const config = {
  matcher: ["/api/:path*"], // Apply to all API routes
};
