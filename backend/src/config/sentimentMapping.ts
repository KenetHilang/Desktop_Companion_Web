// Sentiment mapping constants

import { SentimentLabel, SentimentMapping, SentimentLabelString } from "../types/sentiment.types";

export const sentimentMapping: SentimentMapping = {
  "Very Negative": SentimentLabel.VeryNegative,
  Negative: SentimentLabel.Negative,
  Neutral: SentimentLabel.Neutral,
  Positive: SentimentLabel.Positive,
  "Very Positive": SentimentLabel.VeryPositive,
};

/**
 * Convert a sentiment label string to its numeric value if it exists in the mapping
 * @param labelString - The sentiment label as a string
 * @returns The numeric sentiment value or the original string
 */
export function convertLabelToNumber(
  labelString: SentimentLabelString
): SentimentLabel | SentimentLabelString {
  if (labelString in sentimentMapping) {
    return sentimentMapping[labelString];
  }
  return labelString;
}
