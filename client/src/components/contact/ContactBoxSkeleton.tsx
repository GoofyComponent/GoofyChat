import Skeleton from "react-loading-skeleton";
import { CreateBoxSkeleton } from "../group/skeleton/CreateBoxSkeleton";
import { LastContactsSkeleton } from "../group/skeleton/LastContactsSkeleton";
import { SearchedContactSkeleton } from "../group/skeleton/SearchedContactSkeleton";

export const ContactBoxSkeleton = () => {
  return (
    <div className="md:w-1/2 px-4">
      <h1 className="text-4xl text-primary font-bold">Contacts list</h1>
      <div className="flex justify-between">
        <input
          type="text"
          className="w-full h-10 bg-white rounded-xl my-2 p-4 mx-2"
          placeholder="Find a contact in all the users..."
        />
      </div>
      <SearchedContactSkeleton />
      <LastContactsSkeleton />
    </div>
  );
};
