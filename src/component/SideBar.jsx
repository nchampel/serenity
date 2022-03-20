import { Link } from 'react-router-dom'
import '../SideBar.css';


// const StyledLink = styled(Link)`
//     text-decoration: none;

//     &:focus, &:hover, &:visited, &:link, &:active {
//         text-decoration: none;
//     }
// `;

function SideBar() {
    // let {isOnEarth, isOnMoon} = props;

    // console.log(isOnEarth);
    // const handleDisplayEarth = () => {
    //     isOnEarth = true;
    //     isOnMoon = false;
    // };
    // const handleDisplayMoon = () => {
    //     isOnEarth = false;
    //     isOnMoon = true;
    // };
    return (
        <nav>
            {/* <Link className="link" to="/">Accueil</Link> */}
            <Link className="link" to="/terre" /*onClick={handleDisplayEarth}*/>Terre</Link>
            <Link className="link" to="/lune" /*onClick={handleDisplayMoon}*/>Lune</Link>
            
        </nav>
    );
}
export default SideBar