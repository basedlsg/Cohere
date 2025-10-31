# Flow Testnet Setup Guide

This guide walks you through setting up your Flow development environment for ComplianceFlow MVP.

---

## 1. Install Flow CLI

### macOS / Linux
```bash
sh -ci "$(curl -fsSL https://raw.githubusercontent.com/onflow/flow-cli/master/install.sh)"
```

### Windows
```powershell
iex "& { $(irm 'https://raw.githubusercontent.com/onflow/flow-cli/master/install.ps1') }"
```

### Verify Installation
```bash
flow version
```

---

## 2. Generate Key Pair

```bash
flow keys generate

# Output:
# Private Key: <YOUR_PRIVATE_KEY>
# Public Key:  <YOUR_PUBLIC_KEY>
```

**⚠️ IMPORTANT**: Save your private key securely. Never commit it to version control.

---

## 3. Create Testnet Account

### Option A: Using Flow Faucet (Recommended)
1. Visit: https://testnet-faucet.onflow.org/
2. Paste your **Public Key**
3. Click "Create Account"
4. Save your **Account Address** (format: `0x...`)

### Option B: Using Flow CLI
```bash
flow accounts create \
  --key <YOUR_PUBLIC_KEY> \
  --network testnet \
  --signer testnet-account
```

---

## 4. Fund Your Account

Get free testnet FLOW tokens:
1. Visit: https://testnet-faucet.onflow.org/fund-account
2. Enter your account address
3. Request tokens (you'll receive ~1000 FLOW)

**Verify balance:**
```bash
flow accounts get <YOUR_ADDRESS> --network testnet
```

---

## 5. Configure `flow.json`

Create `flow.json` in project root:

```json
{
  "emulators": {
    "default": {
      "port": 3569,
      "serviceAccount": "emulator-account"
    }
  },
  "contracts": {
    "ComplianceMonitor": "./contracts/ComplianceMonitor.cdc"
  },
  "networks": {
    "emulator": "127.0.0.1:3569",
    "testnet": "access.devnet.nodes.onflow.org:9000"
  },
  "accounts": {
    "emulator-account": {
      "address": "f8d6e0586b0a20c7",
      "key": "ae1b44c0f5e8f6cc50d6e5c4d1e8c5f8a9d6c5b4a3d2c1b0a9f8e7d6c5b4a3d2"
    },
    "testnet-account": {
      "address": "YOUR_TESTNET_ADDRESS",
      "key": {
        "type": "hex",
        "index": 0,
        "signatureAlgorithm": "ECDSA_P256",
        "hashAlgorithm": "SHA3_256",
        "privateKey": "YOUR_PRIVATE_KEY"
      }
    }
  },
  "deployments": {
    "testnet": {
      "testnet-account": [
        "ComplianceMonitor"
      ]
    }
  }
}
```

**Replace**:
- `YOUR_TESTNET_ADDRESS`: Address from Step 3
- `YOUR_PRIVATE_KEY`: Private key from Step 2

---

## 6. Test Your Setup

### Start Local Emulator (Optional for local dev)
```bash
flow emulator start
```

### Deploy to Testnet
```bash
flow project deploy --network=testnet
```

**Expected Output**:
```
Deploying 1 contracts for accounts: testnet-account

ComplianceMonitor -> 0x... (testnet-account)

✅ All contracts deployed successfully
```

---

## 7. Verify Deployment

```bash
# Check contract is deployed
flow accounts get <YOUR_ADDRESS> --network testnet

# Run a test script
flow scripts execute ./scripts/GetAuditLog.cdc --network=testnet
```

---

## 8. Useful Commands

### View Account
```bash
flow accounts get <ADDRESS> --network=testnet
```

### Send Transaction
```bash
flow transactions send ./transactions/SetThreshold.cdc \
  --arg UFix64:10000.0 \
  --signer testnet-account \
  --network=testnet
```

### Execute Script (Read-Only)
```bash
flow scripts execute ./scripts/GetAuditLog.cdc \
  --network=testnet
```

### Get Transaction Status
```bash
flow transactions get <TX_ID> --network=testnet
```

---

## 9. Flow Testnet Explorer

Monitor your transactions and contract at:
- **Flow Testnet Scan**: https://testnet.flowscan.io
- **Flow View Source**: https://f.dnz.dev

Search by:
- Account address
- Transaction hash
- Contract name

---

## 10. Troubleshooting

### Error: "Account not found"
- Ensure you funded your account (Step 4)
- Verify address in `flow.json` matches faucet output

### Error: "Insufficient balance"
- Request more tokens from faucet
- Wait 1-2 minutes for tokens to arrive

### Error: "Invalid signature"
- Check private key is correct in `flow.json`
- Ensure key format matches (hex, no `0x` prefix)

### Error: "Contract already deployed"
- Update contract code
- Use `flow project deploy --update` to redeploy

---

## 11. Security Best Practices

1. **Never commit `flow.json` with real private keys**
   - Add to `.gitignore`
   - Use environment variables for production

2. **Use separate accounts for different environments**
   - Development: Local emulator
   - Testing: Flow testnet
   - Production: Flow mainnet

3. **Rotate keys regularly**
   - Generate new key pair
   - Update account with new public key

---

## Next Steps

- ✅ Testnet account created and funded
- ✅ `flow.json` configured
- ✅ Contract deployed

**Continue to**: Smart Contract Implementation (Day 2)
