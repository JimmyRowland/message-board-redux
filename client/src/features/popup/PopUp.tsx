import React, {ChangeEvent, useState} from 'react';
import styles from './PopUp.module.css';

export function PopUp({messages,index, id, handleClose, handleUpdate}:{messages:string,index:number, id: string, handleClose: ()=>void, handleUpdate:(message:string,_id:string)=>void}) {
    const [input, setInput] = useState(messages);
    const handleOnChange = (e:ChangeEvent<HTMLInputElement>)=>{setInput(e.target.value)}
    return (
        <div className={styles.modelContainer} >
          <div className={styles.popup} >
              <h1>id: {id}</h1>
              <h4>{messages}</h4>
              <input onChange={handleOnChange} placeholder={messages}/>
              <button onClick={()=>{handleClose()}}>close</button>
              <button onClick={()=>{handleUpdate(input,id)}}>update</button>
          </div>
        </div>

  );
}
