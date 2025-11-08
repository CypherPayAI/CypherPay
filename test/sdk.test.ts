import { CypherPaySDK } from '../src/index';

describe('CypherPaySDK', () => {
  let sdk: CypherPaySDK;

  beforeEach(() => {
    sdk = new CypherPaySDK({
      poolAddress: 'test_pool_address',
      paymasterAddress: 'test_paymaster_address',
      usdcAddress: 'test_usdc_address',
      rpcUrl: 'https://api.devnet.solana.com',
      zkeyPath: './build/eligibility_final.zkey',
      wasmPath: './build/eligibility_js/eligibility.wasm',
      network: 'devnet',
    });
  });

  test('should initialize successfully', async () => {
    await sdk.init();
    expect(sdk.getBalance()).toBe('0.00');
  });

  test('should create a deposit', async () => {
    await sdk.init();
    const commitment = await sdk.deposit(1000000);
    
    expect(commitment.amount).toBe(1000000);
    expect(commitment.commitment).toBeDefined();
    expect(commitment.secret).toBeDefined();
    expect(commitment.nullifier).toBeDefined();
    expect(sdk.getBalance()).toBe('1.00');
  });

  test('should reject invalid denominations', async () => {
    await sdk.init();
    
    await expect(sdk.deposit(999999)).rejects.toThrow('Invalid denomination');
  });

  test('should export and import commitments', async () => {
    await sdk.init();
    await sdk.deposit(1000000);
    
    const backup = sdk.exportCommitments();
    expect(backup).toBeDefined();
    
    const sdk2 = new CypherPaySDK({
      poolAddress: 'test_pool_address',
      paymasterAddress: 'test_paymaster_address',
      usdcAddress: 'test_usdc_address',
      rpcUrl: 'https://api.devnet.solana.com',
      zkeyPath: './build/eligibility_final.zkey',
      wasmPath: './build/eligibility_js/eligibility.wasm',
      network: 'devnet',
    });
    
    await sdk2.init();
    sdk2.importCommitments(backup);
    
    expect(sdk2.getBalance()).toBe('1.00');
  });
});
