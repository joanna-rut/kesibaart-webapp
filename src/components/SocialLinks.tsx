import { Button } from "@/components/ui/button";
import { Instagram, Facebook } from "lucide-react";
import { EtsyIcon, EBayIcon } from "@/components/icons";

const socialLinks = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/kesibaart/",
    icon: Instagram,
    color: "text-[#E4405F] hover:bg-[#E4405F] hover:text-white",
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/share/15TmLcy6WD/",
    icon: Facebook,
    color: "text-[#1877F2] hover:bg-[#1877F2] hover:text-white",
  },
  {
    name: "Etsy",
    href: "https://www.etsy.com/shop/kesibaart/",
    icon: EtsyIcon,
    color: "text-[#F16521] hover:bg-[#F16521] hover:text-white",
  },
  {
    name: "eBay",
    href: "https://www.ebay.ca/sch/i.html?item=176714948962&rt=nc&_trksid=p4429486.m3561.l161211&_ssn=kesiba",
    icon: EBayIcon,
    color: "text-black dark:text-white hover:bg-black hover:text-white",
  },
];

export default function SocialLinks() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {socialLinks.map((link) => (
        <Button
          key={link.name}
          asChild
          variant="outline"
          className={`w-full text-base py-8 rounded-lg shadow-sm transition-colors duration-300 ${link.color} border-primary/20`}
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