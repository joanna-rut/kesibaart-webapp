
'use client';

import { useState, useEffect } from 'react';
import { collection, query, where, limit } from 'firebase/firestore';
import Image from 'next/image';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import type { GalleryPhoto } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import placeholderData from '@/app/lib/placeholder-images.json';

export default function AboutPage() {
  const firestore = useFirestore();
  const { aboutPage } = placeholderData;
  const { photo: placeholderPhoto, bio: bioText, email } = aboutPage;
  
  const [aboutPhoto, setAboutPhoto] = useState<string | null>(placeholderPhoto.url);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const aboutPhotoQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(
      collection(firestore, `gallery_photos`),
      where("isAboutPhoto", "==", true),
      limit(1)
    );
  }, [firestore]);

  const { data: remotePhotos, isLoading: remoteLoading, error: remoteError } = useCollection<GalleryPhoto>(aboutPhotoQuery);

  useEffect(() => {
    setLoading(remoteLoading);
  }, [remoteLoading]);

  useEffect(() => {
    if (remoteError) {
      console.error("Error fetching about photo:", remoteError);
      setError("Could not load profile information. Please try again later.");
    }
  }, [remoteError]);

  useEffect(() => {
    if (remotePhotos && remotePhotos.length > 0) {
      setAboutPhoto(remotePhotos[0].url);
    }
  }, [remotePhotos]);

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
      {error && !loading && (
        <Alert variant="destructive" className="mt-8 max-w-lg mx-auto">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  );
}
