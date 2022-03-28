import { useCallback, useEffect, useState } from "react";
import { useLocation } from 'react-router-dom'
import image from "../assets/lune.jpg"
import { apiRef } from "../api/apiRef"
// import useMounted from 'react-use-mounted';
import Infos from "../component/Infos";
import PropTypes from 'prop-types';
import '../App.css';
import { Box } from "@mui/material";

function Moon(props) {
    const {stockage, energy, isLoading, generator, regeneration, setEnergy, setPlace} = props;
    const path = useLocation();
    // console.log(path.pathname);
    // const mounted = useMounted();
    // const { image } = props;
    // const [energyLocal, setEnergy] = useState(energy);
    // const [isLoadingLocal, setIsLoading] = useState(isLoading);
    // console.log(stockage);
    // const getData = useCallback(async () => {
    //     try {
    //         // const data = await apiRef.getData(process.env.REACT_APP_URL + 'resources/energy');
    //         const data = await apiRef.getData(process.env.REACT_APP_URL + 'App/Calls/getEnergy.php');
    //         if (mounted.current) {
    //             setEnergy(data.energy);
    //         }
    //         setIsLoading(false);
            
    //     } catch (err) {
    //         console.error(err);
    //     }
            
    // }, [mounted]);

    const savePlace = useCallback(async (place) => {
        try {

            // const data = await apiRef.getData(process.env.REACT_APP_URL + 'resources/energy');
            await apiRef.savePlace(process.env.REACT_APP_URL + 'App/Calls/savePlace.php', place);
            
            
        } catch (err) {
            console.error(err);
        }
            
    }, []);
    useEffect(() => {
        setPlace('moon');
        savePlace('moon');
    }, []);

    // const handleEnergyAdding = (() => {
    //     // console.log(energy);
    //     setIsLoading(true);
    //     const updatedEnergy = parseInt(energy, 10) + 100;
    //     // apiRef.updateEnergy(process.env.REACT_APP_URL + 'resources/updateEnergy', updatedEnergy);
    //     apiRef.updateEnergy(process.env.REACT_APP_URL + 'App/Calls/updateEnergy.php', updatedEnergy);
    //     getData();
    // });

    useEffect(() => {
        const timer = setInterval(() => {
            console.log(energy);
            if (energy < stockage) {
                let updatedEnergy = parseInt(energy, 10) + regeneration;
                if (updatedEnergy > stockage){
                    updatedEnergy = stockage;
                }
                setEnergy(updatedEnergy);
            }
        }, 10000);
        
        return () => {
            // Each time a new useEffect is executed, the previous useEffect will be cleaned up
            // This function will be called to clear the previous setInterval timer
            clearInterval(timer);
        };
    }, [energy]);

    // console.log(energy);
    
    return (
        <>
            {isLoading ? (
                <div className='loading'>Chargement</div>
            ) : (
            <Box sx={{backgroundImage: `url(${image})`, backgroundRepeat: 'no-repeat', height: '800px', color: 'white'}}>
                <Box ml={2} pt={1}>
                Lune 
                <Infos
                    stockage={stockage}
                    generator={parseInt(generator, 10)}
                    energy={energy}
                />
                {/* <button onClick={handleEnergyAdding}>Ajouter de l'énergie</button> */}
                </Box>
            </Box>
            )}
        </>
    );
}
Moon.propTypes = {
    energy: PropTypes.number.isRequired,
    generator: PropTypes.number.isRequired,
    stockage: PropTypes.number.isRequired,
    isLoading: PropTypes.bool,
    regeneration: PropTypes.number.isRequired
};
export default Moon