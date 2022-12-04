import { ChatInput } from "../ChatInput";
import { ChatInfosSkeleton } from "./ChatInfosSkeleton";
import { MessageSkeleton } from "./MessageSkeleton";

export const ChatContainerSkeleton = () => {
  const arrayOf8 = [1, 2, 3, 4, 5];
  return (
    <div className="flex flex-col w-5/6 h-[86vh] mx-2 mt-auto md:my-auto p-2 bg-[#3B4D54] rounded-xl">
      <ChatInfosSkeleton />
      <div
        className="overflow-auto max-h-[39rem] mt-auto mb-2 px-2"
        style={{ scrollbarWidth: "none" }}
      >
        {arrayOf8.map((item: any) => {
          return <MessageSkeleton key={item} />;
        })}
      </div>
      <ChatInput apiConfig={null} convId={null} />
    </div>
  );
};
