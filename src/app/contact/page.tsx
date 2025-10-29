'use client';

import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

export default function ContactPage() {
  const email = "mohammed3.tayeb@gmail.com";

  return (
    <div className="container mx-auto px-4 py-8 pt-28 min-h-screen">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-headline mb-8 text-accent">
          Get in Touch
        </h1>
        <p className="text-lg text-foreground/80 mb-8">
          I would love to hear from you! Whether you have a question about a piece, a custom request, or just want to say hello, feel free to reach out.
        </p>
        
        <Button asChild size="lg" className="mb-12">
          <a href={`mailto:${email}`}>
            <Mail className="mr-2 h-5 w-5" />
            Send an Email
          </a>
        </Button>
      </div>
    </div>
  );
}
