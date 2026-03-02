'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/hooks/use-auth';
import { getJournalEntriesAction, createJournalEntryAction } from '@/app/actions/journal';
import { getEmotionsAction } from '@/app/actions/check-ins';
import { toast } from 'sonner';

interface JournalEntry {
  id: string;
  title: string;
  content: string;
  emotion_name?: string;
  emoji?: string;
  is_private: boolean;
  tags: string[];
  created_at: string;
}

interface Emotion {
  id: string;
  name: string;
  emoji: string;
}

export default function JournalPage() {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [emotions, setEmotions] = useState<Emotion[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Form state
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedEmotion, setSelectedEmotion] = useState('');
  const [isPrivate, setIsPrivate] = useState(true);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    if (user) {
      loadEntries();
      loadEmotions();
    }
  }, [user]);

  const loadEntries = async () => {
    if (!user?.id) return;
    const result = await getJournalEntriesAction(user.id);
    if (result.success && result.entries) {
      setEntries(result.entries);
    }
    setLoading(false);
  };

  const loadEmotions = async () => {
    const result = await getEmotionsAction();
    if (result.success && result.emotions) {
      setEmotions(result.emotions);
    }
  };

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (!user?.id) {
      toast.error('User not found');
      return;
    }

    setSubmitting(true);
    const result = await createJournalEntryAction(
      user.id,
      title,
      content,
      selectedEmotion || undefined,
      isPrivate
    );

    if (result.success) {
      toast.success('Journal entry saved!');
      setTitle('');
      setContent('');
      setSelectedEmotion('');
      setIsPrivate(true);
      setDialogOpen(false);
      loadEntries();
    } else {
      toast.error(result.error || 'Failed to save entry');
    }
    setSubmitting(false);
  };

  if (isLoading || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin text-4xl mb-4">🌊</div>
          <p className="text-muted-foreground">Loading your journal...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background md:pt-0 pt-16">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">My Journal</h1>
            <p className="text-muted-foreground">Record your thoughts and feelings</p>
          </div>
          <Button onClick={() => setDialogOpen(true)}>
            ✍️ New Entry
          </Button>
        </div>

        {/* Entries */}
        <div className="space-y-4">
          {entries.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <div className="text-4xl mb-4">📝</div>
                <p className="text-muted-foreground mb-4">No journal entries yet</p>
                <Button onClick={() => setDialogOpen(true)}>Create Your First Entry</Button>
              </CardContent>
            </Card>
          ) : (
            entries.map((entry) => (
              <Card key={entry.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        {entry.emoji && <span className="text-2xl">{entry.emoji}</span>}
                        <div>
                          <CardTitle>{entry.title}</CardTitle>
                          <CardDescription className="text-xs">
                            {new Date(entry.created_at).toLocaleDateString('en-US', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                            {entry.emotion_name && ` • Feeling: ${entry.emotion_name}`}
                          </CardDescription>
                        </div>
                      </div>
                    </div>
                    {entry.is_private && (
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                        Private
                      </span>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-foreground/80 line-clamp-3 mb-3">{entry.content}</p>
                  {entry.tags && entry.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {entry.tags.map((tag) => (
                        <span key={tag} className="text-xs bg-secondary/50 px-2 py-1 rounded">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>

      {/* New Entry Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>New Journal Entry</DialogTitle>
            <DialogDescription>Write down your thoughts and feelings</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Give your entry a title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                placeholder="Start writing..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={6}
                className="resize-none"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="emotion">How are you feeling? (optional)</Label>
              <select
                id="emotion"
                value={selectedEmotion}
                onChange={(e) => setSelectedEmotion(e.target.value)}
                className="w-full px-3 py-2 border border-input rounded-md bg-background"
              >
                <option value="">Select an emotion...</option>
                {emotions.map((emotion) => (
                  <option key={emotion.id} value={emotion.id}>
                    {emotion.emoji} {emotion.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="private"
                checked={isPrivate}
                onChange={(e) => setIsPrivate(e.target.checked)}
                className="rounded"
              />
              <Label htmlFor="private" className="font-normal cursor-pointer">
                Keep this entry private
              </Label>
            </div>

            <div className="flex gap-3 justify-end pt-4">
              <Button variant="outline" onClick={() => setDialogOpen(false)} disabled={submitting}>
                Cancel
              </Button>
              <Button onClick={handleSubmit} disabled={submitting}>
                {submitting ? 'Saving...' : 'Save Entry'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
