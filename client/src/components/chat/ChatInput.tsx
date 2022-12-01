import axios from "axios";
import { useEffect, useRef, useState } from "react";
import tw from "tailwind-styled-components";

type ChatinputProps = {
  setTriggerPosition: (triggerPosition: number) => void;
  apiConfig: any;
  convId: string | undefined;
};

const SectionChatInput = tw.section<any>`
    flex 
    justify-between 
    w-full 
    min-h-[5rem] 
    mt-2
`;

export const ChatInput = ({
  setTriggerPosition,
  apiConfig,
  convId,
}: ChatinputProps) => {
  const [messageInput, setMessageInput] = useState("");

  const apiData = {
    conv_id: convId,
    content: messageInput,
  };

  const handleSend = () => {
    if (messageInput === "") return;
    let tempMessage = messageInput;
    setMessageInput("");

    axios
      .post("http://localhost:8245/api/message/publish", apiData, apiConfig)
      .then((res) => {
        console.log(res);
        setTriggerPosition((triggerPosition) => triggerPosition + 1);
      })
      .catch((err) => {
        setMessageInput(tempMessage);
        console.log(err);
      });
  };

  return (
    <SectionChatInput>
      <textarea
        className="w-10/12 px-4 py-2 rounded-2xl outline-none font-semibold mr-4 mt-auto"
        placeholder="Type your message here..."
        onChange={(e) => {
          setMessageInput(e.target.value);
        }}
        value={messageInput}
      />
      <button
        className="w-2/12 h-full px-4 py-2 rounded-2xl bg-tertiary text-tertiary font-bold hover:bg-secondary transition-all mt-auto"
        onClick={(e) => {
          e.preventDefault();
          handleSend();
        }}
      >
        Send
      </button>
    </SectionChatInput>
  );
};
