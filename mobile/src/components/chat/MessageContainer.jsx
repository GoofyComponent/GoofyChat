import styled from "styled-components";
import { Message } from "./Message";
import { FlatList } from "react-native";

const StyledView = styled.View`
  width: 100%;
  height: 85%;
  padding-left: 10px;
  padding-right: 10px;
  margin-bottom: 10px;
`;

export const MessageContainer = ({ convMessage }) => {
  console.log("conv lmessage", convMessage);

  const inverted = [...convMessage].reverse();

  return (
    <StyledView>
      <FlatList
        data={inverted}
        keyExtractor={(item) =>
          `${item.author}-${item.content}-${item.created_at}`
        }
        renderItem={(item) => <Message convMessage={item} />}
        /* initialScrollIndex={convMessage.length - 1} */
        inverted={-1}
        extraData={convMessage}
        /* contentContainerStyle={{ flexDirection: "column-reverse" }} */
      />
    </StyledView>
  );
};
