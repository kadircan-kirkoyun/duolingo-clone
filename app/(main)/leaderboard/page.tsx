import Image from "next/image";
import { redirect } from "next/navigation";

import { FeedWrapper } from "@/components/feed-wrapper";
import { Promo } from "@/components/promo";
import { Quests } from "@/components/quests";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { UserProgress } from "@/components/user-progress";
import {
  getTopTenUsers,
  getUserProgress,
  getUserSubscription,
} from "@/db/queries";

const LeaderboardPage = async () => {
  const userProgressData = getUserProgress();
  const userSubscriptionData = getUserSubscription();
  const leaderboardData = getTopTenUsers();

  const [userProgress, userSubscription, leaderboard] = await Promise.all([
    userProgressData,
    userSubscriptionData,
    leaderboardData,
  ]);

  if (!userProgress?.activeCourseId) redirect("/courses");

  const isPro = !!userSubscription?.isActive;

  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>
        <UserProgress
          activeCourse={userProgress.activeCourse}
          hearts={userProgress.hearts}
          points={userProgress.points}
          hasActiveSubscription={isPro}
        />
        <Separator className="my-4" />
        <Quests points={userProgress.points} />
        <Promo />
      </StickyWrapper>
      <FeedWrapper>
        <div className="w-full">
          <h1 className="mb-6 text-2xl font-bold">Sıralama</h1>
          <div className="space-y-4">
            {leaderboard.map((userProgress) => (
              <div
                key={userProgress.userId}
                className="flex items-center gap-x-4 rounded-xl bg-secondary/50 p-4"
              >
                <Avatar className="border-2">
                  <AvatarImage src={userProgress.userImageSrc} />
                </Avatar>
                <div className="flex-1">
                  <p className="text-base font-semibold">
                    {userProgress.userName}
                  </p>
                </div>
                <div className="flex items-center gap-x-2">
                  <Image
                    src="/points.svg"
                    alt="Points"
                    height={20}
                    width={20}
                  />
                  <p className="text-base font-semibold">
                    {userProgress.points}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </FeedWrapper>
    </div>
  );
};

export default LeaderboardPage;
