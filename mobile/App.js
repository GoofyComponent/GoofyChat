import React from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View, Button } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Provider, useSelector, useDispatch } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import store from "./src/helpers/redux/store";
import { triggerPosition } from "./src/helpers/redux/slices/MessagesSlice";
import { ContactChatWaiting } from "./src/components/base/AppWaiting";
import { Logged } from "./src/page/Logged";

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate("Details")}
      />
    </View>
  );
}

function DetailsScreen({ navigation }) {
  const dispatch = useDispatch();
  const click = useSelector((state) => state.messages.triggerPosition);
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Details Screen</Text>
      <Text>Click: {click && click}</Text>
      <Button title="Go to Home" onPress={() => dispatch(triggerPosition())} />
      <Button title="Go to Home" onPress={() => navigation.navigate("Home")} />
    </View>
  );
}

const Stack = createNativeStackNavigator();

let persistor = persistStore(store);

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          {/* <View className="flex-1 items-center justify-center bg-red-100">
        <Text>Open up App.js to start working on your app!</Text>
        <StatusBar style="auto" />
      </View> */}
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
              name="Home"
              component={Logged}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="Details" component={DetailsScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
