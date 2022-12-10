import styled from "styled-components";
import { appHelpers } from "../../helpers/appHelpers";
import { View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

const StyledMsg = styled.Text`
  font-size: 20px;
  font-family: "AgeoMedium";
  color: #000000;
`;
const StyledInfos = styled.Text`
  font-size: 15px;
  font-family: "AgeoRegularItalic";
  color: #000000;
`;

const StyledMessageNotAuthor = styled.View`
  background-color: #5ea7d4;
  border-radius: 15px;
  height: auto;
  padding: 10px;
  margin-bottom: 5px;
  margin-top: 5px;
  width: 85%;
  border-bottom-left-radius: 0px;
`;

const StyledMessageAuthor = styled.View`
  background-color: #aed3ea;
  border-radius: 15px;
  height: auto;
  padding: 10px;
  margin-bottom: 5px;
  margin-top: 5px;
  width: 85%;
  border-bottom-right-radius: 0px;
  margin-left: auto;
`;

export const Message = ({ convMessage }) => {
  const message = convMessage.item.content;
  const author = convMessage.item.author;
  const date = convMessage.item.created_at;
  const loggedUsername = useSelector((state) => state.user.username);
  const isAuthor = loggedUsername === author;

  /* console.log("Message.jsx");
  console.log(convMessage);
  console.log("isAuthor: " + isAuthor);
  console.log("loggedUsername: " + loggedUsername); */

  if (isAuthor) {
    return (
      <StyledMessageAuthor>
        <StyledMsg>{message}</StyledMsg>
        <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
          <StyledInfos>{appHelpers.dateTimeToTime(date)}</StyledInfos>
          <StyledInfos>{author}</StyledInfos>
        </View>
      </StyledMessageAuthor>
    );
  }

  return (
    <StyledMessageNotAuthor>
      <StyledMsg>{message}</StyledMsg>
      <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
        <StyledInfos>{appHelpers.dateTimeToTime(date)}</StyledInfos>
        <StyledInfos>{author}</StyledInfos>
      </View>
    </StyledMessageNotAuthor>
  );
};
