import { Card } from "@/components/ui/card"
import { Users, Globe, Shield } from "lucide-react"

export function AboutSection() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl lg:text-5xl font-serif font-bold text-foreground">Securing Community Savings</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Harambee DAO revolutionizes community savings groups (chamas/ROSCAs) by eliminating governance failures and
            theft through cutting-edge AI auditing and blockchain security.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="p-8 text-center space-y-6 bg-card hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <Users className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-2xl font-serif font-semibold text-card-foreground">Community First</h3>
            <p className="text-muted-foreground leading-relaxed">
              Built for African community savings groups, supporting both smartphone and feature phone users through SMS
              governance.
            </p>
          </Card>

          <Card className="p-8 text-center space-y-6 bg-card hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto">
              <Globe className="w-8 h-8 text-secondary" />
            </div>
            <h3 className="text-2xl font-serif font-semibold text-card-foreground">Global Impact</h3>
            <p className="text-muted-foreground leading-relaxed">
              Addressing the $3B annual loss from embezzlement in community savings groups across developing economies.
            </p>
          </Card>

          <Card className="p-8 text-center space-y-6 bg-card hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
              <Shield className="w-8 h-8 text-accent" />
            </div>
            <h3 className="text-2xl font-serif font-semibold text-card-foreground">Proven Security</h3>
            <p className="text-muted-foreground leading-relaxed">
              Multi-signature treasury with AI verification ensures funds are only released for verified project
              milestones.
            </p>
          </Card>
        </div>
      </div>
    </section>
  )
}
