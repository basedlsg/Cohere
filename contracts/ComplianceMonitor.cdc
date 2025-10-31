// ComplianceMonitor.cdc
// Main smart contract for ComplianceFlow MVP
//
// This contract implements:
// - Configurable transaction threshold
// - Audit event logging
// - Integration with Forte Actions/Workflows

pub contract ComplianceMonitor {

    // Storage paths
    pub let AdminStoragePath: StoragePath

    // Contract state
    pub var threshold: UFix64
    pub var auditCount: UInt64

    // Events
    pub event ComplianceAuditLog(
        txHash: String,
        amount: UFix64,
        timestamp: UFix64,
        flagged: Bool,
        reason: String
    )

    pub event ThresholdUpdated(
        oldThreshold: UFix64,
        newThreshold: UFix64,
        updatedBy: Address
    )

    // Admin resource for managing threshold
    pub resource Admin {
        pub fun updateThreshold(newThreshold: UFix64) {
            let oldThreshold = ComplianceMonitor.threshold
            ComplianceMonitor.threshold = newThreshold

            emit ThresholdUpdated(
                oldThreshold: oldThreshold,
                newThreshold: newThreshold,
                updatedBy: self.owner!.address
            )
        }
    }

    // Public function to check if amount exceeds threshold
    pub fun checkAmount(amount: UFix64): Bool {
        return amount >= self.threshold
    }

    // Log audit event (called by Workflow)
    pub fun logAudit(txHash: String, amount: UFix64) {
        let flagged = self.checkAmount(amount: amount)
        let reason = flagged ? "Amount exceeds threshold" : "Normal transaction"

        emit ComplianceAuditLog(
            txHash: txHash,
            amount: amount,
            timestamp: getCurrentBlock().timestamp,
            flagged: flagged,
            reason: reason
        )

        if flagged {
            self.auditCount = self.auditCount + 1
        }
    }

    // Get current threshold
    pub fun getThreshold(): UFix64 {
        return self.threshold
    }

    // Get total flagged transactions
    pub fun getAuditCount(): UInt64 {
        return self.auditCount
    }

    init() {
        // Set default threshold to $10,000
        self.threshold = 10000.0
        self.auditCount = 0

        // Set storage paths
        self.AdminStoragePath = /storage/ComplianceMonitorAdmin

        // Create admin resource and save to storage
        self.account.save(<-create Admin(), to: self.AdminStoragePath)
    }
}
