import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import styles from './FlaggyFlag.module.css';

export function FlaggyFlag() {
    const [input, setInput] = useState('');

    return (
        <div className={styles.background}>
            <div className={styles.black}/>
            <div className={styles.white}/>
            <div className={styles.grey}/>
        </div>
    );
}
