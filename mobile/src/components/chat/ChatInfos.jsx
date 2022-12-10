import styled from "styled-components";
import { Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const StyledChatInfos = styled.View`
  width: 100%;
  padding-left: 5px;
  padding-right: 5px;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
`;

export const HeaderTab = ({ navigation, direction, title }) => {
  return (
    <StyledChatInfos>
      <TouchableOpacity onPress={() => navigation.navigate(direction)}>
        <Ionicons name="arrow-back" size={50} color="#5EA7D4" />
      </TouchableOpacity>

      <Text style={{ color: "#5EA7D4", fontSize: 35, fontFamily: "AgeoBold" }}>
        {title}
      </Text>
    </StyledChatInfos>
  );
};
