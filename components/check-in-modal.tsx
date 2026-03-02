'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { createCheckInAction, getEmotionsAction } from '@/app/actions/check-ins';
import { toast } from 'sonner';

interface Emotion {
  id: string;
  name: string;
  emoji: string;
}

interface CheckInModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
  userId?: string;
}

export function CheckInModal({ open, onOpenChange, onSuccess, userId }: CheckInModalProps) {
  const [emotions, setEmotions] = useState<Emotion[]>([]);
  const [selectedEmotionId, setSelectedEmotionId] = useState<string>('');
  const [intensity, setIntensity] = useState([5]);
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      loadEmotions();
    }
  }, [open]);

  const loadEmotions = async () => {
    const result = await getEmotionsAction();
    if (result.success && result.emotions) {
      setEmotions(result.emotions);
      if (result.emotions.length > 0) {
        setSelectedEmotionId(result.emotions[0].id);
      }
    }
  };

  const handleSubmit = async () => {
    if (!selectedEmotionId) {
      toast.error('Please select an emotion');
      return;
    }

    if (!userId) {
      toast.error('User not found');
      return;
    }

    setLoading(true);
    const result = await createCheckInAction(userId, selectedEmotionId, intensity[0], notes);

    if (result.success) {
      toast.success('Check-in saved!');
      setIntensity([5]);
      setNotes('');
      onOpenChange(false);
      onSuccess?.();
    } else {
      toast.error(result.error || 'Failed to save check-in');
    }
    setLoading(false);
  };

  const selectedEmotion = emotions.find(e => e.id === selectedEmotionId);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Daily Check-In</DialogTitle>
          <DialogDescription>How are you feeling today?</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Emotion Selection */}
          <div className="space-y-3">
            <Label>Select Your Emotion</Label>
            <div className="grid grid-cols-4 gap-3">
              {emotions.map((emotion) => (
                <button
                  key={emotion.id}
                  onClick={() => setSelectedEmotionId(emotion.id)}
                  className={`p-4 rounded-lg border-2 transition-all text-center ${
                    selectedEmotionId === emotion.id
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="text-3xl mb-1">{emotion.emoji}</div>
                  <div className="text-xs font-medium">{emotion.name}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Intensity Slider */}
          <div className="space-y-3">
            <Label>Intensity Level: {intensity[0]}/10</Label>
            <Slider
              value={intensity}
              onValueChange={setIntensity}
              min={1}
              max={10}
              step={1}
              className="w-full"
            />
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Notes (optional)</Label>
            <Textarea
              id="notes"
              placeholder="What's on your mind?"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="resize-none"
              rows={4}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 justify-end">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={loading}>
              {loading ? 'Saving...' : 'Save Check-In'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
