"use client";
import { useState } from "react";

import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { links } from "@/config";
import { useAuth } from "@/lib/auth-context";
import { cn } from "@/lib/utils";

import Banner from "./banner";

export const Header = () => {
  const { isAuthenticated, login, logout } = useAuth();
  const [hideBanner, setHideBanner] = useState(true);

  return (
    <>
      <Banner hide={hideBanner} setHide={setHideBanner} />

      <header
        className={cn(
          "h-20 w-full border-b-2 border-slate-200 px-4",
          !hideBanner ? "mt-20 sm:mt-16 lg:mt-10" : "mt-0"
        )}
      >
        <div className="mx-auto flex h-full max-w-[1600px] items-center justify-between">
          <Link href="/" className="flex items-center gap-x-3">
            <Image src="/mascot.svg" alt="Mascot" height={40} width={40} />

            <h1 className="text-2xl font-extrabold tracking-wide text-green-600">
              Lingo
            </h1>
          </Link>

          <div className="flex gap-x-3">
            {isAuthenticated ? (
              <>
                <Button onClick={logout} size="lg" variant="ghost">
                  Çıkış Yap
                </Button>
                <Link href="/learn">
                  <Button size="lg" variant="secondary">
                    Öğrenmeye Devam Et
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Button onClick={login} size="lg" variant="ghost">
                  Giriş Yap
                </Button>
                <Button onClick={login} size="lg" variant="secondary">
                  Başla
                </Button>
              </>
            )}

            <Link
              href={links.sourceCode}
              target="_blank"
              rel="noreferrer noopener"
              className={isAuthenticated ? "pt-1.5" : "pt-3"}
            >
              <Image
                src="/github.svg"
                alt="Source Code"
                height={20}
                width={20}
              />
            </Link>
          </div>
        </div>
      </header>
    </>
  );
};
