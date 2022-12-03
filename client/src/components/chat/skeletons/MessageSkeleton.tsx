import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import tw from "tailwind-styled-components";

export const MessageSkeleton = () => {
  const random = Math.floor(Math.random() * 10);

  const DivMessage = tw.div<any>`
    ${() => (random % 2 === 0 ? "bg-tertiary" : "bg-secondary")}
    ${() => (random % 2 === 0 ? "ml-auto" : "")}
    rounded-2xl
    ${() => (random % 2 === 0 ? "rounded-br-none" : "rounded-bl-none")}
    w-80
    px-4
    py-2
    my-2
    h-[5rem]
`;

  return (
    <DivMessage>
      <p className="break-words w-full font-semibold">
        <Skeleton baseColor="#3B4D54" highlightColor="#192124" />
      </p>
      <div className="flex justify-between h-[2rem]">
        <p className="italic text-sm h-[1rem] w-12 my-auto">
          <Skeleton baseColor="#3B4D54" highlightColor="#192124" />
        </p>
        <p className="font-bold text-sm h-[1rem] w-24 my-auto">
          <Skeleton baseColor="#3B4D54" highlightColor="#192124" />
        </p>
      </div>
    </DivMessage>
  );
};
