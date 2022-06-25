import { apiRef } from "../api/apiRef";
import { useCallback, useEffect, useState } from "react";
import Infos from "./Infos";
import PropTypes from "prop-types";
import "../App.css";
import { Box, Button, Typography } from "@mui/material";
// import toast from 'react-hot-toast';
// import { fontSize, textAlign } from "@mui/system";
import Board from "./Board";
import useMounted from "react-use-mounted";

function Fight(props) {
    //  const mounted = useMounted();
    const { energyInfos, setEnergyInfos } = props;
    const url = require(`../assets/starship.jpg`);
    const [starship, setStarship] = useState({});
    const [enemy, setEnemy] = useState({});
    const mounted = useMounted();

    const getStarshipInfos = useCallback(async () => {
        try {
            const data = await apiRef.getStarshipInfos(
                process.env.REACT_APP_URL + "App/Calls/getStarshipInfos.php"
            );
            const dataEnemy = await apiRef.getEnemyInfos(
                process.env.REACT_APP_URL + "App/Calls/getEnemyInfos.php"
            );

            if (mounted.current) {
                // console.log(data.name);
                setStarship(data.data);
                setEnemy(dataEnemy.data);
            }
        } catch (err) {
            console.error(err);
        }
    }, [mounted]);

    useEffect(() => {
        getStarshipInfos();
    }, [getStarshipInfos]);

    const handleSubstractEnergy = useCallback(async (energy) => {
        try {
            // const data = await apiRef.getStarshipInfos();
            await apiRef.saveEnergy(
                process.env.REACT_APP_URL + "App/CallsEnergy/saveEnergy.php",
                energy
            );
        } catch (err) {
            console.error(err);
        }
    }, []);

    const nextEnemy = useCallback(async () => {
        try {
            // const data = await apiRef.getStarshipInfos();
            await apiRef.setEnemyInfos(
                process.env.REACT_APP_URL + "App/Calls/setEnemyInfos.php"
            );
        } catch (err) {
            console.error(err);
        }
    }, []);

    // useEffect(() => {
    //     console.log(starship);
    // }, [starship]);
    const substract1000Energy = () => {
        const newEnergy = energyInfos.energy - 1000;
        handleSubstractEnergy(newEnergy);
        setEnergyInfos({ ...energyInfos, energy: energyInfos.energy - 1000 });
    };

    return (
        <Box
            style={{
                backgroundImage: `url('${url}')`,
                backgroundRepeat: "no-repeat",
                height: "800px",
                backgroundPosition: "center",
            }}
        >
            <Button
                variant="outlined"
                onClick={() => {
                    substract1000Energy();
                    nextEnemy();
                }}
                sx={{
                    "&:hover": {
                        borderWidth: 2,
                    },
                    borderWidth: 2,
                    color: "orange",
                    display: "block",
                    margin: "auto",
                    marginBottom: "10px",
                    marginTop: "10px",
                    width: "300px",
                    fontFamily: "Montserrat",
                }}
            >
                Suivant (1000 énergie)
            </Button>
            <Button
                variant="outlined"
                onClick={substract1000Energy}
                sx={{
                    "&:hover": {
                        borderWidth: 2,
                    },
                    borderWidth: 2,
                    color: "orange",
                    display: "block",
                    margin: "auto",
                    marginBottom: "10px",
                    marginTop: "10px",
                    width: "300px",
                    fontFamily: "Montserrat",
                }}
            >
                Combattre
            </Button>
            {/* mettre énergie volable aléatoire */}
            <p style={{ textAlign: "center" }}>
                <span style={{ fontWeight: "bold" }}>Ennemi</span>
                {` Puissance :
                ${enemy.power} Points de vie : ${enemy.life_points} Cristal : 10000`}
            </p>
            <span style={{ whiteSpace: "pre-line" }}>
                {`Énergie : ${String(energyInfos.energy).replace(
                    /(.)(?=(\d{3})+$)/g,
                    "$1 "
                )}\n
            Puissance : ${String(starship.power).replace(
                /(.)(?=(\d{3})+$)/g,
                "$1 "
            )}\nPoints de vie : ${String(starship.life_points).replace(
                    /(.)(?=(\d{3})+$)/g,
                    "$1 "
                )}`}
            </span>
        </Box>
    );
}
Fight.propTypes = {
    energyInfos: PropTypes.object.isRequired,
    // generator: PropTypes.number.isRequired,
    // stockage: PropTypes.number.isRequired,
    // isLoading: PropTypes.bool.isRequired,
    // regeneration: PropTypes.number.isRequired,
    // setRegenerationEnergyLevel: PropTypes.func,
    setEnergyInfos: PropTypes.func,
};
export default Fight;
