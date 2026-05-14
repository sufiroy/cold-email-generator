import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/emails/save
 * Save generated emails to user's history
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, senderName, prospectName, prospectCompany, emails } = body;

    if (!userId || !emails) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // In production, this would save to Supabase
    const emailRecord = {
      id: Math.random().toString(36).substring(7),
      createdAt: new Date(),
      senderName,
      prospectName,
      prospectCompany,
      emails,
    };

    return NextResponse.json(emailRecord);
  } catch (error) {
    console.error('Save error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
