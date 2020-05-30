import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import styles from './Navbar.module.css';

export function Navbar() {
    const [input, setInput] = useState('');

    return (
        <nav>
            <div className={styles.navbar}>
                <div className={styles.navLeft}>
                    <div>Home</div>
                </div>
                <div className={styles.navbarRight}>
                    <div className={styles.navButton}>About</div>
                    <div className={styles.navButton}>Project</div>
                    <div className={styles.navButton}
                         onClick={() => {
                             window.location.href = 'https://jimmyrowland.github.io/Portfolio/build/'}}>Portfolio
                    </div>
                </div>
            </div>
        </nav>
    );
}
