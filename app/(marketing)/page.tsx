"use client";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";

export default function MarketingPage() {
  const { isAuthenticated, login } = useAuth();

  return (
    <div className="mx-auto flex w-full max-w-[988px] flex-1 flex-col items-center justify-center gap-2 p-4 lg:flex-row">
      <div className="relative mb-8 h-[240px] w-[240px] lg:mb-0 lg:h-[424px] lg:w-[424px]">
        <Image src="/hero.svg" alt="Hero" fill />
      </div>

      <div className="flex flex-col items-center gap-y-8">
        <h1 className="max-w-[480px] text-center text-xl font-bold text-neutral-600 lg:text-3xl">
          Lingo ile yeni diller öğren, pratik yap ve ustalaş.
        </h1>

        <div className="flex w-full flex-col gap-y-2">
          {isAuthenticated ? (
            <Button size="lg" variant="secondary" className="w-full" asChild>
              <Link href="/learn">Öğrenmeye Devam Et</Link>
            </Button>
          ) : (
            <>
              <Button
                size="lg"
                variant="secondary"
                className="w-full"
                onClick={login}
              >
                Başla
              </Button>
              <Button
                size="lg"
                variant="primaryOutline"
                className="w-full"
                onClick={login}
              >
                Zaten hesabım var
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
