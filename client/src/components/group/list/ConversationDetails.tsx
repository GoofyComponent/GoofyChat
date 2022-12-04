import { Link } from "react-router-dom";
import { appHelpers } from "../../../helpers/appHelpers";

type ConversationDetailsProps = {
  convData: any;
};

export const ConversationDetails = ({ convData }: ConversationDetailsProps) => {
  return (
    <Link
      to={`/app/group/${convData.id}`}
      className="flex 
      flex-row 
      w-full 
      h-16 
      bg-[#3B4D54] 
      rounded-xl 
      my-2 
      hover:bg-primary
      hover:cursor-pointer 
      transition-all
      border-2
      border-secondary
      hover:border-transparent
      "
    >
      <div className="flex flex-row w-9/12 h-full p-2">
        <div className="flex flex-col w-1/12 h-full justify-center items-center mx-4">
          <div className="w-8 h-8 rounded-full bg-[#5EA7D4]"></div>
        </div>
        <div className="flex flex-col w-full h-full justify-center items-start">
          <h1 className="text-xl text-primary truncate w-full">
            {convData.name}
          </h1>
          <div className="flex justify-between w-full">
            <p className="text-sm text-secondary truncate">
              {convData.lastMessage &&
              (convData.lastMessage[2] != "" || convData.lastMessage[0] != "")
                ? `${convData.lastMessage[2]}: ${convData.lastMessage[0]}`
                : ""}
            </p>
            <p className="text-sm text-secondary ml-2">
              {convData.lastMessage
                ? appHelpers.dateTimeToTime(convData.lastMessage[1])
                : ""}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};
