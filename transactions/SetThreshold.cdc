// SetThreshold.cdc
// Transaction: Update compliance threshold (admin only)
//
// Usage:
// flow transactions send ./transactions/SetThreshold.cdc \
//   --arg UFix64:15000.0 \
//   --signer testnet-account \
//   --network=testnet

import ComplianceMonitor from "../contracts/ComplianceMonitor.cdc"

transaction(newThreshold: UFix64) {

    // Reference to Admin resource
    let adminRef: &ComplianceMonitor.Admin

    prepare(signer: AuthAccount) {
        // Borrow Admin capability from storage
        self.adminRef = signer.borrow<&ComplianceMonitor.Admin>(
            from: ComplianceMonitor.AdminStoragePath
        ) ?? panic("Could not borrow Admin reference")
    }

    execute {
        // Validate threshold
        if newThreshold <= 0.0 {
            panic("Threshold must be positive")
        }

        // Update threshold
        self.adminRef.updateThreshold(newThreshold: newThreshold)

        log("Threshold updated to: ".concat(newThreshold.toString()))
    }
}
