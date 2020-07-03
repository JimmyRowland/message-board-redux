import React, {ChangeEvent, useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  addMessage,
  clearMessages,
    shuffle,
    deleteMessage,
  selectMessages,
    fetchMessages,
  postNewMessage,
    deleteMessageAsync,
  modifyMessageAsync,
    deleteAllMessageAsync,
} from './messageBoardSlice';
import styles from './MessageBoard.module.css';
import {PopUp} from "../popup/PopUp";
import {useTrail, animated, interpolate} from "react-spring";


export function MessageBoard() {

  const messages = useSelector(selectMessages);
  const dispatch = useDispatch();
  const [input, setInput] = useState('');
  const [popupMessage, setPopupmessage] = useState({index:-1,message:"", _id:""})
  const handleClose = ()=>{setPopupmessage({index:-1,message:"", _id:""})}
  const handleOnload =()=>{dispatch(fetchMessages())};
  const handleAddMessage =(message:string)=>{dispatch(postNewMessage(message));setInput("")}
  const handleDeleteMessage =(_id: string)=>{
    dispatch(deleteMessageAsync(_id))
  }
  const handleUpdateMessage =(message:string,_id:string)=>{
    dispatch(modifyMessageAsync(message,_id));
    handleClose();
  }
  useEffect(()=>{handleOnload()},[])


  const [toggle, set] = useState(true)
  const trail = useTrail(messages.length, {
    opacity: toggle ? 1 : 0,
    x: toggle ? 0 : 20,
    from: { opacity: 0, x: 20 },
  })

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
              return <div key={index} className={styles.mbMsg}><span onClick={()=>{setPopupmessage({index: index, message: message.message, _id:message._id}); console.log(messages); }}>{message.message} {message.date.getDate()}</span>
                <button onClick ={()=>{handleDeleteMessage(message._id)}}>delete</button></div>
            })}
            {trail.map(({x,...rest},index)=>{
              return <animated.div style={{ ...rest, transform: interpolate([x],x => `translate3d(0,${x}px,0)`) }} key={index} className={styles.mbMsg}><span onClick={()=>{setPopupmessage({index: index, message: messages[index].message, _id:messages[index]._id}); console.log(messages); }}>{messages[index].message} {messages[index].date.getDate()}</span>
                <button onClick ={()=>{handleDeleteMessage(messages[index]._id)}}>delete</button></animated.div>
            })}
          </div>
          <div className={styles.mbForm}>
            <textarea className={styles.msgInputTextarea} cols={50} rows={6} id="textInput" value={input} onChange={(e:ChangeEvent<HTMLTextAreaElement>)=>{setInput(e.target.value)}}/>
            <button className={styles.msgSubmitBtn} onClick={()=>{handleAddMessage(input)}}>Post</button>
            <button className={styles.msgSubmitBtn} onClick={()=>{dispatch(deleteAllMessageAsync())}}>Clear</button>
            <button className={styles.msgSubmitBtn} onClick={()=>{setInput("")}}>Clear From</button>
            <button className={styles.msgSubmitBtn} onClick={()=>{set((state)=>!state)}}>Hide Messages</button>
          </div>
        </div>
        {popupMessage.index!==-1? <PopUp messages={popupMessage.message}  handleClose={handleClose} handleUpdate={handleUpdateMessage} index={popupMessage.index} id={popupMessage._id}/>:null}
      </div>
  );
}
