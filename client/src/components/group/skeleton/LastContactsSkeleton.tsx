import { ListOfContactSkeleton } from "../../contact/skeleton/ListOfContactSkeleton";

export const LastContactsSkeleton = () => {
  return (
    <section className="h-[50vh] md:h-[30vh]">
      <h2 className="font-bold text-xl text-primary">
        Your previous contacts :
      </h2>
      <ListOfContactSkeleton />
    </section>
  );
};
