import React, {useState} from 'react';

import styles from './TopMenu.module.css';

export function TopMenu() {
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
