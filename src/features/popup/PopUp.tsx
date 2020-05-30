import React, { useState } from 'react';
import styles from './PopUp.module.css';

export function PopUp({messages, index, handleClose}:{messages:string, index: number, handleClose: ()=>void}) {
  return (
        <div className={styles.modelContainer}>
          <div className={styles.popup} onClick={()=>{handleClose()}}>
              <h1>index: {index}</h1>
              <h4>{messages}</h4>
          </div>
        </div>

  );
}
