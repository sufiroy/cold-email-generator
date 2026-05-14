/**
 * OpenAI API Integration
 * Handles communication with GPT-4o-mini for cold email generation
 */

import { EmailGeneratorInput, GeneratedEmails, SYSTEM_PROMPT, generateUserPrompt, parseEmailsFromResponse, validateInput } from '@/lib/prompts/email-generator';

export interface GenerateEmailsResponse {
  success: boolean;
  emails?: GeneratedEmails;
  error?: string;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

/**
 * Main function to generate cold emails using OpenAI
 * This should be called from an API route
 */
export async function generateColdEmails(input: EmailGeneratorInput): Promise<GenerateEmailsResponse> {
  try {
    // Validate input
    const validation = validateInput(input);
    if (!validation.valid) {
      return {
        success: false,
        error: validation.error,
      };
    }

    // Check OpenAI API key
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return {
        success: false,
        error: 'OpenAI API key is not configured',
      };
    }

    // Generate user prompt
    const userPrompt = generateUserPrompt(input);

    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: SYSTEM_PROMPT,
          },
          {
            role: 'user',
            content: userPrompt,
          },
        ],
        temperature: 0.8, // Slightly creative but consistent
        max_tokens: 2000, // Enough for all 3 variations
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenAI API error:', errorData);
      return {
        success: false,
        error: `OpenAI API error: ${errorData.error?.message || 'Unknown error'}`,
      };
    }

    const data = await response.json();
    const aiResponse = data.choices[0]?.message?.content;

    if (!aiResponse) {
      return {
        success: false,
        error: 'No response from OpenAI',
      };
    }

    // Parse the response
    const emails = parseEmailsFromResponse(aiResponse);

    if (!emails) {
      return {
        success: false,
        error: 'Failed to parse generated emails. Please try again.',
      };
    }

    return {
      success: true,
      emails,
      usage: {
        prompt_tokens: data.usage.prompt_tokens,
        completion_tokens: data.usage.completion_tokens,
        total_tokens: data.usage.total_tokens,
      },
    };
  } catch (error) {
    console.error('Error generating emails:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unexpected error occurred',
    };
  }
}

/**
 * Calculates the cost of API usage
 * GPT-4o-mini pricing: $0.15 per 1M input tokens, $0.60 per 1M output tokens
 */
export function calculateTokenCost(promptTokens: number, completionTokens: number): number {
  const inputCost = (promptTokens / 1000000) * 0.15;
  const outputCost = (completionTokens / 1000000) * 0.60;
  return inputCost + outputCost;
}