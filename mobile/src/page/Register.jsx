import {
  SafeAreaView,
  Text,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import { useState } from "react";
import axios from "axios";
import { getStatusBarHeight } from "react-native-status-bar-height";
import styled from "styled-components";
import { API_URL } from "@env";

const StyledLogin = styled.SafeAreaView`
  flex: 1;
  height: 100%;
  align-items: center;
  justify-content: center;
  margin-top: ${Math.ceil(getStatusBarHeight())}px;
`;

const StylizedLabel = styled.Text`
  font-size: 20px;
  font-weight: bold;
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

export const Register = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");

  const [errors, setErrors] = useState(null);
  const [waiting, setWaiting] = useState(false);

  const handleSubmit = () => {
    setWaiting(true);
    setErrors(null);

    const config = {};

    axios
      .post(
        `${API_URL}/api/register`,
        {
          username: username,
          password: password,
          email: email,
          firstname: firstname,
          lastname: lastname,
        },
        config
      )
      .then((res) => {
        //console.log(res);
        setWaiting(false);
        navigation.navigate("Login");
      })
      .catch((err) => {
        setErrors(err.response.data.message);
        setWaiting(false);
        console.log(err);
      });
  };

  return (
    <ScrollView style={{ flex: 1, marginTop: 60 }}>
      <StyledLogin>
        <View style={{ width: "70%" }}>
          <StylizedLabel>Email</StylizedLabel>
          <StylizedTextInput autoFocus={false} onChangeText={setEmail} />
        </View>
        <View style={{ width: "70%" }}>
          <StylizedLabel>Password</StylizedLabel>
          <StylizedTextInput
            autoFocus={false}
            secureTextEntry={true}
            onChangeText={setPassword}
          />
        </View>
        <View style={{ width: "70%" }}>
          <StylizedLabel>Username</StylizedLabel>
          <StylizedTextInput autoFocus={false} onChangeText={setUsername} />
        </View>
        <View style={{ width: "70%" }}>
          <StylizedLabel>Lastname</StylizedLabel>
          <StylizedTextInput autoFocus={false} onChangeText={setLastname} />
        </View>
        <View style={{ width: "70%" }}>
          <StylizedLabel>Firstname</StylizedLabel>
          <StylizedTextInput autoFocus={false} onChangeText={setFirstname} />
        </View>
        {errors && <Text style={{ color: "red" }}>{errors}</Text>}
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
              Register
            </Text>
          )}
        </StyledButton>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text
            style={{
              color: "#FFF",
              textAlign: "center",
              fontFamily: "AgeoLightItalic",
              marginTop: 20,
              marginBottom: 40,
            }}
          >
            You already have an account? Login.
          </Text>
        </TouchableOpacity>
      </StyledLogin>
    </ScrollView>
  );
};
