import image from "../assets/terre.jpg"
import { apiRef } from "../api/apiRef"
// import useMounted from 'react-use-mounted';
import { useCallback, useEffect, useState } from "react";
import Infos from "../component/Infos";
import PropTypes from 'prop-types';
import '../App.css';
import { Box } from "@mui/material";

function Earth(props) {
    //  const mounted = useMounted();
     const {stockage, energy, isLoading, generator, regeneration, setEnergy, setPlace } = props;
    // const { image } = props;
    // const [energyLocal, setEnergy] = useState(energy);
    // console.log(typeof regeneration);
    // const [isLoading, setIsLoading] = useState(true);
    // console.log('test');
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
    useEffect(() => {
        setPlace('earth');
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
    return (
        <Box>
        {isLoading ? (
                <div className='loading'>Chargement</div>
            ) : (
        <Box style={{ backgroundImage: `url(${image})`, backgroundRepeat: 'no-repeat', height: '800px', color: 'white'}}>
            <Box ml={2} pt={1}>
            Terre                
            <Infos
            stockage={stockage}
            generator={parseInt(generator, 10)}
            energy={energy}
            />
            <button>Augmenter la génération d'énergie</button>
            </Box>
        </Box>
        )}
        </Box>
    );
}
Earth.propTypes = {
    energy: PropTypes.number.isRequired,
    generator: PropTypes.number.isRequired,
    stockage: PropTypes.number.isRequired,
    isLoading: PropTypes.bool.isRequired,
    regeneration: PropTypes.number.isRequired
};
export default Earth