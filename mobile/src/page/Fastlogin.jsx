import styled from "styled-components";
import axios from "axios";
import jwt_decode from "jwt-decode";
import React, { useState, useEffect } from "react";
import { Text, View, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { useDispatch, useSelector } from "react-redux";
import { appHelpers } from "../helpers/appHelpers";
import { setMercureListener } from "../helpers/redux/slices/UserSlice";
import { API_URL } from "@env";

import {
  setJWT_API,
  setJWT_Mercure,
  setUserInfos,
} from "../helpers/redux/slices/UserSlice";

const StyledContainer = styled.View`
  height: 100%;
  margin-top: ${Math.ceil(getStatusBarHeight())}px;
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
  margin-left: auto;
  margin-right: auto;
`;

export const Fastlogin = ({ navigation }) => {
  const dispatch = useDispatch();
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(null);
  const [error, setError] = useState(null);
  const [waiting, setWaiting] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setWaiting(true);
    dispatch(setJWT_API(data));
    dispatch(setUserInfos(jwt_decode(data)));

    if (!data) {
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
            Authorization: `Bearer ${data}`,
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
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <StyledContainer>
      <Text
        style={{
          fontSize: 20,
          textAlign: "center",
          fontFamily: "AgeoExtraBold",
          marginTop: 10,
          color: "#5ea7d4",
        }}
      >
        Scan FASTLOGIN QR Code
      </Text>
      {waiting && (
        <Text
          style={{
            fontSize: 20,
            textAlign: "center",
            fontFamily: "AgeoExtraBold",
            marginTop: 10,
            color: "#5ea7d4",
            absolute: "true",
            top: "50%",
            left: "50%",
            zIndex: 100,
            backgroundColor: "black",
          }}
        >
          Waiting for loading...
        </Text>
      )}
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={{
          height: "75%",
          width: "80%",
          borderRadius: 10,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      />
      <Text
        style={{
          fontSize: 20,
          textAlign: "center",
          fontFamily: "AgeoExtraBold",
          color: "red",
        }}
      >
        {error}
      </Text>
      <StyledButton onPress={() => navigation.navigate("Login")}>
        <Text
          style={{
            fontSize: 20,
            textAlign: "center",
            fontFamily: "AgeoExtraBold",

            color: "#5ea7d4",
          }}
        >
          Tap to back to login
        </Text>
      </StyledButton>
    </StyledContainer>
  );
};
