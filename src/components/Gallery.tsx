'use client';

import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, where, orderBy } from 'firebase/firestore';
import Image from 'next/image';
import { db, APP_ID } from '@/lib/firebase';
import type { GalleryPhoto } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const GalleryItem = ({ photo }: { photo: GalleryPhoto }) => (
  <div className="group relative overflow-hidden rounded-lg shadow-lg aspect-square">
    <Image
      src={photo.url}
      alt={photo.title || 'Kesiba Art piece'}
      fill
      className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
      data-ai-hint="art ornament"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    {photo.title && (
      <div className="absolute bottom-0 left-0 p-4 w-full">
        <h3 className="text-white text-lg font-headline opacity-0 translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
          {photo.title}
        </h3>
      </div>
    )}
  </div>
);

const GallerySkeleton = () => (
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
    {Array.from({ length: 12 }).map((_, index) => (
      <Skeleton key={index} className="h-72 w-full rounded-lg" />
    ))}
  </div>
);

export default function Gallery() {
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const collectionPath = `artifacts/${APP_ID}/public/data/gallery_photos`;
    const q = query(
      collection(db, collectionPath),
      where("isAboutPhoto", "!=", true)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const photosData: GalleryPhoto[] = [];
      querySnapshot.forEach((doc) => {
        photosData.push({ id: doc.id, ...doc.data() } as GalleryPhoto);
      });
      setPhotos(photosData);
      setLoading(false);
    }, (err) => {
      console.error("Error fetching gallery photos:", err);
      setError("Could not load the gallery. Please check your connection or try again later.");
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <GallerySkeleton />;
  }

  if (error) {
    return (
      <Alert variant="destructive" className="mt-8">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error Loading Gallery</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {photos.map(photo => (
        <GalleryItem key={photo.id} photo={photo} />
      ))}
    </div>
  );
}
