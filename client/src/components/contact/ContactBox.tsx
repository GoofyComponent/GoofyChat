import axios from "axios";
import { useState } from "react";
import { LastContacts } from "./LastContacts";
import { SearchedContact } from "./SearchedContact";

type ContactBoxProps = {
  lastContacts: any;
  resultsSearch: any;
  setResultsSearch: any;
  config: any;
  setMembers: React.Dispatch<React.SetStateAction<any>>;
};

export const ContactBox = ({
  lastContacts,
  resultsSearch,
  setResultsSearch,
  config,
  setMembers,
}: ContactBoxProps) => {
  const [inputSearch, setInputSearch] = useState<string>("");
  const [waitingResults, setWaitingResults] = useState<boolean>(false);

  const submitSearch = () => {
    if (waitingResults) return;

    setResultsSearch(null);

    if (inputSearch === "") {
      return;
    }

    setWaitingResults(true);

    axios
      .post(
        `${import.meta.env.VITE_API_URL}/api/search-contact`,
        { search: inputSearch },
        config
      )
      .then((res) => {
        console.log("reponse de l'appel de recherche d'un contact", res.data);
        setResultsSearch(res.data.results);
        setWaitingResults(false);
      })
      .catch((err) => {
        console.log(err);
        setWaitingResults(false);
      });
  };

  return (
    <div className="md:w-1/2 px-4">
      <h1 className="text-4xl text-primary font-bold">Contacts list</h1>
      <div className="flex justify-between">
        <input
          type="text"
          className="w-9/12 h-10 bg-white rounded-xl my-2 p-4 mx-2"
          placeholder="Find a contact in all the users..."
          onChange={(e) => setInputSearch(e.target.value)}
          value={inputSearch}
        />
        <button
          className="h-10 px-4 py-2 rounded-2xl bg-tertiary text-tertiary font-bold hover:bg-secondary transition-all my-auto"
          onClick={(e) => {
            e.preventDefault();
            submitSearch();
          }}
        >
          search
        </button>
      </div>
      <SearchedContact
        resultsSearch={resultsSearch}
        waitingResults={waitingResults}
        setMembers={setMembers}
      />
      <LastContacts lastContacts={lastContacts} setMembers={setMembers} />
    </div>
  );
};
