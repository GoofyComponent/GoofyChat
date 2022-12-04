import { useState } from "react";
import { useSelector } from "react-redux";
import tw from "tailwind-styled-components";

type ContactDetailsProps = {
  contactUsername: string;
  contactFullName: any;

  setMembers?: any;
};

export const ContactDetails = ({
  contactUsername,
  contactFullName,
  setMembers,
}: ContactDetailsProps) => {
  const loggedUsername = useSelector((state: any) => state.user.username);

  const [isPressed, setIsPressed] = useState(false);

  const Contact = tw.div<any>`
      flex 
      flex-row 
      w-full 
      h-16 
      bg-[#3B4D54] 
      rounded-xl 
      my-2 
      hover:bg-primary
      hover:cursor-pointer 
      transition-all

    `;

  const toggleMembers = (members: any, setMembers: any) => {
    setMembers((prev: any) => {
      if (
        prev.find((oldMember: any) => oldMember.username === members.username)
      ) {
        return prev.filter(
          (oldMember: any) => oldMember.username !== members.username
        );
      }
      return [...prev, members];
    });
  };

  if (loggedUsername === contactUsername) {
    return null;
  }

  return (
    <Contact
      onClick={() =>
        toggleMembers(
          {
            username: contactUsername,
            lastname: contactFullName[0],
            firstname: contactFullName[1],
          },
          setMembers
        )
      }
    >
      <div className="flex flex-row w-full h-full ">
        <div className="flex flex-col w-1/12 h-full justify-center items-center mx-4">
          <div className="w-8 h-8 rounded-full bg-[#5EA7D4]"></div>
        </div>
        <div className="flex flex-col w-11/12 h-full justify-center items-start">
          <h1 className="text-xl text-primary">{contactUsername}</h1>
          <p className="text-sm text-secondary">{`${contactFullName[0]} ${contactFullName[1]}`}</p>
        </div>
      </div>
    </Contact>
  );
};
