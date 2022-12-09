import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Header } from "../components/base/Header";
import { AppWaiting } from "../components/base/AppWaiting";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MERCURE_URL } from "@env";
import EventSource, { EventSourceListener } from "react-native-sse";
import "react-native-url-polyfill/auto";

import {
  triggerPosition,
  updateConvMessage,
  updateCurrConvMsgs,
} from "../helpers/redux/slices/MessagesSlice";
import { ConversationList } from "../components/list/ConversationList";
import { ChatContainer } from "../components/chat/ChatContainer";
import { CreateGroupContainer } from "../components/create/CreateGroupContainer";

const Tab = createNativeStackNavigator();

export const Logged = ({ navigation }) => {
  const dispatch = useDispatch();
  /* const { id } = useParams<{ id: string }>(); */

  const APIJWT = useSelector((state) => state.user.JWT_API);
  const mercureListener = useSelector((state) => state.user.mercureListener);
  const mercureJWT = useSelector((state) => state.user.JWT_Mercure);

  useEffect(() => {
    if (APIJWT === null) {
      console.log("APIJWT === null");
    }

    //Create the url for the event source
    const urlEventSource = `${MERCURE_URL}/.well-known/mercure?topic=${mercureListener}`;

    const es = new EventSource(urlEventSource, {
      headers: {
        Authorization: {
          toString: function () {
            return `Bearer ${mercureJWT}`;
          },
        },
      },
    });

    const listener = (event) => {
      if (event.type === "open") {
        console.log("Open SSE connection.");
      } else if (event.type === "message") {
        let data = JSON.parse(event.data);
        console.log("onmessage", data);

        data = {
          ...data,
          created_at: new Date(data.created_at.date).toString(),
        };

        if (data !== null) {
          dispatch(updateConvMessage(data));
          dispatch(updateCurrConvMsgs(data));
          dispatch(triggerPosition());
        }
      } else if (event.type === "error") {
        console.error("Connection error:", event.message);
      } else if (event.type === "exception") {
        console.error("Error:", event.message, event.error);
      }
    };

    es.addEventListener("open", listener);
    es.addEventListener("message", listener);
    es.addEventListener("error", listener);

    return () => {
      es.removeAllEventListeners();
      es.close();
    };
  }, []);

  return (
    <>
      <Header navigation={navigation} />
      <Tab.Navigator
        initialRouteName="ConversationList"
        screenOptions={{ headerShown: false, animation: "slide_from_right" }}
      >
        <Tab.Screen name="ConversationList" component={ConversationList} />
        <Tab.Screen
          name="ConversationCreate"
          component={CreateGroupContainer}
        />
        <Tab.Screen name="ConversationChat" component={ChatContainer} />
      </Tab.Navigator>
    </>
  );
};
