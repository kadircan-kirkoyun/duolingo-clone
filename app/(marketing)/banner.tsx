"use client";

import { useEffect, useState } from "react";

import { XIcon } from "lucide-react";
import Link from "next/link";

import { links } from "@/config";
import { cn } from "@/lib/utils";

type BannerProps = {
  hide: boolean;
  setHide: (value: boolean) => void;
};

const Banner = ({ hide, setHide }: BannerProps) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleBannerClose = () => {
    setHide(true);
  };

  if (hide) {
    return null;
  }

  return (
    <div
      className={cn(
        "fixed left-0 top-0 z-50 flex w-full justify-center bg-background p-3 transition-all",
        isScrolled && "bg-background/50 backdrop-blur-xl"
      )}
    >
      <div className="relative w-full">
        <div className="flex items-center justify-center">
          <p className="text-sm font-normal">
            📢{" "}
            <strong className="font-semibold">
              Bu bir demo uygulamasıdır
            </strong>{" "}
            Kaynak koduna{" "}
            <Link
              href={links.sourceCode}
              target="_blank"
              rel="noreferrer noopener"
              className="text-green-600 transition-opacity hover:opacity-75"
            >
              buradan
            </Link>{" "}
            ulaşabilirsiniz.
          </p>
        </div>

        <button
          onClick={handleBannerClose}
          type="button"
          className="absolute right-0 top-3/4 -translate-y-1/2 rounded-full border border-gray-300 bg-white p-1 opacity-80 hover:opacity-90 sm:top-1/2"
        >
          <XIcon className="size-3" strokeWidth={3} />
          <span className="sr-only">Bannerı kapat</span>
        </button>
      </div>
    </div>
  );
};

export default Banner;
