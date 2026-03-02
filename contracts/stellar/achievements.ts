import { Contract, SorobanRpc, xdr, TransactionBuilder } from '@stellar/stellar-sdk';
import { Keypair } from '@stellar/stellar-sdk';

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  criteria: string;
  points: number;
}

export interface UserAchievement {
  userId: string;
  achievementId: string;
  earnedAt: Date;
  verified: boolean;
}

export class AchievementsContract {
  private contract: Contract;
  private rpc: SorobanRpc;
  private serverKey: Keypair;

  constructor(contractId: string, rpcUrl: string, serverSecret: string) {
    this.contract = new Contract(contractId);
    this.rpc = new SorobanRpc(rpcUrl);
    this.serverKey = Keypair.fromSecret(serverSecret);
  }

  async initialize(): Promise<void> {
    const account = await this.rpc.getAccount(this.serverKey.publicKey());
    
    const tx = new TransactionBuilder(account, {
      fee: '100',
      networkPassphrase: process.env.STELLAR_NETWORK_PASSPHRASE || 'Test SDF Network ; September 2015'
    })
      .addOperation(
        this.contract.call('initialize')
      )
      .setTimeout(30)
      .build();

    const preparedTx = await this.rpc.prepareTransaction(tx);
    const signedTx = preparedTx.sign(this.serverKey);
    const result = await this.rpc.sendTransaction(signedTx);
    
    if (result.status !== 'SUCCESS') {
      throw new Error(`Failed to initialize contract: ${result.status}`);
    }
  }

  async createAchievement(achievement: Achievement): Promise<void> {
    const account = await this.rpc.getAccount(this.serverKey.publicKey());
    
    const tx = new TransactionBuilder(account, {
      fee: '100',
      networkPassphrase: process.env.STELLAR_NETWORK_PASSPHRASE || 'Test SDF Network ; September 2015'
    })
      .addOperation(
        this.contract.call(
          'create_achievement',
          xdr.ScVal.scvString(achievement.id),
          xdr.ScVal.scvString(achievement.name),
          xdr.ScVal.scvString(achievement.description),
          xdr.ScVal.scvString(achievement.icon),
          xdr.ScVal.scvString(achievement.criteria),
          xdr.ScVal.scvU32(achievement.points)
        )
      )
      .setTimeout(30)
      .build();

    const preparedTx = await this.rpc.prepareTransaction(tx);
    const signedTx = preparedTx.sign(this.serverKey);
    const result = await this.rpc.sendTransaction(signedTx);
    
    if (result.status !== 'SUCCESS') {
      throw new Error(`Failed to create achievement: ${result.status}`);
    }
  }

  async awardAchievement(userPublicKey: string, achievementId: string): Promise<void> {
    const account = await this.rpc.getAccount(this.serverKey.publicKey());
    
    const tx = new TransactionBuilder(account, {
      fee: '100',
      networkPassphrase: process.env.STELLAR_NETWORK_PASSPHRASE || 'Test SDF Network ; September 2015'
    })
      .addOperation(
        this.contract.call(
          'award_achievement',
          xdr.ScVal.scvAddress(xdr.AccountId.publicKeyTypeEd25519(userPublicKey)),
          xdr.ScVal.scvString(achievementId)
        )
      )
      .setTimeout(30)
      .build();

    const preparedTx = await this.rpc.prepareTransaction(tx);
    const signedTx = preparedTx.sign(this.serverKey);
    const result = await this.rpc.sendTransaction(signedTx);
    
    if (result.status !== 'SUCCESS') {
      throw new Error(`Failed to award achievement: ${result.status}`);
    }
  }

  async getUserAchievements(userPublicKey: string): Promise<UserAchievement[]> {
    try {
      const result = await this.rpc.getContractData(
        this.contract.getContractId(),
        xdr.ScVal.scvSymbol('user_achievements'),
        xdr.LedgerKey.contractData(
          xdr.ContractDataDurability.persistent(),
          this.contract.getContractId(),
          xdr.ScVal.scvSymbol('user_achievements'),
          xdr.ScVal.scvAddress(xdr.AccountId.publicKeyTypeEd25519(userPublicKey))
        )
      );

      if (result.val) {
        // Parse the achievement data from the contract response
        // This would need proper deserialization based on your contract's data structure
        return this.parseAchievements(result.val);
      }
      return [];
    } catch (error) {
      console.error('Error fetching user achievements:', error);
      return [];
    }
  }

  async verifyAchievement(userPublicKey: string, achievementId: string): Promise<boolean> {
    try {
      const result = await this.rpc.getContractData(
        this.contract.getContractId(),
        xdr.ScVal.scvSymbol('achievement_verification'),
        xdr.LedgerKey.contractData(
          xdr.ContractDataDurability.persistent(),
          this.contract.getContractId(),
          xdr.ScVal.scvSymbol('achievement_verification'),
          xdr.ScVal.scvAddress(xdr.AccountId.publicKeyTypeEd25519(userPublicKey)),
          xdr.ScVal.scvString(achievementId)
        )
      );

      return result.val?.bool() || false;
    } catch (error) {
      console.error('Error verifying achievement:', error);
      return false;
    }
  }

  private parseAchievements(data: xdr.ScVal): UserAchievement[] {
    // Implementation for parsing achievement data from contract response
    // This would depend on how your contract structures the data
    return [];
  }
}
