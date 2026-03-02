import { Contract, SorobanRpc, xdr, TransactionBuilder } from '@stellar/stellar-sdk';
import { Keypair } from '@stellar/stellar-sdk';

export interface RewardConfig {
  dailyCheckIn: number;
  streakBonus: number;
  achievementMilestone: number;
  referralBonus: number;
}

export class RewardsContract {
  private contract: Contract;
  private rpc: SorobanRpc;
  private serverKey: Keypair;

  constructor(contractId: string, rpcUrl: string, serverSecret: string) {
    this.contract = new Contract(contractId);
    this.rpc = new SorobanRpc(rpcUrl);
    this.serverKey = Keypair.fromSecret(serverSecret);
  }

  async initialize(config: RewardConfig): Promise<void> {
    const account = await this.rpc.getAccount(this.serverKey.publicKey());
    
    const tx = new TransactionBuilder(account, {
      fee: '100',
      networkPassphrase: process.env.STELLAR_NETWORK_PASSPHRASE || 'Test SDF Network ; September 2015'
    })
      .addOperation(
        this.contract.call(
          'initialize',
          xdr.ScVal.scvU32(config.dailyCheckIn),
          xdr.ScVal.scvU32(config.streakBonus),
          xdr.ScVal.scvU32(config.achievementMilestone),
          xdr.ScVal.scvU32(config.referralBonus)
        )
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

  async awardDailyCheckIn(userPublicKey: string): Promise<void> {
    const account = await this.rpc.getAccount(this.serverKey.publicKey());
    
    const tx = new TransactionBuilder(account, {
      fee: '100',
      networkPassphrase: process.env.STELLAR_NETWORK_PASSPHRASE || 'Test SDF Network ; September 2015'
    })
      .addOperation(
        this.contract.call(
          'award_daily_checkin',
          xdr.ScVal.scvAddress(xdr.AccountId.publicKeyTypeEd25519(userPublicKey))
        )
      )
      .setTimeout(30)
      .build();

    const preparedTx = await this.rpc.prepareTransaction(tx);
    const signedTx = preparedTx.sign(this.serverKey);
    const result = await this.rpc.sendTransaction(signedTx);
    
    if (result.status !== 'SUCCESS') {
      throw new Error(`Failed to award daily check-in: ${result.status}`);
    }
  }

  async awardStreakBonus(userPublicKey: string, streakDays: number): Promise<void> {
    const account = await this.rpc.getAccount(this.serverKey.publicKey());
    
    const tx = new TransactionBuilder(account, {
      fee: '100',
      networkPassphrase: process.env.STELLAR_NETWORK_PASSPHRASE || 'Test SDF Network ; September 2015'
    })
      .addOperation(
        this.contract.call(
          'award_streak_bonus',
          xdr.ScVal.scvAddress(xdr.AccountId.publicKeyTypeEd25519(userPublicKey)),
          xdr.ScVal.scvU32(streakDays)
        )
      )
      .setTimeout(30)
      .build();

    const preparedTx = await this.rpc.prepareTransaction(tx);
    const signedTx = preparedTx.sign(this.serverKey);
    const result = await this.rpc.sendTransaction(signedTx);
    
    if (result.status !== 'SUCCESS') {
      throw new Error(`Failed to award streak bonus: ${result.status}`);
    }
  }

  async getUserRewards(userPublicKey: string): Promise<number> {
    try {
      const result = await this.rpc.getContractData(
        this.contract.getContractId(),
        xdr.ScVal.scvSymbol('user_rewards'),
        xdr.LedgerKey.contractData(
          xdr.ContractDataDurability.persistent(),
          this.contract.getContractId(),
          xdr.ScVal.scvSymbol('user_rewards'),
          xdr.ScVal.scvAddress(xdr.AccountId.publicKeyTypeEd25519(userPublicKey))
        )
      );

      if (result.val) {
        return Number(result.val.u32());
      }
      return 0;
    } catch (error) {
      console.error('Error fetching user rewards:', error);
      return 0;
    }
  }

  async getTotalRewardsDistributed(): Promise<number> {
    try {
      const result = await this.rpc.getContractData(
        this.contract.getContractId(),
        xdr.ScVal.scvSymbol('total_rewards'),
        xdr.LedgerKey.contractData(
          xdr.ContractDataDurability.persistent(),
          this.contract.getContractId(),
          xdr.ScVal.scvSymbol('total_rewards')
        )
      );

      if (result.val) {
        return Number(result.val.u64());
      }
      return 0;
    } catch (error) {
      console.error('Error fetching total rewards:', error);
      return 0;
    }
  }
}
