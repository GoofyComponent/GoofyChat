import { View, Text, Button } from "react-native";

export const AppWaiting = ({ navigation }) => {
  return (
    <View /* className="bg-[#3B4D54] h-full" */>
      {/* <RiChat3Fill
        size={200}
        color={"#5EA7D4"}
        className="mx-auto w-3/12 mb-0 mt-auto"
      />  */}
      <View /* className="text-2xl font-bold mt-0 mb-auto text-center text-secondary" */
      >
        <Text /* className="text-4xl text-primary" */>
          It's a bit empty around here...
        </Text>
        <Text>Open a conversation on the left side!</Text>
        <Text>or</Text>
        <Button
          title="Create a new one!"
          onPress={() => navigation.navigate("Home")}
          /* className="transition-all my-4 border-b-2 border-secondary hover:cursor-pointer hover:text-primary hover:border-primary" */
        ></Button>
      </View>
    </View>
  );
};
