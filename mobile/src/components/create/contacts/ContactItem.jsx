import styled from "styled-components";
import { View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { setContactSelected } from "../../../helpers/redux/slices/UserSlice";

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
`;

export const ContactItem = ({ contact, navigation, disableClick = false }) => {
  const dispatch = useDispatch();
  const loggedUsername = useSelector((state) => state.user.username);
  const selectedContacts = useSelector((state) => state.user.contactSelected);

  const contactClean = contact.item;

  if (loggedUsername === contactClean.username) {
    return null;
  }

  //Check if the user is already selected and disbalclick is on false
  if (
    selectedContacts.find(
      (oldMember) => oldMember.username === contactClean.username
    ) &&
    !disableClick
  ) {
    return null;
  }

  return (
    <StyledConversationDetails
      onPress={() => {
        if (disableClick) return;
        const members = {
          username: contactClean.username,
          lastname: contactClean.lastname,
          firstname: contactClean.lastname,
        };

        dispatch(setContactSelected(members));
      }}
    >
      <StyledConvName>{contactClean.username}</StyledConvName>
      <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
        <StyledText>{`${contactClean.lastname} ${contactClean.lastname}`}</StyledText>
      </View>
    </StyledConversationDetails>
  );
};
