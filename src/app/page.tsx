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
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <div className="flex flex-col items-center">
            <h2 className="text-3xl font-headline text-center mb-8 text-accent">
              Shop My Collection
            </h2>
            <SocialLinks type="shop" />
          </div>
          <div className="flex flex-col items-center">
            <h2 className="text-3xl font-headline text-center mb-8 text-accent">
              Follow My Journey
            </h2>
            <SocialLinks type="social" />
          </div>
        </div>
      </div>
    </>
  );
}
