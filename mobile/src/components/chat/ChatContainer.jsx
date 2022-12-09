import { useEffect, useRef } from "react";
import { ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import { HeaderTab } from "./ChatInfos";
import { ChatInput } from "./ChatInput";
import {
  resetCurrConv,
  resetTriggerPosition,
  setCurrConvData,
  setCurrConvMsgs,
  triggerPosition,
} from "../../helpers/redux/slices/MessagesSlice";
import { API_URL } from "@env";
import axios from "axios";
import { MessageContainer } from "./MessageContainer";

export const ChatContainer = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const id = route.params.id;

  const messageContainerRef = useRef(null);

  const APIJWT = useSelector((state) => state.user.JWT_API);
  const config = {
    headers: {
      Authorization: `Bearer ${APIJWT}`,
    },
  };

  const convData = useSelector((state) => state.messages.currConvData);
  const messages = useSelector((state) => state.messages.currConvMsgs);
  const trigger = useSelector((state) => state.messages.triggerPosition);

  //Asupp
  const console = useSelector((state) => state.messages.currConvMsgs);

  useEffect(() => {
    dispatch(resetCurrConv());
    dispatch(resetTriggerPosition());

    if (APIJWT === null) {
      console.log("APIJWT is null");
    }

    axios
      .post(
        `${API_URL}/api/conversation`,
        {
          conv_id: id,
        },
        config
      )
      .then((res) => {
        //console.log("appel api pour recup les anciens messages", res.data);
        dispatch(setCurrConvData(res.data));
        dispatch(setCurrConvMsgs(res.data.messagesList));
        dispatch(triggerPosition());
        triggerPosition();

        console.log("convData", console);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  }, [trigger]);

  if (!convData || !messages) {
    return (
      <ActivityIndicator
        style={{ height: "100%" }}
        color={"#5EA7D4"}
        size="large"
      />
    );
  }

  return (
    <>
      <HeaderTab
        title={convData.conversationData.name}
        navigation={navigation}
        direction={"ConversationList"}
      />
      <MessageContainer convMessage={messages} />
      <ChatInput convId={id} apiConfig={config} />
    </>
  );
};
