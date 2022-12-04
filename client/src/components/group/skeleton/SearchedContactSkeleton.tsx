import Skeleton from "react-loading-skeleton";
import { ContactDetailsSkeleton } from "../../contact/skeleton/ContactDetailsSkeleton";
import { ListOfContactSkeleton } from "../../contact/skeleton/ListOfContactSkeleton";

export const SearchedContactSkeleton = () => {
  return (
    <section className="h-[50vh] md:h-[30vh]">
      <h2 className="font-bold text-xl text-primary">Contacts found :</h2>
      <ListOfContactSkeleton />
    </section>
  );
};
