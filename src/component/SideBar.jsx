import { Link } from 'react-router-dom'

function SideBar() {
    return (
        <nav>
            <Link to="/">Accueil</Link>
            <Link to="/lune">Lune</Link>
            <Link to="/terre">Terre</Link>
        </nav>
    );
}
export default SideBar