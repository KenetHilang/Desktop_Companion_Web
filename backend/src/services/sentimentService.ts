// Sentiment analysis service

import axios, { AxiosError } from "axios";
import { config, apiHeaders } from "../config/config";
import { convertLabelToNumber } from "../config/sentimentMapping";
import {
  ExternalApiRequest,
  ExternalApiResponse,
  AnalyzeSentimentResponse,
  SentimentLabelString,
} from "../types/sentiment.types";

/**
 * Calls the external sentiment analysis API
 * @param text - The text to analyze
 * @returns Promise with sentiment analysis results
 * @throws Error if the API call fails
 */
export async function analyzeSentiment(
  text: string
): Promise<AnalyzeSentimentResponse> {
  const apiRequestBody: ExternalApiRequest = {
    text: text,
    return_all_scores: false,
  };

  try {
    const apiResponse = await axios.post<ExternalApiResponse>(
      config.externalApiUrl,
      apiRequestBody,
      {
        headers: apiHeaders,
        timeout: config.apiTimeout,
        validateStatus: (status) => status < 500,
      }
    );

    // Check if response is not successful
    if (apiResponse.status >= 400) {
      console.error(
        "API returned error status:",
        apiResponse.status,
        apiResponse.data
      );
      throw new Error(
        `API returned error status ${apiResponse.status}: ${JSON.stringify(apiResponse.data)}`
      );
    }

    // Log full response for debugging
    console.log("API Response:", JSON.stringify(apiResponse.data, null, 2));

    // Extract label from response
    const labelString = apiResponse.data?.output?.results?.label;

    if (!labelString) {
      console.error("Label not found in response:", apiResponse.data);
      throw new Error(
        `Invalid API response structure: ${JSON.stringify(apiResponse.data)}`
      );
    }

    console.log("Label received from API:", labelString);

    // Convert label to number if it exists in mapping
    const labelToSend = convertLabelToNumber(labelString);
    
    if (typeof labelToSend === "number") {
      console.log("Label converted to number:", labelToSend);
    } else {
      console.log("Label not in mapping, sending as string:", labelString);
    }

    // Return formatted response
    return {
      label: labelToSend,
      labelText: labelString,
      score: apiResponse.data.output.results.score,
      status: apiResponse.data.status,
    };
  } catch (error) {
    // Log the actual error details
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      console.error("Error calling external API:", axiosError.message);
      
      if (axiosError.response) {
        console.error("Response status:", axiosError.response.status);
        console.error("Response data:", axiosError.response.data);
      }
    } else if (error instanceof Error) {
      console.error("Error calling external API:", error.message);
    }

    throw new Error("Failed to analyze sentiment");
  }
}
