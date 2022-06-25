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

    // const { image } = props;

    // console.log(typeof regeneration);
    // const [isLoading, setIsLoading] = useState(true);
    // console.log(place);

    // const image = '../assets/terre.jpg';
    // const url = require(image);
    let url = "";

    // useEffect(() => {
    //     console.log(choiceGalaxy);
    // }, choiceGalaxy);

    // const test = "../assets/terre1.jpg";
    const image = planet.image;
    if (planet.image === "") {
        url = require(`../assets/terre1.jpg`);
    } else {
        url = require(`../assets/${image}`);
    }

    // switch (place) {
    //     case "terre":
    //         url = require(`../assets/${image}`);
    //         break;
    //     case "mars":
    //         url = require("../assets/mars.jpg");
    //         break;
    //     case "jupiter":
    //         url = require("../assets/jupiter.jpg");
    //         break;
    //     case "saturne":
    //         url = require("../assets/saturne.jpg");
    //         break;
    //     case "uranus":
    //         url = require("../assets/uranus.png");
    //         break;
    //     case "neptune":
    //         url = require("../assets/neptune.png");
    //         break;
    //     default:
    //         url = require("../assets/terre.jpg");
    //         break;
    // }

    // const handleEnergyAdding = (() => {
    //     // console.log(energy);
    //     setIsLoading(true);
    //     const updatedEnergy = parseInt(energy, 10) + 100;
    //     // apiRef.updateEnergy(process.env.REACT_APP_URL + 'resources/updateEnergy', updatedEnergy);
    //     apiRef.updateEnergy(process.env.REACT_APP_URL + 'App/Calls/updateEnergy.php', updatedEnergy);
    //     getData();
    // });

    // useEffect(() => {
    // getData();
    // getCrystalInfos();
    // }, []);

    // useEffect(() => {
    //     getGalaxyInfos();
    // }, [getGalaxyInfos]);

    const savePosition = useCallback(
        async (place, choiceGalaxy) => {
            try {
                // console.log(choiceGalaxy);
                // console.log(place);
                // const data = await apiRef.getData(process.env.REACT_APP_URL + 'resources/energy');
                await apiRef.savePosition(
                    process.env.REACT_APP_URL + "App/Calls/savePosition.php",
                    place,
                    galaxy
                );
            } catch (err) {
                console.error(err);
            }
        },
        [choiceGalaxy]
    );
    useEffect(() => {
        setGalaxy(galaxy);
        setPlace(place);
        if (choiceGalaxy !== undefined && choiceGalaxy !== null) {
            // console.log(choiceGalaxy);
            savePosition(place, choiceGalaxy);
        }
    }, [place, galaxy, choiceGalaxy]);
    // console.log(energy);

    useEffect(() => {
        // console.log(galaxy);
    }, [galaxy]);
    useEffect(() => {
        // console.log(choiceGalaxy);
    }, [choiceGalaxy]);
    // let name = '';

    // console.log(`url('${require('../assets/terre.jpg')}')`);

    return (
        <Box>
            {isLoading ? (
                <div className="loading">Chargement</div>
            ) : (
                <>
                    <h3
                        style={{
                            fontSize: 36,
                            color: "white",
                            textAlign: "center",
                        }}
                    >
                        {(choiceGalaxy === "0" || galaxy === "0") &&
                        place.length > 0
                            ? `${place[0].toUpperCase() + place.slice(1)} (${
                                  planet.galaxyName
                              })`
                            : `Planète ${place} (${planet.galaxyName})`}
                    </h3>
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
                            galaxy={galaxy}
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
                            galaxy={galaxy}
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
