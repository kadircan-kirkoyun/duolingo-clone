"use server";

import { revalidatePath } from "next/cache";

import { MAX_HEARTS } from "@/constants";
import { dummyUserProgress } from "@/store/dummy-data";

export const upsertChallengeProgress = async () => {
  // Dummy data ile çalışıyoruz
  const userProgress = { ...dummyUserProgress };
  
  // Kalpleri ve puanları güncelle
  userProgress.hearts = Math.min(userProgress.hearts + 1, MAX_HEARTS);
  userProgress.points += 10;

  // Burada bir await ifadesi ekliyoruz
  await new Promise(resolve => setTimeout(resolve, 100)); // Simüle edilmiş bir bekleme

  revalidatePath("/learn");
  revalidatePath("/lesson");
  revalidatePath("/quests");
  revalidatePath("/leaderboard");
};
