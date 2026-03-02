'use server';

import { query } from '@/lib/db';

export async function createJournalEntryAction(
  userId: string,
  title: string,
  content: string,
  emotionId?: string,
  isPrivate: boolean = true,
  tags: string[] = []
) {
  try {
    if (!userId) {
      return { error: 'User ID required' };
    }

    const result = await query(
      'INSERT INTO journal_entries (user_id, title, content, mood_emotion_id, is_private, tags) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [userId, title, content, emotionId || null, isPrivate, tags]
    );

    return { success: true, entry: result.rows[0] };
  } catch (error) {
    console.error('Error creating journal entry:', error);
    return { error: 'Failed to create journal entry' };
  }
}

export async function getJournalEntriesAction(userId: string) {
  try {
    if (!userId) {
      return { error: 'User ID required' };
    }

    const result = await query(
      'SELECT je.*, e.name as emotion_name, e.emoji FROM journal_entries je LEFT JOIN emotions e ON je.mood_emotion_id = e.id WHERE je.user_id = $1 ORDER BY je.created_at DESC',
      [userId]
    );

    return { success: true, entries: result.rows };
  } catch (error) {
    console.error('Error getting journal entries:', error);
    return { error: 'Failed to get journal entries' };
  }
}
