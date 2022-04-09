// import image from "../assets/terre.jpg"
import { apiRef } from "../api/apiRef";
import { useCallback, useEffect, useState } from "react";
import Infos from "./Infos";
import PropTypes from "prop-types";
import "../App.css";
import { Box, Typography } from "@mui/material";
// import toast from 'react-hot-toast';
// import { fontSize, textAlign } from "@mui/system";
import Board from "./Board";
import useMounted from "react-use-mounted";

function Planet(props) {
    //  const mounted = useMounted();
    const {
        isLoading,
        setPlace,
        place,
        stockCrystal,
        getData,
        energyInfos,
        setEnergyInfos,
        starship,
        setStarship,
        planet,
        setPlanet,
        getCrystalInfos,
        galaxy,
        setGalaxy,
        choiceGalaxy,
        setChoiceGalaxy,
    } = props;

    const [galaxyName, setGalaxyName] = useState("");
    const mounted = useMounted();

    // const { image } = props;
    // const [energyLocal, setEnergy] = useState(energy);
    // console.log(typeof regeneration);
    // const [isLoading, setIsLoading] = useState(true);
    // console.log(place);

    // const image = '../assets/terre.jpg';
    // const url = require(image);
    let url = "";

    // useEffect(() => {
    //     console.log(choiceGalaxy);
    // }, choiceGalaxy);

    switch (place) {
        case "terre":
            url = require("../assets/terre1.jpg");
            break;
        case "mars":
            url = require("../assets/mars.jpg");
            break;
        case "jupiter":
            url = require("../assets/jupiter.jpg");
            break;
        case "saturne":
            url = require("../assets/saturne.jpg");
            break;
        case "uranus":
            url = require("../assets/uranus.png");
            break;
        case "neptune":
            url = require("../assets/neptune.png");
            break;
        default:
            url = require("../assets/terre1.jpg");
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

    const getGalaxyName = useCallback(async () => {
        try {
            const data = await apiRef.getGalaxyName(
                process.env.REACT_APP_URL + "App/Calls/getGalaxyName.php",
                galaxy
            );

            if (mounted.current) {
                // console.log(data.name);
                setGalaxyName(data.name);
            }
        } catch (err) {
            console.error(err);
        }
    }, [mounted]);

    // useEffect(() => {
    // getData();
    // getCrystalInfos();
    // }, []);

    useEffect(() => {
        getGalaxyName();
    }, [getGalaxyName]);

    const savePosition = useCallback(
        async (place, choiceGalaxy) => {
            try {
                console.log(galaxy);
                // console.log(place);
                // const data = await apiRef.getData(process.env.REACT_APP_URL + 'resources/energy');
                await apiRef.savePosition(
                    process.env.REACT_APP_URL + "App/Calls/savePosition.php",
                    place,
                    choiceGalaxy
                );
            } catch (err) {
                console.error(err);
            }
        },
        [choiceGalaxy]
    );
    useEffect(() => {
        // console.log(place);
        setGalaxy(galaxy);
        setPlace(place);
        if (choiceGalaxy !== undefined) {
            savePosition(place, choiceGalaxy);
        }
    }, [place, galaxy, choiceGalaxy]);
    // console.log(energy);

    // let name = '';

    // console.log(`url('${require('../assets/terre.jpg')}')`);

    return (
        <Box>
            {isLoading ? (
                <div className="loading">Chargement</div>
            ) : (
                <>
                    <Typography
                        style={{
                            fontSize: 36,
                            color: "white",
                            textAlign: "center",
                        }}
                    >
                        {galaxy === 0
                            ? `${
                                  place[0].toUpperCase() + place.slice(1)
                              } (${galaxyName})`
                            : `Planète ${place} (${galaxyName})`}
                    </Typography>
                    <Box
                        style={{
                            backgroundImage: `url('${url}')`,
                            backgroundRepeat: "no-repeat",
                            height: "800px",
                            color: "white",
                            backgroundPosition: "center",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            padding: "10px",
                        }}
                    >
                        {/* <Box ml={2} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}> */}

                        <Infos
                            // stockage={stockage}
                            // generator={parseInt(generator, 10)}
                            energyInfos={energyInfos}
                            // regeneration={regeneration}
                            // nextRegeneration={nextRegeneration}
                            place={place}
                            stockCrystal={stockCrystal}
                            // stockageCrystal={stockageCrystal}
                            // stockCrystalPlanet={stockCrystalPlanet}
                            // stockageCrystalPlanet={stockageCrystalPlanet}
                            // stockCrystalStarship={stockCrystalStarship}
                            getData={getData}
                            starship={starship}
                            planet={planet}
                            choiceGalaxy={choiceGalaxy}
                            // style={{ display: 'inline' }}
                        />

                        <Board
                            // regenerationEnergyLevel={regenerationEnergyLevel}
                            // setRegenerationEnergyLevel={setRegenerationEnergyLevel}
                            // setStockageEnergyLevel={setStockageEnergyLevel}
                            // setWeaponLevel={setWeaponLevel}
                            // crystalEnergyRegeneration={crystalEnergyRegeneration}
                            place={place}
                            stockCrystal={stockCrystal}
                            getCrystalInfos={getCrystalInfos}
                            // stockageEnergyLevel={stockageEnergyLevel}
                            // weaponLevel={weaponLevel}
                            // crystalLifePoints={crystalLifePoints}
                            // crystalStockageStarship={crystalStockageStarship}
                            // crystalWeapon={crystalWeapon}
                            energyInfos={energyInfos}
                            setEnergyInfos={setEnergyInfos}
                            starship={starship}
                            setStarship={setStarship}
                            planet={planet}
                            setPlanet={setPlanet}
                            getData={getData}
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
    // energy: PropTypes.number.isRequired,
    // generator: PropTypes.number.isRequired,
    // stockage: PropTypes.number.isRequired,
    isLoading: PropTypes.bool.isRequired,
    // regeneration: PropTypes.number.isRequired,
    // setRegenerationEnergyLevel: PropTypes.func,
    // setStockageEnergyLevel: PropTypes.func
};
export default Planet;
