// ComplianceCheck.cdc
// Flow Workflow: Composes CheckTransactionAmount Action with audit logging
//
// This workflow demonstrates Forte's composability:
// Action (check) → Decision → Event (log)

import ComplianceMonitor from 0xf8d6e0586b0a20c7
import CheckTransactionAmount from 0xf8d6e0586b0a20c7

// Workflow following Flow Forte patterns
// Reference: https://developers.flow.com/blockchain-development-tutorials/forte
access(all) contract ComplianceCheck {

    // Workflow resource
    access(all) resource Workflow {

        // Store Action reference
        access(self) let action: @CheckTransactionAmount.Action

        // Execute complete compliance workflow
        access(all) fun run(txHash: String, amount: UFix64): Bool {
            // Step 1: Validate input
            if !self.action.validate(amount: amount) {
                panic("Invalid transaction amount")
            }

            // Step 2: Execute Action (check threshold)
            let exceeds = self.action.check(amount: amount)

            // Step 3: Log audit event (regardless of result)
            ComplianceMonitor.logAudit(txHash: txHash, amount: amount)

            // Step 4: Return result
            return exceeds
        }

        // Get current threshold via Action
        access(all) fun getCurrentThreshold(): UFix64 {
            return self.action.getThreshold()
        }

        init() {
            // Initialize with CheckTransactionAmount Action
            self.action <- CheckTransactionAmount.createAction()
        }
    }

    // Create new Workflow instance
    access(all) fun createWorkflow(): @Workflow {
        return <-create Workflow()
    }

    init() {
        log("ComplianceCheck Workflow initialized")
    }
}
