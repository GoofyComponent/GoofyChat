import styled from "styled-components";
import { View, Text, Image, SafeAreaView } from "react-native";
import { useSelector } from "react-redux";

import logo from "../assets/img/goofychat.png";
import { useEffect } from "react";

const WelcomeContainer = styled.SafeAreaView`
  align-items: center;
  height: 100%;
  justify-content: center;
  flex-direction: column;
`;

const NameContainer = styled.View`
  flex-direction: row;
`;

const TitleContainer = styled.View`
  margin-top: 10px;
  margin-bottom: 10px;
`;

const SubTitleContainer = styled.View`
  margin-top: 10px;
  margin-bottom: 10px;
`;

const StyledButton = styled.TouchableOpacity`
  background-color: #5ea7d4;
  padding: 10px;
  border-radius: 10px;
  margin-top: 20px;
  color: #fff;
`;

export const Welcome = ({ navigation }) => {
  const isUserLogged = useSelector((state) => state.user.JWT_API);

  useEffect(() => {
    if (isUserLogged) {
      navigation.navigate("Logged");
    }
  }, []);

  return (
    <WelcomeContainer>
      <Image source={logo} style={{ width: 250 }} resizeMode="contain" />
      <NameContainer>
        <Text
          style={{
            color: "#5EA7D4",
            fontSize: 38,
            fontFamily: "AgeoBold",
          }}
        >
          Goofy
        </Text>
        <Text
          style={{
            color: "#AED3EA",
            fontSize: 38,
            fontFamily: "AgeoBold",
          }}
        >
          Chat
        </Text>
      </NameContainer>
      <TitleContainer>
        <Text
          adjustsFontSizeToFit={true}
          style={{
            color: "#5EA7D4",
            fontSize: 26,
            fontFamily: "AgeoSemiBold",
          }}
        >
          The authentic
        </Text>
        <Text
          style={{
            color: "#AED3EA",
            fontSize: 26,
            fontFamily: "AgeoSemiBold",
          }}
        >
          message app
        </Text>
      </TitleContainer>
      <SubTitleContainer>
        <Text
          style={{
            color: "#AED3EA",
            fontSize: 18,
            fontFamily: "AgeoSemiBold",
          }}
        >
          Stay goof.
        </Text>
      </SubTitleContainer>
      <StyledButton onPress={() => navigation.navigate("Login")}>
        <Text
          style={{
            color: "#192124",
            fontFamily: "AgeoSemiBold",
            width: "100%",
            fontSize: 18,
          }}
        >
          Login
        </Text>
      </StyledButton>
    </WelcomeContainer>
  );
};
