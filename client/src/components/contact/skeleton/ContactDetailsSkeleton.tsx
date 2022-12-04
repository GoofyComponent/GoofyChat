import Skeleton from "react-loading-skeleton";

export const ContactDetailsSkeleton = () => {
  return (
    <Skeleton
      className="flex flex-row w-full h-12 bg-[#3B4D54] rounded-xl my-2"
      baseColor="#3B4D54"
      highlightColor="#192124"
    />
  );
};
