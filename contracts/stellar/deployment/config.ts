export const STELLAR_CONFIG = {
  // Network Configuration
  NETWORK_PASSPHRASE: process.env.STELLAR_NETWORK_PASSPHRASE || 'Test SDF Network ; September 2015',
  RPC_URL: process.env.STELLAR_RPC_URL || 'https://soroban-testnet.stellar.org',
  
  // Contract Configuration
  REWARDS_CONTRACT_ID: process.env.REWARDS_CONTRACT_ID || '',
  ACHIEVEMENTS_CONTRACT_ID: process.env.ACHIEVEMENTS_CONTRACT_ID || '',
  IDENTITY_CONTRACT_ID: process.env.IDENTITY_CONTRACT_ID || '',
  
  // Reward Amounts (in stroops, 1 XLM = 10,000,000 stroops)
  REWARDS: {
    DAILY_CHECKIN: 10000000,    // 1 XLM
    STREAK_BONUS_7: 50000000,    // 5 XLM
    STREAK_BONUS_30: 200000000,  // 20 XLM
    ACHIEVEMENT_MILESTONE: 100000000, // 10 XLM
    REFERRAL_BONUS: 25000000     // 2.5 XLM
  },
  
  // Achievement Configuration
  ACHIEVEMENTS: {
    FIRST_CHECKIN: 'first_checkin',
    WEEK_WARRIOR: 'week_warrior',
    MONTH_CHAMPION: 'month_champion',
    JOURNALING_JUNKIE: 'journaling_junkie',
    MOOD_SHARER: 'mood_sharer',
    CONNECTED: 'connected'
  },
  
  // Identity Configuration
  IDENTITY: {
    PROOF_TIMEOUT: 300, // 5 minutes
    MAX_ORG_MEMBERS: 10000,
    ANONYMOUS_POST_COOLDOWN: 60 // 1 minute
  }
};

export const DEPLOYMENT_CONFIG = {
  // Server Configuration
  SERVER_SECRET: process.env.STELLAR_SERVER_SECRET || '',
  
  // Contract Deployment Settings
  GAS_LIMIT: 1000000,
  FEE: '100',
  TIMEOUT: 30,
  
  // Environment
  IS_TESTNET: process.env.NODE_ENV !== 'production',
  
  // Contract Upload Settings
  WASM_FILE_PATHS: {
    REWARDS: './target/wasm32-unknown-unknown/release/rewards.wasm',
    ACHIEVEMENTS: './target/wasm32-unknown-unknown/release/achievements.wasm',
    IDENTITY: './target/wasm32-unknown-unknown/release/identity.wasm'
  }
};

export const API_CONFIG = {
  // Rate Limiting
  RATE_LIMITS: {
    CHECKIN: '1 per day',
    POST: '5 per hour',
    ACHIEVEMENT_CLAIM: '10 per day'
  },
  
  // Validation Rules
  VALIDATION: {
    MIN_POST_LENGTH: 10,
    MAX_POST_LENGTH: 1000,
    MIN_JOURNAL_LENGTH: 50,
    MAX_JOURNAL_LENGTH: 10000
  }
};
