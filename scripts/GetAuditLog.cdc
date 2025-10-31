// GetAuditLog.cdc
// Script: Read compliance data from contract (read-only)
//
// Usage:
// flow scripts execute ./scripts/GetAuditLog.cdc --network=emulator

import ComplianceMonitor from 0xf8d6e0586b0a20c7

access(all) struct ComplianceData {
    access(all) let threshold: UFix64
    access(all) let auditCount: UInt64

    init(threshold: UFix64, auditCount: UInt64) {
        self.threshold = threshold
        self.auditCount = auditCount
    }
}

access(all) fun main(): ComplianceData {
    let threshold = ComplianceMonitor.getThreshold()
    let auditCount = ComplianceMonitor.getAuditCount()

    return ComplianceData(
        threshold: threshold,
        auditCount: auditCount
    )
}
