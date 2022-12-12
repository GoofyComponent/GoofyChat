import React from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View, Button } from "react-native";
import { useFonts } from "expo-font";

import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Provider, useSelector, useDispatch } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import store from "./src/helpers/redux/store";
import { triggerPosition } from "./src/helpers/redux/slices/MessagesSlice";
import { ContactChatWaiting } from "./src/components/base/AppWaiting";
import { Logged } from "./src/page/Logged";
import { Welcome } from "./src/page/Welcome";
import { Login } from "./src/page/Login";
import { Register } from "./src/page/Register";
import { Fastlogin } from "./src/page/Fastlogin";

const Stack = createNativeStackNavigator();

let persistor = persistStore(store);

export default function App() {
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: "#192124",
    },
    fontFamily: "AgeoRegular",
  };

  const [loaded] = useFonts({
    AgeoBold: require("./src/assets/fonts/Ageo-Bold.ttf"), // BOLD
    AgeoBoldItalic: require("./src/assets/fonts/Ageo-BoldItalic.ttf"), // BOLD Italic
    AgeoExtraBold: require("./src/assets/fonts/Ageo-ExtraBold.ttf"), // BOLD
    AgeoExtraBoldItalic: require("./src/assets/fonts/Ageo-ExtraBoldItalic.ttf"), //BOLD Italic
    AgeoHeavy: require("./src/assets/fonts/Ageo-Heavy.ttf"), // 900
    AgeoHeavyItalic: require("./src/assets/fonts/Ageo-HeavyItalic.ttf"), // 900 Italic
    AgeoLight: require("./src/assets/fonts/Ageo-Light.ttf"), // 300
    AgeoLightItalic: require("./src/assets/fonts/Ageo-LightItalic.ttf"), // 300 Italic
    AgeoMedium: require("./src/assets/fonts/Ageo-Medium.ttf"), // 500
    AgeoMediumItalic: require("./src/assets/fonts/Ageo-MediumItalic.ttf"), // 500 Italic
    AgeoRegular: require("./src/assets/fonts/Ageo-Regular.ttf"), //Normal
    AgeoRegularItalic: require("./src/assets/fonts/Ageo-RegularItalic.ttf"), // Normal Italic
    AgeoSemiBold: require("./src/assets/fonts/Ageo-SemiBold.ttf"), // 600
    AgeoSemiBoldItalic: require("./src/assets/fonts/Ageo-SemiBoldItalic.ttf"), // 600 Italic
    AgeoThin: require("./src/assets/fonts/Ageo-Thin.ttf"), // 100
    AgeoThinItalic: require("./src/assets/fonts/Ageo-ThinItalic.ttf"), // 100 Italic
  });

  if (!loaded) return null;

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer
          theme={theme}
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
              name="Home"
              component={Welcome}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="FastLogin"
              component={Fastlogin}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Logged"
              component={Logged}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Register"
              component={Register}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
