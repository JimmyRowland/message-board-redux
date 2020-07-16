import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AppThunk, RootState} from '../../app/store';
import {act} from "react-dom/test-utils";
import {incrementByAmount} from "../counter/counterSlice";

interface MessagesState {
    value: Array<Message>;
}

interface Message {
    message: string;
    date: Date;
    _id: string
}

const PORT = process.env.PORT || 8080

const initialState: MessagesState = {
    value: [
        // {message: "The most beautiful msg board I have ever seen", date: new Date()},
        // {
        //     message: "Flaggy flag forever",
        //     date: new Date()
        // },
        // {message: "One true flag", date: new Date()},
        // {message: "Flaggy flag", date: new Date()}
    ]
};

export const messageBoardSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        addMessage: (state, action: PayloadAction<{message: string, _id:string}>) => {
            let value = state.value.slice();
            value.push({message:action.payload.message,date: new Date(), _id: action.payload._id})
            return {value: value}
        },

        modifyMessage:(state,action: PayloadAction<{message: string, _id:string}>) =>{
            let value = state.value.slice();
            for (let message of value){
                if(message._id===action.payload._id){
                    message.message= action.payload.message;
                    // return {value};
                }
            }
            // return {value};
        },
        deleteMessage: (state, action: PayloadAction<string>) => {
            let value = state.value.slice();
            for(let i = 0; i<value.length; i++){
                if(value[i]._id===action.payload){
                    value.splice(i, 1)
                    return {value};
                }
            }
            return {value};
        },
        clearMessages: state => {
            state.value = [];
        },
        shuffle: state => {
            console.log("shuffle");
            state.value.sort(() => Math.random() - 0.5);
        },
        updateMessages: (state, action: PayloadAction<Array<Message>>)=>{
            return {value:action.payload}
        }
    },
});

export const addMessageAsync = (message: string): AppThunk => dispatch => {

};
export const fetchMessages = (): AppThunk => (dispatch,getState) => {
    let messages = getState().messages.value.slice();
    if (messages.length === 0) {
        const url = `http://localhost:${PORT}/api/message`;
        fetch(url)
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                messages = json.messages;
                // console.log(messages,json)
                return messages.map((value: any) => {
                    return {
                        _id: value._id,
                        message: value.message,
                        date: new Date(value.date)
                    };
                });
            })
            .then((resMessages: Array<Message>) => {
                // console.log(resPosts);
                // Temp limiting posts
                dispatch(updateMessages(resMessages));
                // for (let message of resMessages){
                //     dispatch(addMessage(message));
                // }
            });
    }
    return {value: messages};

};

export const postNewMessage = (message: string): AppThunk => (dispatch) => {
    console.log("!!postAsync");
    const url = `http://localhost:${PORT}/api/message/add`;
    fetch(url,{method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        mode: 'cors',
        body:JSON.stringify({message:message})})
        .then((response) => {
            return response.json();
        })
        .then((json) => {
            const resMessage = json.message;
            // console.log(messages,json)
            return dispatch(addMessage(resMessage))
        })
};

export const modifyMessageAsync = (message: string, _id: string): AppThunk => (dispatch) => {
    console.log("!!postAsync");
    const url = `http://localhost:${PORT}/api/message/modify`;
    fetch(url,{method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        mode: 'cors',
        body:JSON.stringify({message:message, _id:_id})})
        .then((response) => {
            return response.json();
        })
        .then((json) => {
            // console.log(messages,json)
            const resMessage = json.message.message;
            const resID = json.message._id;
            return dispatch(modifyMessage({message:resMessage, _id:resID}));
        })
};

export const deleteMessageAsync = (_id: string): AppThunk => (dispatch) => {
    console.log("!!postAsync");
    const url = `http://localhost:${PORT}/api/message/delete`;
    fetch(url,{method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        mode: 'cors',
        body:JSON.stringify({ _id:_id})})
        .then((response) => {
            return response.json();
        })
        .then((json) => {
            // console.log(messages,json)
            if(json.success){
                return dispatch(deleteMessage(_id));
            }
        })
};

export const deleteAllMessageAsync = (): AppThunk => (dispatch) => {
    console.log("!!postAsync");
    const url = `http://localhost:${PORT}/api/message/deleteall`;
    fetch(url,{method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        mode: 'cors',
        })
        .then((response) => {
            return response.json();
        })
        .then((json) => {
            // console.log(messages,json)
            if(json.success){
                return dispatch(clearMessages());
            }
        })
};

export const removeMessageAsync = (message: string): AppThunk => dispatch => {

};
export const removeAllMessageAsync = (message: string): AppThunk => dispatch => {

};
export const {addMessage, clearMessages, shuffle, deleteMessage, updateMessages, modifyMessage} = messageBoardSlice.actions;


export const selectMessages = (state: RootState) => state.messages.value;

export default messageBoardSlice.reducer;
