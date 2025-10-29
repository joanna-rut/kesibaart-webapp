
import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      aria-label="Kesiba Art Logo"
      width="180"
      height="48"
      viewBox="0 0 180 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {/* Ornament Icon */}
      <g>
        <circle cx="24" cy="24" r="18" fill="hsl(var(--primary))" opacity="0.1" />
        <circle cx="24" cy="24" r="14" fill="hsl(var(--primary))" />
        {/* Ornament Cap */}
        <rect x="20" y="4" width="8" height="6" rx="2" fill="hsl(var(--foreground))" opacity="0.5" />
        <path d="M24 4C22.3431 4 21 2.65685 21 1C21 -0.656854 22.3431 -2 24 -2C25.6569 -2 27 -0.656854 27 1C27 2.65685 25.6569 4 24 4Z" fill="hsl(var(--foreground))" opacity="0.3" />
        
        {/* Sparkle */}
        <path d="M16 18 L18 23 L16 28 L14 23Z" fill="white" opacity="0.8"/>
      </g>
      
      {/* Brand Name */}
      <text
        x="52"
        y="30"
        fontFamily='"Playfair Display", serif'
        fontSize="24"
        fill="hsl(var(--accent))"
        fontWeight="700"
      >
        Kesiba Art
      </text>
    </svg>
  );
}
