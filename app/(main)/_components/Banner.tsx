"use client";

import { Button } from "@/components/ui/button";

export default function Banner() {
  return (
    <div className="relative w-full h-[600px] overflow-hidden rounded-md">
      <iframe
        className="absolute top-0 left-0 w-full h-full"
        src="https://www.youtube.com/embed/b0Ezn5pZE7o?autoplay=1&mute=1&loop=1&playlist=b0Ezn5pZE7o&controls=0&modestbranding=1&rel=0&showinfo=0"
        title="YouTube video banner"
        allow="autoplay; encrypted-media"
        allowFullScreen
      ></iframe>

      <div className="absolute inset-0 flex flex-col items-center justify-end mb-10 text-white">
        <h1 className="text-5xl font-[nunito-bold]">Step Into Style</h1>
        <Button className="mt-6 px-8 py-3 bg-black rounded-lg">Shop Now</Button>
      </div>
    </div>
  );
}
