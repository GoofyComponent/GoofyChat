import Skeleton from "react-loading-skeleton";
import { SearchedContact } from "../SearchedContact";
import { CreateBoxSkeleton } from "./CreateBoxSkeleton";
import { LastContactsSkeleton } from "./LastContactsSkeleton";
import { SearchedContactSkeleton } from "./SearchedContactSkeleton";

export const ContactBoxSkeleton = () => {
  return (
    <div className="w-1/2 px-4">
      <h1 className="text-4xl text-primary font-bold">Contacts list</h1>
      <div className="flex justify-between">
        <input
          type="text"
          className="w-9/12 h-10 bg-white rounded-xl my-2 p-4 mx-2"
          placeholder="Find a contact in all the users..."
        />
      </div>
      <SearchedContactSkeleton />
      <LastContactsSkeleton />
    </div>
  );
};
