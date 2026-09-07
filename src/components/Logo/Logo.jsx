import styles from './Logo.module.css';
import {memo} from 'react';

function logo({image}) {
    console.log("Logo");
    return <img className={styles.logo} src={image} alt="Логотип журнала"/>
}

export default memo(logo);