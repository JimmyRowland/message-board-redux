import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AppThunk, RootState} from '../../app/store';
import {act} from "react-dom/test-utils";

interface MessagesState {
    value: Array<Message>;
}

interface Message {
    message: string;
    date: Date;
}


const initialState: MessagesState = {
    value: [
        {message: "The most beautiful msg board I have ever seen", date: new Date()},
        {
            message: "Flaggy flag forever",
            date: new Date()
        },
        {message: "One true flag", date: new Date()},
        {message: "Flaggy flag", date: new Date()}
    ]
};

export const messageBoardSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        addMessage: (state, action: PayloadAction<string>) => {
            let value = state.value.slice();
            value.push({message:action.payload,date: new Date()})
            return {value: value}
        },
        deleteMessage: (state, action: PayloadAction<number>) => {

            // let value = state.value.slice();
            // value.splice(action.payload,1);
            state.value.splice(action.payload, 1)
            // return {value:value};
        },
        clearMessages: state => {
            state.value = [];
        },
        shuffle: state => {
            console.log("shuffle");
            state.value.sort(() => Math.random() - 0.5);
        }
    },
});

export const {addMessage, clearMessages, shuffle, deleteMessage} = messageBoardSlice.actions;


export const selectMessages = (state: RootState) => state.messages.value;

export default messageBoardSlice.reducer;
