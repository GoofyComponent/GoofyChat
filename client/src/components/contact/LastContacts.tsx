import { ContactDetails } from "./ContactDetails";

type LastContactsProps = {
  lastContacts: any;
  setMembers: React.Dispatch<React.SetStateAction<any>>;
};

export const LastContacts = ({
  lastContacts,
  setMembers,
}: LastContactsProps) => {
  return (
    <section className="h-[50vh] md:h-[30vh]">
      <h2 className="font-bold text-xl text-primary">
        Your previous contacts :
      </h2>
      <div className="flex flex-col w-full h-[45vh] md:h-[28vh] overflow-y-auto">
        {lastContacts &&
          lastContacts.map((contact: any) => (
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
