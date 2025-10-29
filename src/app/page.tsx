import Gallery from "@/components/Gallery";
import SocialLinks from "@/components/SocialLinks";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8 pt-28">
      <h1 className="text-4xl md:text-5xl font-headline text-center mb-8 text-accent">
        Home
      </h1>
      <Gallery />
      <Separator className="my-12 md:my-16 bg-primary/10" />
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-headline text-center mb-8 text-accent">
          Find Us On
        </h2>
        <SocialLinks />
      </div>
    </div>
  );
}
