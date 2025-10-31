// CheckTransactionAmount.cdc
// Flow Action: Reads transaction amount and returns evaluation
//
// Part of Forte Actions framework - standardized interface
// for composable DeFi/compliance workflows

import ComplianceMonitor from "../contracts/ComplianceMonitor.cdc"

// Action interface following Flow Actions pattern
// Reference: https://developers.flow.com/blockchain-development-tutorials/forte/flow-actions
pub contract CheckTransactionAmount {

    // Action resource implementing Flow Actions interface
    pub resource Action {

        // Execute action: check if transaction amount exceeds threshold
        pub fun execute(amount: UFix64): Bool {
            return ComplianceMonitor.checkAmount(amount: amount)
        }

        // Get current compliance threshold
        pub fun getThreshold(): UFix64 {
            return ComplianceMonitor.getThreshold()
        }

        // Validate input parameters
        pub fun validate(amount: UFix64): Bool {
            return amount > 0.0
        }
    }

    // Create a new Action resource
    pub fun createAction(): @Action {
        return <-create Action()
    }

    init() {
        // Action initialization
        log("CheckTransactionAmount Action initialized")
    }
}
