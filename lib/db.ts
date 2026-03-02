import { Pool } from '@neondatabase/serverless';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

export async function query(text: string, params?: any[]) {
  const client = await pool.connect();
  try {
    return await client.query(text, params);
  } finally {
    client.release();
  }
}

export async function getUser(userId: string) {
  const result = await query(
    'SELECT id, email, full_name, avatar_url, bio FROM users WHERE id = $1',
    [userId]
  );
  return result.rows[0] || null;
}

export async function getUserByEmail(email: string) {
  const result = await query(
    'SELECT id, email, password_hash, full_name FROM users WHERE email = $1',
    [email]
  );
  return result.rows[0] || null;
}

export async function createUser(email: string, passwordHash: string, fullName?: string) {
  const result = await query(
    'INSERT INTO users (email, password_hash, full_name) VALUES ($1, $2, $3) RETURNING id, email, full_name',
    [email, passwordHash, fullName || null]
  );
  return result.rows[0];
}

export async function getUserProfile(userId: string) {
  const result = await query(
    'SELECT * FROM profiles WHERE user_id = $1',
    [userId]
  );
  return result.rows[0] || null;
}

export async function createUserProfile(userId: string) {
  const result = await query(
    'INSERT INTO profiles (user_id) VALUES ($1) RETURNING *',
    [userId]
  );
  return result.rows[0];
}

export async function getEmotions() {
  const result = await query('SELECT * FROM emotions ORDER BY name');
  return result.rows;
}

export async function getEmotion(emotionId: string) {
  const result = await query('SELECT * FROM emotions WHERE id = $1', [emotionId]);
  return result.rows[0] || null;
}

export async function createCheckIn(userId: string, emotionId: string, intensity: number, notes?: string) {
  const result = await query(
    'INSERT INTO check_ins (user_id, emotion_id, intensity, notes) VALUES ($1, $2, $3, $4) RETURNING *',
    [userId, emotionId, intensity, notes || null]
  );
  return result.rows[0];
}

export async function getCheckIns(userId: string, limit: number = 7) {
  const result = await query(
    'SELECT ci.*, e.name, e.emoji, e.color FROM check_ins ci JOIN emotions e ON ci.emotion_id = e.id WHERE ci.user_id = $1 ORDER BY ci.created_at DESC LIMIT $2',
    [userId, limit]
  );
  return result.rows;
}

export async function getMoodPosts(limit: number = 20) {
  const result = await query(
    'SELECT mp.*, e.name, e.emoji, u.full_name FROM mood_posts mp JOIN emotions e ON mp.emotion_id = e.id JOIN users u ON mp.user_id = u.id ORDER BY mp.created_at DESC LIMIT $1',
    [limit]
  );
  return result.rows;
}

export async function createMoodPost(userId: string, emotionId: string, content: string, isAnonymous: boolean = false) {
  const result = await query(
    'INSERT INTO mood_posts (user_id, emotion_id, content, is_anonymous) VALUES ($1, $2, $3, $4) RETURNING *',
    [userId, emotionId, content, isAnonymous]
  );
  return result.rows[0];
}

export async function getOrganizations() {
  const result = await query('SELECT * FROM organizations ORDER BY rating DESC LIMIT 20');
  return result.rows;
}

export async function getOrganization(orgId: string) {
  const result = await query('SELECT * FROM organizations WHERE id = $1', [orgId]);
  return result.rows[0] || null;
}

export async function getTherapists(orgId?: string) {
  let query_text = 'SELECT t.*, o.name as org_name FROM therapists t LEFT JOIN organizations o ON t.organization_id = o.id';
  const params: any[] = [];
  
  if (orgId) {
    query_text += ' WHERE t.organization_id = $1';
    params.push(orgId);
  }
  
  query_text += ' ORDER BY t.rating DESC';
  
  const result = await query(query_text, params);
  return result.rows;
}

export async function getTherapist(therapistId: string) {
  const result = await query('SELECT * FROM therapists WHERE id = $1', [therapistId]);
  return result.rows[0] || null;
}

export async function createTherapistBooking(therapistId: string, userId: string, scheduledAt: Date) {
  const result = await query(
    'INSERT INTO therapist_bookings (therapist_id, user_id, scheduled_at) VALUES ($1, $2, $3) RETURNING *',
    [therapistId, userId, scheduledAt]
  );
  return result.rows[0];
}

export async function getUserBadges(userId: string) {
  const result = await query(
    'SELECT b.*, ub.earned_at FROM user_badges ub JOIN badges b ON ub.badge_id = b.id WHERE ub.user_id = $1 ORDER BY ub.earned_at DESC',
    [userId]
  );
  return result.rows;
}
