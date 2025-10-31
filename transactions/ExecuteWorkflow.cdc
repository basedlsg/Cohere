// ExecuteWorkflow.cdc
// Transaction: Execute ComplianceCheck workflow for a given transaction
//
// Usage:
// flow transactions send ./transactions/ExecuteWorkflow.cdc \
//   --args-json '[{"type":"String","value":"0xabcd1234..."},{"type":"UFix64","value":"15000.0"}]' \
//   --signer emulator-account \
//   --network=emulator

import ComplianceCheck from 0xf8d6e0586b0a20c7

transaction(txHash: String, amount: UFix64) {

    prepare(signer: &Account) {
        // No preparation needed - workflow is stateless
    }

    execute {
        // Create workflow instance
        let workflow <- ComplianceCheck.createWorkflow()

        // Execute compliance check
        let flagged = workflow.run(txHash: txHash, amount: amount)

        // Log result
        if flagged {
            log("Transaction ".concat(txHash).concat(" FLAGGED for compliance review"))
        } else {
            log("Transaction ".concat(txHash).concat(" passed compliance check"))
        }

        // Clean up workflow resource
        destroy workflow
    }
}
