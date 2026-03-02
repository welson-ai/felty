'use server';

import {
  getOrganizations,
  getOrganization,
  getTherapists,
  getTherapist,
  createTherapistBooking,
} from '@/lib/db';

export async function getOrganizationsAction() {
  try {
    const organizations = await getOrganizations();
    return { success: true, organizations };
  } catch (error) {
    console.error('Error getting organizations:', error);
    return { error: 'Failed to get organizations' };
  }
}

export async function getOrganizationAction(orgId: string) {
  try {
    const organization = await getOrganization(orgId);
    if (!organization) {
      return { error: 'Organization not found' };
    }
    return { success: true, organization };
  } catch (error) {
    console.error('Error getting organization:', error);
    return { error: 'Failed to get organization' };
  }
}

export async function getTherapistsAction(orgId?: string) {
  try {
    const therapists = await getTherapists(orgId);
    return { success: true, therapists };
  } catch (error) {
    console.error('Error getting therapists:', error);
    return { error: 'Failed to get therapists' };
  }
}

export async function getTherapistAction(therapistId: string) {
  try {
    const therapist = await getTherapist(therapistId);
    if (!therapist) {
      return { error: 'Therapist not found' };
    }
    return { success: true, therapist };
  } catch (error) {
    console.error('Error getting therapist:', error);
    return { error: 'Failed to get therapist' };
  }
}

export async function bookTherapistAction(therapistId: string, scheduledAt: string) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth-token')?.value;

    if (!token) {
      return { error: 'Unauthorized' };
    }

    const payload = await verifyToken(token);
    if (!payload) {
      return { error: 'Invalid token' };
    }

    const booking = await createTherapistBooking(
      therapistId,
      payload.userId as string,
      new Date(scheduledAt)
    );

    return { success: true, booking };
  } catch (error) {
    console.error('Error booking therapist:', error);
    return { error: 'Failed to book therapist' };
  }
}
