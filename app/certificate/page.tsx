"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { mockUser, mockDonations, mockPurchases, formatPrice } from "@/lib/mock-data"
import { Download, ArrowLeft, Award, Heart, Sparkles, Leaf } from "lucide-react"

export default function CertificatePage() {
  const certificateRef = useRef<HTMLDivElement>(null)

  const totalDonations = mockDonations.length
  const totalContributed = mockPurchases.reduce((sum, p) => sum + p.total * 0.07, 0)
  const physicalDonations = mockDonations.filter((d) => d.type === "dowear").length
  const fundDonations = mockDonations.filter((d) => d.type === "dowear-plus").length

  const handleDownload = () => {
    // In a real app, this would generate a PDF or image
    // For now, we'll use the browser's print functionality
    const printContent = certificateRef.current
    if (printContent) {
      const printWindow = window.open("", "_blank")
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>ReWear+ Certificate - ${mockUser.name}</title>
              <style>
                @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
                body {
                  font-family: 'Plus Jakarta Sans', sans-serif;
                  margin: 0;
                  padding: 40px;
                  background: #f9fafb;
                }
                .certificate {
                  max-width: 800px;
                  margin: 0 auto;
                  background: linear-gradient(135deg, #fefce8 0%, #f0fdf4 50%, #ecfdf5 100%);
                  border: 3px solid #166534;
                  border-radius: 16px;
                  padding: 48px;
                  position: relative;
                  overflow: hidden;
                }
                .certificate::before {
                  content: '';
                  position: absolute;
                  top: 0;
                  left: 0;
                  right: 0;
                  bottom: 0;
                  background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23166534' fillOpacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
                  pointer-events: none;
                }
                .header {
                  text-align: center;
                  margin-bottom: 32px;
                }
                .logo {
                  width: 80px;
                  height: 80px;
                  margin: 0 auto 16px;
                  border-radius: 12px;
                }
                .title {
                  font-size: 14px;
                  color: #166534;
                  font-weight: 600;
                  text-transform: uppercase;
                  letter-spacing: 3px;
                  margin-bottom: 8px;
                }
                .main-title {
                  font-size: 32px;
                  font-weight: 700;
                  color: #14532d;
                  margin-bottom: 8px;
                }
                .subtitle {
                  font-size: 14px;
                  color: #4b5563;
                }
                .content {
                  text-align: center;
                  margin: 40px 0;
                  position: relative;
                  z-index: 1;
                }
                .presented {
                  font-size: 14px;
                  color: #6b7280;
                  margin-bottom: 8px;
                }
                .name {
                  font-size: 36px;
                  font-weight: 700;
                  color: #166534;
                  margin-bottom: 16px;
                  font-style: italic;
                }
                .description {
                  font-size: 16px;
                  color: #374151;
                  max-width: 500px;
                  margin: 0 auto 32px;
                  line-height: 1.6;
                }
                .stats {
                  display: flex;
                  justify-content: center;
                  gap: 32px;
                  margin: 32px 0;
                }
                .stat {
                  text-align: center;
                }
                .stat-value {
                  font-size: 24px;
                  font-weight: 700;
                  color: #166534;
                }
                .stat-label {
                  font-size: 12px;
                  color: #6b7280;
                }
                .footer {
                  display: flex;
                  justify-content: space-between;
                  align-items: flex-end;
                  margin-top: 48px;
                  padding-top: 24px;
                  border-top: 1px solid #d1d5db;
                }
                .date {
                  text-align: left;
                }
                .date-label {
                  font-size: 12px;
                  color: #6b7280;
                }
                .date-value {
                  font-size: 14px;
                  font-weight: 600;
                  color: #374151;
                }
                .signature {
                  text-align: right;
                }
                .signature-line {
                  width: 150px;
                  border-bottom: 1px solid #374151;
                  margin-bottom: 4px;
                  margin-left: auto;
                }
                .signature-name {
                  font-size: 14px;
                  font-weight: 600;
                  color: #374151;
                }
                .signature-title {
                  font-size: 12px;
                  color: #6b7280;
                }
                .badge {
                  display: inline-flex;
                  align-items: center;
                  gap: 8px;
                  background: #166534;
                  color: white;
                  padding: 8px 16px;
                  border-radius: 24px;
                  font-size: 12px;
                  font-weight: 600;
                  margin-top: 24px;
                }
              </style>
            </head>
            <body>
              <div class="certificate">
                <div class="header">
                  <img src="/rewear-logo.png" class="logo" alt="ReWear+ Logo" />
                  <div class="title">Certificate of Appreciation</div>
                  <div class="main-title">ReWear+ Impact Award</div>
                  <div class="subtitle">Wear Again, Care Again</div>
                </div>
                <div class="content">
                  <div class="presented">This certificate is proudly presented to</div>
                  <div class="name">${mockUser.name}</div>
                  <div class="description">
                    For outstanding contribution to sustainable fashion and community support 
                    through active participation in the ReWear+ platform, demonstrating commitment 
                    to environmental sustainability and social responsibility.
                  </div>
                  <div class="stats">
                    <div class="stat">
                      <div class="stat-value">${totalDonations}</div>
                      <div class="stat-label">Items Donated</div>
                    </div>
                    <div class="stat">
                      <div class="stat-value">${formatPrice(totalContributed)}</div>
                      <div class="stat-label">Fund Contributed</div>
                    </div>
                    <div class="stat">
                      <div class="stat-value">3</div>
                      <div class="stat-label">Events Supported</div>
                    </div>
                  </div>
                  <div class="badge">
                    <span>★</span> Verified Eco Warrior
                  </div>
                </div>
                <div class="footer">
                  <div class="date">
                    <div class="date-label">Issued on</div>
                    <div class="date-value">${new Date().toLocaleDateString("en-US", { dateStyle: "long" })}</div>
                  </div>
                  <div class="signature">
                    <div class="signature-line"></div>
                    <div class="signature-name">ReWear+ Team</div>
                    <div class="signature-title">Platform Administrator</div>
                  </div>
                </div>
              </div>
            </body>
          </html>
        `)
        printWindow.document.close()
        printWindow.print()
      }
    }
  }

  return (
    <div className="container max-w-4xl px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/profile"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Profile
        </Link>
        <h1 className="text-3xl font-bold mb-2">Your E-Certificate</h1>
        <p className="text-muted-foreground">Download your certificate of appreciation for supporting sustainable fashion</p>
      </div>

      {/* Certificate Preview */}
      <Card className="mb-6 overflow-hidden">
        <CardContent className="p-0">
          <div
            ref={certificateRef}
            className="relative bg-gradient-to-br from-yellow-50 via-green-50 to-emerald-50 p-8 md:p-12"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23166534' fillOpacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}
          >
            {/* Border */}
            <div className="absolute inset-4 border-2 border-primary/20 rounded-lg pointer-events-none" />

            {/* Header */}
            <div className="text-center mb-8 relative">
              <Image
                src="/rewear-logo.png"
                alt="ReWear+ Logo"
                width={80}
                height={80}
                className="mx-auto mb-4 rounded-xl"
              />
              <p className="text-xs font-semibold text-primary uppercase tracking-[3px] mb-2">
                Certificate of Appreciation
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-green-900 mb-1">
                ReWear+ Impact Award
              </h2>
              <p className="text-sm text-muted-foreground">Wear Again, Care Again</p>
            </div>

            {/* Content */}
            <div className="text-center mb-8">
              <p className="text-sm text-muted-foreground mb-2">This certificate is proudly presented to</p>
              <p className="text-3xl md:text-4xl font-bold text-primary italic mb-4">
                {mockUser.name}
              </p>
              <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
                For outstanding contribution to sustainable fashion and community support 
                through active participation in the ReWear+ platform, demonstrating commitment 
                to environmental sustainability and social responsibility.
              </p>
            </div>

            {/* Stats */}
            <div className="flex justify-center gap-8 md:gap-12 mb-8">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Heart className="h-4 w-4 text-primary" />
                  <span className="text-2xl font-bold text-primary">{physicalDonations}</span>
                </div>
                <p className="text-xs text-muted-foreground">DoWear Donations</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <span className="text-2xl font-bold text-primary">{fundDonations}</span>
                </div>
                <p className="text-xs text-muted-foreground">DoWear+ Donations</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Leaf className="h-4 w-4 text-primary" />
                  <span className="text-2xl font-bold text-primary">{formatPrice(totalContributed)}</span>
                </div>
                <p className="text-xs text-muted-foreground">Fund Contributed</p>
              </div>
            </div>

            {/* Badge */}
            <div className="flex justify-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-semibold">
                <Award className="h-4 w-4" />
                Verified Eco Warrior
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-between items-end pt-6 border-t border-primary/10">
              <div>
                <p className="text-xs text-muted-foreground">Issued on</p>
                <p className="text-sm font-semibold">
                  {new Date().toLocaleDateString("en-US", { dateStyle: "long" })}
                </p>
              </div>
              <div className="text-right">
                <div className="w-32 border-b border-foreground/30 mb-1 ml-auto" />
                <p className="text-sm font-semibold">ReWear+ Team</p>
                <p className="text-xs text-muted-foreground">Platform Administrator</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Download Button */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button size="lg" onClick={handleDownload}>
          <Download className="h-4 w-4 mr-2" />
          Download Certificate
        </Button>
        <Button size="lg" variant="outline" className="bg-transparent" asChild>
          <Link href="/profile">
            Back to Profile
          </Link>
        </Button>
      </div>

      {/* Info */}
      <div className="mt-8 p-4 rounded-lg bg-muted/50 text-center">
        <p className="text-sm text-muted-foreground">
          Share your certificate on social media to inspire others to join the sustainable fashion movement!
        </p>
      </div>
    </div>
  )
}
