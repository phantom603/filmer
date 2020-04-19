import React from 'react';
import styles from './Header.module.scss';

function Header() {
    return (
        <div className={styles.container}>
            <span className={styles.logo}>Filmer</span>
        </div>
    )
}

export default Header;
