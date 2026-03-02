'use client';

import { Suspense, useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useAuth } from '@/hooks/use-auth';
import { getTherapistsAction, bookTherapistAction } from '@/app/actions/organizations';
import { Star } from 'lucide-react';
import { toast } from 'sonner';

interface Therapist {
  id: string;
  name: string;
  bio?: string;
  photo_url?: string;
  specializations?: string[];
  languages?: string[];
  license_number?: string;
  rating?: number;
  available: boolean;
  org_name?: string;
}

function TherapistsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, isLoading } = useAuth();
  const [therapists, setTherapists] = useState<Therapist[]>([]);
  const [pageLoading, setPageLoading] = useState(true);
  const [selectedTherapist, setSelectedTherapist] = useState<Therapist | null>(null);
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [bookingLoading, setBookingLoading] = useState(false);

  const orgId = searchParams.get('org');

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    if (user) {
      loadTherapists();
    }
  }, [user, orgId]);

  const loadTherapists = async () => {
    const result = await getTherapistsAction(orgId || undefined);
    if (result.success && result.therapists) {
      setTherapists(result.therapists);
    }
    setPageLoading(false);
  };

  const handleBooking = async () => {
    if (!selectedTherapist || !bookingDate || !bookingTime) {
      toast.error('Please fill in all fields');
      return;
    }

    setBookingLoading(true);
    const scheduledAt = new Date(`${bookingDate}T${bookingTime}`).toISOString();
    const result = await bookTherapistAction(selectedTherapist.id, scheduledAt);

    if (result.success) {
      toast.success('Booking confirmed! Check your email for details.');
      setSelectedTherapist(null);
      setBookingDate('');
      setBookingTime('');
    } else {
      toast.error(result.error || 'Failed to book therapist');
    }
    setBookingLoading(false);
  };

  if (isLoading || pageLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin text-4xl mb-4">🌊</div>
          <p className="text-muted-foreground">Loading therapists...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background md:pt-0 pt-16">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/organizations">
            <Button variant="ghost" className="mb-4">← Back to Organizations</Button>
          </Link>
          <h1 className="text-3xl font-bold text-foreground mb-2">Licensed Therapists</h1>
          <p className="text-muted-foreground">Connect with professional mental health providers</p>
        </div>

        {/* Therapists Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {therapists.length === 0 ? (
            <Card className="md:col-span-2">
              <CardContent className="py-12 text-center">
                <div className="text-4xl mb-4">👥</div>
                <p className="text-muted-foreground">No therapists available</p>
              </CardContent>
            </Card>
          ) : (
            therapists.map((therapist) => (
              <Card key={therapist.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex gap-4">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-2xl flex-shrink-0">
                      👨‍⚕️
                    </div>
                    <div className="flex-1">
                      <CardTitle>{therapist.name}</CardTitle>
                      {therapist.org_name && (
                        <CardDescription>{therapist.org_name}</CardDescription>
                      )}
                      {therapist.rating && (
                        <div className="flex items-center gap-1 mt-2">
                          <div className="flex">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < Math.floor(therapist.rating || 0)
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : 'text-border'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-muted-foreground">{therapist.rating}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-3">
                  {therapist.bio && (
                    <p className="text-sm text-foreground/80">{therapist.bio}</p>
                  )}

                  {therapist.specializations && therapist.specializations.length > 0 && (
                    <div>
                      <p className="text-sm font-semibold mb-2">Specializations:</p>
                      <div className="flex flex-wrap gap-2">
                        {therapist.specializations.map((spec, i) => (
                          <span key={i} className="text-xs bg-secondary/50 px-2 py-1 rounded">
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {therapist.languages && therapist.languages.length > 0 && (
                    <div>
                      <p className="text-sm font-semibold mb-2">Languages:</p>
                      <p className="text-sm text-muted-foreground">
                        {therapist.languages.join(', ')}
                      </p>
                    </div>
                  )}

                  {therapist.license_number && (
                    <div>
                      <p className="text-xs text-muted-foreground">
                        License: {therapist.license_number}
                      </p>
                    </div>
                  )}

                  <div className="pt-2 flex gap-2">
                    <Button
                      className="flex-1"
                      onClick={() => setSelectedTherapist(therapist)}
                      disabled={!therapist.available}
                    >
                      {therapist.available ? 'Book Session' : 'Unavailable'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>

      {/* Booking Dialog */}
      <Dialog open={!!selectedTherapist} onOpenChange={(open) => !open && setSelectedTherapist(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Book Session with {selectedTherapist?.name}</DialogTitle>
            <DialogDescription>Schedule your therapy session</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Preferred Date</label>
              <input
                type="date"
                value={bookingDate}
                onChange={(e) => setBookingDate(e.target.value)}
                className="w-full px-3 py-2 border border-input rounded-md"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Preferred Time</label>
              <input
                type="time"
                value={bookingTime}
                onChange={(e) => setBookingTime(e.target.value)}
                className="w-full px-3 py-2 border border-input rounded-md"
              />
            </div>

            <div className="flex gap-3 justify-end pt-4">
              <Button
                variant="outline"
                onClick={() => setSelectedTherapist(null)}
                disabled={bookingLoading}
              >
                Cancel
              </Button>
              <Button onClick={handleBooking} disabled={bookingLoading}>
                {bookingLoading ? 'Booking...' : 'Confirm Booking'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default function TherapistsPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin text-4xl mb-4">🌊</div>
          <p className="text-muted-foreground">Loading therapists...</p>
        </div>
      </div>
    }>
      <TherapistsContent />
    </Suspense>
  );
}
