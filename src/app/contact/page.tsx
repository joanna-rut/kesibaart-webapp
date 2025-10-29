'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-8 pt-28 min-h-screen">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-headline text-center mb-8 text-accent">
          Contact Us
        </h1>
        <p className="text-center text-lg text-foreground/80 mb-12">
          Have a question or a custom request? Send a message!
        </p>
        <form className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">Name</label>
              <Input id="name" placeholder="Your Name" />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">Email</label>
              <Input id="email" type="email" placeholder="your.email@example.com" />
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium">Message</label>
            <Textarea id="message" placeholder="Your message..." rows={6} />
          </div>
          <div className="text-center">
            <Button type="submit" size="lg" className="w-full sm:w-auto">
              Send Message
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
