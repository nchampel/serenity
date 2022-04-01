import { useCallback, useEffect, useState } from 'react';
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
    const [energyTravel, setEnergyTravel] = useState(0);
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

          const getEnergy = useCallback(async () => {
        try {

            // const data = await apiRef.getData(process.env.REACT_APP_URL + 'resources/energy');
            const dataEnergy = await apiRef.getData(process.env.REACT_APP_URL + 'App/Calls/getEnergy.php');
            // const dataEnergyCapacity = await apiRef.getEquipment(process.env.REACT_APP_URL + 'App/Calls/getEquipment.php', dataLevels.energy_capacity_level, 'energy_capacity');
            // console.log(typeof dataLevels.energy_regeneration_level);
            
            setEnergy(parseInt(dataEnergy.energy, 10));
            
        } catch (err) {
            console.error(err);
        }
            
    }, []);

    const getEnergyTravel = useCallback(async (travel) => {
        try {

            // const data = await apiRef.getData(process.env.REACT_APP_URL + 'resources/energy');
            const data = await apiRef.getEnergyTravel(process.env.REACT_APP_URL + 'App/Calls/getEnergyTravel.php', travel);

            if (mounted.current) {
                // console.log(data.transport_energy);
                setEnergyTravel(parseInt(data.transport_energy, 10));
                return parseInt(data.transport_energy, 10);
            }
            
        } catch (err) {
            console.error(err);
        }
            
    }, [mounted]);

          const saveEnergyAfterTravel = useCallback(async (travel) => {
        try {
            console.log(travel);
            // const data = await apiRef.getData(process.env.REACT_APP_URL + 'resources/energy');
            await apiRef.saveEnergyAfterTravel(process.env.REACT_APP_URL + 'App/Calls/saveEnergyAfterTravel.php', travel);
            // const dataEnergyCapacity = await apiRef.getEquipment(process.env.REACT_APP_URL + 'App/Calls/getEquipment.php', dataLevels.energy_capacity_level, 'energy_capacity');
                // console.log(travel);
        } catch (err) {
            console.error(err);
        }
            
    }, []);

    // useEffect(() => {
    //     getEnergy();
    // }, [energy]);

    // navigate("/terre", { replace: true });

    const substractEnergyTravel = (departure, arrival) => {
        const travel = departure + '-' + arrival;
        getEnergyTravel(travel).then(energyTravelResponse => { 
            // console.log(energyTravelResponse);
            if (energy >= energyTravelResponse) {
                const energyUpdated = energy - energyTravel;
                // setEnergy(energyUpdated);
                // console.log(energy);
                
                const linkArrival = "/" + arrival;
                saveEnergyAfterTravel(travel);
                // pour mettre à jour l'énergie, le setenergy ici ne fonctionne pas après le refresh de la page, mais les fois d'après oui
                getEnergy();
                navigate(linkArrival, { replace: true });
            } else {
                const linkDeparture = "/" + departure;
                toast.error('Pas assez d\'énergie pour aller sur ' + arrival[0].toUpperCase() + arrival.slice(1) + ' (' + energyTravelResponse + ' énergie nécessaire)', {duration: 10000});
                navigate(linkDeparture, { replace: true });
        }
    });
        // console.log(energytravel);
        // console.log(en);
                    //         console.log(energy);
                    // console.log(energyTravel);
                
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
            {path !== '/jupiter' && (
            <div className="link"
            onClick={() => substractEnergyTravel(place, 'jupiter')}>Jupiter</div>
            )}
            {path !== '/saturne' && (
            <div className="link"
            onClick={() => substractEnergyTravel(place, 'saturne')}>Saturne</div>
            )}
            {path !== '/uranus' && (
            <div className="link"
            onClick={() => substractEnergyTravel(place, 'uranus')}>Uranus</div>
            )}
            {path !== '/neptune' && (
            <div className="link"
            onClick={() => substractEnergyTravel(place, 'neptune')}>Neptune</div>
            )}
        </nav>
    );
}
export default SideBar