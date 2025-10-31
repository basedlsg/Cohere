// index.tsx
// Landing page for ComplianceFlow MVP

export default function Home() {
  return (
    <div className="container">
      <header>
        <h1>ComplianceFlow MVP</h1>
        <p className="subtitle">Automated On-Chain Compliance Monitoring with Flow Forte</p>
      </header>

      <main>
        <section className="hero">
          <h2>Welcome to ComplianceFlow</h2>
          <p>
            A minimal demonstration of Flow Forte's Actions and Workflows for
            automated compliance monitoring on the blockchain.
          </p>
        </section>

        <section className="features">
          <div className="feature-card">
            <h3>🎯 Define Rule</h3>
            <p>Set a threshold amount for automatic transaction flagging</p>
            <a href="/define-rule" className="btn-primary">Configure Rules →</a>
          </div>

          <div className="feature-card">
            <h3>📊 Audit Feed</h3>
            <p>View all flagged transactions in real-time from Flow testnet</p>
            <a href="/audit-feed" className="btn-primary">View Feed →</a>
          </div>
        </section>

        <section className="tech-stack">
          <h3>Built With</h3>
          <ul>
            <li>✅ Flow Blockchain (Testnet)</li>
            <li>✅ Forte Upgrade (Actions & Workflows)</li>
            <li>✅ Cadence Smart Contracts</li>
            <li>✅ Flow Client Library (FCL)</li>
            <li>✅ Next.js + React</li>
          </ul>
        </section>

        <section className="info">
          <h3>How It Works</h3>
          <ol>
            <li><strong>Define Rule:</strong> Set a compliance threshold (e.g., $10,000)</li>
            <li><strong>Transaction Occurs:</strong> User sends a transaction on Flow</li>
            <li><strong>Action Executes:</strong> CheckTransactionAmount reads the amount</li>
            <li><strong>Workflow Runs:</strong> ComplianceCheck evaluates threshold</li>
            <li><strong>Event Emitted:</strong> ComplianceAuditLog written on-chain</li>
            <li><strong>UI Updates:</strong> Audit Feed displays flagged transaction</li>
          </ol>
        </section>

        <section className="hackathon">
          <h3>🏆 Forte Hacks 2025</h3>
          <p>
            This project is a submission for the Forte Hacks hackathon by Flow and HackQuest.
            <br />
            Prize Pool: $250,000 USD | Track: Actions & Workflows
          </p>
          <a
            href="https://www.hackquest.io/en/hackathons/Forte-Hacks"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            Learn More About the Hackathon →
          </a>
        </section>
      </main>

      <footer>
        <p>Built by @basedlsg | #ForteHacks @flow_blockchain</p>
        <p>
          <a href="https://github.com/basedlsg/ComplianceFlow-MVP" target="_blank">GitHub</a>
          {' | '}
          <a href="https://testnet.flowscan.io" target="_blank">Flow Testnet Explorer</a>
        </p>
      </footer>

      <style jsx>{`
        .container { max-width: 1200px; margin: 0 auto; padding: 20px; }
        header { text-align: center; margin-bottom: 60px; }
        .subtitle { color: #666; font-size: 18px; }
        .hero { text-align: center; padding: 40px 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 12px; margin-bottom: 40px; }
        .features { display: grid; grid-template-columns: repeat(2, 1fr); gap: 30px; margin: 40px 0; }
        .feature-card { background: #f5f5f5; padding: 30px; border-radius: 8px; text-align: center; }
        .tech-stack { background: #e3f2fd; padding: 30px; border-radius: 8px; margin: 40px 0; }
        .tech-stack ul { list-style: none; padding: 0; }
        .tech-stack li { padding: 8px 0; }
        .info { margin: 40px 0; }
        .info ol { padding-left: 20px; }
        .info ol li { margin: 12px 0; }
        .hackathon { background: #fff3cd; padding: 30px; border-radius: 8px; text-align: center; margin: 40px 0; }
        .btn-primary { display: inline-block; padding: 12px 24px; background: #667eea; color: white; text-decoration: none; border-radius: 6px; margin-top: 15px; }
        .btn-secondary { display: inline-block; padding: 12px 24px; background: #333; color: white; text-decoration: none; border-radius: 6px; margin-top: 15px; }
        footer { text-align: center; margin-top: 60px; padding-top: 40px; border-top: 1px solid #ddd; color: #666; }
        footer a { color: #667eea; text-decoration: none; }
      `}</style>
    </div>
  )
}
