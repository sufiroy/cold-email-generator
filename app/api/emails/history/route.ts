import { NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/emails/history
 * Get email generation history for a user
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'userId is required' },
        { status: 400 }
      );
    }

    // In production, this would query Supabase
    // For now, return empty array
    return NextResponse.json({
      emails: [],
    });
  } catch (error) {
    console.error('History error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
