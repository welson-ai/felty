'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface MoodData {
  emotion: string;
  count: number;
  percentage: number;
}

interface TrendData {
  day: string;
  count: number;
}

const EMOTION_COLORS: { [key: string]: string } = {
  happy: '#4ade80',
  sad: '#60a5fa',
  anxious: '#f97316',
  calm: '#8b5cf6',
  stressed: '#ef4444',
  neutral: '#6b7280',
};

export function MoodStats({ userId }: { userId: string }) {
  const [moodData, setMoodData] = useState<MoodData[]>([]);
  const [trendData, setTrendData] = useState<TrendData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/stats/${userId}`);
        if (response.ok) {
          const data = await response.json();
          setMoodData(data.moodDistribution);
          setTrendData(data.weekTrend);
        }
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  if (loading) {
    return <div className="text-muted-foreground">Loading your mood insights...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Mood Distribution</CardTitle>
          <CardDescription>Your emotions over the past month</CardDescription>
        </CardHeader>
        <CardContent>
          {moodData.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">Start checking in to see your mood patterns!</p>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={moodData}
                  dataKey="percentage"
                  nameKey="emotion"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {moodData.map((entry) => (
                    <Cell key={`cell-${entry.emotion}`} fill={EMOTION_COLORS[entry.emotion] || '#9ca3af'} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Check-in Trend</CardTitle>
          <CardDescription>Your check-ins over the past 7 days</CardDescription>
        </CardHeader>
        <CardContent>
          {trendData.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">No check-ins yet this week</p>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="var(--primary)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
