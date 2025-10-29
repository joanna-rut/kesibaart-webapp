
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'My Story' },
  { href: '/contact', label: 'Contact' },
];

export function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setMenuOpen] = useState(false);

  const NavLink = ({ href, label, className }: { href: string; label: string; className?: string; }) => (
    <Link
      href={href}
      onClick={() => setMenuOpen(false)}
      className={cn(
        'text-lg md:text-sm font-bold transition-colors hover:text-primary',
        pathname === href ? 'text-primary' : 'text-foreground/80',
        className
      )}
    >
      {label}
    </Link>
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b">
      <div className="container mx-auto flex h-24 items-center justify-between px-4">
        <Link href="/" className="flex items-center" onClick={() => setMenuOpen(false)}>
           <div className="flex items-center">
              <Image
                src="https://raw.githubusercontent.com/joanna-rut/kesibaart/main/images/Gemini_Generated_Image_y3vqgqy3vqgqy3vq.png"
                alt="Kesiba Art logo K"
                width={60}
                height={60}
                className="h-[60px] w-auto"
              />
              <span className="text-3xl font-headline text-accent -ml-2">esiba Art</span>
            </div>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <NavLink key={link.href} {...link} />
          ))}
        </nav>
        <div className="md:hidden">
          <Sheet open={isMenuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] bg-background">
              <div className="p-6 h-full flex flex-col">
                 <Link href="/" className="flex items-center gap-2 mb-8" onClick={() => setMenuOpen(false)}>
                    <Image
                        src="https://raw.githubusercontent.com/joanna-rut/kesibaart/main/images/Gemini_Generated_Image_1y6f3o1y6f3o1y6f.png"
                        alt="Kesiba Art logo"
                        width={150}
                        height={60}
                        className="h-14 w-auto"
                    />
                </Link>
                <nav className="flex flex-col gap-6">
                  {navLinks.map((link) => (
                    <NavLink key={link.href} {...link} />
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
