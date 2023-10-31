import React from "react";
import { Button } from "./ui/button";

function Hero() {
  return (
    <div className="relative min-h-screen w-full">
      <div className="absolute inset-0 z-30 flex h-full w-full flex-col bg-black/60">
        <div className="flex h-full w-full items-center justify-center">
          <div className="flex max-w-4xl flex-col space-y-3 px-10 lg:px-0">
            <h1 className="font-orbitron text-center text-xl font-semibold uppercase text-slate-300 lg:text-5xl">
              Showcasing the best apparels from local and upcoming desginers
            </h1>
            <div className="flex w-full justify-center space-x-4">
              <Button className="bg-gradient-to-r from-sky-500/60 to-green-500/60">
                shop now
              </Button>
              <div className="relative rounded-lg border">
                <div className="absolute  -inset-[1px] rounded-md bg-gradient-to-r from-sky-500/30  to-green-500/30"></div>
                <Button
                  className="relative rounded-md border-none bg-transparent text-white"
                  variant="outline"
                >
                  Create Store
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <video
        className="relative h-screen w-full object-cover"
        muted
        loop
        autoPlay
      >
        <source src="/videos/hero-video.mp4" type="video/mp4" />
      </video>
    </div>
  );
}

export default Hero;
