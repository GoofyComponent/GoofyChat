import styled from "styled-components";
import {
  ScrollView,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
import axios from "axios";
import { useEffect, useState } from "react";
import { HeaderTab } from "../chat/ChatInfos";
import { useSelector } from "react-redux";
import { ContactItem } from "./contacts/ContactItem";
import { useDispatch } from "react-redux";
import { setTriggerRefreshConv } from "../../helpers/redux/slices/MessagesSlice";
import { resetSelectedContact } from "../../helpers/redux/slices/UserSlice";
import { API_URL } from "@env";

const StyledButton = styled.TouchableOpacity`
  background-color: #5ea7d4;
  padding: 10px;
  border-radius: 10px;
  margin-top: auto;
  color: #fff;
`;

const StylizedLabel = styled.Text`
  font-size: 20px;
  color: #5ea7d4;
  margin-bottom: 10px;
  text-align: left;
  font-family: "AgeoSemiBold";
`;

const StylizedTextInput = styled.TextInput`
  width: 100%;
  height: 50px;
  border: 1px solid #5ea7d4;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 20px;
  background-color: #fff;
`;

export const CreateGroupInfos = ({ navigation }) => {
  const dispatch = useDispatch();

  const selectedContacts = useSelector((state) => state.user.contactSelected);
  const userOwnUsername = useSelector((state) => state.user.username);
  const APIJWT = useSelector((state) => state.user.JWT_API);
  const config = {
    headers: {
      Authorization: `Bearer ${APIJWT}`,
    },
  };

  const [convName, setConvName] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log(selectedContacts);
  }, [selectedContacts]);

  const handleSubmit = () => {
    setError(null);

    let usernameArray = [];
    usernameArray.push(userOwnUsername);
    selectedContacts.forEach((member) => {
      usernameArray.push(member.username);
    });

    axios
      .post(
        `${API_URL}/api/conversation/create`,
        {
          conv_name: convName,
          members: usernameArray,
        },
        config
      )
      .then((res) => {
        console.log("reponse de lappel de creation de conv", res.data);
        dispatch(setTriggerRefreshConv());
        dispatch(resetSelectedContact());
        navigation.navigate("Logged", {
          screen: "ConversationChat",
          params: { id: res.data.conv_id },
        });
      })
      .catch((err) => {
        console.log(err);
        setError(err.response.data.message);
      });
  };

  return (
    <>
      <HeaderTab
        title={"Group creation"}
        navigation={navigation}
        direction={"ConversationList"}
      />
      <View
        style={{
          paddingLeft: 10,
          paddingRight: 10,
          height: "100%",
          width: "100%",
        }}
      >
        <View>
          <StylizedLabel>Group creation</StylizedLabel>
          <StylizedTextInput
            placeholder="Group name"
            onChangeText={setConvName}
          />
        </View>
        <View>
          <StylizedLabel>Group description</StylizedLabel>
          <StylizedTextInput placeholder="Group name" />
        </View>
        <View>
          <StylizedLabel>Members</StylizedLabel>
          <TouchableOpacity
            style={{
              borderColor: "#5EA7D4",
              borderWidth: 1,
              backgroundColor: "transparent",
              borderRadius: 10,
              height: 35,
              width: "30%",
              alignSelf: "flex-end",
            }}
            onPress={() => navigation.navigate("Contacts")}
          >
            <Text
              style={{
                color: "#5EA7D4",
                textAlign: "center",
                marginTop: 5,
                marginBottom: 5,
              }}
            >
              Add members
            </Text>
          </TouchableOpacity>
        </View>
        {selectedContacts.length > 0 ? (
          <View style={{ height: "48%", marginBottom: 10, marginTop: 10 }}>
            <FlatList
              data={selectedContacts}
              renderItem={(item) => (
                <ContactItem
                  contact={item}
                  navigation={navigation}
                  disableClick={true}
                />
              )}
            />
          </View>
        ) : (
          <View
            style={{
              height: "50%",
              justifyContent: "center",
            }}
          >
            <StylizedLabel
              style={{
                textAlign: "center",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Please select users first
            </StylizedLabel>
          </View>
        )}

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingLeft: 10,
            paddingRight: 10,
          }}
        >
          <StyledButton
            style={{
              borderColor: "#5EA7D4",
              borderWidth: 1,
              backgroundColor: "transparent",
            }}
            onPress={() => {
              dispatch(resetSelectedContact());
              navigation.navigate("ConversationList");
            }}
          >
            <Text
              style={{
                color: "#AED3EA",
                fontFamily: "AgeoSemiBold",
                width: "100%",
              }}
            >
              Cancel
            </Text>
          </StyledButton>
          {error && (
            <Text
              style={{
                color: "red",
                fontFamily: "AgeoSemiBold",
                width: "30%",
                textAlign: "center",
              }}
            >
              {error}
            </Text>
          )}
          {selectedContacts.length > 0 && (
            <StyledButton onPress={handleSubmit}>
              <Text
                style={{
                  color: "#192124",
                  fontFamily: "AgeoSemiBold",
                  width: "100%",
                }}
              >
                Create group
              </Text>
            </StyledButton>
          )}
        </View>
      </View>
    </>
  );
};
