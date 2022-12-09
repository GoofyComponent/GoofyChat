import axios from "axios";
import { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { API_URL } from "@env";

import {
  setAllConv,
  setTriggerRefreshConv,
} from "../../helpers/redux/slices/MessagesSlice";
import { ActivityIndicator, FlatList } from "react-native";
import { EmptyList } from "./EmptyList";
import { ConversationDetails } from "./ConversationDetails";

export const ConversationList = ({ navigation }) => {
  const dispatch = useDispatch();

  const [waiting, setWaiting] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const allConv = useSelector((state) => state.messages.allConv);
  const APIJWT = useSelector((state) => state.user.JWT_API);
  const triggerRefreshConv = useSelector(
    (state) => state.messages.triggerRefreshConv
  );

  useEffect(() => {
    setWaiting(true);
    if (APIJWT === null) {
      return;
    }
    ///console.log("ConversationList.jsx useEffect");

    axios
      .post(
        `${API_URL}/api/user/all-convs`,
        {},
        {
          headers: {
            Authorization: `Bearer ${APIJWT}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        setWaiting(false);
        dispatch(setAllConv(res.data.conversationList));
      })
      .catch((err) => {
        console.log(err);
        /* setWaiting(false); */
      });
  }, [triggerRefreshConv]);

  if (waiting) return <ActivityIndicator />;

  return (
    <SafeAreaView
      style={{
        height: "100%",
        marginTop: 0,
      }}
    >
      {allConv.length !== 0 ? (
        <>
          <FlatList
            data={allConv}
            keyExtractor={(item) => item.name}
            refreshing={refreshing}
            onRefresh={() => dispatch(setTriggerRefreshConv())}
            renderItem={(item) => (
              <ConversationDetails navigation={navigation} convData={item} />
            )}
          />
        </>
      ) : (
        <EmptyList navigation={navigation} />
      )}
    </SafeAreaView>
  );
};
