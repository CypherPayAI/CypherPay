pragma circom 2.0.0;

include "../node_modules/circomlib/circuits/poseidon.circom";
include "../node_modules/circomlib/circuits/comparators.circom";

// Eligibility circuit for CypherPay payments
// Proves that the sender has a valid commitment without revealing their identity
template Eligibility() {
    // Private inputs
    signal input secret;
    signal input nullifier;
    signal input amount;
    
    // Public inputs
    signal input paymentAmount;
    signal input merchant;
    
    // Outputs
    signal output commitment;
    signal output nullifierHash;
    
    // Compute commitment = Poseidon(secret, nullifier, amount)
    component commitmentHasher = Poseidon(3);
    commitmentHasher.inputs[0] <== secret;
    commitmentHasher.inputs[1] <== nullifier;
    commitmentHasher.inputs[2] <== amount;
    commitment <== commitmentHasher.out;
    
    // Compute nullifier hash = Poseidon(nullifier)
    component nullifierHasher = Poseidon(1);
    nullifierHasher.inputs[0] <== nullifier;
    nullifierHash <== nullifierHasher.out;
    
    // Verify that payment amount is less than or equal to commitment amount
    component amountCheck = LessEqThan(64);
    amountCheck.in[0] <== paymentAmount;
    amountCheck.in[1] <== amount;
    amountCheck.out === 1;
    
    // Verify that payment amount is greater than 0
    component positiveCheck = GreaterThan(64);
    positiveCheck.in[0] <== paymentAmount;
    positiveCheck.in[1] <== 0;
    positiveCheck.out === 1;
}

component main {public [paymentAmount, merchant]} = Eligibility();
