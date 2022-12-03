import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import tw from "tailwind-styled-components";

const SectionChatInfos = tw.section<any>`
        flex
        justify-between
        w-full
        h-20
        px-4
        py-2
        mb-2
        border-b-2
        border-tertiary
        font-extrabold
        text-3xl
    `;

export const ChatInfosSkeleton = () => {
  return (
    <SectionChatInfos>
      <div className="h-[5rem] w-[75vw]">
        <Skeleton baseColor="#3B4D54" highlightColor="#192124" />
      </div>
    </SectionChatInfos>
  );
};
