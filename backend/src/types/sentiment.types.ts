// Type definitions for sentiment analysis

export enum SentimentLabel {
  VeryNegative = 0,
  Negative = 1,
  Neutral = 2,
  Positive = 3,
  VeryPositive = 4,
}

export type SentimentLabelString =
  | "Very Negative"
  | "Negative"
  | "Neutral"
  | "Positive"
  | "Very Positive";

export interface SentimentMapping {
  "Very Negative": SentimentLabel.VeryNegative;
  Negative: SentimentLabel.Negative;
  Neutral: SentimentLabel.Neutral;
  Positive: SentimentLabel.Positive;
  "Very Positive": SentimentLabel.VeryPositive;
}

export interface AnalyzeSentimentRequest {
  text: string;
}

export interface ExternalApiRequest {
  text: string;
  return_all_scores: boolean;
}

export interface ExternalApiResponse {
  status: string;
  output: {
    results: {
      label: SentimentLabelString;
      score: number;
    };
  };
}

export interface AnalyzeSentimentResponse {
  label: SentimentLabel | SentimentLabelString;
  labelText: SentimentLabelString;
  score: number;
  status: string;
}

export interface ErrorResponse {
  error: string;
  details?: any;
  receivedData?: any;
}
