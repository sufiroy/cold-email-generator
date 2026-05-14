/**
 * Global type definitions
 */

export interface User {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
  plan: 'free' | 'pro';
  createdAt: Date;
  emailsGeneratedToday: number;
  emailsGeneratedTotal: number;
}

export interface EmailGenerationRequest {
  senderName: string;
  senderService: string;
  prospectName: string;
  prospectCompany: string;
  prospectJobTitle: string;
  painPoint: string;
}

export interface EmailVariation {
  type: 'short' | 'medium' | 'professional';
  content: string;
  characterCount: number;
  sentenceCount: number;
}

export interface GeneratedEmailsResponse {
  id: string;
  userId: string;
  request: EmailGenerationRequest;
  variations: {
    short: EmailVariation;
    medium: EmailVariation;
    professional: EmailVariation;
  };
  createdAt: Date;
  tokenUsage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
    estimatedCost: number;
  };
}
