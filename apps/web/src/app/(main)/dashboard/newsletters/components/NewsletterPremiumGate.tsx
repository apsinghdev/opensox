"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock, Sparkles, ArrowRight } from "lucide-react";
import { GeistSans } from "geist/font/sans";

export default function NewsletterPremiumGate() {
  return (
    <div className="min-h-screen bg-background font-sans flex items-center justify-center px-4 py-12">
      <Card className="max-w-lg w-full border-2 shadow-lg">
        <CardHeader className="text-center space-y-6 pb-8">
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-ox-purple/10 blur-xl rounded-full"></div>
              <div className="relative rounded-full bg-gradient-to-br from-ox-purple/20 to-ox-purple/5 border border-ox-purple/30 p-4">
                <Lock className="h-10 w-10 text-ox-purple" />
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <CardTitle className={`text-3xl font-bold ${GeistSans.className}`}>
              Premium Required
            </CardTitle>
            <CardDescription className="text-base">
              Unlock premium to access exclusive newsletters
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-muted/50 rounded-lg p-4 space-y-3">
            <p className="text-sm text-foreground/80 text-center leading-relaxed">
              Get exclusive access to our premium newsletters featuring product updates, 
              community highlights, pro tips, and early access to new features.
            </p>
            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground pt-2 border-t border-border/50">
              <Sparkles className="h-3.5 w-3.5 text-ox-purple" />
              <span>Premium feature</span>
            </div>
          </div>
          <div className="space-y-3 pt-2">
            <Link href="/pricing" className="block">
              <Button 
                size="lg" 
                className="w-full bg-ox-purple hover:bg-ox-purple/90 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-200"
              >
                Upgrade to Premium
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/dashboard/home" className="block">
              <Button 
                variant="outline" 
                size="lg"
                className="w-full border-border hover:bg-muted/50 transition-colors"
              >
                Back to Dashboard
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

