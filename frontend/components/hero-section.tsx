"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Shield, Brain, MessageSquare, TrendingUp, ArrowRight } from "lucide-react"

export default function HeroSection() {
  const [activeFeature, setActiveFeature] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  const features = [
    {
      icon: Brain,
      title: "AI Auditor",
      description: "Computer vision verifies project milestones using satellite imagery",
      color: "text-chart-1",
      demoLink: "/ai-auditor-demo",
    },
    {
      icon: Shield,
      title: "Multi-Sig Treasury",
      description: "Gnosis Safe enforces payment rules and timelocks",
      color: "text-chart-2",
      demoLink: "/governance/proposal-demo",
    },
    {
      icon: MessageSquare,
      title: "SMS Governance",
      description: "Every member votes via SMS, even with feature phones",
      color: "text-chart-3",
      demoLink: "/governance/proposal-demo",
    },
    {
      icon: TrendingUp,
      title: "Transparent Auditing",
      description: "Immutable proof and evidence on blockchain",
      color: "text-chart-4",
      demoLink: "/ai-auditor-demo",
    },
  ]

  useEffect(() => {
    setIsVisible(true)
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/20 to-card/30" />
      <div className="absolute inset-0 bg-[url('/abstract-geometric-pattern.png')] opacity-5" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div
            className={`space-y-8 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-serif font-bold text-foreground leading-tight">
                <span className="inline-block animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
                  Stop
                </span>
                <span className="block text-primary animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
                  Embezzlement
                </span>
                <span className="block text-secondary animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
                  Forever
                </span>
              </h1>
              <p
                className="text-xl text-muted-foreground max-w-2xl leading-relaxed animate-fade-in-up"
                style={{ animationDelay: "0.8s" }}
              >
                AI-audited, multi-sig community treasury that releases funds only after verifiable project milestones.
                Let members vote via SMS.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up" style={{ animationDelay: "1s" }}>
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg group"
              >
                Launch Your DAO
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10 px-8 py-4 text-lg bg-transparent group"
                onClick={() => (window.location.href = "/governance/proposal-demo")}
              >
                Try Live Demo
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>

            <div
              className="flex items-center gap-8 text-sm text-muted-foreground animate-fade-in-up"
              style={{ animationDelay: "1.2s" }}
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-chart-1 rounded-full animate-pulse" />
                <span>$3B+ Protected</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-chart-2 rounded-full animate-pulse" style={{ animationDelay: "0.5s" }} />
                <span>95% Accuracy</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-chart-3 rounded-full animate-pulse" style={{ animationDelay: "1s" }} />
                <span>Zero Embezzlement</span>
              </div>
            </div>
          </div>

          {/* Right Column - Interactive Feature Showcase */}
          <div
            className={`relative transition-all duration-1000 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <div className="grid grid-cols-2 gap-4">
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <Card
                    key={index}
                    className={`p-6 transition-all duration-700 cursor-pointer group hover:shadow-xl ${
                      activeFeature === index
                        ? "bg-primary/10 border-primary shadow-lg scale-105 animate-pulse-border"
                        : "bg-card hover:bg-card/80 hover:scale-102"
                    }`}
                    onClick={() => {
                      setActiveFeature(index)
                      // Navigate to demo after a short delay
                      setTimeout(() => {
                        window.location.href = feature.demoLink
                      }, 500)
                    }}
                  >
                    <div className="space-y-3">
                      <Icon
                        className={`w-8 h-8 transition-all duration-300 ${
                          activeFeature === index
                            ? "text-primary animate-bounce"
                            : `${feature.color} group-hover:scale-110`
                        }`}
                      />
                      <h3 className="font-serif font-semibold text-card-foreground group-hover:text-primary transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-xs text-primary font-medium flex items-center gap-1">
                          Try Demo <ArrowRight className="h-3 w-3" />
                        </span>
                      </div>
                    </div>
                  </Card>
                )
              })}
            </div>

            {/* Central Connection Animation */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-4 h-4 bg-primary rounded-full animate-pulse" />
              <div className="absolute w-16 h-16 border-2 border-primary/30 rounded-full animate-spin-slow" />
              <div className="absolute w-24 h-24 border border-primary/20 rounded-full animate-ping-slow" />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-fade-in-up"
        style={{ animationDelay: "1.5s" }}
      >
        <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center group cursor-pointer">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-bounce group-hover:animate-pulse" />
        </div>
      </div>
    </section>
  )
}

export { HeroSection }
