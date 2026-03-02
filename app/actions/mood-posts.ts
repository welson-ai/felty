'use server';

import { createMoodPost, getMoodPosts } from '@/lib/db';

export async function createMoodPostAction(
  userId: string,
  emotionId: string,
  content: string,
  isAnonymous: boolean = false
) {
  try {
    if (!userId) {
      return { error: 'User ID required' };
    }

    const post = await createMoodPost(userId, emotionId, content, isAnonymous);
    return { success: true, post };
  } catch (error) {
    console.error('Error creating mood post:', error);
    return { error: 'Failed to create mood post' };
  }
}

export async function getMoodPostsAction() {
  try {
    const posts = await getMoodPosts();
    return { success: true, posts };
  } catch (error) {
    console.error('Error getting mood posts:', error);
    return { error: 'Failed to get mood posts' };
  }
}
