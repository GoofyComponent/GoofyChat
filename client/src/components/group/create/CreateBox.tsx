import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setTriggerRefreshConv } from "../../../helpers/redux/slices/MessagesSlice";
import { ContactDetails } from "../../contact/ContactDetails";

type CreateBoxProps = {
  members: Array<any>;
  setMembers: React.Dispatch<React.SetStateAction<any>>;
};

export const CreateBox = ({ members, setMembers }: CreateBoxProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const APIJWT = useSelector((state: any) => state.user.JWT_API);
  const userOwnUsername = useSelector((state: any) => state.user.username);
  const config = {
    headers: {
      Authorization: `Bearer ${APIJWT}`,
    },
  };

  const [error, setError] = useState<any>(null);
  const [convName, setConvName] = useState<string>("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setError(null);

    let usernameArray: any = [];
    usernameArray.push(userOwnUsername);
    members.forEach((member) => {
      usernameArray.push(member.username);
    });

    axios
      .post(
        `http://localhost:8245/api/conversation/create`,
        {
          conv_name: convName,
          members: usernameArray,
        },
        config
      )
      .then((res) => {
        console.log("reponse de lappel de creation de conv", res.data);
        dispatch(setTriggerRefreshConv());
        navigate(`/app/group/${res.data.conv_id}`);
      })
      .catch((err) => {
        console.log(err);
        setError(err.response.data.message);
      });
  };

  return (
    <div className="md:w-1/2 px-4">
      <h1 className="text-4xl text-primary font-bold">Create a group</h1>
      <div>
        <h1 className="text-3xl text-primary font-bold">Group name</h1>
        <input
          type="text"
          className="w-full h-12 bg-white rounded-xl my-2 p-4"
          placeholder="The cool dudes"
          value={convName}
          onChange={(e) => setConvName(e.target.value)}
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
        <div className="flex flex-col w-full h-[35vh] overflow-y-auto">
          {members.length === 0 && (
            <h3 className="flex justify-center m-auto font-bold text-xl text-secondary text-center">
              Choose members by clicking on their username
            </h3>
          )}
          {members.length > 0 && (
            <h3 className="mx-auto font-bold text-xl text-secondary text-center">
              To remove a member, click on it
            </h3>
          )}
          {members.map((contact) => (
            <ContactDetails
              contactUsername={contact.username}
              contactFullName={[contact.lastname, contact.firstname]}
              key={contact.username + contact.fullName + "new-conv"}
              setMembers={setMembers}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-row w-full h-16 justify-end items-center">
        {error && (
          <h3 className="flex justify-center m-auto font-bold text-xl text-center text-red-900">
            {error}
          </h3>
        )}
        <Link
          to={"/app"}
          className="h-10 px-4 py-2 mx-2 rounded-2xl text-center bg-primary text-primary font-bold hover:bg-secondary hover:text-tertiary transition-all mt-auto"
        >
          cancel
        </Link>
        {convName.length > 0 && members.length > 0 && (
          <button
            className="h-10 px-4 py-2 mx-2 rounded-2xl  text-center bg-tertiary text-tertiary font-bold hover:bg-secondary transition-all mt-auto"
            onClick={(e) => {
              e.preventDefault();
              handleSubmit(e);
            }}
          >
            create
          </button>
        )}
      </div>
    </div>
  );
};
