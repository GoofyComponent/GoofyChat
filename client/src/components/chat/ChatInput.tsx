import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { useDispatch } from "react-redux";
import tw from "tailwind-styled-components";
import { triggerPosition } from "../../helpers/redux/slices/MessagesSlice";

type ChatinputProps = {
  apiConfig: any | null;
  convId: string | undefined | null;
};

const SectionChatInput = tw.section<any>`
    flex 
    justify-between 
    w-full 
    min-h-[5rem] 
    mt-2
`;

export const ChatInput = ({ apiConfig, convId }: ChatinputProps) => {
  const dispatch = useDispatch();

  const [messageInput, setMessageInput] = useState("");
  const [waitingForResponse, setWaitingForResponse] = useState(false);

  const apiData = {
    conv_id: convId,
    content: messageInput,
  };

  const handleSend = () => {
    if (messageInput === "") return;
    let tempMessage = messageInput;
    setMessageInput("");
    setWaitingForResponse(true);

    axios
      .post("http://localhost:8245/api/message/publish", apiData, apiConfig)
      .then((res) => {
        console.log("repojnse de la publication dun message", res);
        dispatch(triggerPosition());
        setWaitingForResponse(false);
      })
      .catch((err) => {
        setMessageInput(tempMessage);
        setWaitingForResponse(false);
        console.log(err);
      });
  };

  return (
    <SectionChatInput>
      <textarea
        className="w-10/12 h-14 px-4 py-2 rounded-2xl outline-none font-semibold mr-4 mt-auto"
        placeholder="Type your message here..."
        onChange={(e) => {
          setMessageInput(e.target.value);
        }}
        value={messageInput}
      />
      <button
        className="w-60 h-14 px-4 py-2 rounded-2xl bg-tertiary text-tertiary font-bold hover:bg-secondary transition-all mt-auto"
        onClick={(e) => {
          e.preventDefault();
          handleSend();
        }}
      >
        {waitingForResponse ? (
          <ThreeDots
            height={10}
            width={80}
            color="#FFFFFF"
            ariaLabel="registering"
            wrapperStyle={{ display: "flex", justifyContent: "center" }}
          />
        ) : (
          "Send"
        )}
      </button>
    </SectionChatInput>
  );
};
