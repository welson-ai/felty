-- Scroll Souls Database Schema
-- Emotional wellness platform with mood tracking, journaling, and therapist connections

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(255),
  avatar_url TEXT,
  bio TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User profiles (extended user info)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  age_range VARCHAR(50),
  timezone VARCHAR(50),
  preferred_language VARCHAR(50),
  notifications_enabled BOOLEAN DEFAULT true,
  privacy_level VARCHAR(50) DEFAULT 'private',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Emotions reference table
CREATE TABLE IF NOT EXISTS emotions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) UNIQUE NOT NULL,
  emoji VARCHAR(50),
  color VARCHAR(50),
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Daily check-ins
CREATE TABLE IF NOT EXISTS check_ins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  emotion_id UUID NOT NULL REFERENCES emotions(id),
  intensity INT DEFAULT 5,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Journal entries
CREATE TABLE IF NOT EXISTS journal_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255),
  content TEXT NOT NULL,
  mood_emotion_id UUID REFERENCES emotions(id),
  is_private BOOLEAN DEFAULT true,
  tags TEXT[],
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Mood posts (social mood wall)
CREATE TABLE IF NOT EXISTS mood_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  emotion_id UUID NOT NULL REFERENCES emotions(id),
  content TEXT,
  is_anonymous BOOLEAN DEFAULT false,
  likes_count INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Mood post likes
CREATE TABLE IF NOT EXISTS mood_post_likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES mood_posts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(post_id, user_id)
);

-- Organizations (mental health organizations)
CREATE TABLE IF NOT EXISTS organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  logo_url TEXT,
  website_url VARCHAR(255),
  email VARCHAR(255),
  phone VARCHAR(20),
  address TEXT,
  city VARCHAR(100),
  state VARCHAR(100),
  country VARCHAR(100),
  specializations TEXT[],
  rating DECIMAL(3,2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Therapists
CREATE TABLE IF NOT EXISTS therapists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  bio TEXT,
  photo_url TEXT,
  specializations TEXT[],
  languages VARCHAR[],
  license_number VARCHAR(255),
  rating DECIMAL(3,2),
  available BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Therapist availability/booking slots
CREATE TABLE IF NOT EXISTS therapist_bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  therapist_id UUID NOT NULL REFERENCES therapists(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  scheduled_at TIMESTAMP NOT NULL,
  duration_minutes INT DEFAULT 60,
  status VARCHAR(50) DEFAULT 'scheduled',
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Badges/achievements
CREATE TABLE IF NOT EXISTS badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  icon_url TEXT,
  criteria TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User badges (earned achievements)
CREATE TABLE IF NOT EXISTS user_badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  badge_id UUID NOT NULL REFERENCES badges(id) ON DELETE CASCADE,
  earned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, badge_id)
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_check_ins_user_id ON check_ins(user_id);
CREATE INDEX IF NOT EXISTS idx_check_ins_created_at ON check_ins(created_at);
CREATE INDEX IF NOT EXISTS idx_journal_entries_user_id ON journal_entries(user_id);
CREATE INDEX IF NOT EXISTS idx_journal_entries_created_at ON journal_entries(created_at);
CREATE INDEX IF NOT EXISTS idx_mood_posts_user_id ON mood_posts(user_id);
CREATE INDEX IF NOT EXISTS idx_mood_posts_created_at ON mood_posts(created_at);
CREATE INDEX IF NOT EXISTS idx_therapist_bookings_user_id ON therapist_bookings(user_id);
CREATE INDEX IF NOT EXISTS idx_therapist_bookings_therapist_id ON therapist_bookings(therapist_id);

-- Insert default emotions
INSERT INTO emotions (name, emoji, color, description) VALUES
('Happy', '😊', '#FFD700', 'Feeling joyful and content'),
('Sad', '😢', '#4169E1', 'Feeling down or melancholic'),
('Anxious', '😰', '#FF6347', 'Feeling worried or stressed'),
('Calm', '😌', '#90EE90', 'Feeling peaceful and relaxed'),
('Angry', '😠', '#DC143C', 'Feeling frustrated or irritated'),
('Grateful', '🙏', '#FF69B4', 'Feeling thankful and appreciative'),
('Energetic', '⚡', '#FFD700', 'Feeling active and motivated'),
('Tired', '😴', '#696969', 'Feeling exhausted or fatigued')
ON CONFLICT (name) DO NOTHING;

-- Insert sample badges
INSERT INTO badges (name, description, criteria) VALUES
('First Check-in', 'Complete your first daily check-in', 'Complete 1 check-in'),
('Week Warrior', 'Complete check-ins for 7 consecutive days', 'Complete 7 consecutive check-ins'),
('Journaling Junkie', 'Write 10 journal entries', 'Write 10 journal entries'),
('Mood Sharer', 'Post 5 moods on the mood wall', 'Post 5 mood posts'),
('Connected', 'Connect with a therapist', 'Book a therapist appointment')
ON CONFLICT (name) DO NOTHING;
