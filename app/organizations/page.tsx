'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/use-auth';
import { getOrganizationsAction } from '@/app/actions/organizations';
import { MapPin, Phone, Globe, Star } from 'lucide-react';

interface Organization {
  id: string;
  name: string;
  description: string;
  logo_url?: string;
  website_url?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  specializations?: string[];
  rating?: number;
}

export default function OrganizationsPage() {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    if (user) {
      loadOrganizations();
    }
  }, [user]);

  const loadOrganizations = async () => {
    const result = await getOrganizationsAction();
    if (result.success && result.organizations) {
      setOrganizations(result.organizations);
    }
    setPageLoading(false);
  };

  if (isLoading || pageLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin text-4xl mb-4">🌊</div>
          <p className="text-muted-foreground">Loading organizations...</p>
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
          <h1 className="text-3xl font-bold text-foreground mb-2">Mental Health Organizations</h1>
          <p className="text-muted-foreground">Find and connect with mental health providers in your area</p>
        </div>

        {/* Organizations Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {organizations.length === 0 ? (
            <Card className="md:col-span-2">
              <CardContent className="py-12 text-center">
                <div className="text-4xl mb-4">🏥</div>
                <p className="text-muted-foreground">No organizations available at this time</p>
              </CardContent>
            </Card>
          ) : (
            organizations.map((org) => (
              <Card key={org.id} className="hover:shadow-lg transition-shadow flex flex-col">
                <CardHeader>
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <CardTitle className="text-xl">{org.name}</CardTitle>
                      {org.rating && (
                        <div className="flex items-center gap-1 mt-1">
                          <div className="flex">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < Math.floor(org.rating || 0)
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : 'text-border'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-muted-foreground">{org.rating}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 space-y-3">
                  {org.description && (
                    <p className="text-sm text-foreground/80">{org.description}</p>
                  )}

                  {org.specializations && org.specializations.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-sm font-semibold">Specializations:</p>
                      <div className="flex flex-wrap gap-2">
                        {org.specializations.map((spec, i) => (
                          <span key={i} className="text-xs bg-secondary/50 px-2 py-1 rounded">
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="space-y-2 pt-2">
                    {org.address && (
                      <div className="flex items-start gap-2 text-sm">
                        <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0 text-muted-foreground" />
                        <span>
                          {org.address}
                          {org.city && `, ${org.city}`}
                          {org.state && `, ${org.state}`}
                        </span>
                      </div>
                    )}

                    {org.phone && (
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
                        <a href={`tel:${org.phone}`} className="hover:text-primary">
                          {org.phone}
                        </a>
                      </div>
                    )}

                    {org.website_url && (
                      <div className="flex items-center gap-2 text-sm">
                        <Globe className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
                        <a
                          href={org.website_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-primary"
                        >
                          Visit Website
                        </a>
                      </div>
                    )}
                  </div>

                  <Link href={`/therapists?org=${org.id}`}>
                    <Button className="w-full mt-4">View Therapists</Button>
                  </Link>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
