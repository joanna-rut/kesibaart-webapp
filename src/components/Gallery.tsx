
'use client';

import { collection, query, where } from 'firebase/firestore';
import Image from 'next/image';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import type { GalleryPhoto } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, ChevronLeft, ChevronRight } from "lucide-react";
import placeholderData from '@/app/lib/placeholder-images.json';
import { useEffect, useState, useCallback } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';

const GalleryItem = ({ photo, onPhotoClick }: { photo: GalleryPhoto, onPhotoClick: (photo: GalleryPhoto) => void }) => (
  <button onClick={() => onPhotoClick(photo)} className="group relative overflow-hidden rounded-lg shadow-lg aspect-square block w-full">
    <Image
      src={photo.url}
      alt={photo.title || 'Kesiba Art piece'}
      fill
      className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
      data-ai-hint="art ornament"
    />
    <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
  </button>
);

const GallerySkeleton = () => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
    {Array.from({ length: 8 }).map((_, index) => (
      <Skeleton key={index} className="h-48 md:h-56 w-full rounded-lg" />
    ))}
  </div>
);

export default function Gallery() {
  const firestore = useFirestore();
  const [photos, setPhotos] = useState<GalleryPhoto[]>(placeholderData.gallery);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);

  const galleryQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(
      collection(firestore, `gallery_photos`),
      where("isAboutPhoto", "!=", true)
    );
  }, [firestore]);

  const { data: remotePhotos, isLoading: remoteLoading, error: remoteError } = useCollection<GalleryPhoto>(galleryQuery);

  useEffect(() => {
    setLoading(remoteLoading);
  }, [remoteLoading]);

  useEffect(() => {
    if (remoteError) {
      console.error("Error fetching gallery photos:", remoteError);
      setError("Could not load the gallery. Please check your connection or try again later.");
    }
  }, [remoteError]);

  useEffect(() => {
    if (remotePhotos && remotePhotos.length > 0) {
      setPhotos(remotePhotos);
    }
  }, [remotePhotos]);

  const openLightbox = (photo: GalleryPhoto) => {
    setSelectedPhoto(photo);
  };

  const closeLightbox = () => {
    setSelectedPhoto(null);
  };

  const handleNavigation = useCallback((direction: 'next' | 'prev') => {
    if (!selectedPhoto || photos.length <= 1) return;

    const currentIndex = photos.findIndex(p => p.id === selectedPhoto.id);
    if (currentIndex === -1) return;

    let nextIndex;
    if (direction === 'next') {
      nextIndex = (currentIndex + 1) % photos.length;
    } else {
      nextIndex = (currentIndex - 1 + photos.length) % photos.length;
    }
    setSelectedPhoto(photos[nextIndex]);
  }, [selectedPhoto, photos]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!selectedPhoto) return;

      if (event.key === 'ArrowRight') {
        handleNavigation('next');
      } else if (event.key === 'ArrowLeft') {
        handleNavigation('prev');
      } else if (event.key === 'Escape') {
        closeLightbox();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedPhoto, handleNavigation]);

  if (loading) {
    return <GallerySkeleton />;
  }

  if (error && (!photos || photos.length === 0)) {
    return (
      <Alert variant="destructive" className="mt-8">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error Loading Gallery</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {photos.map((photo, index) => (
          <GalleryItem key={photo.id || index} photo={photo} onPhotoClick={openLightbox} />
        ))}
      </div>

      {selectedPhoto && (
        <Dialog open={!!selectedPhoto} onOpenChange={(isOpen) => !isOpen && closeLightbox()}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle className="font-headline text-2xl text-accent">{selectedPhoto.title}</DialogTitle>
            </DialogHeader>
            <div className="relative aspect-[4/3] w-full mt-4">
              <Image
                src={selectedPhoto.url}
                alt={selectedPhoto.title || 'Enlarged view of Kesiba Art piece'}
                fill
                className="object-contain"
                sizes="90vw"
              />
            </div>
             {selectedPhoto.description && (
                <DialogDescription className="mt-4 text-base text-foreground/80 text-center">
                  {selectedPhoto.description}
                </DialogDescription>
            )}

            {photos.length > 1 && (
              <>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => handleNavigation('prev')}
                  className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full h-10 w-10 bg-black/30 hover:bg-black/50 text-white"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => handleNavigation('next')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full h-10 w-10 bg-black/30 hover:bg-black/50 text-white"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </>
            )}
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
