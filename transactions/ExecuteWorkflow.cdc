// ExecuteWorkflow.cdc
// Transaction: Execute ComplianceCheck workflow for a given transaction
//
// Usage:
// flow transactions send ./transactions/ExecuteWorkflow.cdc \
//   --arg String:"0xabcd1234..." \
//   --arg UFix64:15000.0 \
//   --signer testnet-account \
//   --network=testnet

import ComplianceCheck from "../workflows/ComplianceCheck.cdc"

transaction(txHash: String, amount: UFix64) {

    prepare(signer: AuthAccount) {
        // No preparation needed - workflow is stateless
    }

    execute {
        // Create workflow instance
        let workflow <- ComplianceCheck.createWorkflow()

        // Execute compliance check
        let flagged = workflow.execute(txHash: txHash, amount: amount)

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
