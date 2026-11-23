import type { Metadata } from "next";
import Image from "next/image";
import { galleryPhotos } from "@/data/gallery";

export const metadata: Metadata = {
  title: "Photo Gallery",
  description: "Photos of Danice stores: storefronts, signs, and the racks inside.",
};

export default function Gallery() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
      <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.05] font-extrabold tracking-tight">
        Photo Gallery
      </h1>
      <p className="mt-5 max-w-[46ch] text-xl leading-relaxed">
        Our stores, our signs, and what is on the racks.
      </p>
      {/* Columns let photos keep their own shapes. Four columns on wide
          screens keeps each photo at or under its real size. */}
      <ul className="mt-10 columns-2 gap-4 sm:columns-3 sm:gap-5 lg:columns-4">
        {galleryPhotos.map((photo) => (
          <li key={photo.src} className="mb-4 break-inside-avoid sm:mb-5">
            <Image
              src={photo.src}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              sizes="(min-width: 1024px) 260px, (min-width: 640px) 30vw, 45vw"
              className="h-auto w-full"
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
