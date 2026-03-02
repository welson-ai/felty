# Felty Smart Contracts

This directory contains the Stellar smart contracts that power Felty's blockchain features.

## Contract Overview

### 1. Rewards Contract (`rewards.ts`)
Manages the distribution of XLM rewards for emotional tracking achievements.

**Features:**
- Daily check-in rewards
- Streak bonuses
- Achievement milestone rewards
- Referral bonuses

### 2. Achievements Contract (`achievements.ts`)
Handles on-chain achievement tracking and verification.

**Features:**
- Badge minting and ownership
- Achievement progress tracking
- Public verification of accomplishments
- NFT-based achievement tokens

### 3. Identity Contract (`identity.ts`)
Provides decentralized identity verification with zero-knowledge proofs.

**Features:**
- Anonymous user identity generation
- ZK proof generation for anonymous posting
- Organization membership verification
- Privacy-preserving analytics

## Deployment

### Prerequisites
- Stellar CLI installed
- Soroban CLI installed
- Node.js 18+
- Testnet XLM for deployment

### Setup
```bash
# Install dependencies
npm install

# Set environment variables
cp .env.example .env
# Edit .env with your Stellar account details
```

### Deploy to Testnet
```bash
# Compile contracts
npm run compile

# Deploy all contracts
npm run deploy

# Run tests
npm run test-contract
```

## Contract Addresses

### Testnet
- Rewards Contract: `TODO_DEPLOY_ADDRESS`
- Achievements Contract: `TODO_DEPLOY_ADDRESS`
- Identity Contract: `TODO_DEPLOY_ADDRESS`

### Mainnet
- Rewards Contract: `TODO_DEPLOY_ADDRESS`
- Achievements Contract: `TODO_DEPLOY_ADDRESS`
- Identity Contract: `TODO_DEPLOY_ADDRESS`

## Integration with Frontend

The contracts are integrated with the Felty frontend through:

1. **Stellar SDK** for contract interaction
2. **Freighter** wallet for user authentication
3. **ZK proofs** for privacy preservation
4. **Web3 auth** for seamless onboarding

## Security Considerations

- All contracts undergo security audits
- Multi-signature authorization for admin functions
- Upgradeable contract patterns
- Comprehensive test coverage

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## License

MIT License - see LICENSE file for details.
