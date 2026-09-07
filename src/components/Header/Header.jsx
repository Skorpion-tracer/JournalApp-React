import styles from './Header.module.css';
import SelectUser from '../SelectUser/SelectUser.jsx';
import Button from '../Button/Button.jsx';
import {useCallback, useState} from 'react';
import Logo from '../Logo/Logo.jsx';

const logos = ['/logo.svg', '/vite.svg'];

function Header() {
    const [logoIndex, setLogoIndex] = useState(0);

    const toggleLogo = () => {
        setLogoIndex(state => Number(!state));
    };

    console.log("Header");

    return (
        <>
            <Logo image={logos[logoIndex]} />
            <SelectUser/>
            <Button onClick={toggleLogo}>Сменить Лого</Button>
        </>
    );
}

export default Header;