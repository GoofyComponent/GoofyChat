import { ContactDetailsSkeleton } from "./ContactDetailsSkeleton";

export const ListOfContactSkeleton = () => {
  const iterable = [1, 2, 3, 4];
  return (
    <div className="flex flex-col w-full h-[28vh] overflow-y-auto px-4">
      {iterable.map((contact: any) => (
        <ContactDetailsSkeleton key={contact + "SearchedContactSkeleton"} />
      ))}
    </div>
  );
};
