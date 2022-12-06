import { View, Text, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { persistStore } from "redux-persist";

import { eraseMessagesSlice } from "../../helpers/redux/slices/MessagesSlice";
import { eraseAllUser } from "../../helpers/redux/slices/UserSlice";
import { appHelpers } from "../../helpers/appHelpers";

import GCLogo from "../../assets/img/goofychat.png";
import store from "../../helpers/redux/store";
import styled from "styled-components";

const Name = (username) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className="flex items-center">
      <p className="text-secondary text-xl font-bold mx-2">
        Hello, {username} !
      </p>
      <button
        className="w-20 h-10 p-auto mx-2 rounded-2xl text-center bg-secondary text-tertiary font-bold hover:bg-primary hover:text-primary transition-all border-2 border-transparent hover:border-primary"
        onClick={(e) => {
          e.preventDefault();
          appHelpers.deleteMercureCookie();
          dispatch(eraseAllUser());
          dispatch(eraseMessagesSlice());
          persistStore(store).purge();
          /* navigate("/"); */
          location.reload();
        }}
      >
        logout
      </button>
    </div>
  );
};

const Test = styled.View`
  background-color: red;
  width: 100%;
  height: 100%;
`;

export const Header = () => {
  const username = useSelector((state) => state.user.username);

  return (
    <Test className="bg-primary w-full flex justify-start">
      <View className="flex items-center">
        <Image
          source={GCLogo}
          alt="logo"
          className="object-contain h-10 mx-2"
        />
        <View className="text-4xl font-bold mx-2">
          <Text className="text-primary">Goofy</Text>
          <Text className="text-secondary">Chat</Text>
        </View>
      </View>
      {username && Name(username)}
    </Test>
  );
};
