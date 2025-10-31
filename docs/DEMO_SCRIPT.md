# Demo Script (90 Seconds)

**Purpose**: Show Forte Hacks judges a working ComplianceFlow MVP with real on-chain transactions.

---

## Setup Before Recording

1. ✅ Contract deployed to testnet
2. ✅ UI running on localhost:3000
3. ✅ Browser open to Flow testnet explorer
4. ✅ At least 2 test transactions already flagged
5. ✅ Screen recording software ready (OBS, QuickTime, etc.)

---

## Script Timeline

### **0:00 - 0:15 | Introduction (15s)**

> "Hi, I'm [Your Name]. This is ComplianceFlow - a minimal MVP demonstrating Flow Forte's Actions and Workflows for automated on-chain compliance monitoring."
>
> **SHOW**: Landing page with project title

---

### **0:15 - 0:35 | Define Rule Page (20s)**

> "First, let's set a compliance threshold. Any transaction over $10,000 will be automatically flagged for audit."
>
> **ACTIONS**:
> 1. Navigate to "Define Rule" page
> 2. Enter `10000` in threshold field
> 3. Click "Update Threshold" button
> 4. Show transaction confirmation popup
> 5. Click testnet explorer link

> "Here's the transaction on Flow testnet - you can see the SetThreshold function executed successfully."
>
> **SHOW**: Testnet explorer with TX details

---

### **0:35 - 0:55 | Trigger Workflow (20s)**

> "Now let's simulate a large transaction that triggers our compliance workflow."
>
> **ACTIONS**:
> 1. Navigate to "Test Transaction" section
> 2. Enter amount: `15000`
> 3. Click "Send Transaction"
> 4. Show transaction hash appear

> "Behind the scenes, the CheckTransactionAmount Action reads this value, the ComplianceCheck Workflow evaluates it, and emits an on-chain audit event."
>
> **SHOW**: Loading spinner → Success message

---

### **0:55 - 1:20 | Audit Feed (25s)**

> "Let's check the Audit Feed to see all flagged transactions."
>
> **ACTIONS**:
> 1. Navigate to "Audit Feed" page
> 2. Scroll through flagged transactions table

> "Here we see our $15,000 transaction flagged in real-time. Each entry shows the transaction hash, amount, timestamp, and links to the on-chain event."
>
> **SHOW**:
> - Table with multiple entries
> - Click on one tx hash → Opens testnet explorer
> - Show the ComplianceAuditLog event in explorer

> "Notice this data is coming directly from Flow testnet - no mock data, all real blockchain transactions."

---

### **1:20 - 1:30 | Closing (10s)**

> "This MVP uses one Forte Action, one Workflow, and scheduled automation - all without off-chain coordination. The entire project is open source on GitHub, deployed on Flow testnet, and demonstrates a real compliance use case."
>
> **SHOW**: GitHub repo page with README visible

> "Thanks for watching! Links in the description."

**FADE OUT**

---

## Post-Recording Checklist

- [ ] Video is exactly 90 seconds (trim if needed)
- [ ] Audio is clear (no background noise)
- [ ] Testnet explorer is visible and shows real tx hashes
- [ ] UI loads without errors
- [ ] Transaction links work when clicked
- [ ] Export video as MP4 (1080p minimum)

---

## Video Description

```
ComplianceFlow MVP - Forte Hacks 2025 Submission

A minimal demonstration of Flow Forte's Actions and Workflows for automated on-chain compliance monitoring.

🔗 Links:
- GitHub: [YOUR_REPO_URL]
- Live Demo: [UI_URL if hosted]
- Testnet Contract: https://testnet.flowscan.io/account/[YOUR_ADDRESS]

📋 Features:
✅ Flow Action: CheckTransactionAmount
✅ Workflow: ComplianceCheck
✅ On-chain audit events
✅ Real-time UI with testnet data

🏆 Hackathon: Forte Hacks 2025
💰 Prize Track: Actions & Workflows
👤 Built by: @basedlsg

#ForteHacks #FlowBlockchain #Web3 #Compliance
```

---

## Alternative: Screen Capture with Captions

If you prefer silent demo with text overlays:

1. **0-15s**: Title screen with "ComplianceFlow MVP"
2. **15-35s**: Define Rule page with caption: "Set threshold: $10,000"
3. **35-55s**: Transaction execution with caption: "Action → Workflow → Audit Event"
4. **55-80s**: Audit Feed with caption: "Real-time flagged transactions from testnet"
5. **80-90s**: GitHub repo + testnet explorer split screen

---

## Screenshot Requirements

Capture these 5 screenshots for submission:

1. **Define Rule Page** - Showing threshold input form
2. **Transaction Confirmation** - Popup with tx hash
3. **Testnet Explorer** - Contract deployment transaction
4. **Audit Feed Table** - Multiple flagged transactions
5. **Event Details** - ComplianceAuditLog event on testnet explorer

Save as:
- `screenshot_1_define_rule.png`
- `screenshot_2_tx_confirmation.png`
- `screenshot_3_testnet_contract.png`
- `screenshot_4_audit_feed.png`
- `screenshot_5_event_details.png`

Store in `/docs/screenshots/`

---

## Upload Checklist

- [ ] Video uploaded to YouTube (unlisted)
- [ ] Video added to GitHub repo README
- [ ] Screenshots committed to repo
- [ ] Testnet tx links verified working
- [ ] Social post drafted with #ForteHacks
- [ ] HackQuest submission form ready

**Submission Deadline**: October 31, 2025, 11:59 PM UTC
