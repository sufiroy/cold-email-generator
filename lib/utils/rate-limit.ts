/**
 * Rate limiting utility
 * Tracks daily email generation limits
 */

export const DAILY_LIMITS = {
  free: 3,
  pro: Infinity,
} as const;

export type PlanType = keyof typeof DAILY_LIMITS;

/**
 * Check if user has exceeded their daily limit
 */
export async function checkDailyLimit(userId: string, plan: PlanType): Promise<{
  allowed: boolean;
  used: number;
  limit: number;
  remaining: number;
}> {
  try {
    const response = await fetch(`/api/rate-limit?userId=${userId}&plan=${plan}`);
    if (!response.ok) {
      throw new Error('Failed to check rate limit');
    }
    return await response.json();
  } catch (error) {
    console.error('Error checking rate limit:', error);
    // Default to allowing on error (fail open)
    return {
      allowed: true,
      used: 0,
      limit: DAILY_LIMITS[plan],
      remaining: DAILY_LIMITS[plan],
    };
  }
}

/**
 * Record email generation for rate limiting
 */
export async function recordEmailGeneration(userId: string): Promise<boolean> {
  try {
    const response = await fetch('/api/rate-limit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId }),
    });
    return response.ok;
  } catch (error) {
    console.error('Error recording email generation:', error);
    return false;
  }
}