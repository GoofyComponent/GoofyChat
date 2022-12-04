import { ContactDetails } from "../contact/ContactDetails";
import { ListOfContactSkeleton } from "../contact/skeleton/ListOfContactSkeleton";

type searchedContactsProps = {
  resultsSearch: any;
  waitingResults: boolean;
  setMembers: React.Dispatch<React.SetStateAction<any>>;
};

export const SearchedContact = ({
  resultsSearch,
  waitingResults,
  setMembers,
}: searchedContactsProps) => {
  return (
    <section className="h-[50vh] md:h-[30vh]">
      <h2 className="font-bold text-xl text-primary">Contacts found :</h2>
      {resultsSearch === null && !waitingResults && (
        <h2 className="flex justify-center m-auto font-bold text-xl text-secondary text-center">
          The search did not find anything, check your input
        </h2>
      )}
      {resultsSearch === false && !waitingResults && (
        <h2 className="flex justify-center m-auto font-bold text-xl text-secondary text-center">
          Search a contact with the input above.
        </h2>
      )}
      {waitingResults && <ListOfContactSkeleton />}
      <div className="flex flex-col w-full h-[40vh] md:h-[28vh] overflow-y-auto">
        {resultsSearch &&
          resultsSearch.map((contact: any) => (
            <ContactDetails
              contactUsername={contact.username}
              contactFullName={[contact.lastname, contact.firstname]}
              key={
                contact.username + `${contact.lastname} ${contact.firstname}`
              }
              setMembers={setMembers}
            />
          ))}
      </div>
    </section>
  );
};
