import { Button, Text, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { resetSelectedContact } from "../../helpers/redux/slices/UserSlice";

const StyledEmptyList = styled.View`
  background-color: #3b4d54;
  height: 100%;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  flex: 1;
`;

const StyledText = styled.Text`
  color: #aed3ea;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
`;

export const EmptyList = ({ navigation }) => {
  const dispatch = useDispatch();
  return (
    <StyledEmptyList>
      <View>
        <StyledText /* className="text-4xl text-primary" */>
          It's a bit empty around here...
        </StyledText>
        <TouchableOpacity
          onPress={() => {
            dispatch(resetSelectedContact());
            navigation.navigate("ConversationCreate");
          }}
        >
          <Text
            style={{
              color: "#5EA7D4",
              textAlign: "center",
              fontSize: 20,
              fontFamily: "AgeoBold",
              textDecorationStyle: "solid",
              padding: 5,
              margin: 5,
              borderRadius: 5,
              backgroundColor: "#192124",
            }}
          >
            Create a new chat!
          </Text>
        </TouchableOpacity>
      </View>
    </StyledEmptyList>
  );
};
