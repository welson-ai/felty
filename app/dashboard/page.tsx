'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckInModal } from '@/components/check-in-modal';
import { useAuth } from '@/hooks/use-auth';
import { getCheckInsAction, getEmotionsAction } from '@/app/actions/check-ins';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface CheckIn {
  id: string;
  emotion_id: string;
  name: string;
  emoji: string;
  intensity: number;
  notes: string;
  created_at: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const [checkIns, setCheckIns] = useState<CheckIn[]>([]);
  const [chartData, setChartData] = useState<any[]>([]);
  const [checkInModalOpen, setCheckInModalOpen] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    if (user) {
      loadCheckIns();
    }
  }, [user]);

  const loadCheckIns = async () => {
    if (!user?.id) return;
    setPageLoading(true);
    const result = await getCheckInsAction(user.id);
    if (result.success && result.checkIns) {
      setCheckIns(result.checkIns);
      // Prepare chart data
      const data = result.checkIns.map((ci: CheckIn, index: number) => ({
        day: `Day ${index + 1}`,
        intensity: ci.intensity,
        emotion: ci.name,
      }));
      setChartData(data);
    }
    setPageLoading(false);
  };

  if (isLoading || pageLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin text-4xl mb-4">🌊</div>
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Welcome back, {user.fullName}!</h1>
            <p className="text-muted-foreground">Track your emotional wellness journey</p>
          </div>
          <Button onClick={() => setCheckInModalOpen(true)}>
            ✨ New Check-In
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Check-Ins</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{checkIns.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">This Week</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {checkIns.filter(ci => {
                  const date = new Date(ci.created_at);
                  const weekAgo = new Date();
                  weekAgo.setDate(weekAgo.getDate() - 7);
                  return date >= weekAgo;
                }).length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Streak</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">🔥 3</div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        {chartData.length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Intensity Trend</CardTitle>
              <CardDescription>Your emotional intensity over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis domain={[1, 10]} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="intensity" stroke="#8b5cf6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}

        {/* Recent Check-Ins */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Check-Ins</CardTitle>
            <CardDescription>Your latest emotional check-ins</CardDescription>
          </CardHeader>
          <CardContent>
            {checkIns.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <p>No check-ins yet. Start by creating your first check-in!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {checkIns.map((checkIn) => (
                  <div key={checkIn.id} className="flex items-start gap-4 p-4 rounded-lg border border-border/50 hover:bg-accent/50 transition-colors">
                    <div className="text-3xl">{checkIn.emoji}</div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h4 className="font-semibold">{checkIn.name}</h4>
                        <span className="text-sm text-muted-foreground">
                          {new Date(checkIn.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm text-muted-foreground">Intensity:</span>
                        <div className="flex gap-1">
                          {Array.from({ length: 10 }).map((_, i) => (
                            <div
                              key={i}
                              className={`h-2 w-2 rounded-full ${
                                i < checkIn.intensity ? 'bg-primary' : 'bg-border'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      {checkIn.notes && (
                        <p className="text-sm text-muted-foreground italic">{checkIn.notes}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <CheckInModal
        open={checkInModalOpen}
        onOpenChange={setCheckInModalOpen}
        onSuccess={loadCheckIns}
        userId={user?.id}
      />
    </div>
  );
}
