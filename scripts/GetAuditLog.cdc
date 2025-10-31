// GetAuditLog.cdc
// Script: Read compliance data from contract (read-only)
//
// Usage:
// flow scripts execute ./scripts/GetAuditLog.cdc --network=testnet

import ComplianceMonitor from "../contracts/ComplianceMonitor.cdc"

pub struct ComplianceData {
    pub let threshold: UFix64
    pub let auditCount: UInt64

    init(threshold: UFix64, auditCount: UInt64) {
        self.threshold = threshold
        self.auditCount = auditCount
    }
}

pub fun main(): ComplianceData {
    let threshold = ComplianceMonitor.getThreshold()
    let auditCount = ComplianceMonitor.getAuditCount()

    return ComplianceData(
        threshold: threshold,
        auditCount: auditCount
    )
}
