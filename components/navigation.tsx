"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Play, Eye } from "lucide-react"

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-serif font-bold text-primary">Harambee DAO</h1>
            </div>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a href="/" className="text-foreground hover:text-primary transition-colors">
                Home
              </a>
              <a href="/features" className="text-foreground hover:text-primary transition-colors">
                Features
              </a>
              <a href="/technology" className="text-foreground hover:text-primary transition-colors">
                Technology
              </a>
              <a href="/governance" className="text-foreground hover:text-primary transition-colors">
                Governance
              </a>
              <a href="/community" className="text-foreground hover:text-primary transition-colors">
                Community
              </a>
              <a href="/resources" className="text-foreground hover:text-primary transition-colors">
                Resources
              </a>
              <a href="/contact" className="text-foreground hover:text-primary transition-colors">
                Contact
              </a>
              <div className="relative group">
                <button className="text-foreground hover:text-primary transition-colors flex items-center gap-1">
                  <Play className="h-4 w-4" />
                  Live Demos
                </button>
                <div className="absolute top-full left-0 mt-2 w-48 bg-card border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <a
                    href="/governance/proposal-demo"
                    className="block px-4 py-3 text-sm hover:bg-muted transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <Play className="h-4 w-4 text-primary" />
                      <div>
                        <div className="font-medium">Governance Demo</div>
                        <div className="text-xs text-muted-foreground">Create & vote on proposals</div>
                      </div>
                    </div>
                  </a>
                  <a href="/ai-auditor-demo" className="block px-4 py-3 text-sm hover:bg-muted transition-colors">
                    <div className="flex items-center gap-2">
                      <Eye className="h-4 w-4 text-primary" />
                      <div>
                        <div className="font-medium">AI Auditor Demo</div>
                        <div className="text-xs text-muted-foreground">Test AI verification</div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="hidden md:block">
            <Button className="bg-primary hover:bg-primary/90">Get Started</Button>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-foreground hover:text-primary">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-background border-b border-border">
            <a href="/" className="block px-3 py-2 text-foreground hover:text-primary">
              Home
            </a>
            <a href="/features" className="block px-3 py-2 text-foreground hover:text-primary">
              Features
            </a>
            <a href="/technology" className="block px-3 py-2 text-foreground hover:text-primary">
              Technology
            </a>
            <a href="/governance" className="block px-3 py-2 text-foreground hover:text-primary">
              Governance
            </a>
            <a href="/community" className="block px-3 py-2 text-foreground hover:text-primary">
              Community
            </a>
            <a href="/resources" className="block px-3 py-2 text-foreground hover:text-primary">
              Resources
            </a>
            <a href="/contact" className="block px-3 py-2 text-foreground hover:text-primary">
              Contact
            </a>
            <div className="px-3 py-2 border-t border-border mt-2">
              <div className="text-sm font-medium text-muted-foreground mb-2">Live Demos</div>
              <a
                href="/governance/proposal-demo"
                className="block px-3 py-2 text-sm text-foreground hover:text-primary"
              >
                Governance Demo
              </a>
              <a href="/ai-auditor-demo" className="block px-3 py-2 text-sm text-foreground hover:text-primary">
                AI Auditor Demo
              </a>
            </div>
            <div className="px-3 py-2">
              <Button className="w-full bg-primary hover:bg-primary/90">Get Started</Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export { Navigation }
