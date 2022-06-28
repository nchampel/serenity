import { apiRef } from "../api/apiRef";
import { useCallback, useEffect, useState } from "react";
import Infos from "./Infos";
import PropTypes from "prop-types";
import "../App.css";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography,
} from "@mui/material";
// import toast from 'react-hot-toast';
// import { fontSize, textAlign } from "@mui/system";
import Board from "./Board";
import useMounted from "react-use-mounted";
import { useNavigate } from "react-router-dom";

function Fight(props) {
    //  const mounted = useMounted();
    const { energyInfos, setEnergyInfos } = props;
    const url = require(`../assets/starship.jpg`);
    const [starship, setStarship] = useState({});
    const [enemy, setEnemy] = useState({ power: 0, life_points: 0 });
    const mounted = useMounted();
    const [open, setOpen] = useState(false);
    const [results, setResults] = useState([]);
    const [winner, setWinner] = useState("Player");
    const navigate = useNavigate();
    const [position, setPosition] = useState({});

    const getStarshipInfos = useCallback(async () => {
        try {
            const data = await apiRef.getStarshipInfos(
                process.env.REACT_APP_URL + "App/Calls/getStarshipInfos.php"
            );
            const dataEnemy = await apiRef.getEnemyInfos(
                process.env.REACT_APP_URL + "App/CallsEnemy/getEnemyInfos.php"
            );
            // const dataFighting = await apiRef.getHasFight(
            //     process.env.REACT_APP_URL + "App/CallsEnemy/getHasFight.php"
            // );
            const dataFight = await apiRef.getResultsFightNPC(
                process.env.REACT_APP_URL +
                    "App/CallsFight/getResultsFightNPC.php"
            );
            const dataPosition = await apiRef.getPlace(
                process.env.REACT_APP_URL + "App/Calls/getPlace.php"
            );
            // console.log(dataFighting.hasFight);

            if (mounted.current) {
                // console.log(data.name);
                setStarship(data.data);
                setEnemy(dataEnemy.data);
                setResults(dataFight.data);
                setPosition({
                    planet: dataPosition.place,
                    galaxy: dataPosition.galaxy,
                });
                // if (dataFighting.hasFight === 1) {
                //     setOpen(true);
                //     await apiRef.setNotFight(
                //         process.env.REACT_APP_URL +
                //             "App/CallsEnemy/setNotFight.php"
                //     );
                // }
                dataFight.data.forEach((item) => {
                    if (item.winner === "Enemy") {
                        setWinner("Enemy");
                    }
                });
            }
        } catch (err) {
            console.error(err);
        }
    }, [mounted]);

    useEffect(() => {
        getStarshipInfos();
    }, [getStarshipInfos]);

    useEffect(() => {
        console.log(results);
    }, [results]);

    useEffect(() => {
        console.log(winner);
    }, [winner]);

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

    const fight = useCallback(async () => {
        try {
            // const data = await apiRef.getStarshipInfos();
            const data = await apiRef.fight(
                process.env.REACT_APP_URL + "App/CallsFight/fightNPC.php"
            );
            // await apiRef.setFight(
            //     process.env.REACT_APP_URL + "App/CallsEnemy/setFight.php"
            // );
            // console.log(data);
            // if (mounted.current) {
            //     setResults(data);
            // }
        } catch (err) {
            console.error(err);
        }
    }, [mounted]);

    const nextEnemy = useCallback(async () => {
        try {
            // const data = await apiRef.getStarshipInfos();
            await apiRef.setEnemyInfos(
                process.env.REACT_APP_URL + "App/CallsEnemy/setEnemyInfos.php"
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

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleEnd = () => {
        if (winner === "Enemy") {
            // appeler la fonction qui fait vaisseau neuf
            navigate("/0/terre");
        } else {
            navigate(`/${position.galaxy}/${position.planet}`, {
                replace: true,
            });
        }
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
            <Dialog
                open={open}
                // TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
                fullWidth
                maxWidth="xl"
                PaperProps={{
                    style: {
                        backgroundColor: "#434A54",
                        color: "white",
                    },
                }}
            >
                <DialogTitle>Résultats du combat</DialogTitle>
                <DialogContent>
                    {/* <DialogContentText id="alert-dialog-slide-description"> */}
                    <Box
                        style={{ height: 700, width: "100%" }}
                        sx={{
                            backgroundColor: "#434A54",
                            color: "white",
                        }}
                    >
                        {results.map((round) => (
                            <>
                                <Box
                                    sx={{ mb: 1 }}
                                >{`Tour n° ${round.round} Pdv du vaisseau ${round.life_points_starship} et attaque de ${round.strength_starship}. Pdv de l'ennemi ${round.life_points_enemy} et attaque de ${round.strength_enemy}`}</Box>
                                {round.winner === "Player" && (
                                    <Box style={{ fontSize: 20 }}>
                                        Combat gagné !
                                    </Box>
                                )}
                                {round.winner === "Enemy" && (
                                    <Box style={{ fontSize: 20 }}>
                                        Combat perdu !
                                    </Box>
                                )}
                            </>
                        ))}
                    </Box>
                    {/* </DialogContentText> */}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} style={{ color: "white" }}>
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
            {energyInfos.energy >= 1000 && winner === "Player" ? (
                <>
                    {/* {results.test} */}
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
                        onClick={() => {
                            substract1000Energy();
                            fight();
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
                        Combattre
                    </Button>
                </>
            ) : (
                <p style={{ textAlign: "center", color: "red" }}>
                    {winner === "Enemy"
                        ? "Vaisseau détruit, retour sur Terre"
                        : "Vous n'avez pas assez d'énergie pour combattre"}
                </p>
            )}
            <Button
                variant="outlined"
                onClick={() => {
                    handleOpen();
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
                Résultats
            </Button>
            {/* mettre énergie volable aléatoire */}
            <p style={{ textAlign: "center" }}>
                <span style={{ fontWeight: "bold" }}>Ennemi</span>
                {` Puissance :
                ${String(Number(enemy.power).toFixed(0)).replace(
                    /(.)(?=(\d{3})+$)/g,
                    "$1 "
                )} Points de vie : ${String(
                    Number(enemy.life_points).toFixed(0)
                ).replace(/(.)(?=(\d{3})+$)/g, "$1 ")} Cristal : ${String(
                    Number(enemy.crystal)
                ).replace(/(.)(?=(\d{3})+$)/g, "$1 ")}`}
            </p>
            <Button
                variant="outlined"
                onClick={() => {
                    handleEnd();
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
                Quitter le combat
            </Button>
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
