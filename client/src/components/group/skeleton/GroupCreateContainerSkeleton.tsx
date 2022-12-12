import { ContactBoxSkeleton } from "../../contact/ContactBoxSkeleton";
import { CreateBoxSkeleton } from "./CreateBoxSkeleton";

export const GroupCreateContainerSkeleton = () => {
  return (
    <div className="flex flex-col md:flex-row md:justify-around w-full md:w-5/6 h-[85vh] mx-2 mt-auto md:my-auto p-2 bg-[#3B4D54] rounded-xl overflow-auto">
      <ContactBoxSkeleton />
      <CreateBoxSkeleton />
    </div>
  );
};
