'use server';

import { query } from '@/lib/db';

export async function updateProfile(
  userId: string,
  {
    full_name,
    bio,
    theme_preference,
  }: {
    full_name: string;
    bio: string;
    theme_preference: string;
  }
) {
  try {
    if (!userId) {
      throw new Error('User ID required');
    }

    await query(
      `UPDATE profiles SET full_name = $1, bio = $2, theme_preference = $3, updated_at = CURRENT_TIMESTAMP WHERE user_id = $4`,
      [full_name, bio, theme_preference, userId]
    );

    return { success: true };
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
}
