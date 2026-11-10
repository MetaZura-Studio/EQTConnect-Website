import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";
const turnstileEnabled = Boolean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY);
const turnstileOrigin = "https://challenges.cloudflare.com";

const contentSecurityPolicy = [
  "default-src 'self'",
  // Next.js injects inline bootstrap scripts; dev mode additionally needs eval for fast refresh.
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}${turnstileEnabled ? ` ${turnstileOrigin}` : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  `connect-src 'self'${isDev ? " ws:" : ""}${turnstileEnabled ? ` ${turnstileOrigin}` : ""}`,
  `frame-src ${turnstileEnabled ? turnstileOrigin : "'none'"}`,
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  ...(isDev ? [] : [{ key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" }]),
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  async redirects() {
    return [
      { source: "/home", destination: "/", permanent: true },
      { source: "/book-a-demo", destination: "/contact", permanent: true },
      { source: "/demo", destination: "/contact", permanent: true },
      { source: "/faq", destination: "/resources#faqs", permanent: true },
      { source: "/faqs", destination: "/resources#faqs", permanent: true },
      { source: "/agm-lifecycle", destination: "/platform#agm-workflow", permanent: true },
      { source: "/lifecycle", destination: "/platform#agm-workflow", permanent: true },
    ];
  },
};

export default nextConfig;
