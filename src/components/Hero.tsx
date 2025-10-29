'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { EtsyIcon, EBayIcon } from '@/components/icons';
import placeholderData from '@/app/lib/placeholder-images.json';

export default function Hero() {
  return (
    <section className="relative w-full h-[60vh] md:h-[70vh] flex items-center justify-center text-white text-center">
      <Image
        src={placeholderData.heroBanner.url}
        alt="A beautiful close-up of handcrafted Christmas baubles"
        fill
        className="object-cover"
        priority
        data-ai-hint="ornaments closeup"
      />
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 p-4 max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-headline drop-shadow-lg">
          Handcrafted Christmas Magic by Kesiba Art
        </h1>
        <p className="mt-4 text-lg md:text-xl font-body drop-shadow-md">
          Unique ornaments made with love — shop or follow below.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild size="lg" className="bg-[#F16521] hover:bg-[#F16521]/90 text-white font-bold text-base w-full sm:w-auto">
            <Link href="https://www.etsy.com/shop/kesibaart/">
              <EtsyIcon className="mr-2 h-5 w-5" />
              Shop on Etsy
            </Link>
          </Button>
          <Button asChild size="lg" className="bg-black hover:bg-black/80 text-white font-bold text-base w-full sm:w-auto">
            <Link href="https://www.ebay.ca/sch/i.html?item=176714948962&rt=nc&_trksid=p4429486.m3561.l161211&_ssn=kesiba">
              <EBayIcon className="mr-2 h-5 w-5" />
              Shop on eBay
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
