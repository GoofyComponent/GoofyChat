import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ContactBox } from "../../contact/ContactBox";
import { CreateBox } from "./CreateBox";
import { GroupCreateContainerSkeleton } from "../skeleton/GroupCreateContainerSkeleton";

export const GroupCreate = () => {
  const [resultsSearch, setResultsSearch] = useState<any>(false);
  const [lastContacts, setLastContacts] = useState<any>(null);
  const [newConvMembers, setNewConvMembers] = useState<any>([]);

  const APIJWT = useSelector((state: any) => state.user.JWT_API);
  const config = {
    headers: {
      Authorization: `Bearer ${APIJWT}`,
    },
  };

  useEffect(() => {
    axios
      .post(`${import.meta.env.VITE_API_URL}/api/user/all-contacts`, {}, config)
      .then((res) => {
        console.log(
          "reponse de l'appel pour recup les derniers contact de l'user",
          res.data
        );
        setLastContacts(res.data.contacts);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (!lastContacts) {
    return <GroupCreateContainerSkeleton />;
  }

  return (
    <div className="flex flex-col w-11/12 md:flex-row md:justify-around w-full md:w-5/6 h-[85vh] mx-auto mt-auto md:my-auto p-2 bg-[#3B4D54] rounded-xl overflow-auto">
      <ContactBox
        lastContacts={lastContacts}
        resultsSearch={resultsSearch}
        setResultsSearch={setResultsSearch}
        config={config}
        setMembers={setNewConvMembers}
      />
      <CreateBox members={newConvMembers} setMembers={setNewConvMembers} />
    </div>
  );
};
