"use client"

import type React from "react"

import { useState } from "react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Upload, Camera, CheckCircle, AlertTriangle, Clock, Eye } from "lucide-react"

interface AuditResult {
  id: string
  status: "analyzing" | "approved" | "rejected" | "needs_review"
  confidence: number
  findings: string[]
  timestamp: Date
}

export default function AIAuditorDemoPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [auditResult, setAuditResult] = useState<AuditResult | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
      setAuditResult(null)
    }
  }

  const simulateAIAnalysis = async () => {
    if (!selectedFile) return

    setIsAnalyzing(true)
    setAuditResult({
      id: `audit_${Date.now()}`,
      status: "analyzing",
      confidence: 0,
      findings: [],
      timestamp: new Date(),
    })

    // Simulate analysis steps
    const steps = [
      { delay: 1000, findings: ["Image quality assessment: Good"] },
      { delay: 1500, findings: ["Object detection: Construction materials identified"] },
      { delay: 2000, findings: ["Progress verification: Foundation 80% complete"] },
      { delay: 2500, findings: ["Compliance check: Safety equipment visible"] },
    ]

    for (const step of steps) {
      await new Promise((resolve) => setTimeout(resolve, step.delay))
      setAuditResult((prev) =>
        prev
          ? {
              ...prev,
              findings: [...prev.findings, ...step.findings],
            }
          : null,
      )
    }

    // Final result
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const finalResult: AuditResult = {
      id: `audit_${Date.now()}`,
      status: Math.random() > 0.3 ? "approved" : "needs_review",
      confidence: Math.floor(Math.random() * 20) + 80, // 80-100%
      findings: [
        "Image quality assessment: Good",
        "Object detection: Construction materials identified",
        "Progress verification: Foundation 80% complete",
        "Compliance check: Safety equipment visible",
        "Milestone verification: Matches submitted proposal",
        "Authenticity check: No manipulation detected",
      ],
      timestamp: new Date(),
    }

    setAuditResult(finalResult)
    setIsAnalyzing(false)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "analyzing":
        return <Clock className="h-5 w-5 text-blue-500 animate-spin" />
      case "approved":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "rejected":
        return <AlertTriangle className="h-5 w-5 text-red-500" />
      case "needs_review":
        return <Eye className="h-5 w-5 text-yellow-500" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "analyzing":
        return "border-blue-200 bg-blue-50"
      case "approved":
        return "border-green-200 bg-green-50"
      case "rejected":
        return "border-red-200 bg-red-50"
      case "needs_review":
        return "border-yellow-200 bg-yellow-50"
      default:
        return "border-gray-200 bg-gray-50"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-16">
        <section className="py-16 bg-gradient-to-br from-primary/5 to-accent/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="font-serif text-5xl font-bold text-foreground mb-4">AI Auditor Demo</h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Experience our computer vision AI that verifies project milestones and prevents fraud
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Upload Section */}
              <Card className="p-8">
                <h2 className="font-serif text-2xl font-semibold mb-6">Submit Evidence</h2>

                <div className="space-y-6">
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                    {previewUrl ? (
                      <div className="space-y-4">
                        <img
                          src={previewUrl || "/placeholder.svg"}
                          alt="Preview"
                          className="max-w-full h-48 object-cover mx-auto rounded-lg"
                        />
                        <p className="text-sm text-muted-foreground">{selectedFile?.name}</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <Upload className="h-12 w-12 text-muted-foreground mx-auto" />
                        <div>
                          <p className="text-lg font-medium">Upload Project Evidence</p>
                          <p className="text-muted-foreground">Photos, receipts, or documents for AI verification</p>
                        </div>
                      </div>
                    )}

                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="hidden"
                      id="file-upload"
                    />
                    <label htmlFor="file-upload">
                      <Button variant="outline" className="mt-4 cursor-pointer bg-transparent">
                        <Camera className="h-4 w-4 mr-2" />
                        Choose File
                      </Button>
                    </label>
                  </div>

                  <Button onClick={simulateAIAnalysis} disabled={!selectedFile || isAnalyzing} className="w-full">
                    {isAnalyzing ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Eye className="h-4 w-4 mr-2" />
                        Start AI Analysis
                      </>
                    )}
                  </Button>
                </div>
              </Card>

              {/* Results Section */}
              <Card className="p-8">
                <h2 className="font-serif text-2xl font-semibold mb-6">Analysis Results</h2>

                {!auditResult ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <Eye className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Upload an image to see AI analysis results</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Status Header */}
                    <div className={`p-4 rounded-lg border ${getStatusColor(auditResult.status)}`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {getStatusIcon(auditResult.status)}
                          <span className="font-semibold capitalize">{auditResult.status.replace("_", " ")}</span>
                        </div>
                        {auditResult.status !== "analyzing" && (
                          <span className="text-sm font-medium">{auditResult.confidence}% Confidence</span>
                        )}
                      </div>
                    </div>

                    {/* Analysis Progress */}
                    <div className="space-y-3">
                      <h3 className="font-medium">Analysis Steps</h3>
                      <div className="space-y-2">
                        {auditResult.findings.map((finding, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg animate-fade-in"
                            style={{ animationDelay: `${index * 0.2}s` }}
                          >
                            <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                            <span className="text-sm">{finding}</span>
                          </div>
                        ))}

                        {auditResult.status === "analyzing" && (
                          <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
                            <span className="text-sm text-blue-700">Processing...</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Final Verdict */}
                    {auditResult.status !== "analyzing" && (
                      <div className="pt-4 border-t">
                        <h3 className="font-medium mb-3">AI Verdict</h3>
                        <div
                          className={`p-4 rounded-lg ${
                            auditResult.status === "approved"
                              ? "bg-green-50 border border-green-200"
                              : "bg-yellow-50 border border-yellow-200"
                          }`}
                        >
                          <p className="text-sm">
                            {auditResult.status === "approved"
                              ? "✅ Evidence verified successfully. Milestone requirements met. Funds can be released."
                              : "⚠️ Evidence requires human review. Some aspects need clarification before approval."}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </Card>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif text-3xl font-bold text-center mb-12">How AI Auditing Works</h2>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Upload className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-serif text-xl font-semibold mb-3">Evidence Submission</h3>
                <p className="text-muted-foreground">
                  Community members submit photos, receipts, or documents as proof of project progress
                </p>
              </Card>

              <Card className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Eye className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-serif text-xl font-semibold mb-3">AI Analysis</h3>
                <p className="text-muted-foreground">
                  Computer vision algorithms verify authenticity, progress, and compliance with project requirements
                </p>
              </Card>

              <Card className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-serif text-xl font-semibold mb-3">Automated Approval</h3>
                <p className="text-muted-foreground">
                  Verified milestones trigger automatic fund release through smart contracts
                </p>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
