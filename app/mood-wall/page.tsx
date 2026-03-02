'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/use-auth';
import { getMoodPostsAction, createMoodPostAction } from '@/app/actions/mood-posts';
import { getEmotionsAction } from '@/app/actions/check-ins';
import { toast } from 'sonner';

interface MoodPost {
  id: string;
  emotion_id: string;
  name: string;
  emoji: string;
  content: string;
  is_anonymous: boolean;
  full_name?: string;
  created_at: string;
}

interface Emotion {
  id: string;
  name: string;
  emoji: string;
}

export default function MoodWallPage() {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const [posts, setPosts] = useState<MoodPost[]>([]);
  const [emotions, setEmotions] = useState<Emotion[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Form state
  const [selectedEmotion, setSelectedEmotion] = useState('');
  const [content, setContent] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    if (user) {
      loadPosts();
      loadEmotions();
    }
  }, [user]);

  const loadPosts = async () => {
    const result = await getMoodPostsAction();
    if (result.success && result.posts) {
      setPosts(result.posts);
    }
    setLoading(false);
  };

  const loadEmotions = async () => {
    const result = await getEmotionsAction();
    if (result.success && result.emotions) {
      setEmotions(result.emotions);
      if (result.emotions.length > 0) {
        setSelectedEmotion(result.emotions[0].id);
      }
    }
  };

  const handleSubmit = async () => {
    if (!selectedEmotion || !content.trim()) {
      toast.error('Please select an emotion and add content');
      return;
    }

    if (!user?.id) {
      toast.error('User not found');
      return;
    }

    setSubmitting(true);
    const result = await createMoodPostAction(user.id, selectedEmotion, content, isAnonymous);

    if (result.success) {
      toast.success('Mood posted to the wall!');
      setContent('');
      setIsAnonymous(false);
      setDialogOpen(false);
      loadPosts();
    } else {
      toast.error(result.error || 'Failed to post mood');
    }
    setSubmitting(false);
  };

  if (isLoading || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin text-4xl mb-4">🌊</div>
          <p className="text-muted-foreground">Loading the mood wall...</p>
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
            <h1 className="text-3xl font-bold text-foreground">Mood Wall</h1>
            <p className="text-muted-foreground">Share your feelings with the community</p>
          </div>
          <Button onClick={() => setDialogOpen(true)}>
            💬 Share Your Mood
          </Button>
        </div>

        {/* Posts Grid */}
        <div className="grid gap-4">
          {posts.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <div className="text-4xl mb-4">🌊</div>
                <p className="text-muted-foreground mb-4">No moods shared yet</p>
                <Button onClick={() => setDialogOpen(true)}>Be the first to share</Button>
              </CardContent>
            </Card>
          ) : (
            posts.map((post) => (
              <Card key={post.id} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex gap-4">
                    <div className="text-3xl flex-shrink-0">{post.emoji}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{post.name}</h3>
                          <span className="text-sm text-muted-foreground">
                            {post.is_anonymous ? 'Anonymous' : post.full_name || 'User'}
                          </span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {new Date(post.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-foreground/80">{post.content}</p>
                      <div className="flex gap-4 mt-3">
                        <button className="text-sm text-muted-foreground hover:text-primary transition-colors">
                          ❤️ Like
                        </button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>

      {/* Share Mood Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Share Your Mood</DialogTitle>
            <DialogDescription>Let the community know how you're feeling</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Select Your Emotion</Label>
              <div className="grid grid-cols-4 gap-2">
                {emotions.map((emotion) => (
                  <button
                    key={emotion.id}
                    onClick={() => setSelectedEmotion(emotion.id)}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      selectedEmotion === emotion.id
                        ? 'border-primary bg-primary/10'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="text-2xl mb-1">{emotion.emoji}</div>
                    <div className="text-xs">{emotion.name}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Your Thought</Label>
              <Textarea
                id="content"
                placeholder="Share what's on your mind..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={4}
                className="resize-none"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="anonymous"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
                className="rounded"
              />
              <Label htmlFor="anonymous" className="font-normal cursor-pointer">
                Post anonymously
              </Label>
            </div>

            <div className="flex gap-3 justify-end pt-4">
              <Button variant="outline" onClick={() => setDialogOpen(false)} disabled={submitting}>
                Cancel
              </Button>
              <Button onClick={handleSubmit} disabled={submitting}>
                {submitting ? 'Posting...' : 'Post to Wall'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
