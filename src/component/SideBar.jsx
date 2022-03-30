import { useCallback, useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom'
import { apiRef } from '../api/apiRef';
import '../SideBar.css';
import useMounted from 'react-use-mounted';

// const StyledLink = styled(Link)`
//     text-decoration: none;

//     &:focus, &:hover, &:visited, &:link, &:active {
//         text-decoration: none;
//     }
// `;

function SideBar(props) {
    const { path, place, energy, setEnergy } = props;
    const navigate = useNavigate();
    const mounted = useMounted();
    const [energyTravel, setEnergyTravel] = useState([]);
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

    const getEnergyTravel = useCallback(async (travel) => {
        try {

            // const data = await apiRef.getData(process.env.REACT_APP_URL + 'resources/energy');
            const data = await apiRef.getEnergyTravel(process.env.REACT_APP_URL + 'App/Calls/getEnergyTravel.php', travel);

            if (mounted.current) {
                setEnergyTravel(parseInt(data.data.transport_energy, 10));
            }
            
        } catch (err) {
            console.error(err);
        }
            
    }, [mounted]);

          const saveEnergyAfterTravel = useCallback(async (travel) => {
        try {
            // console.log(travel);
            // const data = await apiRef.getData(process.env.REACT_APP_URL + 'resources/energy');
            await apiRef.saveEnergyAfterTravel(process.env.REACT_APP_URL + 'App/Calls/saveEnergyAfterTravel.php', travel);
            // const dataEnergyCapacity = await apiRef.getEquipment(process.env.REACT_APP_URL + 'App/Calls/getEquipment.php', dataLevels.energy_capacity_level, 'energy_capacity');
                // console.log(travel);
        } catch (err) {
            console.error(err);
        }
            
    }, []);

    // navigate("/terre", { replace: true });

    const substractEnergyTravel = (departure, arrival) => {
        const travel = departure + '-' + arrival;
    //   console.log(travel);
        getEnergyTravel(travel);
        // console.log(energyTravel);
        if (energy >= energyTravel) {
            const energyUpdated = energy - energyTravel;
            setEnergy(energyUpdated);
            const linkArrival = "/" + arrival;
            saveEnergyAfterTravel(travel);
            navigate(linkArrival, { replace: true });
        } else {
            const linkDeparture = "/" + departure;
            toast('Pas assez d\'énergie pour aller sur ' + arrival, {duration: 10000});
            navigate(linkDeparture, { replace: true });
        }
        
    };
    return (
        <nav>
            {/* <Link className="link" to="/">Accueil</Link> */}
            {path !== '/terre' && (
            <div className="link" 
            onClick={() => substractEnergyTravel(place, 'terre')}/*onClick={handleDisplayEarth}*/>Terre</div>
            )}
            {path !== '/mars' && (
            <div className="link"
            onClick={() => substractEnergyTravel(place, 'mars')}/*onClick={handleDisplayMoon}*/>Mars</div>
            )}
        </nav>
    );
}
export default SideBar