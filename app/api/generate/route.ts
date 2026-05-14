import { NextRequest, NextResponse } from 'next/server';
import { generateColdEmails } from '@/lib/api/openai';
import { EmailGeneratorInput } from '@/lib/types';

/**
 * POST /api/generate
 * Generates cold email variations using OpenAI
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as EmailGeneratorInput;

    // Validate required fields
    if (!body.senderName || !body.senderService || !body.prospectName || 
        !body.prospectCompany || !body.prospectJobTitle || !body.painPoint) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Call OpenAI to generate emails
    const result = await generateColdEmails(body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      emails: result.emails,
      usage: result.usage,
    });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
