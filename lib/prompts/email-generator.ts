/**
 * Cold Email Generator - OpenAI Prompt Engineering
 * Generates highly converting cold emails using GPT-4o-mini
 */

export interface EmailGeneratorInput {
  senderName: string;
  senderService: string;
  prospectName: string;
  prospectCompany: string;
  prospectJobTitle: string;
  painPoint: string;
}

export interface GeneratedEmails {
  short: string;
  medium: string;
  professional: string;
}

/**
 * System prompt that defines the AI's role and behavior
 * Establishes email writing principles and structure
 */
export const SYSTEM_PROMPT = `You are an expert B2B cold email copywriter with 15+ years of experience.
You specialize in crafting high-converting cold emails that:

1. **Hook Immediately** - First sentence grabs attention with a specific, relevant insight or observation about the prospect
2. **Show Deep Research** - Reference something specific about their company, recent news, or industry trend
3. **Lead with Value** - Focus on THEIR problem and benefit, not your features
4. **Use Social Proof** - Mention results/clients when relevant, but only if credible
5. **Create Urgency** - Hint at market conditions, timing, or scarcity (but never false urgency)
6. **Keep It Concise** - Short, punchy sentences. Max 150 words for short, 250 for medium, 300 for professional
7. **One Clear CTA** - Ask for a specific small commitment (chat, call, demo)
8. **Use Conversational Tone** - Write like a human, not marketing robot
9. **Personalize Heavily** - Use their name, company details, and specific pain points
10. **End With Authenticity** - Sign with your real name, no corporate fluff

STRUCTURE FOR EACH EMAIL:
- Opening Hook (1-2 sentences that grab attention)
- Body (proof of value, specific benefit to them)
- CTA (clear ask)
- Signature (name + relevant detail)

Generate emails that feel personal, specific, and genuinely helpful - not spammy or pushy.`;

/**
 * Generates the user prompt based on their input
 * Creates specific, detailed instructions for the AI
 */
export function generateUserPrompt(input: EmailGeneratorInput): string {
  const { senderName, senderService, prospectName, prospectCompany, prospectJobTitle, painPoint } = input;

  return `Generate 3 cold email variations for the following scenario:

SENDER INFO:
- Name: ${senderName}
- What they offer: ${senderService}

PROSPECT INFO:
- Name: ${prospectName}
- Company: ${prospectCompany}
- Job Title: ${prospectJobTitle}

KEY PAIN POINT TO ADDRESS:
${painPoint}

GENERATE EXACTLY 3 EMAIL VARIATIONS:

1. SHORT VERSION (3-4 sentences, ~80-100 words)
   - Ultra-concise hook
   - One key benefit
   - Direct CTA
   Start with [SHORT EMAIL] and end with [END SHORT]

2. MEDIUM VERSION (5-8 sentences, ~180-200 words)
   - Strong opening that references their company/role
   - 2-3 specific benefits tailored to their pain point
   - Proof/credibility element
   - Clear CTA
   Start with [MEDIUM EMAIL] and end with [END MEDIUM]

3. PROFESSIONAL VERSION (Longer form, ~280-300 words)
   - Sophisticated opening with industry insight
   - Deep personalization with specific details
   - Multiple value propositions
   - Brief case study or results
   - Strong CTA with multiple options
   - Professional closing
   Start with [PROFESSIONAL EMAIL] and end with [END PROFESSIONAL]

IMPORTANT INSTRUCTIONS:
1. Make each email feel uniquely crafted, not just length variations
2. Use ${prospectName} and ${prospectCompany} in each version
3. Address the specific pain point: "${painPoint}"
4. Sign all emails with "${senderName}"
5. NO spam trigger words (guaranteed, free money, risk-free, act now)
6. NO excessive punctuation (!!!, ???, ...)
7. NO ALL CAPS sections
8. Make them feel human and conversational
9. Each should have a different angle/hook
10. Ensure professional tone while maintaining friendliness

Proceed with generating the 3 email variations:`;
}

/**
 * Validates user input before sending to OpenAI
 */
export function validateInput(input: EmailGeneratorInput): { valid: boolean; error?: string } {
  const { senderName, senderService, prospectName, prospectCompany, prospectJobTitle, painPoint } = input;

  if (!senderName?.trim()) return { valid: false, error: 'Your name is required' };
  if (senderName.length > 100) return { valid: false, error: 'Your name must be less than 100 characters' };

  if (!senderService?.trim()) return { valid: false, error: 'Your service/product is required' };
  if (senderService.length > 500) return { valid: false, error: 'Service description must be less than 500 characters' };

  if (!prospectName?.trim()) return { valid: false, error: 'Prospect name is required' };
  if (prospectName.length > 100) return { valid: false, error: 'Prospect name must be less than 100 characters' };

  if (!prospectCompany?.trim()) return { valid: false, error: 'Prospect company is required' };
  if (prospectCompany.length > 150) return { valid: false, error: 'Company name must be less than 150 characters' };

  if (!prospectJobTitle?.trim()) return { valid: false, error: 'Job title is required' };
  if (prospectJobTitle.length > 100) return { valid: false, error: 'Job title must be less than 100 characters' };

  if (!painPoint?.trim()) return { valid: false, error: 'Pain point is required' };
  if (painPoint.length > 500) return { valid: false, error: 'Pain point must be less than 500 characters' };
  if (painPoint.length < 20) return { valid: false, error: 'Pain point must be at least 20 characters' };

  return { valid: true };
}

/**
 * Parses the AI response and extracts the 3 email variations
 */
export function parseEmailsFromResponse(response: string): GeneratedEmails | null {
  try {
    // Extract SHORT EMAIL
    const shortMatch = response.match(/\[SHORT EMAIL\](.*?)\[END SHORT\]/is);
    if (!shortMatch) throw new Error('Could not find SHORT EMAIL section');
    const short = shortMatch[1].trim();

    // Extract MEDIUM EMAIL
    const mediumMatch = response.match(/\[MEDIUM EMAIL\](.*?)\[END MEDIUM\]/is);
    if (!mediumMatch) throw new Error('Could not find MEDIUM EMAIL section');
    const medium = mediumMatch[1].trim();

    // Extract PROFESSIONAL EMAIL
    const professionalMatch = response.match(/\[PROFESSIONAL EMAIL\](.*?)\[END PROFESSIONAL\]/is);
    if (!professionalMatch) throw new Error('Could not find PROFESSIONAL EMAIL section');
    const professional = professionalMatch[1].trim();

    // Validate that we have content
    if (!short || !medium || !professional) {
      throw new Error('One or more email sections are empty');
    }

    return { short, medium, professional };
  } catch (error) {
    console.error('Error parsing emails:', error);
    return null;
  }
}

/**
 * Cleans email text by removing extra whitespace and formatting
 */
export function cleanEmailText(text: string): string {
  return text
    .replace(/^\s+|\s+$/g, '') // Remove leading/trailing whitespace
    .replace(/\n\s*\n/g, '\n') // Remove multiple blank lines
    .replace(/\s+$/gm, '') // Remove trailing spaces from each line
    .trim();
}

/**
 * Format emails for display (add spacing between paragraphs)
 */
export function formatEmailForDisplay(email: string): string {
  return cleanEmailText(email);
}