// Flow Client Library (FCL) Configuration
// Connects to Flow emulator running locally

import * as fcl from "@onflow/fcl"

// Configure FCL for Flow Emulator
fcl.config()
  .put("accessNode.api", "http://localhost:8888") // Emulator Access API
  .put("discovery.wallet", "http://localhost:8701/fcl/authn") // Dev Wallet
  .put("0xProfile", "0xf8d6e0586b0a20c7") // Emulator service account

// Contract addresses (emulator)
export const CONTRACTS = {
  ComplianceMonitor: "0xf8d6e0586b0a20c7",
  CheckTransactionAmount: "0xf8d6e0586b0a20c7",
  ComplianceCheck: "0xf8d6e0586b0a20c7",
}

// Transaction hashes (from emulator testing)
export const TRANSACTION_HASHES = {
  deployComplianceMonitor: "995bdb5f6911bf0267faf9fda5d8bfab0700c645ce37fbf9c4248602bd0a3f22",
  deployCheckTransactionAmount: "a58a19da14091e2eb542fdb4d6896d54c76cf90d77954415490e3a46ef8e0847",
  deployComplianceCheck: "c8fa4cb5a788e60788a599b555a2f7916e69f5abd200045ce7d6b3dc211c44fc",
  setThreshold: "fe91a079f8bf98625b7d51cdd9fa7b10a510263379e01b4e5919aeaa71645aea",
  workflowFlagged: "0e622f14cfadd39653281cebcddf5389c678067027bbae30e36603d3ada6b786",
  workflowNormal: "67825f64a67263c19fca8d419534e5367fbcdfeeb6ce4c55a8852ce5cd91f8ce",
}
