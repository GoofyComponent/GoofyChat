import Skeleton from "react-loading-skeleton";
import { ListOfContactSkeleton } from "../../contact/skeleton/ListOfContactSkeleton";

export const CreateBoxSkeleton = () => {
  return (
    <div className="md:w-1/2 px-4">
      <h1 className="text-4xl text-primary font-bold">Create a group</h1>
      <div>
        <h1 className="text-3xl text-primary font-bold">Group name</h1>
        <input
          type="text"
          className="w-full h-12 bg-white rounded-xl my-2 p-4"
          placeholder="The cool dudes"
        />
      </div>
      <div>
        <h1 className="text-3xl text-primary font-bold">Group description</h1>
        <textarea
          className="w-full h-32 bg-white rounded-xl my-2 p-4"
          placeholder="This is an incredible conversation"
        ></textarea>
      </div>
      <div>
        <h1 className="text-3xl text-primary font-bold">Members</h1>

        <ListOfContactSkeleton />
      </div>
      <div className="flex flex-row w-full h-16 justify-end items-center">
        <Skeleton />
      </div>
    </div>
  );
};
