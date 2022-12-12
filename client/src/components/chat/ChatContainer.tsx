import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { ChatInfos } from "./ChatInfos";
import { ChatInput } from "./ChatInput";
import { Message } from "./Message";
import { ChatContainerSkeleton } from "./skeletons/ChatContainerSkeleton";
import {
  resetCurrConv,
  resetTriggerPosition,
  setCurrConvData,
  setCurrConvMsgs,
  triggerPosition,
} from "../../helpers/redux/slices/MessagesSlice";

export const ChatContainer = () => {
  const dispatch = useDispatch();

  const messageContainerRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  const APIJWT = useSelector((state: any) => state.user.JWT_API);
  const config = {
    headers: {
      Authorization: `Bearer ${APIJWT}`,
    },
  };

  const convData = useSelector((state: any) => state.messages.currConvData);
  const messages = useSelector((state: any) => state.messages.currConvMsgs);
  const trigger = useSelector((state: any) => state.messages.triggerPosition);

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    dispatch(resetCurrConv());
    dispatch(resetTriggerPosition());

    if (APIJWT === null) {
      return navigate("/login");
    }

    axios
      .post(
        `${import.meta.env.VITE_API_URL}/api/conversation`,
        {
          conv_id: id,
        },
        config
      )
      .then((res) => {
        console.log("appel api pour recup les anciens messages", res.data);
        dispatch(setCurrConvData(res.data));
        dispatch(setCurrConvMsgs(res.data.messagesList));
        dispatch(triggerPosition());
        /* setTriggerPosition((triggerPosition) => triggerPosition + 1); */
      })
      .catch((err) => {
        navigate("/404");
      });
  }, [id]);

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  }, [trigger]);

  if (!convData || !messages) {
    return <ChatContainerSkeleton />;
  }

  return (
    <div className="flex flex-col w-full md:w-5/6 h-[86vh] mx-2 mt-auto md:my-auto p-2 bg-[#3B4D54] rounded-xl">
      <ChatInfos convDataInfos={convData.conversationData} />
      <div
        className="overflow-auto max-h-[39rem] mt-auto mb-2 px-2 scroll-smooth"
        ref={messageContainerRef}
      >
        {messages.map((item: any) => {
          console.log(item);
          if (item.id != id) return;
          return (
            <Message
              message={item.content}
              author={item.author}
              date={item.created_at}
              key={`${item.author}-${item.content}-${item.created_at}`}
            />
          );
        })}
      </div>
      <ChatInput apiConfig={config} convId={id} />
    </div>
  );
};
