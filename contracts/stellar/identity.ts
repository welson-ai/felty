import { Contract, SorobanRpc, xdr, TransactionBuilder } from '@stellar/stellar-sdk';
import { Keypair } from '@stellar/stellar-sdk';

export interface IdentityProof {
  nullifier: string;
  commitment: string;
  proof: string;
  publicSignals: string[];
}

export interface OrganizationMembership {
  organizationId: string;
  userIdHash: string;
  role: string;
  joinedAt: Date;
}

export class IdentityContract {
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

  async generateIdentity(userPublicKey: string): Promise<string> {
    const account = await this.rpc.getAccount(this.serverKey.publicKey());
    
    const tx = new TransactionBuilder(account, {
      fee: '100',
      networkPassphrase: process.env.STELLAR_NETWORK_PASSPHRASE || 'Test SDF Network ; September 2015'
    })
      .addOperation(
        this.contract.call(
          'generate_identity',
          xdr.ScVal.scvAddress(xdr.AccountId.publicKeyTypeEd25519(userPublicKey))
        )
      )
      .setTimeout(30)
      .build();

    const preparedTx = await this.rpc.prepareTransaction(tx);
    const signedTx = preparedTx.sign(this.serverKey);
    const result = await this.rpc.sendTransaction(signedTx);
    
    if (result.status !== 'SUCCESS') {
      throw new Error(`Failed to generate identity: ${result.status}`);
    }

    // Return the generated identity commitment
    return result.resultMeta?.xdr?.toString() || '';
  }

  async verifyIdentityProof(proof: IdentityProof): Promise<boolean> {
    const account = await this.rpc.getAccount(this.serverKey.publicKey());
    
    const tx = new TransactionBuilder(account, {
      fee: '100',
      networkPassphrase: process.env.STELLAR_NETWORK_PASSPHRASE || 'Test SDF Network ; September 2015'
    })
      .addOperation(
        this.contract.call(
          'verify_proof',
          xdr.ScVal.scvString(proof.nullifier),
          xdr.ScVal.scvString(proof.commitment),
          xdr.ScVal.scvString(proof.proof),
          xdr.ScVal.scvVec(proof.publicSignals.map(signal => xdr.ScVal.scvString(signal)))
        )
      )
      .setTimeout(30)
      .build();

    const preparedTx = await this.rpc.prepareTransaction(tx);
    const signedTx = preparedTx.sign(this.serverKey);
    const result = await this.rpc.sendTransaction(signedTx);
    
    if (result.status !== 'SUCCESS') {
      throw new Error(`Failed to verify proof: ${result.status}`);
    }

    return result.resultMeta?.xdr?.toString() === 'true';
  }

  async addToOrganization(
    organizationId: string, 
    userIdHash: string, 
    role: string = 'member'
  ): Promise<void> {
    const account = await this.rpc.getAccount(this.serverKey.publicKey());
    
    const tx = new TransactionBuilder(account, {
      fee: '100',
      networkPassphrase: process.env.STELLAR_NETWORK_PASSPHRASE || 'Test SDF Network ; September 2015'
    })
      .addOperation(
        this.contract.call(
          'add_to_organization',
          xdr.ScVal.scvString(organizationId),
          xdr.ScVal.scvString(userIdHash),
          xdr.ScVal.scvString(role)
        )
      )
      .setTimeout(30)
      .build();

    const preparedTx = await this.rpc.prepareTransaction(tx);
    const signedTx = preparedTx.sign(this.serverKey);
    const result = await this.rpc.sendTransaction(signedTx);
    
    if (result.status !== 'SUCCESS') {
      throw new Error(`Failed to add to organization: ${result.status}`);
    }
  }

  async verifyOrganizationMembership(
    organizationId: string, 
    userIdHash: string
  ): Promise<boolean> {
    try {
      const result = await this.rpc.getContractData(
        this.contract.getContractId(),
        xdr.ScVal.scvSymbol('organization_members'),
        xdr.LedgerKey.contractData(
          xdr.ContractDataDurability.persistent(),
          this.contract.getContractId(),
          xdr.ScVal.scvSymbol('organization_members'),
          xdr.ScVal.scvString(organizationId),
          xdr.ScVal.scvString(userIdHash)
        )
      );

      return result.val ? true : false;
    } catch (error) {
      console.error('Error verifying organization membership:', error);
      return false;
    }
  }

  async createAnonymousPost(
    organizationId: string,
    content: string,
    identityProof: IdentityProof
  ): Promise<string> {
    const account = await this.rpc.getAccount(this.serverKey.publicKey());
    
    const tx = new TransactionBuilder(account, {
      fee: '100',
      networkPassphrase: process.env.STELLAR_NETWORK_PASSPHRASE || 'Test SDF Network ; September 2015'
    })
      .addOperation(
        this.contract.call(
          'create_anonymous_post',
          xdr.ScVal.scvString(organizationId),
          xdr.ScVal.scvString(content),
          xdr.ScVal.scvString(identityProof.nullifier),
          xdr.ScVal.scvString(identityProof.commitment),
          xdr.ScVal.scvString(identityProof.proof)
        )
      )
      .setTimeout(30)
      .build();

    const preparedTx = await this.rpc.prepareTransaction(tx);
    const signedTx = preparedTx.sign(this.serverKey);
    const result = await this.rpc.sendTransaction(signedTx);
    
    if (result.status !== 'SUCCESS') {
      throw new Error(`Failed to create anonymous post: ${result.status}`);
    }

    return result.resultMeta?.xdr?.toString() || '';
  }

  async getOrganizationStats(organizationId: string): Promise<any> {
    try {
      const result = await this.rpc.getContractData(
        this.contract.getContractId(),
        xdr.ScVal.scvSymbol('org_stats'),
        xdr.LedgerKey.contractData(
          xdr.ContractDataDurability.persistent(),
          this.contract.getContractId(),
          xdr.ScVal.scvSymbol('org_stats'),
          xdr.ScVal.scvString(organizationId)
        )
      );

      if (result.val) {
        return this.parseOrganizationStats(result.val);
      }
      return null;
    } catch (error) {
      console.error('Error fetching organization stats:', error);
      return null;
    }
  }

  private parseOrganizationStats(data: xdr.ScVal): any {
    // Implementation for parsing organization statistics
    // This would depend on how your contract structures the data
    return {
      memberCount: 0,
      postCount: 0,
      lastActivity: new Date()
    };
  }
}
