#!/usr/bin/env node

/**
 * CypherPay SDK - Example Usage
 * 
 * This script demonstrates how to use the CypherPay SDK for privacy-preserving payments on Solana
 */

const { CypherPaySDK } = require('../dist/index');
require('dotenv').config();

async function main() {
  console.log('🔐 CypherPay SDK Example\n');

  // Initialize SDK
  const sdk = new CypherPaySDK({
    poolAddress: process.env.POOL_ADDRESS || 'test_pool_address',
    paymasterAddress: process.env.PAYMASTER_ADDRESS || 'test_paymaster_address',
    usdcAddress: process.env.USDC_MINT_ADDRESS || 'test_usdc_address',
    rpcUrl: process.env.SOLANA_RPC_URL || 'https://api.devnet.solana.com',
    zkeyPath: process.env.ZKEY_PATH || './build/eligibility_final.zkey',
    wasmPath: process.env.WASM_PATH || './build/eligibility_js/eligibility.wasm',
    network: process.env.SOLANA_NETWORK || 'devnet',
  });

  console.log('Initializing SDK...');
  await sdk.init();
  console.log('✅ SDK initialized\n');

  // Check initial balance
  console.log('Initial balance:', sdk.getBalance(), 'USDC\n');

  // Create a deposit
  console.log('Creating deposit of 1.00 USDC...');
  const commitment = await sdk.deposit(1000000);
  
  console.log('✅ Deposit created:');
  console.log('  Commitment:', commitment.commitment.toString().slice(0, 20) + '...');
  console.log('  Secret:', commitment.secret.toString().slice(0, 20) + '...');
  console.log('  Nullifier:', commitment.nullifier.toString().slice(0, 20) + '...');
  console.log('  Amount:', commitment.amount / 1000000, 'USDC\n');

  // Check balance after deposit
  console.log('Balance after deposit:', sdk.getBalance(), 'USDC\n');

  // Export commitments (backup)
  console.log('Exporting commitments for backup...');
  const backup = sdk.exportCommitments();
  console.log('✅ Backup created (length:', backup.length, 'bytes)\n');

  // Generate proof for payment
  console.log('Generating ZK proof for 0.50 USDC payment...');
  try {
    const merchantAddress = 'merchant_solana_public_key_here';
    const proofData = await sdk.generateProof(500000, merchantAddress);
    console.log('✅ Proof generated');
    console.log('  Public signals:', proofData.publicSignals.length);
  } catch (error) {
    console.log('ℹ️  Proof generation skipped (requires compiled circuit files)');
    console.log('   Error:', error.message);
  }

  // Check final balance
  console.log('\nFinal balance:', sdk.getBalance(), 'USDC');

  // List all commitments
  const commitments = sdk.getCommitments();
  console.log('\nCommitments:');
  commitments.forEach((c, i) => {
    console.log(`  ${i + 1}. ${c.amount / 1000000} USDC - ${c.spent ? 'spent' : 'unspent'}`);
  });

  console.log('\n✅ Example completed!');
  console.log('\n⚠️  Remember to backup your secrets and nullifiers securely!');
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('❌ Error:', error);
    process.exit(1);
  });
