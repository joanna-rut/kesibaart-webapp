import Gallery from "@/components/Gallery";
import Hero from "@/components/Hero";
import SocialLinks from "@/components/SocialLinks";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <>
      <Hero />
      <div className="container mx-auto px-4 py-12 md:py-16">
        <h1 className="text-4xl md:text-5xl font-headline text-center mb-8 text-accent">
          Gallery
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
    </>
  );
}
