# ComplianceFlow MVP

> A minimal working demonstration of Flow Forte's Actions and Workflows for automated on-chain compliance monitoring.

**Hackathon**: Forte Hacks 2025 (Oct 1-31)
**Prize Pool**: $250,000 USD
**Built by**: @basedlsg

---

## What It Does

ComplianceFlow automatically monitors blockchain transactions and flags those exceeding a configurable threshold (default: $10,000) for compliance review. This demonstrates a real-world Anti-Money Laundering (AML) use case using Flow's new Forte upgrade primitives.

**Key Features**:
- ✅ One Flow Action: `CheckTransactionAmount`
- ✅ One Workflow: `ComplianceCheck`
- ✅ On-chain audit events with transaction details
- ✅ Live UI showing flagged transactions
- ✅ Scheduled automation (no off-chain coordination)

---

## How It Works

```
User Transaction → CheckTransactionAmount (Action)
                ↓
           Amount ≥ $10k?
                ↓
         ComplianceCheck (Workflow)
                ↓
      Emit AuditLog Event (On-Chain)
                ↓
           UI Updates
```

### Technical Flow

1. **Action**: `CheckTransactionAmount` reads transaction value from Flow event
2. **Workflow**: `ComplianceCheck` evaluates if amount ≥ threshold
3. **Scheduled Transaction**: Periodic trigger checks pending transactions
4. **Event**: `ComplianceAuditLog` emitted with tx hash, amount, timestamp
5. **UI**: Two pages display rules and audit feed in real-time

---

## Repository Structure

```
ComplianceFlow-MVP/
├── contracts/
│   └── ComplianceMonitor.cdc       # Main smart contract
├── actions/
│   └── CheckTransactionAmount.cdc  # Flow Action definition
├── workflows/
│   └── ComplianceCheck.cdc         # Workflow composition
├── transactions/
│   └── SetThreshold.cdc            # Admin transaction
├── scripts/
│   └── GetAuditLog.cdc             # Read audit events
├── ui/
│   ├── pages/
│   │   ├── define-rule.tsx         # Configure threshold
│   │   └── audit-feed.tsx          # View flagged txs
│   └── package.json
└── docs/
    ├── SETUP.md                    # Flow testnet setup
    └── DEMO_SCRIPT.md              # 90-second demo guide
```

---

## Quick Start

### Prerequisites

- [Flow CLI](https://developers.flow.com/tools/flow-cli/install) installed
- Node.js 18+ for UI
- Flow testnet account with test tokens

### Setup Flow Testnet

```bash
# Install Flow CLI
sh -ci "$(curl -fsSL https://raw.githubusercontent.com/onflow/flow-cli/master/install.sh)"

# Create testnet account
flow keys generate

# Configure flow.json (see docs/SETUP.md)
```

### Deploy Contract

```bash
# Deploy to testnet
flow project deploy --network=testnet

# Verify deployment
flow accounts get <CONTRACT_ADDRESS> --network=testnet
```

### Run UI

```bash
cd ui
npm install
npm run dev
```

Visit `http://localhost:3000`

---

## Demo

**Video**: [Coming Soon - 90 second demo]

**Emulator Transactions** (Testnet coming soon):
- Contract Deployment (ComplianceMonitor): `995bdb5f6911bf0267faf9fda5d8bfab0700c645ce37fbf9c4248602bd0a3f22`
- Contract Deployment (CheckTransactionAmount): `a58a19da14091e2eb542fdb4d6896d54c76cf90d77954415490e3a46ef8e0847`
- Contract Deployment (ComplianceCheck): `c8fa4cb5a788e60788a599b555a2f7916e69f5abd200045ce7d6b3dc211c44fc`
- Threshold Update: `fe91a079f8bf98625b7d51cdd9fa7b10a510263379e01b4e5919aeaa71645aea`
- Workflow Execution (Flagged): `0e622f14cfadd39653281cebcddf5389c678067027bbae30e36603d3ada6b786`
- Workflow Execution (Normal): `67825f64a67263c19fca8d419534e5367fbcdfeeb6ce4c55a8852ce5cd91f8ce`

**Testnet Explorer**: https://testnet.flowscan.io

---

## Architecture

### Smart Contract (`ComplianceMonitor.cdc`)

```cadence
pub contract ComplianceMonitor {
    pub var threshold: UFix64
    pub event ComplianceAuditLog(txHash: String, amount: UFix64, timestamp: UFix64)

    // Action interface implementation
    pub resource interface CheckTransactionAmount { ... }

    // Workflow logic
    pub fun evaluateTransaction(amount: UFix64): Bool { ... }
}
```

### UI Pages

1. **Define Rule** (`/define-rule`)
   - Input field for threshold amount
   - Submit button calls `SetThreshold` transaction
   - Shows current threshold value

2. **Audit Feed** (`/audit-feed`)
   - Real-time list of flagged transactions
   - Columns: TX Hash, Amount, Timestamp, Status
   - Auto-refreshes on new events

---

## Development Timeline

- **Day 1**: ✅ Research, repo setup, Flow testnet config
- **Day 2-3**: Smart contract + Actions implementation
- **Day 4**: Workflow + Scheduled Transactions
- **Day 5-6**: UI development
- **Day 7**: Demo video + submission

**Current Status**: Day 1 - Foundation Complete

---

## Acceptance Criteria

- [ ] Contract deployed to Flow testnet
- [ ] Action executes and returns transaction amount
- [ ] Workflow triggers on threshold breach
- [ ] Audit events visible on-chain
- [ ] UI displays real testnet data (no mocks)
- [ ] Demo video recorded with live tx links
- [ ] Public GitHub repo
- [ ] Social post #ForteHacks
- [ ] HackQuest submission

---

## Resources

- **Flow Forte Docs**: https://developers.flow.com/blockchain-development-tutorials/forte
- **Flow Actions Guide**: https://developers.flow.com/blockchain-development-tutorials/forte/flow-actions
- **Hackathon Details**: https://www.hackquest.io/en/hackathons/Forte-Hacks
- **Flow Testnet Faucet**: https://testnet-faucet.onflow.org/

---

## License

MIT

---

## Submission

**Hackathon Track**: Forte Actions & Workflows
**Submitted**: [Date]
**Team**: @basedlsg
**Social**: #ForteHacks @flow_blockchain
