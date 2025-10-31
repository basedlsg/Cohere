import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            ComplianceFlow MVP
          </h1>
          <p className="text-xl text-gray-600">
            Automated On-Chain Compliance Monitoring with Flow Forte
          </p>
        </header>

        {/* Hero */}
        <section className="bg-gradient-to-r from-purple-500 to-purple-700 text-white rounded-xl p-12 mb-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Welcome to ComplianceFlow</h2>
          <p className="text-lg max-w-3xl mx-auto">
            A minimal demonstration of Flow Forte's Actions and Workflows for
            automated compliance monitoring on the blockchain.
          </p>
        </section>

        {/* Features */}
        <section className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white p-8 rounded-lg shadow-sm text-center">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-2xl font-bold mb-3">Define Rule</h3>
            <p className="text-gray-600 mb-6">
              Set a threshold amount for automatic transaction flagging
            </p>
            <Link
              href="/define-rule"
              className="inline-block bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition"
            >
              Configure Rules →
            </Link>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-sm text-center">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-2xl font-bold mb-3">Audit Feed</h3>
            <p className="text-gray-600 mb-6">
              View all flagged transactions in real-time from Flow emulator
            </p>
            <Link
              href="/audit-feed"
              className="inline-block bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition"
            >
              View Feed →
            </Link>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="bg-blue-50 p-8 rounded-lg mb-12">
          <h3 className="text-2xl font-bold mb-6 text-center">Built With</h3>
          <ul className="space-y-3 max-w-md mx-auto">
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✅</span>
              Flow Blockchain (Emulator)
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✅</span>
              Forte Upgrade (Actions & Workflows)
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✅</span>
              Cadence Smart Contracts
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✅</span>
              Flow Client Library (FCL)
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✅</span>
              Next.js + React + TypeScript
            </li>
          </ul>
        </section>

        {/* How It Works */}
        <section className="mb-12">
          <h3 className="text-2xl font-bold mb-6 text-center">How It Works</h3>
          <ol className="space-y-4 max-w-3xl mx-auto">
            <li className="flex items-start">
              <span className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">
                1
              </span>
              <div>
                <strong>Define Rule:</strong> Set a compliance threshold (e.g., $10,000)
              </div>
            </li>
            <li className="flex items-start">
              <span className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">
                2
              </span>
              <div>
                <strong>Transaction Occurs:</strong> User sends a transaction on Flow
              </div>
            </li>
            <li className="flex items-start">
              <span className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">
                3
              </span>
              <div>
                <strong>Action Executes:</strong> CheckTransactionAmount reads the amount
              </div>
            </li>
            <li className="flex items-start">
              <span className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">
                4
              </span>
              <div>
                <strong>Workflow Runs:</strong> ComplianceCheck evaluates threshold
              </div>
            </li>
            <li className="flex items-start">
              <span className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">
                5
              </span>
              <div>
                <strong>Event Emitted:</strong> ComplianceAuditLog written on-chain
              </div>
            </li>
            <li className="flex items-start">
              <span className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">
                6
              </span>
              <div>
                <strong>UI Updates:</strong> Audit Feed displays flagged transaction
              </div>
            </li>
          </ol>
        </section>

        {/* Hackathon */}
        <section className="bg-yellow-50 border-2 border-yellow-200 p-8 rounded-lg text-center mb-12">
          <h3 className="text-2xl font-bold mb-4">🏆 Forte Hacks 2025</h3>
          <p className="text-gray-700 mb-6">
            This project is a submission for the Forte Hacks hackathon by Flow and HackQuest.
            <br />
            <span className="font-bold">Prize Pool: $250,000 USD | Track: Actions & Workflows</span>
          </p>
          <a
            href="https://www.hackquest.io/en/hackathons/Forte-Hacks"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
          >
            Learn More About the Hackathon →
          </a>
        </section>

        {/* Footer */}
        <footer className="text-center pt-12 border-t border-gray-200">
          <p className="text-gray-600 mb-2">
            Built by @basedlsg | #ForteHacks @flow_blockchain
          </p>
          <p className="text-gray-600">
            <a
              href="https://github.com/basedlsg/Cohere"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-600 hover:underline"
            >
              GitHub
            </a>
            {' | '}
            <a
              href="https://testnet.flowscan.io"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-600 hover:underline"
            >
              Flow Testnet Explorer
            </a>
          </p>
        </footer>
      </div>
    </div>
  )
}
