'use server';

import { createCheckIn, getCheckIns, getEmotions } from '@/lib/db';

export async function createCheckInAction(userId: string, emotionId: string, intensity: number, notes?: string) {
  try {
    if (!userId) {
      return { error: 'User ID required' };
    }

    const checkIn = await createCheckIn(userId, emotionId, intensity, notes);
    return { success: true, checkIn };
  } catch (error) {
    console.error('Error creating check-in:', error);
    return { error: 'Failed to create check-in' };
  }
}

export async function getCheckInsAction(userId: string) {
  try {
    if (!userId) {
      return { error: 'User ID required' };
    }

    const checkIns = await getCheckIns(userId);
    return { success: true, checkIns };
  } catch (error) {
    console.error('Error getting check-ins:', error);
    return { error: 'Failed to get check-ins' };
  }
}

export async function getEmotionsAction() {
  try {
    const emotions = await getEmotions();
    return { success: true, emotions };
  } catch (error) {
    console.error('Error getting emotions:', error);
    return { error: 'Failed to get emotions' };
  }
}
