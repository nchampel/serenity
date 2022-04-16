import "../css/SideBar.css";
import {
    useCallback,
    useEffect,
    useState,
    Ref,
    ReactElement,
    forwardRef,
} from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { apiRef } from "../api/apiRef";
import useMounted from "react-use-mounted";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Slide,
    stepLabelClasses,
} from "@mui/material";
import { DataGrid, frFR } from "@mui/x-data-grid";

// const StyledLink = styled(Link)`
//     text-decoration: none;

//     &:focus, &:hover, &:visited, &:link, &:active {
//         text-decoration: none;
//     }
// `;

function SideBar(props) {
    const {
        path,
        place,
        getCrystalInfos,
        energyInfos,
        setEnergyInfos,
        getData,
        setPlace,
        galaxy,
        choiceGalaxy,
        setChoiceGalaxy,
        setGalaxy,
    } = props;
    const navigate = useNavigate();
    const mounted = useMounted();
    const [energyTravel, setEnergyTravel] = useState(0);
    const [open, setOpen] = useState(false);
    const [infosPlanetsGalaxy, setInfosPlanetsGalaxy] = useState([]);
    const [energyGalaxy, setEnergyGalaxy] = useState(0);
    console.log(path.split("/")[1]);
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
            const dataEnergy = await apiRef.getData(
                process.env.REACT_APP_URL + "App/Calls/getEnergy.php"
            );
            // const dataEnergyCapacity = await apiRef.getEquipment(process.env.REACT_APP_URL + 'App/Calls/getEquipment.php', dataLevels.energy_capacity_level, 'energy_capacity');
            // console.log(typeof dataLevels.energy_regeneration_level);

            // setEnergy(parseInt(dataEnergy.energy, 10));

            setEnergyInfos({
                ...energyInfos,
                energy: parseInt(dataEnergy.energy, 10),
            });
        } catch (err) {
            console.error(err);
        }
    }, []);

    const getEnergyTravel = useCallback(
        async (travel) => {
            try {
                // const data = await apiRef.getData(process.env.REACT_APP_URL + 'resources/energy');
                const data = await apiRef.getEnergyTravel(
                    process.env.REACT_APP_URL + "App/Calls/getEnergyTravel.php",
                    travel
                );

                if (mounted.current) {
                    // console.log(data.transport_energy);
                    setEnergyTravel(parseInt(data.transport_energy, 10));
                    return parseInt(data.transport_energy, 10);
                }
            } catch (err) {
                console.error(err);
            }
        },
        [mounted]
    );

    const saveEnergyAfterTravel = useCallback(async (travel) => {
        try {
            // console.log(travel);
            // const data = await apiRef.getData(process.env.REACT_APP_URL + 'resources/energy');
            await apiRef.saveEnergyAfterTravel(
                process.env.REACT_APP_URL +
                    "App/Calls/saveEnergyAfterTravel.php",
                travel
            );
            // const dataEnergyCapacity = await apiRef.getEquipment(process.env.REACT_APP_URL + 'App/Calls/getEquipment.php', dataLevels.energy_capacity_level, 'energy_capacity');
            // console.log(travel);
        } catch (err) {
            console.error(err);
        }
    }, []);

    const getDataPlanetsGalaxy = useCallback(async (choiceGalaxy) => {
        try {
            // console.log(choiceGalaxy);
            // console.log(travel);
            // const data = await apiRef.getData(process.env.REACT_APP_URL + 'resources/energy');
            const data = await apiRef.getDataPlanetsGalaxy(
                process.env.REACT_APP_URL +
                    "App/Calls/getDataPlanetsGalaxy.php",
                choiceGalaxy
            );
            // const dataEnergyCapacity = await apiRef.getEquipment(process.env.REACT_APP_URL + 'App/Calls/getEquipment.php', dataLevels.energy_capacity_level, 'energy_capacity');
            // console.log(data);
            setInfosPlanetsGalaxy(data);
        } catch (err) {
            console.error(err);
        }
    }, []);

    // useEffect(() => {
    //     getEnergy();
    // }, [energy]);

    // navigate("/terre", { replace: true });

    const substractEnergyTravel = (galaxy, departure, arrival) => {
        if (galaxy === "0") {
            const travel = departure + "-" + arrival;
            getEnergyTravel(travel).then((energyTravelResponse) => {
                // console.log(energyTravelResponse);
                if (energyInfos.energy >= energyTravelResponse) {
                    // const energyUpdated = energy - energyTravel;
                    // setEnergy(energyUpdated);
                    // console.log(energy);

                    const linkArrival = `/${galaxy}/` + arrival;
                    saveEnergyAfterTravel(travel);
                    // pour mettre à jour l'énergie, le setenergy ici ne fonctionne pas après le refresh de la page, mais les fois d'après oui
                    getEnergy();
                    navigate(linkArrival, { replace: true });
                    // getData();
                    setPlace(arrival);
                    savePosition(arrival, 0);
                    getCrystalInfos();
                } else {
                    const linkDeparture = "/0/" + departure;
                    toast.error(
                        "Pas assez d'énergie pour aller sur " +
                            arrival[0].toUpperCase() +
                            arrival.slice(1) +
                            " (" +
                            energyTravelResponse +
                            " énergie nécessaire)",
                        { duration: 10000 }
                    );
                    navigate(linkDeparture, { replace: true });
                }
            });
        } else {
            // récupérer l'énergie de changement de galaxie
            // voir si assez d'énergie
            // se caler sur en haut pour la suite
            // const linkArrival = `/0/` + arrival;
            // navigate(linkArrival, { replace: true });
            if (true) {
                // const energyUpdated = energy - energyTravel;
                // setEnergy(energyUpdated);
                // console.log(energy);

                const linkArrival = `/0/` + arrival;
                // 1 saveEnergyAfterTravel(travel);
                // pour mettre à jour l'énergie, le setenergy ici ne fonctionne pas après le refresh de la page, mais les fois d'après oui
                // 1 getEnergy();
                navigate(linkArrival, { replace: true });
                // getData();
                setPlace(arrival);
                savePosition(arrival, 0);
                getCrystalInfos();
            } else {
                // const linkDeparture = "/0/" + departure;
                // toast.error(
                //     "Pas assez d'énergie pour aller sur " +
                //         arrival[0].toUpperCase() +
                //         arrival.slice(1) +
                //         " (" +
                //         energyTravelResponse +
                //         " énergie nécessaire)",
                //     { duration: 10000 }
                // );
                // navigate(linkDeparture, { replace: true });
            }
        }
        // console.log(energytravel);
        // console.log(en);
        //         console.log(energy);
        // console.log(energyTravel);
    };
    // const planets = ['terre', 'mars', 'jupiter', 'saturne', 'uranus', 'neptune'];
    // {planets.map((planet) =>  {if (path !== '/terre')
    //         return <div className="link" onClick={() => substractEnergyTravel(place, 'terre')}/*onClick={handleDisplayEarth}*/>Terre1</div>
    //         })}

    const handleClose = () => {
        setOpen(false);
    };
    const Transition = forwardRef(function Transition(props, ref) {
        return <Slide direction="down" ref={ref} {...props} />;
    });

    // const rows = [
    //   { id: 1, col1: 'Hello', col2: 'World' },
    //   { id: 2, col1: 'DataGridPro', col2: 'is Awesome' },
    //   { id: 3, col1: 'MUI', col2: 'is Amazing' },
    // ];
    const rows = [];

    infosPlanetsGalaxy.forEach((planet) => {
        let energyTravel = 0;
        // let realNumberPlanet = 1;
        // if (parseInt(path.split("/")[2], 10) === 1) {
        //     realNumberPlanet = 500;
        // } else {
        //     realNumberPlanet = parseInt(path.split("/")[2], 10);
        // }
        if (
            parseInt(planet.planet, 10) > parseInt(path.split("/")[2], 10) /*&&
            parseInt(planet.planet, 10) + parseInt(path.split("/")[2], 10) <=
                250*/
        ) {
            // if (parseInt(planet.planet, 10) + parseInt(path.split("/")[2]) >= 250) {
            //     energyTravel = Math.abs(
            //         (500 -
            //             parseInt(planet.planet, 10) -
            //             parseInt(path.split("/")[2], 10)) *
            //             50
            //     );
            // } else {
            //     energyTravel =
            //         (parseInt(planet.planet, 10) +
            //             parseInt(path.split("/")[2], 10)) *
            //         50;
            // }
            energyTravel =
                (parseInt(planet.planet, 10) -
                    parseInt(path.split("/")[2], 10)) *
                50;
        } else if (
            parseInt(planet.planet, 10) < parseInt(path.split("/")[2], 10)
        ) {
            energyTravel = Math.abs(
                (parseInt(planet.planet, 10) -
                    parseInt(path.split("/")[2], 10)) *
                    50
            );
        } else {
            energyTravel = "-";
        }
        rows.push({
            id: planet.id,
            numberPlanet: parseInt(planet.planet, 10),
            isDestroyed: planet.is_destroyed,
            isVisited: planet.is_visited,
            lastVisit: planet.last_visit,
            hasEnemy: planet.has_enemy,
            crystalLevel: planet.crystal_level,
            energy: path.split("/")[1] === "0" ? energyGalaxy : energyTravel,
        });
    });

    // const test = () => {
    //     console.log("réussi");
    // };

    const savePosition = useCallback(async (place, choiceGalaxy) => {
        try {
            // console.log(choiceGalaxy);
            // const data = await apiRef.getData(process.env.REACT_APP_URL + 'resources/energy');
            await apiRef.savePosition(
                process.env.REACT_APP_URL + "App/Calls/savePosition.php",
                place,
                choiceGalaxy
            );
            getData();
            getCrystalInfos();
        } catch (err) {
            console.error(err);
        }
    }, []);

    const columns = [
        {
            field: "numberPlanet",
            headerName: "N° planète",
            width: 140,
            renderCell: (cellValues) => (
                <Link
                    to={`${choiceGalaxy}/${cellValues.row.numberPlanet}`}
                    style={{
                        color: "white",
                        textDecoration: "none",
                        fontWeight: "bold",
                    }}
                    onClick={() => {
                        setOpen(false);
                        setPlace(cellValues.row.numberPlanet);
                        setGalaxy(choiceGalaxy);
                        savePosition(cellValues.row.numberPlanet, choiceGalaxy);
                        // test();
                        // console.log(choiceGalaxy);
                    }}
                >
                    {cellValues.row.numberPlanet}
                </Link>
            ),
        },
        { field: "energy", headerName: "Énergie nécessaire", width: 140 },
        {
            field: "isDestroyed",
            headerName: "Détruite ?",
            width: 140,
            renderCell: (cellValues) =>
                cellValues.row.isDestroyed === "1" ? "Oui" : "Non",
        },
        {
            field: "isVisited",
            headerName: "Visitée ?",
            width: 140,
            renderCell: (cellValues) =>
                cellValues.row.isVisited === "1" ? "Oui" : "Non",
        },
        {
            field: "lastVisit",
            headerName: "Dernière visite",
            width: 200,
            renderCell: (cellValues) =>
                cellValues.row.isVisited === "1"
                    ? cellValues.row.lastVisit
                    : "-",
        },
        {
            field: "hasEnemy",
            headerName: "Ennemi ?",
            width: 140,
            renderCell: (cellValues) =>
                cellValues.row.isVisited === "1"
                    ? cellValues.row.hasEnemy === "1"
                        ? "Oui"
                        : "Non"
                    : "-",
        },
        {
            field: "crystalLevel",
            headerName: "Niveau cristal",
            width: 140,
            renderCell: (cellValues) =>
                cellValues.row.isVisited === "1"
                    ? cellValues.row.crystalLevel
                    : "-",
        },
        { field: "col7", headerName: "Mithril ?", width: 140 },
        { field: "col8", headerName: "Orichalque ?", width: 140 },
        { field: "col9", headerName: "Thorium ?", width: 140 },
    ];

    useEffect(() => {
        // console.log(choiceGalaxy);
    }, [choiceGalaxy]);

    function LoadingText() {
        return (
            <Box sx={{ textAlign: "center", mt: 40 }}>
                Chargement des planètes
            </Box>
        );
    }

    const getGalaxyInfos = useCallback(async (galaxyNumber) => {
        try {
            const data = await apiRef.getGalaxyInfos(
                process.env.REACT_APP_URL + "App/Calls/getGalaxyInfos.php",
                galaxyNumber
            );

            if (mounted.current) {
                // console.log(data.name);
                setEnergyGalaxy(data.energy_travel);
            }
        } catch (err) {
            console.error(err);
        }
    }, []);

    return (
        <>
            <Dialog
                open={open}
                TransitionComponent={Transition}
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
                <DialogTitle>Planètes</DialogTitle>
                <DialogContent>
                    {/* <DialogContentText id="alert-dialog-slide-description"> */}
                    <Box
                        style={{ height: 700, width: "100%" }}
                        sx={{
                            backgroundColor: "#434A54",
                            color: "white",
                        }}
                    >
                        <DataGrid
                            height={300}
                            rows={rows}
                            columns={columns}
                            rowsPerPageOptions={[50, 100]}
                            pageSize={50}
                            localeText={
                                frFR.components.MuiDataGrid.defaultProps
                                    .localeText
                            }
                            components={{
                                NoRowsOverlay: LoadingText,
                                // Pagination: { color: "white" },
                            }}
                            initialState={{
                                sorting: {
                                    sortModel: [
                                        { field: "numberPlanet", sort: "asc" },
                                    ],
                                },
                            }}
                            sx={{
                                backgroundColor: "#434A54",
                                color: "white",
                            }}
                            // componentsProps={{
                            //     columnMenu: {
                            //         background: "red",
                            //     },
                            // }}
                            // componentsProps={{
                            //     pagination: {
                            //         labelRowsPerPage: (
                            //             <Box sx={{ color: "white" }}>
                            //                 Lignes par page
                            //             </Box>
                            //         ),
                            //         // Pagination: { color: "white" },
                            //     },
                            // }}
                            //   localeText={{columnMenuSortAsc: 'Tri croissant',
                            // footerTotalVisibleRows: (visibleCount, totalCount) =>
                            //     `${visibleCount.toLocaleString()} sur ${totalCount.toLocaleString()}`}}
                        />
                    </Box>
                    {/* </DialogContentText> */}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} style={{ color: "white" }}>
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
            <nav>
                {/* <Link className="link" to="/">Accueil</Link> */}
                <h3 style={{ color: "#11aa55" }}>Système solaire</h3>
                {path !== "/0/terre" && (
                    <div
                        className="link"
                        onClick={() => {
                            substractEnergyTravel(galaxy, place, "terre");
                            setGalaxy("0");
                        }} /*onClick={handleDisplayEarth}*/
                    >
                        Terre
                    </div>
                )}
                {path !== "/0/mars" && (
                    <div
                        className="link"
                        onClick={() => {
                            substractEnergyTravel(galaxy, place, "mars");
                            setGalaxy("0");
                        }} /*onClick={handleDisplayMoon}*/
                    >
                        Mars
                    </div>
                )}
                {path !== "/0/jupiter" && (
                    <div
                        className="link"
                        onClick={() => {
                            substractEnergyTravel(galaxy, place, "jupiter");
                            setGalaxy("0");
                        }}
                    >
                        Jupiter
                    </div>
                )}
                {path !== "/0/saturne" && (
                    <div
                        className="link"
                        onClick={() => {
                            substractEnergyTravel(galaxy, place, "saturne");
                            setGalaxy("0");
                        }}
                    >
                        Saturne
                    </div>
                )}
                {path !== "/0/uranus" && (
                    <div
                        className="link"
                        onClick={() => {
                            substractEnergyTravel(galaxy, place, "uranus");
                            setGalaxy("0");
                        }}
                    >
                        Uranus
                    </div>
                )}
                {path !== "/0/neptune" && (
                    <div
                        className="link"
                        onClick={() => {
                            substractEnergyTravel(galaxy, place, "neptune");
                            setGalaxy("0");
                        }}
                    >
                        Neptune
                    </div>
                )}
                {energyInfos.energy >= 800000 && (
                    <>
                        <div style={{ height: "20px" }}></div>
                        <h3 style={{ color: "#11aa55" }}>Galaxies</h3>
                        <div
                            className="link"
                            onClick={() => {
                                setOpen(true);
                                setChoiceGalaxy(1);
                                getDataPlanetsGalaxy(1);
                                getGalaxyInfos(1);
                            }}
                        >
                            Andromède
                        </div>
                    </>
                )}
                {energyInfos.energy >= 800000 && (
                    <>
                        <div
                            className="link"
                            onClick={() => {
                                setOpen(true);
                                setChoiceGalaxy(2);
                                getDataPlanetsGalaxy(2);
                            }}
                        >
                            Roue de chariot
                        </div>
                    </>
                )}
            </nav>
        </>
    );
}
export default SideBar;
