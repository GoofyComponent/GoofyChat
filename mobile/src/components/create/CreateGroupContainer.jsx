import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ContactPage } from "./contacts/ContactPage";
import { CreateGroupInfos } from "./CreateGroupInfos";

const CreateGroupNav = createNativeStackNavigator();

export const CreateGroupContainer = () => {
  return (
    <CreateGroupNav.Navigator
      initialRouteName="ConversationInfos"
      screenOptions={{ headerShown: false, animation: "slide_from_right" }}
    >
      <CreateGroupNav.Screen name="Contacts" component={ContactPage} />
      <CreateGroupNav.Screen
        name="ConversationInfos"
        component={CreateGroupInfos}
      />
    </CreateGroupNav.Navigator>
  );
};
