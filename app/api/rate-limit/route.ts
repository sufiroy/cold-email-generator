import { NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/rate-limit
 * Check daily email generation limit
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get('userId');
    const plan = searchParams.get('plan') || 'free';

    if (!userId) {
      return NextResponse.json(
        { error: 'userId is required' },
        { status: 400 }
      );
    }

    const DAILY_LIMITS = {
      free: 3,
      pro: Infinity,
    };

    const limit = DAILY_LIMITS[plan as keyof typeof DAILY_LIMITS] || 3;

    // For demo purposes, return mock data
    // In production, this would query Supabase
    const used = 0;
    const remaining = limit - used;

    return NextResponse.json({
      allowed: remaining > 0,
      used,
      limit,
      remaining: Math.max(0, remaining),
    });
  } catch (error) {
    console.error('Rate limit error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/rate-limit
 * Record email generation for rate limiting
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId } = body;

    if (!userId) {
      return NextResponse.json(
        { error: 'userId is required' },
        { status: 400 }
      );
    }

    // In production, this would update Supabase
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Rate limit error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
