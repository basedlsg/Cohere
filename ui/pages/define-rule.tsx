import { useState, useEffect } from 'react'
import Link from 'next/link'
import * as fcl from '@onflow/fcl'
import * as t from '@onflow/types'
import { CONTRACTS } from '../flow/config'

export default function DefineRule() {
  const [threshold, setThreshold] = useState<string>('')
  const [currentThreshold, setCurrentThreshold] = useState<string>('Loading...')
  const [auditCount, setAuditCount] = useState<string>('0')
  const [txStatus, setTxStatus] = useState<string>('')
  const [loading, setLoading] = useState(false)

  // Fetch current threshold on mount
  useEffect(() => {
    fetchCurrentThreshold()
  }, [])

  const fetchCurrentThreshold = async () => {
    try {
      const result = await fcl.query({
        cadence: `
          import ComplianceMonitor from ${CONTRACTS.ComplianceMonitor}

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
        `,
        args: (arg: any, t: any) => []
      })

      setCurrentThreshold(result.threshold + ' FLOW')
      setAuditCount(result.auditCount.toString())
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
    setTxStatus('Submitting transaction to Flow emulator...')

    try {
      // Format as UFix64 (must have decimal point)
      const formattedThreshold = parseFloat(threshold).toFixed(1)

      const txId = await fcl.mutate({
        cadence: `
          import ComplianceMonitor from ${CONTRACTS.ComplianceMonitor}

          transaction(newThreshold: UFix64) {
            let adminRef: &ComplianceMonitor.Admin

            prepare(signer: auth(Storage, BorrowValue) &Account) {
              self.adminRef = signer.storage.borrow<&ComplianceMonitor.Admin>(
                from: ComplianceMonitor.AdminStoragePath
              ) ?? panic("Could not borrow Admin reference")
            }

            execute {
              if newThreshold <= 0.0 {
                panic("Threshold must be positive")
              }

              self.adminRef.updateThreshold(newThreshold: newThreshold)
              log("Threshold updated to: ".concat(newThreshold.toString()))
            }
          }
        `,
        args: (arg: any, tx: any) => [arg(formattedThreshold, t.UFix64)],
        limit: 9999
      })

      setTxStatus(`Transaction submitted: ${txId}`)

      // Wait for transaction to be sealed
      const tx = await fcl.tx(txId).onceSealed()
      setTxStatus(`✅ Transaction sealed! Status: ${tx.status}`)

      // Refresh current threshold
      setTimeout(() => {
        fetchCurrentThreshold()
        setLoading(false)
        setThreshold('')
      }, 1000)

    } catch (error: any) {
      console.error('Transaction error:', error)
      setTxStatus(`❌ Error: ${error.message || 'Transaction failed'}`)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">ComplianceFlow MVP</h1>
          <nav className="flex space-x-6 text-sm">
            <Link href="/" className="text-purple-600 hover:underline">
              Home
            </Link>
            <span className="text-purple-600 font-semibold">Define Rule</span>
            <Link href="/audit-feed" className="text-gray-600 hover:text-purple-600">
              Audit Feed
            </Link>
          </nav>
        </header>

        <main>
          <h2 className="text-3xl font-bold mb-8">Define Compliance Rule</h2>

          {/* Current Threshold */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h3 className="text-xl font-semibold mb-2">Current Threshold</h3>
            <p className="text-4xl font-bold text-purple-600 mb-2">{currentThreshold}</p>
            <p className="text-gray-600">
              Transactions exceeding this amount will be flagged for audit
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Total flagged transactions: <strong>{auditCount}</strong>
            </p>
          </div>

          {/* Update Threshold Form */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h3 className="text-xl font-semibold mb-4">Update Threshold</h3>

            <div className="mb-4">
              <label htmlFor="threshold" className="block text-sm font-medium text-gray-700 mb-2">
                New Threshold Amount (FLOW)
              </label>
              <input
                id="threshold"
                type="number"
                step="0.01"
                min="0"
                placeholder="15000.00"
                value={threshold}
                onChange={(e) => setThreshold(e.target.value)}
                disabled={loading}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100"
              />
            </div>

            <button
              onClick={handleUpdateThreshold}
              disabled={loading || !threshold}
              className="w-full bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              {loading ? 'Updating...' : 'Update Threshold'}
            </button>

            {txStatus && (
              <div
                className={`mt-4 p-4 rounded-lg ${
                  txStatus.includes('Error') || txStatus.includes('❌')
                    ? 'bg-red-50 text-red-700'
                    : 'bg-green-50 text-green-700'
                }`}
              >
                {txStatus}
              </div>
            )}
          </div>

          {/* Info Box */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h4 className="font-semibold mb-3">How it works</h4>
            <ol className="space-y-2 text-sm text-gray-700">
              <li>1. Enter a threshold amount in FLOW tokens</li>
              <li>2. Click "Update Threshold" to submit transaction</li>
              <li>3. Transaction is processed on Flow emulator</li>
              <li>4. ComplianceCheck Workflow uses new threshold</li>
              <li>5. View flagged transactions in the Audit Feed</li>
            </ol>
          </div>
        </main>
      </div>
    </div>
  )
}
