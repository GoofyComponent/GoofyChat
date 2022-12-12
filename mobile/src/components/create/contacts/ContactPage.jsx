import styled from "styled-components";
import axios from "axios";
import { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import { useSelector } from "react-redux";
import { HeaderTab } from "../../chat/ChatInfos";
import { FontAwesome } from "@expo/vector-icons";
import { API_URL } from "@env";
import { ContactItem } from "./ContactItem";

const StylizedLabel = styled.Text`
  font-size: 20px;
  color: #5ea7d4;
  margin-bottom: 10px;
  text-align: left;
  font-family: "AgeoSemiBold";
`;

const StylizedTextInput = styled.TextInput`
  width: 80%;
  height: 50px;
  border: 1px solid #5ea7d4;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 20px;
  background-color: #fff;
`;

export const ContactPage = ({ navigation }) => {
  const [resultsSearch, setResultsSearch] = useState(false);
  const [inputSearch, setInputSearch] = useState("");
  const [waitingResults, setWaitingResults] = useState(false);

  const APIJWT = useSelector((state) => state.user.JWT_API);
  const config = {
    headers: {
      Authorization: `Bearer ${APIJWT}`,
    },
  };

  const submitSearch = () => {
    if (waitingResults) return;

    setResultsSearch(null);

    if (inputSearch === "") {
      return;
    }

    /* console.log("inputSearch", inputSearch);
    console.log("APIJWT", APIJWT); */

    setWaitingResults(true);

    axios
      .post(`${API_URL}/api/search-contact`, { search: inputSearch }, config)
      .then((res) => {
        //console.log("reponse de l'appel de recherche d'un contact", res.data);
        setResultsSearch(res.data.results);
        setWaitingResults(false);
      })
      .catch((err) => {
        console.log(err.data);
        setWaitingResults(false);
      });
  };

  return (
    <>
      <HeaderTab
        title={"Contacts"}
        navigation={navigation}
        direction={"ConversationInfos"}
      />
      <View
        style={{
          paddingLeft: 10,
          paddingRight: 10,
        }}
      >
        <StylizedLabel>Search a contact</StylizedLabel>
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <StylizedTextInput
            onChangeText={setInputSearch}
            value={inputSearch}
          />
          {waitingResults ? (
            <View
              style={{
                backgroundColor: "#AED3EA",
                width: "18%",
                borderRadius: 10,
                marginLeft: 10,
                height: 50,
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
                width: "18%",
                borderRadius: 10,
                marginLeft: 10,
                height: 50,
              }}
              onPress={submitSearch}
            >
              <FontAwesome
                name="search"
                size={24}
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
        </View>
        <>
          {resultsSearch === null && !waitingResults && (
            <View
              style={{
                height: "83%",
                borderColor: "red",
                borderWidth: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: "AgeoSemiBold",
                  color: "#5EA7D4",
                  textAlign: "center",
                }}
              >
                The search did not find anything, check your input
              </Text>
            </View>
          )}
          {resultsSearch === false && !waitingResults && (
            <View
              style={{
                height: "83%",
                borderColor: "red",
                borderWidth: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: "AgeoSemiBold",
                  color: "#5EA7D4",
                  textAlign: "center",
                }}
              >
                Search a contact with the input above.
              </Text>
            </View>
          )}
          {resultsSearch && !waitingResults && (
            <FlatList
              data={resultsSearch}
              renderItem={(item) => (
                <ContactItem contact={item} navigation={navigation} />
              )}
              style={{
                height: "79%",
              }}
            />
          )}
        </>
      </View>
    </>
  );
};
