// import image from "../assets/terre.jpg"
import { apiRef } from "../api/apiRef"
import useMounted from 'react-use-mounted';
import { useCallback, useEffect, useState } from "react";
import Infos from "./Infos";
import PropTypes from 'prop-types';
import '../App.css';
import { Box, Typography } from "@mui/material";
import toast from 'react-hot-toast';
import { fontSize, textAlign } from "@mui/system";
import Board from "./Board";

function Planet(props) {
     const mounted = useMounted();
     const {stockage, energy, isLoading, generator, regeneration, setEnergy, setPlace, place, nextRegeneration, regenerationEnergyLevel,
        setRegenerationEnergyLevel, crystalEnergyRegeneration, stockageCrystal } = props;
    const [stockCrystal, setStockCrystal] = useState(0);
    const [stockCrystalPlanet, setStockCrystalPlanet] = useState(0);
    const [stockageCrystalPlanet, setStockageCrystalPlanet] = useState(0);
    const [stockCrystalStarship, setStockCrystalStarship] = useState(0);
     // const { image } = props;
    // const [energyLocal, setEnergy] = useState(energy);
    // console.log(typeof regeneration);
    // const [isLoading, setIsLoading] = useState(true);
    // console.log('test');
    const getData = useCallback(async () => {
        try {
            // const data = await apiRef.getData(process.env.REACT_APP_URL + 'resources/energy');
            const dataEnergy = await apiRef.getData(process.env.REACT_APP_URL + 'App/Calls/getEnergy.php');
            // cristal sur Terre
            const dataCrystal = await apiRef.getCrystal(process.env.REACT_APP_URL + 'App/Calls/getCrystal.php', 'terre');
            // cristal sur vaisseau
            const dataCrystalStarship = await apiRef.getData(process.env.REACT_APP_URL + 'App/Calls/getCrystalStarship.php');
            // cristal sur planète autre que Terre
            const dataCrystalPlanet = await apiRef.getCrystal(process.env.REACT_APP_URL + 'App/Calls/getCrystal.php', place);
            //stockage cristal sur planète
            const dataStockagePlanet = await apiRef.getCrystal(process.env.REACT_APP_URL + 'App/Calls/getCrystalStockage.php', place);
            if (mounted.current) {
                setEnergy(dataEnergy.energy);
                setStockCrystal(dataCrystal.crystal);
                setStockCrystalPlanet(dataCrystalPlanet.crystal);
                setStockageCrystalPlanet(dataStockagePlanet.crystal_stockage);
                setStockCrystalStarship(dataCrystalStarship.crystal);
            }
            
        } catch (err) {
            console.error(err);
        }
            
    }, [mounted, place]);
    // const image = '../assets/terre.jpg';
    // const url = require(image);
    let url = '';

    switch (place) {
        case 'earth':
            url = require('../assets/terre1.jpg');
            break;
        case 'mars':
            url = require('../assets/mars.jpg');
            break;
        case 'jupiter':
            url = require('../assets/jupiter.jpg');
            break;
        case 'saturne':
            url = require('../assets/saturne.jpg');
            break;
        case 'uranus':
            url = require('../assets/uranus.png');
            break;
        case 'neptune':
            url = require('../assets/neptune.png');
            break;
        default:
            url = require('../assets/terre1.jpg');
            break;

    }

    // const handleEnergyAdding = (() => {
    //     // console.log(energy);
    //     setIsLoading(true);
    //     const updatedEnergy = parseInt(energy, 10) + 100;
    //     // apiRef.updateEnergy(process.env.REACT_APP_URL + 'resources/updateEnergy', updatedEnergy);
    //     apiRef.updateEnergy(process.env.REACT_APP_URL + 'App/Calls/updateEnergy.php', updatedEnergy);
    //     getData();
    // });

    const savePlace = useCallback(async (place) => {
        try {
            // console.log(place);
            // const data = await apiRef.getData(process.env.REACT_APP_URL + 'resources/energy');
            await apiRef.savePlace(process.env.REACT_APP_URL + 'App/Calls/savePlace.php', place);
            
            
            
        } catch (err) {
            console.error(err);
        }
            
    }, []);
    useEffect(() => {
        // console.log(place);
        setPlace(place);
        savePlace(place);
    }, [place]);
    // console.log(energy);

    // let name = '';

    useEffect(() => {
        getData();
        const timer = setInterval(() => {
            // console.log(energy);
            // if (energy < stockage) {
            //     let updatedEnergy = parseInt(energy, 10) + regeneration;
            //     if (updatedEnergy > stockage){
            //         updatedEnergy = stockage;
            //     }
            //     setEnergy(updatedEnergy);
            // }
            getData();
        }, 60000);
        
        return () => {
            // Each time a new useEffect is executed, the previous useEffect will be cleaned up
            // This function will be called to clear the previous setInterval timer
            clearInterval(timer);
        };
    }, [energy]);

    // console.log(`url('${require('../assets/terre.jpg')}')`);

        return (
        <Box>
        {isLoading ? (
                <div className='loading'>Chargement</div>
            ) : (
                <>
                <Typography style={{fontSize: 36, color: 'white', textAlign: 'center'}}>
                    {place[0].toUpperCase() + place.slice(1)}
                </Typography>
        <Box style={{ backgroundImage: `url('${url}')`, backgroundRepeat: 'no-repeat', height: '800px', color: 'white', backgroundPosition: 'center', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px'}}>
            {/* <Box ml={2} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}> */}
                
                           
                <Infos
                    stockage={stockage}
                    generator={parseInt(generator, 10)}
                    energy={energy}
                    regeneration={regeneration}
                    nextRegeneration={nextRegeneration}
                    place={place}
                    stockCrystal={stockCrystal}
                    stockageCrystal={stockageCrystal}
                    stockCrystalPlanet={stockCrystalPlanet}
                    stockageCrystalPlanet={stockageCrystalPlanet}
                    stockCrystalStarship={stockCrystalStarship}
                    getData={getData}
                    // style={{ display: 'inline' }}
                />

                

                <Board
                    regenerationEnergyLevel={regenerationEnergyLevel}
                    setRegenerationEnergyLevel={setRegenerationEnergyLevel}
                    crystalEnergyRegeneration={crystalEnergyRegeneration}
                    place={place}
                />
            {/* <button>Augmenter la génération d'énergie</button> */}
            {/* </Box> */}
        </Box>
        </>
        )}
        </Box>
    );
}
Planet.propTypes = {
    energy: PropTypes.number.isRequired,
    generator: PropTypes.number.isRequired,
    stockage: PropTypes.number.isRequired,
    isLoading: PropTypes.bool.isRequired,
    regeneration: PropTypes.number.isRequired
};
export default Planet