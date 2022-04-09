import "../css/Infos.css";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import { useCallback } from "react";
import { apiRef } from "../api/apiRef";
import toast from "react-hot-toast";

const Infos = (props) => {
    const {
        place,
        stockCrystal,
        getData,
        energyInfos,
        starship,
        planet,
        choiceGalaxy,
        galaxy,
    } = props;
    const takeCrystalCallback = useCallback(async (place) => {
        try {
            // console.log(place);
            // const data = await apiRef.getData(process.env.REACT_APP_URL + 'resources/energy');
            const data = await apiRef.takeCrystal(
                process.env.REACT_APP_URL + "App/Calls/takeCrystal.php",
                place
            );
            if (data.status === 200) {
                getData();
            } else if (data.status === 201) {
                toast.error("Pas assez de place");
            }

            // const dataEnergyCapacity = await apiRef.getEquipment(process.env.REACT_APP_URL + 'App/Calls/getEquipment.php', dataLevels.energy_capacity_level, 'energy_capacity');
            // console.log(typeof dataLevels.energy_regeneration_level);
        } catch (err) {
            console.error(err);
        }
    }, []);
    const discardCrystalCallback = useCallback(async () => {
        try {
            // console.log(place);
            // const data = await apiRef.getData(process.env.REACT_APP_URL + 'resources/energy');
            await apiRef.discardCrystal(
                process.env.REACT_APP_URL + "App/Calls/discardCrystal.php"
            );

            getData();

            // const dataEnergyCapacity = await apiRef.getEquipment(process.env.REACT_APP_URL + 'App/Calls/getEquipment.php', dataLevels.energy_capacity_level, 'energy_capacity');
            // console.log(typeof dataLevels.energy_regeneration_level);
        } catch (err) {
            console.error(err);
        }
    }, []);
    const takeCrystal = (place) => {
        takeCrystalCallback(place);
    };
    const discardCrystal = (place) => {
        discardCrystalCallback(place);
    };
    // console.log(energyInfos);
    return (
        <Box>
            <Box
                sx={{ fontWeight: "bold", fontSize: "18px", color: "#77dd55" }}
            >
                Sur le vaisseau
            </Box>
            <Box sx={{ ml: 2 }}>
                <br />
                Énergie :{" "}
                {String(energyInfos.energy).replace(
                    /(.)(?=(\d{3})+$)/g,
                    "$1 "
                )}{" "}
                /{" "}
                {String(energyInfos.stockageEnergy).replace(
                    /(.)(?=(\d{3})+$)/g,
                    "$1 "
                )}
                <br />
                <Box className="adding">
                    {`Énergie : + 
                ${String(energyInfos.regenerationEnergy * 60).replace(
                    /(.)(?=(\d{3})+$)/g,
                    "$1 "
                )}`}
                    /h
                </Box>
                <Box className="next">
                    {energyInfos.regenerationEnergyLevel < 12
                        ? `(Suivant : +${String(
                              energyInfos.nextRegenerationEnergy * 60
                          ).replace(/(.)(?=(\d{3})+$)/g, "$1 ")}/h - ${String(
                              energyInfos.nextStockageEnergy
                          ).replace(/(.)(?=(\d{3})+$)/g, "$1 ")})`
                        : `Niveau maximal de régénération d'énergie`}
                </Box>
                <br />
                <br />
                Cristaux :{" "}
                {String(starship.stockCrystalStarship).replace(
                    /(.)(?=(\d{3})+$)/g,
                    "$1 "
                )}{" "}
                /{" "}
                {String(starship.stockageCrystal).replace(
                    /(.)(?=(\d{3})+$)/g,
                    "$1 "
                )}
                <br />
                <Box className="next">
                    (Suivant :{" "}
                    {String(starship.nextStockageCrystalStarship).replace(
                        /(.)(?=(\d{3})+$)/g,
                        "$1 "
                    )}
                    )
                </Box>
                <br />
                <br />
                <br />
            </Box>
            <Box
                sx={{ fontWeight: "bold", fontSize: "18px", color: "#77dd55" }}
            >
                Sur la planète
            </Box>
            <Box sx={{ ml: 2 }}>
                <br />
                {place === "terre" && (
                    <>
                        Cristaux en stock :{" "}
                        {String(stockCrystal).replace(
                            /(.)(?=(\d{3})+$)/g,
                            "$1 "
                        )}
                        <Button
                            variant="outlined"
                            onClick={() => discardCrystal()}
                            sx={{
                                borderWidth: 2,
                                color: "orange",
                                display: "block",
                                margin: "auto",
                                marginTop: "10px",
                                width: "230px",
                            }}
                        >
                            Décharger le cristal
                        </Button>
                    </>
                )}
                {place !== "terre" && (
                    <>
                        Cristaux en stock :{" "}
                        {String(planet.stockCrystalPlanet).replace(
                            /(.)(?=(\d{3})+$)/g,
                            "$1 "
                        )}{" "}
                        /{" "}
                        {String(planet.stockageCrystalPlanet).replace(
                            /(.)(?=(\d{3})+$)/g,
                            "$1 "
                        )}
                        <br />
                        <Box className="adding">
                            {`Cristaux : + 
                        ${String(planet.generationCrystal * 60).replace(
                            /(.)(?=(\d{3})+$)/g,
                            "$1 "
                        )}`}
                            /h
                        </Box>
                        {galaxy === 0 && (
                            <Box className="next">
                                (Suivant : +
                                {String(
                                    planet.nextGenerationCrystal * 60
                                ).replace(/(.)(?=(\d{3})+$)/g, "$1 ")}
                                /h -{" "}
                                {String(planet.nextStockageCrystal).replace(
                                    /(.)(?=(\d{3})+$)/g,
                                    "$1 "
                                )}
                                )
                            </Box>
                        )}
                        <Button
                            variant="outlined"
                            onClick={() => takeCrystal(place)}
                            sx={{
                                borderWidth: 2,
                                color: "orange",
                                display: "block",
                                margin: "auto",
                                marginTop: "10px",
                                width: "230px",
                            }}
                        >
                            Récupérer le cristal
                        </Button>
                    </>
                )}
                <Button
                    variant="contained"
                    onClick={() => takeCrystal(place)}
                    sx={{
                        "&:hover": {
                            backgroundColor: "#ff781f",
                        },
                        borderWidth: 2,
                        // backgroundColor: "#7Fff4C",
                        // backgroundColor: "#55aaee",
                        backgroundColor: "orange",
                        // color: "#fd6c9e",
                        color: "green",
                        display: "block",
                        margin: "auto",
                        marginTop: "10px",
                        width: "230px",
                    }}
                    className="button"
                >
                    Prendre 500 000 cristaux
                </Button>
            </Box>
        </Box>
    );
};

Infos.propTypes = {
    starship: PropTypes.object,
};

export default Infos;
