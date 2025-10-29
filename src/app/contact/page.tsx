'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Mail, Copy, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ContactPage() {
  const email = "kesibaart@gmail.com";
  const { toast } = useToast();
  const [hasCopied, setHasCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(email).then(() => {
      setHasCopied(true);
      toast({
        title: "Copied!",
        description: "Email address copied to clipboard.",
      });
      setTimeout(() => setHasCopied(false), 2000);
    }).catch(err => {
      console.error('Failed to copy text: ', err);
      toast({
        variant: "destructive",
        title: "Failed to copy",
        description: "Could not copy email address.",
      });
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 pt-28 min-h-screen">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-headline mb-8 text-accent">
          Get in Touch
        </h1>
        <p className="text-lg text-foreground/80 mb-8">
          I would love to hear from you! Whether you have a question about a piece, a custom request, or just want to say hello, feel free to reach out.
        </p>
        
        <div className="p-4 bg-muted rounded-lg inline-flex items-center justify-center space-x-4">
            <Mail className="h-5 w-5 text-primary" />
            <span className="text-lg font-mono text-primary break-all">
              {email}
            </span>
            <Button variant="ghost" size="icon" onClick={copyToClipboard} aria-label="Copy email address">
                {hasCopied ? (
                <Check className="h-5 w-5 text-green-600" />
                ) : (
                <Copy className="h-5 w-5" />
                )}
            </Button>
        </div>

        <p className="text-foreground/60 mt-8">
          Click the copy icon to copy my email address.
        </p>
      </div>
    </div>
  );
}
