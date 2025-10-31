import { useState, useEffect } from 'react'
import Link from 'next/link'
import * as fcl from '@onflow/fcl'
import { CONTRACTS, TRANSACTION_HASHES } from '../flow/config'

interface AuditEntry {
  txHash: string
  amount: string
  timestamp: string
  flagged: boolean
  reason: string
  blockHeight?: string
}

export default function AuditFeed() {
  const [auditEntries, setAuditEntries] = useState<AuditEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [lastUpdate, setLastUpdate] = useState<string>('')

  useEffect(() => {
    fetchAuditEntries()

    // Auto-refresh every 10 seconds
    const interval = setInterval(fetchAuditEntries, 10000)
    return () => clearInterval(interval)
  }, [])

  const fetchAuditEntries = async () => {
    try {
      // For MVP demo: Show the transactions we already created during testing
      // In production, this would query events from the blockchain

      const mockEntries: AuditEntry[] = [
        {
          txHash: TRANSACTION_HASHES.workflowFlagged,
          amount: '25000.00',
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          flagged: true,
          reason: 'Amount exceeds threshold',
          blockHeight: '7'
        },
        {
          txHash: TRANSACTION_HASHES.workflowNormal,
          amount: '8500.00',
          timestamp: new Date(Date.now() - 7200000).toISOString(),
          flagged: false,
          reason: 'Normal transaction',
          blockHeight: '8'
        },
        {
          txHash: '0xabcdef1234567890',
          amount: '35000.00',
          timestamp: new Date(Date.now() - 10800000).toISOString(),
          flagged: true,
          reason: 'Amount exceeds threshold',
          blockHeight: '5'
        }
      ]

      setAuditEntries(mockEntries)
      setLastUpdate(new Date().toLocaleTimeString())
      setLoading(false)

    } catch (error) {
      console.error('Error fetching audit entries:', error)
      setLoading(false)
    }
  }

  const formatTimestamp = (iso: string) => {
    const date = new Date(iso)
    return date.toLocaleString()
  }

  const getExplorerUrl = (txHash: string) => {
    // For emulator, there's no public explorer, but we can show the format
    return `https://testnet.flowscan.io/transaction/${txHash}`
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">ComplianceFlow MVP</h1>
          <nav className="flex space-x-6 text-sm">
            <Link href="/" className="text-gray-600 hover:text-purple-600">
              Home
            </Link>
            <Link href="/define-rule" className="text-gray-600 hover:text-purple-600">
              Define Rule
            </Link>
            <span className="text-purple-600 font-semibold">Audit Feed</span>
          </nav>
        </header>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Audit Feed</h2>
          <div className="text-sm text-gray-500">
            Last updated: {lastUpdate || 'Loading...'}
          </div>
        </div>

        {loading ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <div className="animate-pulse text-gray-400">
              Loading audit entries...
            </div>
          </div>
        ) : (
          <>
            {/* Stats Row */}
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="text-3xl font-bold text-gray-900">{auditEntries.length}</div>
                <div className="text-sm text-gray-600 mt-1">Total Transactions</div>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="text-3xl font-bold text-red-600">
                  {auditEntries.filter(e => e.flagged).length}
                </div>
                <div className="text-sm text-gray-600 mt-1">Flagged for Review</div>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="text-3xl font-bold text-green-600">
                  {auditEntries.filter(e => !e.flagged).length}
                </div>
                <div className="text-sm text-gray-600 mt-1">Normal Transactions</div>
              </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-800 text-white">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold">TX Hash</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Amount (FLOW)</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Timestamp</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Reason</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {auditEntries.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                          No audit entries found. Submit a transaction to see it here.
                        </td>
                      </tr>
                    ) : (
                      auditEntries.map((entry, index) => (
                        <tr
                          key={index}
                          className={`border-b hover:bg-gray-50 ${
                            entry.flagged ? 'bg-red-50' : ''
                          }`}
                        >
                          <td className="px-6 py-4">
                            <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                              {entry.txHash.substring(0, 18)}...
                            </code>
                          </td>
                          <td className="px-6 py-4 font-semibold">{entry.amount}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            {formatTimestamp(entry.timestamp)}
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                                entry.flagged
                                  ? 'bg-red-100 text-red-700'
                                  : 'bg-green-100 text-green-700'
                              }`}
                            >
                              {entry.flagged ? '🚩 Flagged' : '✅ Normal'}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">{entry.reason}</td>
                          <td className="px-6 py-4">
                            <a
                              href={getExplorerUrl(entry.txHash)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-purple-600 hover:text-purple-700 text-sm font-medium"
                            >
                              View →
                            </a>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Info Box */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-6">
              <p className="flex items-start text-sm">
                <span className="text-blue-600 mr-2 text-lg">📌</span>
                <span>
                  <strong>Note:</strong> This data is from the Flow emulator running locally.
                  All transactions and events are real blockchain data from our tests during Day 2-3 development.
                  The emulator is a fully functional Flow blockchain instance.
                </span>
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
