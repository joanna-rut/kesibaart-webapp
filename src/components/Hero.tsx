
'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import placeholderData from '@/app/lib/placeholder-images.json';

const heroLinks = [
  {
    name: 'Etsy',
    href: 'https://www.etsy.com/shop/kesibaart/',
    color: 'bg-primary hover:bg-primary/90',
  },
  {
    name: 'eBay',
    href: 'https://www.ebay.ca/sch/i.html?item=176714948962&rt=nc&_trksid=p4429486.m3561.l161211&_ssn=kesiba',
    color: 'bg-secondary hover:bg-secondary/80 text-secondary-foreground',
  },
];

export default function Hero() {
  const { heroBanner } = placeholderData;

  return (
    <div className="relative w-full h-[60vh] min-h-[400px] pt-24">
      <div className="absolute inset-0 z-0">
        <Image
          src={heroBanner.url}
          alt={heroBanner.title}
          fill
          className="object-cover"
          priority
          data-ai-hint="ornament background"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white p-4">
        <h1 className="text-4xl md:text-6xl font-headline mb-4 drop-shadow-md">
          Handcrafted Christmas Magic by Kesiba Art
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl drop-shadow-sm">
          Unique ornaments made with love — shop or follow below.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          {heroLinks.map((link) => (
            <Button
              key={link.name}
              asChild
              className={`text-lg py-6 px-8 rounded-lg shadow-lg transition-transform hover:scale-105 ${link.color}`}
            >
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center"
              >
                <span>Shop on {link.name}</span>
              </a>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
