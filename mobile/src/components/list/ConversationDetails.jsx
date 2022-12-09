import { View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import { appHelpers } from "../../helpers/appHelpers";
import { resetSelectedContact } from "../../helpers/redux/slices/UserSlice";

const StyledConversationDetails = styled.TouchableOpacity`
  border-radius: 10px;
  border: 2px solid #aed3ea;
  margin-top: 5px;
  margin-bottom: 5px;
  margin-left: 5px;
  margin-right: 5px;
  height: 75px;
  background-color: #3b4d54;
  padding: 10px;
`;

const StyledConversationNew = styled.TouchableOpacity`
  border-radius: 10px;
  border: 2px solid #aed3ea;
  margin-top: 5px;
  margin-bottom: 5px;
  margin-left: 5px;
  margin-right: 5px;
  height: 75px;
  background-color: #3b4d54;
  padding: 10px;
  align-items: center;
  justify-content: center;
`;

const StyledConvName = styled.Text`
  margin-bottom: 5px;
  font-size: 20px;
  font-family: "AgeoBold";
  color: #5ea7d4;
`;

const StyledText = styled.Text`
  margin-top: 5px;
  font-size: 15px;
  font-family: "AgeoRegularItalic";
  color: #aed3ea;
  width: 85%;
`;

export const ConversationDetails = ({
  navigation,
  convData,
  isCreate = false,
}) => {
  const dispatch = useDispatch();
  /*  
  console.log("ConversationDetails.jsx");
  console.log(convData); */

  if (!convData) return;
  //console.log(convData.index);
  const isFirst = convData.index === 0;

  const convDataClean = convData.item;

  if (isFirst) {
    return (
      <>
        <StyledConversationNew
          onPress={() => {
            dispatch(resetSelectedContact());
            navigation.navigate("ConversationCreate");
          }}
        >
          <StyledConvName>Create a new chat!</StyledConvName>
        </StyledConversationNew>
        <StyledConversationDetails
          onPress={() =>
            navigation.navigate("Logged", {
              screen: "ConversationChat",
              params: { id: convDataClean.id },
            })
          }
        >
          <StyledConvName>{convDataClean.name}</StyledConvName>
          <View
            style={{ justifyContent: "space-between", flexDirection: "row" }}
          >
            <StyledText ellipsizeMode="tail" numberOfLines={2}>
              {convDataClean.lastMessage &&
              (convDataClean.lastMessage[2] != "" ||
                convDataClean.lastMessage[0] != "") ? (
                <>
                  {`${convDataClean.lastMessage[2]}: ${convDataClean.lastMessage[0]}`
                    .length < 35
                    ? `${convDataClean.lastMessage[2]}: ${convDataClean.lastMessage[0]}`
                    : `${convDataClean.lastMessage[2]}: ${convDataClean.lastMessage[0]}`.substring(
                        0,
                        35
                      ) + "..."}
                </>
              ) : (
                "No messages yet"
              )}
            </StyledText>
            <StyledText>
              {convDataClean.lastMessage
                ? appHelpers.dateTimeToTime(convDataClean.lastMessage[1])
                : ""}
            </StyledText>
          </View>
        </StyledConversationDetails>
      </>
    );
  }

  return (
    <StyledConversationDetails
      onPress={() =>
        navigation.navigate("Logged", {
          screen: "ConversationChat",
          params: { id: convDataClean.id },
        })
      }
    >
      <StyledConvName>{convDataClean.name}</StyledConvName>
      <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
        <StyledText ellipsizeMode="tail" numberOfLines={2}>
          {convDataClean.lastMessage &&
          (convDataClean.lastMessage[2] != "" ||
            convDataClean.lastMessage[0] != "") ? (
            <>
              {`${convDataClean.lastMessage[2]}: ${convDataClean.lastMessage[0]}`
                .length < 35
                ? `${convDataClean.lastMessage[2]}: ${convDataClean.lastMessage[0]}`
                : `${convDataClean.lastMessage[2]}: ${convDataClean.lastMessage[0]}`.substring(
                    0,
                    35
                  ) + "..."}
            </>
          ) : (
            "No messages yet"
          )}
        </StyledText>
        <StyledText>
          {convDataClean.lastMessage
            ? appHelpers.dateTimeToTime(convDataClean.lastMessage[1])
            : ""}
        </StyledText>
      </View>
    </StyledConversationDetails>
  );
};
