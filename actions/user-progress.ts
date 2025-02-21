"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { MAX_HEARTS, POINTS_TO_REFILL } from "@/constants";
import { dummyUserProgress } from "@/store/dummy-data";

export const upsertUserProgress = async (courseId: number) => {
  // Dummy data ile çalışıyoruz
  const userProgress = { ...dummyUserProgress, activeCourseId: courseId };

  // Burada bir await ifadesi ekliyoruz
  await new Promise(resolve => setTimeout(resolve, 100)); // Simüle edilmiş bir bekleme

  revalidatePath("/courses");
  revalidatePath("/learn");
  redirect("/learn");
};

export const reduceHearts = async () => {
  // Dummy data ile çalışıyoruz
  const userProgress = { ...dummyUserProgress };
  if (userProgress.hearts > 0) {
    userProgress.hearts -= 1;
  }

  // Burada bir await ifadesi ekliyoruz
  await new Promise(resolve => setTimeout(resolve, 100)); // Simüle edilmiş bir bekleme

  revalidatePath("/learn");
  revalidatePath("/lesson");
  revalidatePath("/quests");
  revalidatePath("/leaderboard");
};

export const refillHearts = async () => {
  // Dummy data ile çalışıyoruz
  const userProgress = { ...dummyUserProgress };
  
  if (userProgress.hearts === MAX_HEARTS) {
    throw new Error("Kalpler zaten dolu.");
  }
  
  if (userProgress.points < POINTS_TO_REFILL) {
    throw new Error("Yeterli puan yok.");
  }

  userProgress.hearts = MAX_HEARTS;
  userProgress.points -= POINTS_TO_REFILL;

  // Burada bir await ifadesi ekliyoruz
  await new Promise(resolve => setTimeout(resolve, 100)); // Simüle edilmiş bir bekleme

  revalidatePath("/shop");
  revalidatePath("/learn");
  revalidatePath("/quests");
  revalidatePath("/leaderboard");
};
