import { Button } from "@/components/ui/button";
import { Instagram, Facebook } from "lucide-react";
import { EtsyIcon, EBayIcon } from "@/components/icons";

const socialLinks = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/kesibaart/",
    icon: Instagram,
    color: "bg-[#E4405F] hover:bg-[#E4405F]/90",
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/share/15TmLcy6WD/",
    icon: Facebook,
    color: "bg-[#1877F2] hover:bg-[#1877F2]/90",
  },
  {
    name: "Etsy",
    href: "https://www.etsy.com/shop/kesibaart/",
    icon: EtsyIcon,
    color: "bg-[#F16521] hover:bg-[#F16521]/90",
  },
  {
    name: "eBay",
    href: "https://www.ebay.ca/sch/i.html?item=176714948962&rt=nc&_trksid=p4429486.m3561.l161211&_ssn=kesiba",
    icon: EBayIcon,
    color: "bg-[#000000] hover:bg-[#000000]/90",
  },
];

export default function SocialLinks() {
  return (
    <div className="space-y-4">
      {socialLinks.map((link) => (
        <Button
          key={link.name}
          asChild
          className={`w-full text-base py-6 rounded-lg shadow-md transition-transform hover:scale-105 ${link.color} text-white`}
        >
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center"
          >
            <link.icon className="mr-3 h-6 w-6" />
            <span>{link.name}</span>
          </a>
        </Button>
      ))}
    </div>
  );
}
