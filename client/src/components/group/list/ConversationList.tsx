import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaPlus } from "@react-icons/all-files/fa/FaPlus";

import { setAllConv } from "../../../helpers/redux/slices/MessagesSlice";

import { ConversationDetails } from "./ConversationDetails";

export const ConversationList = () => {
  const dispatch = useDispatch();

  const allConv = useSelector((state: any) => state.messages.allConv);
  const APIJWT = useSelector((state: any) => state.user.JWT_API);
  const triggerRefreshConv = useSelector(
    (state: any) => state.messages.triggerRefreshConv
  );

  useEffect(() => {
    if (APIJWT === null) {
      return;
    }

    axios
      .post(
        "http://localhost:8245/api/user/all-convs",
        {},
        {
          headers: {
            Authorization: `Bearer ${APIJWT}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        dispatch(setAllConv(res.data.conversationList));
      })
      .catch((err) => {
        console.log(err);
        /* setWaiting(false); */
      });
  }, [triggerRefreshConv]);

  return (
    <div className="flex flex-col w-full md:w-1/6 h-[86vh] mx-2 mt-auto md:my-auto p-2 bg-[#3B4D54] rounded-xl overflow-auto">
      <Link
        to={`/app/group/new`}
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
        <FaPlus className="m-auto" size={40} color={"#5EA7D4"} />
        <p className="m-auto font-bold text-xl text-primary py-4">
          Create a new conversation
        </p>
      </Link>
      {allConv.map((conv: any) => (
        <ConversationDetails key={conv.id} convData={conv} />
      ))}
    </div>
  );
};
