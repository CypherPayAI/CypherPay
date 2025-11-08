import { Connection, PublicKey, Transaction, SystemProgram } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';

const buildPoseidon = require('circomlibjs').buildPoseidon;
const groth16 = require('snarkjs').groth16;

export interface CypherPaySDKConfig {
  poolAddress: string;
  paymasterAddress: string;
  usdcAddress: string;
  rpcUrl: string;
  zkeyPath: string;
  wasmPath: string;
  network: 'devnet' | 'testnet' | 'mainnet-beta';
}

export interface CommitmentData {
  commitment: bigint;
  secret: bigint;
  nullifier: bigint;
  amount: number;
  spent: boolean;
}

export interface ProofData {
  proof: any;
  publicSignals: string[];
}

export class CypherPaySDK {
  private config: CypherPaySDKConfig;
  private connection: Connection;
  private poseidon: any;
  private commitments: CommitmentData[] = [];
  private initialized: boolean = false;

  constructor(config: CypherPaySDKConfig) {
    this.config = config;
    this.connection = new Connection(config.rpcUrl, 'confirmed');
  }

  /**
   * Initialize the SDK - must be called before any operations
   */
  async init(): Promise<void> {
    if (this.initialized) {
      return;
    }

    // Build Poseidon hash function
    this.poseidon = await buildPoseidon();
    this.initialized = true;

    console.log('CypherPay SDK initialized');
  }

  /**
   * Deposit USDC to the pool and create a commitment
   */
  async deposit(
    denomination: number,
    secret?: bigint,
    nullifier?: bigint
  ): Promise<CommitmentData> {
    this.checkInitialized();

    // Validate denomination
    const validDenominations = [100000, 500000, 1000000, 5000000];
    if (!validDenominations.includes(denomination)) {
      throw new Error(
        'Invalid denomination. Must be 100000, 500000, 1000000, or 5000000'
      );
    }

    // Generate random secret and nullifier if not provided
    const commitmentSecret = secret || this.generateRandomBigInt();
    const commitmentNullifier = nullifier || this.generateRandomBigInt();

    // Create commitment: commitment = Poseidon(secret, nullifier, amount)
    const commitment = this.poseidon([
      commitmentSecret,
      commitmentNullifier,
      BigInt(denomination),
    ]);

    const commitmentData: CommitmentData = {
      commitment: this.poseidon.F.toObject(commitment),
      secret: commitmentSecret,
      nullifier: commitmentNullifier,
      amount: denomination,
      spent: false,
    };

    // Store commitment
    this.commitments.push(commitmentData);

    console.log('Deposit created:', {
      commitment: commitmentData.commitment.toString(),
      amount: denomination / 1000000 + ' USDC',
    });

    return commitmentData;
  }

  /**
   * Generate ZK proof for a payment
   */
  async generateProof(
    paymentAmount: number,
    merchant: string
  ): Promise<ProofData> {
    this.checkInitialized();

    // Find unspent commitment with sufficient balance
    const unspentCommitment = this.commitments.find(
      (c) => !c.spent && c.amount >= paymentAmount
    );

    if (!unspentCommitment) {
      throw new Error('Insufficient funds');
    }

    // Prepare circuit inputs
    const input = {
      secret: unspentCommitment.secret.toString(),
      nullifier: unspentCommitment.nullifier.toString(),
      amount: unspentCommitment.amount.toString(),
      paymentAmount: paymentAmount.toString(),
      merchant: merchant,
    };

    // Generate proof
    const { proof, publicSignals } = await groth16.fullProve(
      input,
      this.config.wasmPath,
      this.config.zkeyPath
    );

    // Mark commitment as spent
    unspentCommitment.spent = true;

    // Create change commitment if needed
    const changeAmount = unspentCommitment.amount - paymentAmount;
    if (changeAmount > 0) {
      await this.deposit(changeAmount);
    }

    console.log('Proof generated for payment:', paymentAmount / 1000000 + ' USDC');

    return { proof, publicSignals };
  }

  /**
   * Send payment transaction to Solana
   */
  async sendPayment(proofData: ProofData): Promise<string> {
    this.checkInitialized();

    // TODO: Implement actual Solana transaction submission
    // This would involve:
    // 1. Creating a transaction with the proof data
    // 2. Sending it to the Solana program
    // 3. Having the program verify the proof and transfer USDC

    console.log('Sending payment to Solana...');
    throw new Error('Payment submission not yet implemented - Solana program integration required');
  }

  /**
   * Get current balance (sum of unspent commitments)
   */
  getBalance(): string {
    this.checkInitialized();

    const balance = this.commitments
      .filter((c) => !c.spent)
      .reduce((sum, c) => sum + c.amount, 0);

    return (balance / 1000000).toFixed(2);
  }

  /**
   * Get all commitments
   */
  getCommitments(): CommitmentData[] {
    this.checkInitialized();
    return [...this.commitments];
  }

  /**
   * Export commitments for backup
   */
  exportCommitments(): string {
    this.checkInitialized();

    const exportData = this.commitments.map((c) => ({
      commitment: c.commitment.toString(),
      secret: c.secret.toString(),
      nullifier: c.nullifier.toString(),
      amount: c.amount,
      spent: c.spent,
    }));

    return JSON.stringify(exportData);
  }

  /**
   * Import commitments from backup
   */
  importCommitments(json: string): void {
    this.checkInitialized();

    const importData = JSON.parse(json);
    this.commitments = importData.map((c: any) => ({
      commitment: BigInt(c.commitment),
      secret: BigInt(c.secret),
      nullifier: BigInt(c.nullifier),
      amount: c.amount,
      spent: c.spent,
    }));

    console.log('Imported', this.commitments.length, 'commitments');
  }

  /**
   * Generate a random BigInt for secrets and nullifiers
   */
  private generateRandomBigInt(): bigint {
    const bytes = new Uint8Array(32);
    crypto.getRandomValues(bytes);
    return BigInt('0x' + Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join(''));
  }

  /**
   * Check if SDK is initialized
   */
  private checkInitialized(): void {
    if (!this.initialized) {
      throw new Error('SDK not initialized. Call init() first.');
    }
  }
}
