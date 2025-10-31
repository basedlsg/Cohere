// ComplianceCheck.cdc
// Flow Workflow: Composes CheckTransactionAmount Action with audit logging
//
// This workflow demonstrates Forte's composability:
// Action (check) → Decision → Event (log)

import ComplianceMonitor from "../contracts/ComplianceMonitor.cdc"
import CheckTransactionAmount from "../actions/CheckTransactionAmount.cdc"

// Workflow following Flow Forte patterns
// Reference: https://developers.flow.com/blockchain-development-tutorials/forte
pub contract ComplianceCheck {

    // Workflow resource
    pub resource Workflow {

        // Store Action reference
        access(self) let action: @CheckTransactionAmount.Action

        // Execute complete compliance workflow
        pub fun execute(txHash: String, amount: UFix64): Bool {
            // Step 1: Validate input
            if !self.action.validate(amount: amount) {
                panic("Invalid transaction amount")
            }

            // Step 2: Execute Action (check threshold)
            let exceeds = self.action.execute(amount: amount)

            // Step 3: Log audit event (regardless of result)
            ComplianceMonitor.logAudit(txHash: txHash, amount: amount)

            // Step 4: Return result
            return exceeds
        }

        // Get current threshold via Action
        pub fun getCurrentThreshold(): UFix64 {
            return self.action.getThreshold()
        }

        init() {
            // Initialize with CheckTransactionAmount Action
            self.action <- CheckTransactionAmount.createAction()
        }

        destroy() {
            destroy self.action
        }
    }

    // Create new Workflow instance
    pub fun createWorkflow(): @Workflow {
        return <-create Workflow()
    }

    init() {
        log("ComplianceCheck Workflow initialized")
    }
}
