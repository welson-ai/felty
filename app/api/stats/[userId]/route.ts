import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await params;

    // Get mood distribution for the past month
    const moodDistResult = await query(
      `SELECT e.name as emotion, COUNT(*) as count
       FROM check_ins ci
       JOIN emotions e ON ci.emotion_id = e.id
       WHERE ci.user_id = $1 AND ci.created_at > NOW() - INTERVAL '30 days'
       GROUP BY e.name
       ORDER BY count DESC`,
      [userId]
    );

    const total = moodDistResult.rows.reduce((sum: number, row: any) => sum + row.count, 0);
    const moodDistribution = moodDistResult.rows.map((row: any) => ({
      emotion: row.emotion,
      count: row.count,
      percentage: total > 0 ? Math.round((row.count / total) * 100) : 0,
    }));

    // Get week trend
    const trendResult = await query(
      `SELECT DATE(ci.created_at) as day, COUNT(*) as count
       FROM check_ins ci
       WHERE ci.user_id = $1 AND ci.created_at > NOW() - INTERVAL '7 days'
       GROUP BY DATE(ci.created_at)
       ORDER BY day ASC`,
      [userId]
    );

    const weekTrend = trendResult.rows.map((row: any) => ({
      day: new Date(row.day).toLocaleDateString('en-US', { weekday: 'short' }),
      count: row.count,
    }));

    return NextResponse.json({
      moodDistribution,
      weekTrend,
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
}
