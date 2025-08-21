import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { GovernanceHero } from "@/components/governance/governance-hero"
import { DecentralizedGovernance } from "@/components/governance/decentralized-governance"
import { VotingProcess } from "@/components/governance/voting-process"
import { DAOStructure } from "@/components/governance/dao-structure"
import { ProposalManagement } from "@/components/governance/proposal-management"
import { GovernanceStats } from "@/components/governance/governance-stats"

export default function GovernancePage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <GovernanceHero />
      <DecentralizedGovernance />
      <VotingProcess />
      <DAOStructure />
      <ProposalManagement />
      <GovernanceStats />
      <Footer />
    </main>
  )
}
