'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import styles from '../styles/Header.module.css';

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <Link href="/" passHref>
                    <h1>Video Tube</h1>
                </Link>
            </div>
            <div className={styles.hamburger} onClick={toggleMenu}>
                <div className={styles.bar}></div>
                <div className={styles.bar}></div>
                <div className={styles.bar}></div>
            </div>
            <nav className={`${styles.nav} ${menuOpen ? styles.open : ''}`}>
                <ul>
                    <li><Link href="/" passHref><span className={styles.navLink}>Home</span></Link></li>
                    <li><Link href="/about" passHref><span className={styles.navLink}>About</span></Link></li>
                    <li><Link href="/contact" passHref><span className={styles.navLink}>Contact</span></Link></li>
                </ul>
            </nav>
            <div className={styles.searchContainer}>
                <input className={styles.searchBar} type="text" placeholder="Search..." />
            </div>
        </header>
    );
};

export default Header;
