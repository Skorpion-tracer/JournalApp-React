import SelectUser from '../SelectUser/SelectUser.jsx';
import Logo from '../Logo/Logo.jsx';

const logos = ['/logo.svg', '/vite.svg'];

function Header() {
    return (
        <>
            <Logo image={logos[0]}/>
            <SelectUser/>
        </>
    );
}

export default Header;