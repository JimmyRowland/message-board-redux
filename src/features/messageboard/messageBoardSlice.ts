import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';
import {act} from "react-dom/test-utils";

interface MessagesState {
  value: Array<string>;
}



const initialState: MessagesState = {
  value: ["The most beautiful msg board I have ever seen","Flaggy flag forever","One true flag","Flaggy flag"]
};

export const messageBoardSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<string>) => {
      let value = state.value.slice();
      value.push(action.payload)
      return {value:value}
    },
      deleteMessage: (state, action: PayloadAction<number>) => {

      // let value = state.value.slice();
        // value.splice(action.payload,1);
        state.value.splice(action.payload,1)
        // return {value:value};
      },
    clearMessages: state => {
      state.value = [];
    },
    shuffle: state =>{
      console.log("shuffle");
      state.value.sort(()=>Math.random()-0.5);
    }
  },
});

export const { addMessage, clearMessages, shuffle, deleteMessage} = messageBoardSlice.actions;


export const selectMessages = (state: RootState) => state.messages.value;

export default messageBoardSlice.reducer;
