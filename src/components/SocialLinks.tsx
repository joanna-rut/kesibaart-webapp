import { Button } from "@/components/ui/button";
import { Instagram, Facebook } from "lucide-react";
import { EtsyIcon, EBayIcon } from "@/components/icons";

const allLinks = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/kesibaart/",
    icon: Instagram,
    color: "text-primary/80 hover:bg-primary/10",
    type: 'social',
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/share/15TmLcy6WD/",
    icon: Facebook,
    color: "text-primary/80 hover:bg-primary/10",
    type: 'social',
  },
  {
    name: "Etsy",
    href: "https://www.etsy.com/shop/kesibaart/",
    icon: EtsyIcon,
    color: "text-primary/80 hover:bg-primary/10",
    type: 'shop',
  },
  {
    name: "eBay",
    href: "https://www.ebay.ca/sch/i.html?item=176714948962&rt=nc&_trksid=p4429486.m3561.l161211&_ssn=kesiba",
    icon: EBayIcon,
    color: "text-primary/80 hover:bg-primary/10",
    type: 'shop',
  },
];

interface SocialLinksProps {
  type?: 'shop' | 'social' | 'all';
}

export default function SocialLinks({ type = 'all' }: SocialLinksProps) {
  const filteredLinks = allLinks.filter(link => type === 'all' || link.type === type);
  
  return (
    <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
      {filteredLinks.map((link) => (
        <Button
          key={link.name}
          asChild
          variant="outline"
          className={`w-full text-base py-8 rounded-lg shadow-sm transition-all duration-300 ${link.color} border-primary/20 hover:shadow-md hover:-translate-y-1`}
        >
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center gap-2"
          >
            <link.icon className="h-8 w-8" />
            <span className="font-semibold">{link.name}</span>
          </a>
        </Button>
      ))}
    </div>
  );
}
