import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';
import {act} from "react-dom/test-utils";

interface MessagesState {
  value: string[];
}



const initialState: MessagesState = {
  value: ["The most beautiful msg board I have ever seen","Flaggy flag forever","One true flag","Flaggy flag"]
};

export const messageBoardSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<string>) => {
      state.value.push(action.payload);
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

export const { addMessage, clearMessages, shuffle} = messageBoardSlice.actions;


export const selectMessages = (state: RootState) => state.messages.value;

export default messageBoardSlice.reducer;
