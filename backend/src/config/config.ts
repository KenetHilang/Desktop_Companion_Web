// Configuration constants

export const config = {
  port: process.env.PORT || 5000,
  externalApiUrl: "https://api.tabularis.ai/",
  apiTimeout: 30000, // 30 seconds
  corsOrigin: "*", // Configure this based on your frontend URL in production
} as const;

export const apiHeaders = {
  Accept: "application/json",
  "Content-Type": "application/json",
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  "Accept-Language": "en-US,en;q=0.9",
  "Accept-Encoding": "gzip, deflate, br",
  Connection: "keep-alive",
  "Sec-Fetch-Dest": "empty",
  "Sec-Fetch-Mode": "cors",
  "Sec-Fetch-Site": "cross-site",
} as const;
