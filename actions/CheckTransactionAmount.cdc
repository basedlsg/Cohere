// CheckTransactionAmount.cdc
// Flow Action: Reads transaction amount and returns evaluation
//
// Part of Forte Actions framework - standardized interface
// for composable DeFi/compliance workflows

import ComplianceMonitor from 0xf8d6e0586b0a20c7

// Action interface following Flow Actions pattern
// Reference: https://developers.flow.com/blockchain-development-tutorials/forte/flow-actions
access(all) contract CheckTransactionAmount {

    // Action resource implementing Flow Actions interface
    access(all) resource Action {

        // Check if transaction amount exceeds threshold
        access(all) fun check(amount: UFix64): Bool {
            return ComplianceMonitor.checkAmount(amount: amount)
        }

        // Get current compliance threshold
        access(all) fun getThreshold(): UFix64 {
            return ComplianceMonitor.getThreshold()
        }

        // Validate input parameters
        access(all) fun validate(amount: UFix64): Bool {
            return amount > 0.0
        }
    }

    // Create a new Action resource
    access(all) fun createAction(): @Action {
        return <-create Action()
    }

    init() {
        // Action initialization
        log("CheckTransactionAmount Action initialized")
    }
}
