import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { ChatInfos } from "./ChatInfos";
import { ChatInput } from "./ChatInput";
import { Message } from "./Message";

export const ChatContainer = () => {
  const dev = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
  const messageContainerRef = useRef<HTMLDivElement>(null);
  const [triggerPosition, setTriggerPosition] = useState(0);

  const APIJWT = useSelector((state: any) => state.user.JWT_API);
  const config = {
    headers: {
      Authorization: `Bearer ${APIJWT}`,
    },
  };

  const [convData, setConvData] = useState<any>(false);
  const [messages, setMessages] = useState<any>(false);

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const urlEventSource = new URL("http://localhost:9090/.well-known/mercure");
    const topic = `https://goofychat-mercure/conversation/${id}`;
    urlEventSource.searchParams.append("topic", topic);

    const eventSource = new EventSource(urlEventSource.toString(), {
      withCredentials: true,
    });

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("onmessage", data);

      if (data !== null) {
        setMessages((messages: any) => [...messages, data]);
      }
    };

    eventSource.onerror = (event) => {
      console.log("onerror", event);
      location.reload();
    };

    axios
      .post(
        `http://localhost:8245/api/conversation`,
        {
          conv_id: id,
        },
        config
      )
      .then((res) => {
        console.log(res.data);
        setConvData(res.data);
        setMessages(res.data.messagesList);
        setTriggerPosition((triggerPosition) => triggerPosition + 1);
      });
  }, []);

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  }, [triggerPosition]);

  console.log("messages", messages);
  console.log("convData", convData);

  if (!convData || !messages) {
    return <></>;
  }

  return (
    <div className="flex flex-col w-full h-[86vh] mx-2 mt-auto md:my-auto p-2 bg-[#3B4D54] rounded-xl">
      <ChatInfos convDataInfos={convData.conversationData} />
      <div
        className="overflow-auto max-h-[39rem] mt-auto mb-2 px-2"
        ref={messageContainerRef}
      >
        {messages.map((item: any) => {
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
      <ChatInput
        setTriggerPosition={setTriggerPosition}
        apiConfig={config}
        convId={id}
      />
    </div>
  );
};
