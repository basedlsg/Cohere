// define-rule.tsx
// Page 1: Define compliance threshold rule
//
// Features:
// - Input field for threshold amount
// - Submit button to update on-chain
// - Display current threshold value
// - Transaction status feedback

import { useState, useEffect } from 'react'
import * as fcl from '@onflow/fcl'

export default function DefineRule() {
  const [threshold, setThreshold] = useState<string>('')
  const [currentThreshold, setCurrentThreshold] = useState<string>('Loading...')
  const [txStatus, setTxStatus] = useState<string>('')
  const [loading, setLoading] = useState(false)

  // Fetch current threshold on mount
  useEffect(() => {
    fetchCurrentThreshold()
  }, [])

  const fetchCurrentThreshold = async () => {
    try {
      // TODO: Execute GetAuditLog script
      // const result = await fcl.query({
      //   cadence: GET_AUDIT_LOG_SCRIPT,
      //   args: (arg, t) => []
      // })
      // setCurrentThreshold(result.threshold)

      // Placeholder
      setCurrentThreshold('10000.0 FLOW')
    } catch (error) {
      console.error('Error fetching threshold:', error)
      setCurrentThreshold('Error loading')
    }
  }

  const handleUpdateThreshold = async () => {
    if (!threshold || parseFloat(threshold) <= 0) {
      alert('Please enter a valid threshold amount')
      return
    }

    setLoading(true)
    setTxStatus('Submitting transaction...')

    try {
      // TODO: Send SetThreshold transaction
      // const txId = await fcl.mutate({
      //   cadence: SET_THRESHOLD_TRANSACTION,
      //   args: (arg, t) => [arg(threshold, t.UFix64)],
      //   limit: 9999
      // })

      // setTxStatus(`Transaction submitted: ${txId}`)

      // // Wait for transaction to be sealed
      // const tx = await fcl.tx(txId).onceSealed()
      // setTxStatus(`Transaction sealed! Status: ${tx.status}`)

      // Placeholder
      const mockTxId = '0xabcd1234efgh5678'
      setTxStatus(`Transaction submitted: ${mockTxId}`)

      // Refresh current threshold
      setTimeout(() => {
        setCurrentThreshold(`${threshold} FLOW`)
        setTxStatus('Threshold updated successfully!')
        setLoading(false)
      }, 2000)

    } catch (error: any) {
      console.error('Transaction error:', error)
      setTxStatus(`Error: ${error.message}`)
      setLoading(false)
    }
  }

  return (
    <div className="container">
      <header>
        <h1>ComplianceFlow MVP</h1>
        <nav>
          <a href="/">Home</a>
          <a href="/define-rule" className="active">Define Rule</a>
          <a href="/audit-feed">Audit Feed</a>
        </nav>
      </header>

      <main>
        <h2>Define Compliance Rule</h2>

        <div className="card">
          <h3>Current Threshold</h3>
          <p className="threshold-value">{currentThreshold}</p>
          <p className="help-text">
            Transactions exceeding this amount will be flagged for audit
          </p>
        </div>

        <div className="card">
          <h3>Update Threshold</h3>
          <div className="form-group">
            <label htmlFor="threshold">New Threshold Amount (FLOW)</label>
            <input
              id="threshold"
              type="number"
              step="0.01"
              min="0"
              placeholder="10000.00"
              value={threshold}
              onChange={(e) => setThreshold(e.target.value)}
              disabled={loading}
            />
          </div>

          <button
            onClick={handleUpdateThreshold}
            disabled={loading || !threshold}
            className="btn-primary"
          >
            {loading ? 'Updating...' : 'Update Threshold'}
          </button>

          {txStatus && (
            <div className={`status ${txStatus.includes('Error') ? 'error' : 'success'}`}>
              {txStatus}
            </div>
          )}
        </div>

        <div className="info-box">
          <h4>How it works</h4>
          <ol>
            <li>Enter a threshold amount in FLOW tokens</li>
            <li>Click "Update Threshold" to submit transaction</li>
            <li>Transaction is processed on Flow testnet</li>
            <li>ComplianceCheck Workflow uses new threshold</li>
          </ol>
        </div>
      </main>

      <style jsx>{`
        /* Placeholder styles - will be enhanced in Day 5-6 */
        .container { max-width: 1200px; margin: 0 auto; padding: 20px; }
        header { margin-bottom: 40px; }
        nav { margin-top: 20px; }
        nav a { margin-right: 20px; padding: 10px; }
        .card { background: #f5f5f5; padding: 20px; margin: 20px 0; border-radius: 8px; }
        .form-group { margin: 20px 0; }
        input { width: 100%; padding: 10px; font-size: 16px; }
        .btn-primary { padding: 12px 24px; font-size: 16px; cursor: pointer; }
        .status { margin-top: 20px; padding: 10px; }
        .info-box { background: #e3f2fd; padding: 20px; margin: 20px 0; }
      `}</style>
    </div>
  )
}
