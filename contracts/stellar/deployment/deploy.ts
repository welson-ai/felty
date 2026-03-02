import { RewardsContract } from '../stellar/rewards';
import { AchievementsContract } from '../stellar/achievements';
import { IdentityContract } from '../stellar/identity';
import { Keypair } from '@stellar/stellar-sdk';
import * as dotenv from 'dotenv';

dotenv.config();

const RPC_URL = process.env.STELLAR_RPC_URL || 'https://soroban-testnet.stellar.org';
const NETWORK_PASSPHRASE = process.env.STELLAR_NETWORK_PASSPHRASE || 'Test SDF Network ; September 2015';
const SERVER_SECRET = process.env.STELLAR_SERVER_SECRET || '';

if (!SERVER_SECRET) {
  throw new Error('STELLAR_SERVER_SECRET environment variable is required');
}

const serverKey = Keypair.fromSecret(SERVER_SECRET);

async function deployContracts() {
  console.log('Starting contract deployment...');
  
  try {
    // Deploy Rewards Contract
    console.log('Deploying Rewards Contract...');
    const rewardsContract = new RewardsContract(
      'REWARDS_CONTRACT_ID', // Will be replaced with actual deployed contract ID
      RPC_URL,
      SERVER_SECRET
    );
    
    await rewardsContract.initialize({
      dailyCheckIn: 10,      // 10 XLM for daily check-in
      streakBonus: 50,        // 50 XLM for 7-day streak
      achievementMilestone: 100, // 100 XLM for major achievements
      referralBonus: 25        // 25 XLM for successful referrals
    });
    console.log('Rewards Contract initialized successfully');

    // Deploy Achievements Contract
    console.log('Deploying Achievements Contract...');
    const achievementsContract = new AchievementsContract(
      'ACHIEVEMENTS_CONTRACT_ID', // Will be replaced with actual deployed contract ID
      RPC_URL,
      SERVER_SECRET
    );
    
    await achievementsContract.initialize();
    console.log('Achievements Contract initialized successfully');

    // Deploy Identity Contract
    console.log('Deploying Identity Contract...');
    const identityContract = new IdentityContract(
      'IDENTITY_CONTRACT_ID', // Will be replaced with actual deployed contract ID
      RPC_URL,
      SERVER_SECRET
    );
    
    await identityContract.initialize();
    console.log('Identity Contract initialized successfully');

    console.log('All contracts deployed and initialized successfully!');
    console.log('Server Public Key:', serverKey.publicKey());
    
  } catch (error) {
    console.error('Deployment failed:', error);
    process.exit(1);
  }
}

async function testContracts() {
  console.log('Testing contract functionality...');
  
  try {
    const testUserPublicKey = 'GD5QJ...'; // Test user public key
    
    // Test Rewards Contract
    const rewardsContract = new RewardsContract(
      'REWARDS_CONTRACT_ID',
      RPC_URL,
      SERVER_SECRET
    );
    
    await rewardsContract.awardDailyCheckIn(testUserPublicKey);
    const rewards = await rewardsContract.getUserRewards(testUserPublicKey);
    console.log('User rewards:', rewards);

    // Test Achievements Contract
    const achievementsContract = new AchievementsContract(
      'ACHIEVEMENTS_CONTRACT_ID',
      RPC_URL,
      SERVER_SECRET
    );
    
    await achievementsContract.awardAchievement(testUserPublicKey, 'first_checkin');
    const achievements = await achievementsContract.getUserAchievements(testUserPublicKey);
    console.log('User achievements:', achievements.length);

    // Test Identity Contract
    const identityContract = new IdentityContract(
      'IDENTITY_CONTRACT_ID',
      RPC_URL,
      SERVER_SECRET
    );
    
    const identity = await identityContract.generateIdentity(testUserPublicKey);
    console.log('Generated identity:', identity);

    console.log('All tests passed successfully!');
    
  } catch (error) {
    console.error('Testing failed:', error);
    process.exit(1);
  }
}

// Command line interface
const command = process.argv[2];

switch (command) {
  case 'deploy':
    deployContracts();
    break;
  case 'test':
    testContracts();
    break;
  default:
    console.log('Usage: npm run deploy [deploy|test]');
    console.log('  deploy - Deploy and initialize all contracts');
    console.log('  test    - Test contract functionality');
    process.exit(1);
}
