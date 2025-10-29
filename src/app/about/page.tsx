'use client';

import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, where, limit } from 'firebase/firestore';
import Image from 'next/image';
import { db, APP_ID } from '@/lib/firebase';
import type { GalleryPhoto } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export default function AboutPage() {
  const [aboutPhoto, setAboutPhoto] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const collectionPath = `artifacts/${APP_ID}/public/data/gallery_photos`;
    const q = query(collection(db, collectionPath), where("isAboutPhoto", "==", true), limit(1));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        const data = doc.data() as GalleryPhoto;
        setAboutPhoto(data.url);
      } else {
        console.warn("About photo not found in Firestore.");
      }
      setLoading(false);
    }, (err) => {
      console.error("Error fetching about photo:", err);
      setError("Could not load profile information. Please try again later.");
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const bioText = "Hi, my name is Anna. Kesiba Art was a way for me to keep my 30-year-long passion for creation alive. I have a collection of stunning handmade ornaments, including glass baubles, figurines, egg ornaments, and lanterns. Before I started this brand, I took a lot of time and effort to craft the most gorgeous designs and sturdy materials that would keep my customers happy. Every design on ornaments has been crafted with meticulous attention to detail, a tremendous passion, and an unyielding commitment to perfection. I make everything in-house, by hand. I use glass blowing to create the ornament, paint our intricate designs, and package them with love. I make personalized and custom design baubles! Contact me to learn more at kesibaart@gmail.com";
  const email = "kesibaart@gmail.com";
  const bioParts = bioText.split(email);

  return (
    <div className="container mx-auto px-4 py-8 pt-28 min-h-screen">
      <h1 className="text-4xl md:text-5xl font-headline text-center mb-12 text-accent">
        My Story
      </h1>
      <div className="grid md:grid-cols-5 gap-8 md:gap-12 items-center">
        <div className="md:col-span-2 w-full">
          {loading ? (
            <Skeleton className="w-full h-[450px] rounded-lg" />
          ) : error && !aboutPhoto ? (
            <div className="w-full h-[450px] rounded-lg bg-muted flex items-center justify-center text-center p-4">
              <p className="text-muted-foreground">Could not load image.</p>
            </div>
          ) : aboutPhoto ? (
            <Image 
              id="anna-photo"
              src={aboutPhoto}
              alt="Photo of Anna from Kesiba Art"
              width={500}
              height={600}
              className="rounded-lg shadow-xl object-cover w-full h-[450px]"
              data-ai-hint="artist portrait"
            />
          ) : (
            <div className="w-full h-[450px] rounded-lg bg-muted flex items-center justify-center text-center p-4">
              <p className="text-muted-foreground">Profile image not available.</p>
            </div>
          )}
        </div>
        <div className="md:col-span-3 space-y-4 text-base md:text-lg text-foreground/90 leading-relaxed">
          <p>{bioParts[0]}
            <a href={`mailto:${email}`} className="text-primary font-semibold hover:underline break-words">
              {email}
            </a>
          {bioParts[1]}</p>
        </div>
      </div>
      {error && (
        <Alert variant="destructive" className="mt-8 max-w-lg mx-auto">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  );
}
