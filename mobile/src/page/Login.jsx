import { useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import jwt_decode from "jwt-decode";
import styled from "styled-components";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { API_URL } from "@env";

import { appHelpers } from "../helpers/appHelpers";
import {
  setJWT_API,
  setUserInfos,
  setJWT_Mercure,
  setMercureListener,
} from "../helpers/redux/slices/UserSlice";

const StyledLogin = styled.SafeAreaView`
  flex: 1;
  height: 100%;
  align-items: center;
  justify-content: center;
  margin-top: ${Math.ceil(getStatusBarHeight())}px;
`;

const StylizedLabel = styled.Text`
  font-size: 20px;
  color: #5ea7d4;
  margin-bottom: 10px;
  text-align: center;
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

const StyledButton = styled.TouchableOpacity`
  background-color: transparent;
  padding: 10px;
  border-radius: 10px;
  margin-top: 20px;
  color: #fff;
  width: 60%;
  height: 50px;
  border: 1px solid #5ea7d4;
`;

export const Login = ({ navigation }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("test@test.fr");
  const [password, setPassword] = useState("test");

  const [waiting, setWaiting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = () => {
    setWaiting(true);
    setError(null);

    var url = `${API_URL}/api/login`;
    var headers = {};

    if (!email || !password) return;

    axios
      .post(
        url,
        {
          username: email,
          password: password,
        },
        { headers: headers }
      )
      .then((res) => {
        const JWT = res.data.token;
        dispatch(setJWT_API(JWT));
        dispatch(setUserInfos(jwt_decode(JWT)));
        return JWT;
      })
      .catch((err) => {
        console.log(err);
        setWaiting(false);
        setError(err.response.data.message);
      })
      .then((JWT) => {
        //console.log("JWT", JWT);
        if (!JWT) {
          setError("An unknown error occured");
          setWaiting(false);
          return;
        }
        axios
          .post(
            `${API_URL}/api/mercureLogin`,
            {},
            {
              headers: {
                Authorization: `Bearer ${JWT}`,
              },
            }
          )
          .then((res) => {
            //console.log(res);
            dispatch(setJWT_Mercure(res.data.mercurePersonalJWT));
            appHelpers.deleteMercureCookie();
            appHelpers.createMercureCookie(res.data.mercurePersonalJWT);
            let decodedJWT = jwt_decode(res.data.mercurePersonalJWT);
            dispatch(setMercureListener(decodedJWT.mercure.subscribe[0]));

            setWaiting(false);
            navigation.navigate("Logged");
          })
          .catch((err) => {
            console.log(err);
            setWaiting(false);
            setError(err.response.data.message);
          });
      });
  };

  return (
    <StyledLogin>
      <View style={{ width: "70%" }}>
        <StylizedLabel>Email</StylizedLabel>
        <StylizedTextInput
          autoFocus={false}
          onChangeText={setEmail}
          value={email}
        />
      </View>
      <View style={{ width: "70%" }}>
        <StylizedLabel>Password</StylizedLabel>
        <StylizedTextInput
          secureTextEntry={true}
          autoFocus={false}
          onChangeText={setPassword}
          value={password}
        />
      </View>
      {error && <Text style={{ color: "red" }}>{error}</Text>}
      <StyledButton
        onPress={() => {
          handleSubmit();
        }}
      >
        {waiting ? (
          <ActivityIndicator color={"#5ea7d4"} />
        ) : (
          <Text
            style={{
              color: "#FFF",
              textAlign: "center",
              fontFamily: "AgeoSemiBold",
              fontSize: 20,
            }}
          >
            Login
          </Text>
        )}
      </StyledButton>
      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text
          style={{
            color: "#FFF",
            textAlign: "center",
            fontFamily: "AgeoLightItalic",
            marginTop: 20,
          }}
        >
          You don't have an account? Sign up.
        </Text>
      </TouchableOpacity>
    </StyledLogin>
  );
};
