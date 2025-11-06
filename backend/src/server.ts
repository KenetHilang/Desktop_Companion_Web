// Main server entry point

import express, { Express } from "express";
import cors from "cors";
import { config } from "./config/config";
import sentimentRoutes from "./routes/sentimentRoutes";

// Initialize Express app
const app: Express = express();

// Middleware
app.use(cors({ origin: config.corsOrigin })); // Enable CORS
app.use(express.json()); // Parse JSON request bodies

// Routes
app.use("/api", sentimentRoutes);

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Start server
app.listen(config.port, () => {
  console.log(`Backend server running on http://localhost:${config.port}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
});

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("SIGTERM signal received: closing HTTP server");
  process.exit(0);
});

process.on("SIGINT", () => {
  console.log("SIGINT signal received: closing HTTP server");
  process.exit(0);
});
