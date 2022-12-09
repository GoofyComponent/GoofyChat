import axios from "axios";
import {
  KeyboardAvoidingView,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import styled from "styled-components";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_URL } from "@env";
import { triggerPosition } from "../../helpers/redux/slices/MessagesSlice";

const StyledChatInput = styled.View`
  width: 100%;
  height: 50px;
  padding-top: 3px;
  padding-bottom: 3px;
  flex-direction: row;
  padding-left: 10px;
  padding-right: 5px;
  position: absolute;
  bottom: 0;
  background-color: #192124;
`;

const StyledTextInput = styled.TextInput`
  width: 75%;
  min-height: 100%;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 20px;
  background-color: #fff;
`;

export const ChatInput = ({ convId, apiConfig }) => {
  const dispatch = useDispatch();

  const [messageInput, setMessageInput] = useState("");
  const [waitingForResponse, setWaitingForResponse] = useState(false);

  const apiData = {
    conv_id: convId.toString(),
    content: messageInput,
  };

  const handleSend = () => {
    if (messageInput === "") return;
    let tempMessage = messageInput;
    setMessageInput("");
    setWaitingForResponse(true);

    axios
      .post(`${API_URL}/api/message/publish`, apiData, apiConfig)
      .then((res) => {
        //console.log("repojnse de la publication dun message", res);
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
    <StyledChatInput>
      <StyledTextInput
        multiline
        onChangeText={setMessageInput}
        value={messageInput}
      ></StyledTextInput>
      {waitingForResponse ? (
        <View
          style={{
            backgroundColor: "#AED3EA",
            width: "20%",
            borderRadius: 10,
            marginLeft: 10,
          }}
        >
          <ActivityIndicator
            size="large"
            color="#5EA7D4"
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: "auto",
              marginBottom: "auto",
            }}
          />
        </View>
      ) : (
        <TouchableOpacity
          style={{
            backgroundColor: "#AED3EA",
            width: "20%",
            borderRadius: 10,
            marginLeft: 10,
          }}
          onPress={handleSend}
        >
          <Ionicons
            name="md-send"
            size={35}
            color="black"
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: "auto",
              marginBottom: "auto",
            }}
          />
        </TouchableOpacity>
      )}
    </StyledChatInput>
  );
};
