import {
  View,
  Text,
  Image,
  Button,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { persistStore } from "redux-persist";
import { getStatusBarHeight } from "react-native-status-bar-height";

import { eraseMessagesSlice } from "../../helpers/redux/slices/MessagesSlice";
import { eraseAll, eraseAllUser } from "../../helpers/redux/slices/UserSlice";
import { appHelpers } from "../../helpers/appHelpers";

import GCLogo from "../../assets/img/goofychat.png";
import store from "../../helpers/redux/store";
import styled from "styled-components";

const StyledHeader = styled.SafeAreaView`
  margin-top: ${Math.ceil(getStatusBarHeight() + 5)}px;
  width: 100%;
  padding-left: 2%;
  padding-right: 2%;
  flex-direction: row;
  justify-content: space-between;
`;

const StyledButton = styled.TouchableOpacity`
  background-color: #5ea7d4;
  padding: 10px;
  border-radius: 10px;
  margin-top: auto;
  color: #fff;
`;

export const Header = ({ navigation }) => {
  const dispatch = useDispatch();
  const username = useSelector((state) => state.user.username);
  //console.log(username);

  return (
    <StyledHeader>
      <View>
        {/*  <Image
          source={GCLogo}
          alt="logo"
          className="object-contain h-10 mx-2" 
          /> */}
        <View
          style={{
            flexDirection: "row",
            marginTop: "auto",
            marginBottom: "auto",
          }}
        >
          <Text
            style={{
              fontSize: 30,
              color: "#5EA7D4",

              fontFamily: "AgeoBold",
            }}
          >
            Goofy
          </Text>
          <Text
            style={{
              fontSize: 30,
              color: "#AED3EA",

              fontFamily: "AgeoBold",
            }}
          >
            Chat
          </Text>
        </View>
      </View>
      {true && (
        <View
          style={{
            flexDirection: "row",
            marginTop: "auto",
            marginBottom: "auto",
          }}
        >
          <Text
            style={{
              marginBottom: "auto",
              marginTop: "auto",
              fontSize: 20,
              color: "#FFFFFF",
              marginRight: "2%",
              fontFamily: "AgeoRegular",
            }}
          >
            Hello, {username} !
          </Text>
          <StyledButton
            onPress={() => {
              appHelpers.deleteMercureCookie();
              dispatch(eraseMessagesSlice());
              dispatch(eraseAll());
              persistStore(store).purge();
              console.log(store.getState());
              navigation.navigate("Home");
            }}
          >
            <Text
              style={{
                color: "#192124",
                fontFamily: "AgeoSemiBold",
                width: "100%",
              }}
            >
              Logout
            </Text>
          </StyledButton>
        </View>
      )}
    </StyledHeader>
  );
};
