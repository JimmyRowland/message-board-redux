import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addMessage,
  clearMessages,
    shuffle,
    deleteMessage,
  selectMessages,
} from './messageBoardSlice';
import styles from './MessageBoard.module.css';
import {PopUp} from "../popup/PopUp";


export function MessageBoard() {

  const messages = useSelector(selectMessages);
  const dispatch = useDispatch();
  const [input, setInput] = useState('');
  const [popupMessage, setPopupmessage] = useState({index:-1,message:""})
  const handleClose = ()=>{setPopupmessage({index:-1,message:""})}

  return (
      <div className={styles.container}>
        <div className={styles.messageBoard}>
          <div className={styles.mbHeader}>
            <h1 className={styles.mbH1}>
              @ VerY FunCt1on@l m3ss@ge b0ard tHat d0e$ not sto3 y03 me$$Age
            </h1>
          </div>
          <div className={styles.mbMsgContainer} id="mb-msg-container">
            {messages.map((message,index)=>{
              return <div key={index} className={styles.mbMsg}><span onClick={()=>{setPopupmessage({index: index, message: message.message}); console.log(messages); }}>{message.message} {message.date.getDate()}</span>
                <button onClick ={()=>{dispatch(deleteMessage(index))}}>delete</button></div>
            })}
          </div>
          <div className={styles.mbForm}>
            <textarea className={styles.msgInputTextarea} cols={50} rows={6} id="textInput" value={input} onChange={(e)=>{setInput(e.target.value)}}/>
            <button className={styles.msgSubmitBtn} onClick={()=>{dispatch(addMessage(input));setInput("")}}>Post</button>
            <button className={styles.msgSubmitBtn} onClick={()=>{dispatch(clearMessages())}}>Clear</button>
            <button className={styles.msgSubmitBtn} onClick={()=>{setInput("")}}>Clear From</button>
          </div>
        </div>
        {popupMessage.index!==-1? <PopUp messages={popupMessage.message}  handleClose={handleClose} index={popupMessage.index}/>:null}
      </div>
  );
}
