// Routes for sentiment analysis

import { Router, Request, Response } from "express";
import { analyzeSentiment } from "../services/sentimentService";
import {
  AnalyzeSentimentRequest,
  ErrorResponse,
} from "../types/sentiment.types";

const router: Router = Router();

/**
 * POST /api/analyze-sentiment
 * Analyzes the sentiment of the provided text
 */
router.post("/analyze-sentiment", async (req: Request, res: Response) => {
  try {
    const { text } = req.body as AnalyzeSentimentRequest;

    // Validate input
    if (!text) {
      const errorResponse: ErrorResponse = { error: "Text is required" };
      return res.status(400).json(errorResponse);
    }

    // Call sentiment analysis service
    const result = await analyzeSentiment(text);

    // Return successful response
    res.json(result);
  } catch (error) {
    // Handle errors
    console.error("Error in /analyze-sentiment route:", error);

    const errorResponse: ErrorResponse = {
      error: "Failed to analyze sentiment",
    };

    res.status(500).json(errorResponse);
  }
});

export default router;
