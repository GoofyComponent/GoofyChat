import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  currConvData: false,
  currConvMsgs: false,
  allConv: [],
  triggerPosition: 0,
  triggerRefreshConv: 0,
};

export const MessagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    setCurrConvData: (state, action) => {
      state.currConvData = action.payload;
    },
    setCurrConvMsgs: (state, action) => {
      state.currConvMsgs = action.payload;
    },
    updateCurrConvMsgs: (state, action) => {
      state.currConvMsgs = [...state.currConvMsgs, action.payload];
    },
    setAllConv: (state, action) => {
      //console.log("setAllConv params", action.payload);
      let cleanConv = [];

      action.payload.forEach((conv) => {
        let convData = {
          id: conv.id,
          name: conv.name,
          lastMessage: [
            conv.lastMessage.content,
            conv.lastMessage.date,
            conv.lastMessage.author,
          ],
          members: conv.members,
          unreadMessages: 0,
        };
        cleanConv.push(convData);
      });

      state.allConv = cleanConv;

      //console.log("setAllConv apres traitement", state.allConv);
    },
    updateConvMessage: (state, action) => {
      //Get the data from the action
      let convId = parseInt(action.payload.id);
      let message = action.payload.content;
      let date = action.payload.created_at;
      let author = action.payload.author;

      //Get the current state
      /* let currState = current(state); */
      let currState = state.allConv;

      //console.log("updateConvMessage currState", currState);

      //Get the index of the conversation in the state
      let convIndex = currState.findIndex((conv) => conv.id === convId);

      //console.log("updateConvMessage convIndex", convIndex);

      //Extract the conversation from the state
      let conv = currState[convIndex];

      //Update the conversation
      conv.lastMessage = [message, date, author];
      conv.unreadMessages = conv.unreadMessages + 1;

      //Update the state by putting the conversation back in the beginning of the array
      let newState = currState;
      newState.splice(convIndex, 1);
      newState.unshift(conv);
    },
    triggerPosition: (state) => {
      state.triggerPosition = state.triggerPosition + 1;
    },
    resetTriggerPosition: (state) => {
      state.triggerPosition = 0;
    },
    resetMessages: (state) => {
      state.currConvData = false;
      state.currConvMsgs = false;
      state.allConv = [];
      state.triggerPosition = 0;
    },
    resetCurrConv: (state) => {
      state.currConvData = false;
      state.currConvMsgs = false;
    },
    setTriggerRefreshConv: (state) => {
      state.triggerRefreshConv = state.triggerRefreshConv + 1;
    },
    eraseMessagesSlice: (state) => {
      state.currConvData = false;
      state.currConvMsgs = false;
      state.allConv = [];
      state.triggerPosition = 0;
      state.triggerRefreshConv = 0;
    },
  },
});

export const {
  setCurrConvData,
  setCurrConvMsgs,
  setAllConv,
  updateConvMessage,
  updateCurrConvMsgs,
  triggerPosition,
  resetTriggerPosition,
  resetMessages,
  resetCurrConv,
  setTriggerRefreshConv,
  eraseMessagesSlice,
} = MessagesSlice.actions;

export default MessagesSlice.reducer;
