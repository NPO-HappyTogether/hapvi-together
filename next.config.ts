import type {NextConfig} from "next";
import path from "node:path";
import {fileURLToPath} from "node:url";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));
const isDev = process.env.NODE_ENV === "development";

const connectSrc = [
  "'self'",
  "https://api.resend.com",
  "https://fonts.googleapis.com",
  "https://fonts.gstatic.com",
  "https://zeffy.com",
  "https://www.zeffy.com",
  "https://www.googletagmanager.com",
  "https://www.google-analytics.com",
  "https://region1.google-analytics.com",
  ...(isDev ? ["wss:"] : []),
].join(" ");

const scriptSrc = [
  "'self'",
  "'unsafe-inline'",
  "https://www.googletagmanager.com",
  ...(isDev ? ["'unsafe-eval'"] : []),
].join(" ");

const securityHeaders = [
  {key: "X-DNS-Prefetch-Control", value: "on"},
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains",
  },
  {key: "X-Frame-Options", value: "SAMEORIGIN"},
  {key: "X-Content-Type-Options", value: "nosniff"},
  {key: "Referrer-Policy", value: "origin-when-cross-origin"},
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      `script-src ${scriptSrc}`,
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' blob: data: https:",
      "font-src 'self' https://fonts.gstatic.com https://fonts.googleapis.com",
      `connect-src ${connectSrc}`,
      "frame-ancestors 'self'",
      "base-uri 'self'",
      "form-action 'self' https://api.resend.com",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  turbopack: {
    root: projectRoot,
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
