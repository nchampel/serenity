/* eslint-disable default-case */
import "../App.css";
import "../index.css";
import SideBar from "../component/SideBar";
import {
    BrowserRouter as Router,
    Route,
    Routes,
    useNavigate,
    useLocation,
} from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import { apiRef } from "../api/apiRef";
import useMounted from "react-use-mounted";
import Planet from "../component/Planet";
import { Toaster } from "react-hot-toast";
import Panel from "../screens/Panel";
import SignIn from "../screens/SignIn";
import PrivateRoute from "../components/PrivateRoute";
import Fight from "../component/Fight";
// import { Button } from "@mui/material";
// import {useNavigation} from '@react-navigation/native';

// const place = 'test';

function App() {
    // const [isOnMoon, setIsOnMoon] = useState(false);
    // const [isOnEarth, setIsOnEarth] = useState(true);
    const mounted = useMounted();
    // const [energy, setEnergy] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    // const [isLoadingLocal, setIsLoadingLocal] = useState(true);
    // const [home, setHome] = useState(null);
    // const [stockageEnergy, setStockageEnergy] = useState(0);
    // const [crystalStockageEnergy, setCrystalStockageEnergy] = useState(0);
    const [stockageCrystal, setStockageCrystal] = useState(0);
    // const [stockageEnergyLevel, setStockageEnergyLevel] = useState(1);
    // const [regenerationEnergyLevel, setRegenerationEnergyLevel] = useState(1);
    const [weaponLevel, setWeaponLevel] = useState(1);
    const [lifePointsLevel, setLifePointsLevel] = useState(1);
    // const [regenerationEnergy, setRegenerationEnergy] = useState(20);
    // const [regenerationNextEnergy, setNextRegenerationEnergy] = useState(0);
    // const [crystalEnergyRegeneration, setCrystalEnergyRegeneration] = useState(0);
    const [place, setPlace] = useState("");
    const navigate = useNavigate();
    const path = useLocation();
    const [galaxy, setGalaxy] = useState(0);
    const [choiceGalaxy, setChoiceGalaxy] = useState(null);
    const [energyInfos, setEnergyInfos] = useState({
        stockageEnergyLevel: 1,
        energy: 1,
        regenerationEnergyLevel: 1,
        stockageEnergy: 0,
        nextStockageEnergy: 0,
        crystalStockageEnergy: 0,
        regenerationEnergy: 0,
        nextRegenerationEnergy: 0,
        crystalEnergyRegeneration: 0,
    });
    const [starship, setStarship] = useState({
        crystalLifePoints: 0,
        crystalWeapon: 0,
        weaponLevel: 1,
        lifePointsLevel: 1,
        stockageCrystal: 0,
        stockCrystalStarship: 0,
        place: "",
        nextStockageCrystalStarship: 0,
    });
    const [planet, setPlanet] = useState({
        stockCrystalPlanet: 0,
        stockageCrystalPlanet: 0,
        stockageCrystalPlanetLevel: 1,
        generationCrystalLevel: 1,
        generationCrystal: 1,
        nextGenerationCrystal: 2,
        generationCrystalNeeded: 0,
        stockageCrystalNeeded: 0,
        nextStockageCrystal: 0,
        image: "",
        galaxyName: "",
    });
    // const stockage = {
    //   'energy_capacity_level': {1: 200000, 2: 400000}
    // };
    // const regeneration = {
    //   'energy_regeneration_level': {1: 20, 2: 100}
    // }
    // const stockage = 'passé';

    const [stockCrystal, setStockCrystal] = useState(0);
    const [stockCrystalPlanet, setStockCrystalPlanet] = useState(0);
    const [stockageCrystalPlanet, setStockageCrystalPlanet] = useState(0);
    const [stockCrystalStarship, setStockCrystalStarship] = useState(0);
    const [crystalWeapon, setCrystalWeapon] = useState(0);
    const [crystalLifePoints, setCrystalLifePoints] = useState(0);
    const [galaxyName, setGalaxyName] = useState("");

    const getGalaxyInfos = useCallback(async () => {
        try {
            const data = await apiRef.getGalaxyInfos(
                process.env.REACT_APP_URL + "App/Calls/getGalaxyInfos.php",
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
        getGalaxyInfos();
    }, [getGalaxyInfos]);
    // const [nextCrystalStockageStarship setNextCrystalStockageStarship] = useState(0);

    const getInfos = useCallback(
        async (/*isLoading, regenerationEnergyLevel, regenerationEnergy, stockageEnergy*/) => {
            try {
                setIsLoading(true);
                // isLoading = true;
                // const data = await apiRef.getData(process.env.REACT_APP_URL + 'resources/energy');
                const dataEnergy = await apiRef.getData(
                    process.env.REACT_APP_URL + "App/CallsEnergy/getEnergy.php"
                );
                const dataPlace = await apiRef.getPlace(
                    process.env.REACT_APP_URL + "App/Calls/getPlace.php"
                );
                const dataLevels = await apiRef.getLevels(
                    process.env.REACT_APP_URL + "App/CallsLevel/getLevels.php"
                );
                const dataEnergyRegeneration = await apiRef.getEquipment(
                    process.env.REACT_APP_URL + "App/Calls/getEquipment.php",
                    dataLevels.energy_regeneration_level,
                    "energy_regeneration"
                );
                const dataNextEnergyRegeneration = await apiRef.getEquipment(
                    process.env.REACT_APP_URL + "App/Calls/getEquipment.php",
                    parseInt(dataLevels.energy_regeneration_level, 10) + 1,
                    "energy_regeneration"
                );
                const dataEnergyCapacity = await apiRef.getEquipment(
                    process.env.REACT_APP_URL + "App/Calls/getEquipment.php",
                    dataLevels.energy_capacity_level,
                    "energy_capacity"
                );
                const dataCrystalCapacity = await apiRef.getEquipment(
                    process.env.REACT_APP_URL + "App/Calls/getEquipment.php",
                    dataLevels.crystal_capacity_level,
                    "crystal_capacity"
                );
                const dataNextCrystalCapacity = await apiRef.getEquipment(
                    process.env.REACT_APP_URL + "App/Calls/getEquipment.php",
                    parseInt(dataLevels.crystal_capacity_level, 10) + 1,
                    "crystal_capacity"
                );
                const dataWeaponCrystal = await apiRef.getEquipment(
                    process.env.REACT_APP_URL + "App/Calls/getEquipment.php",
                    dataLevels.weapon_level,
                    "weapon_power"
                );
                const dataLifePointsCrystal = await apiRef.getEquipment(
                    process.env.REACT_APP_URL + "App/Calls/getEquipment.php",
                    dataLevels.life_points_level,
                    "life_points"
                );
                const dataNextEnergyStockage = await apiRef.getEquipment(
                    process.env.REACT_APP_URL + "App/Calls/getEquipment.php",
                    parseInt(dataLevels.energy_capacity_level, 10) + 1,
                    "energy_capacity"
                );
                // // cristal sur vaisseau
                const dataCrystalStarship = await apiRef.getData(
                    process.env.REACT_APP_URL +
                        "App/Calls/getCrystalStarship.php"
                );
                // console.log(dataEnergyCapacity);

                // console.log(dataNextCrystalCapacity);
                // const dataEquipment = await apiRef.getEquipment(process.env.REACT_APP_URL + 'App/Calls/getEquipment.php', dataLevels.energy_capacity_level, dataLevels.energy_regeneration_level);

                if (mounted.current) {
                    setWeaponLevel(parseInt(dataLevels.weapon_level, 10));
                    setLifePointsLevel(
                        parseInt(dataLevels.life_points_level, 10)
                    );
                    setStockageCrystal(
                        parseInt(dataCrystalCapacity.quantity, 10)
                    );
                    setCrystalWeapon(dataWeaponCrystal.crystal);
                    setCrystalLifePoints(dataLifePointsCrystal.crystal);
                    setPlace(dataPlace.place);
                    setGalaxy(dataPlace.galaxy);
                    setEnergyInfos({
                        ...energyInfos,
                        stockageEnergyLevel: parseInt(
                            dataLevels.energy_capacity_level,
                            10
                        ),
                        energy: parseInt(dataEnergy.energy, 10),
                        regenerationEnergyLevel: parseInt(
                            dataLevels.energy_regeneration_level,
                            10
                        ),
                        stockageEnergy: parseInt(
                            dataEnergyCapacity.quantity,
                            10
                        ),
                        crystalStockageEnergy: parseInt(
                            dataEnergyCapacity.crystal,
                            10
                        ),
                        regenerationEnergy: parseInt(
                            dataEnergyRegeneration.quantity,
                            10
                        ),
                        nextRegenerationEnergy: parseInt(
                            dataNextEnergyRegeneration.quantity,
                            10
                        ),
                        crystalEnergyRegeneration: parseInt(
                            dataEnergyRegeneration.crystal,
                            10
                        ),
                        nextStockageEnergy: parseInt(
                            dataNextEnergyStockage.quantity,
                            10
                        ),
                    });
                    setStarship({
                        ...starship,
                        weaponLevel: parseInt(dataLevels.weapon_level, 10),
                        lifePointsLevel: parseInt(
                            dataLevels.life_points_level,
                            10
                        ),
                        crystalLifePoints: parseInt(
                            dataLifePointsCrystal.crystal,
                            10
                        ),
                        crystalWeapon: parseInt(dataWeaponCrystal.crystal, 10),
                        stockageCrystal: parseInt(
                            dataCrystalCapacity.quantity,
                            10
                        ),
                        place: dataPlace.place,
                        nextStockageCrystalStarship: parseInt(
                            dataNextCrystalCapacity.quantity,
                            10
                        ),
                        stockCrystalStarship: parseInt(
                            dataCrystalStarship.crystal,
                            10
                        ),
                    });
                    if (path.pathname !== "/fight") {
                        switch (dataPlace.place) {
                            case "fight":
                                navigate("/fight", { replace: true });
                                break;
                            case "terre":
                                // setHome(<Earth energy={parseInt(dataEnergy.energy, 10)} stockage={stockageEnergy} isLoading={isLoading} regeneration={regenerationEnergy} generator={regenerationEnergyLevel} />);
                                navigate(`/${galaxy}/terre`, { replace: true });
                                break;
                            case "mars":
                                navigate(`/${galaxy}/mars`, { replace: true });
                                break;
                            case "jupiter":
                                navigate(`/${galaxy}/jupiter`, {
                                    replace: true,
                                });
                                break;
                            case "saturne":
                                navigate(`/${galaxy}/saturne`, {
                                    replace: true,
                                });
                                break;
                            case "uranus":
                                navigate(`/${galaxy}/uranus`, {
                                    replace: true,
                                });
                                break;
                            case "neptune":
                                navigate(`/${galaxy}/neptune`, {
                                    replace: true,
                                });
                                break;
                            default:
                                navigate(`/${galaxy}/${dataPlace.place}`, {
                                    replace: true,
                                });
                                // setHome(null);
                                break;
                        }
                    }

                    setIsLoading(false);
                }
            } catch (err) {
                console.error(err);
            }
        },
        [
            mounted,
            energyInfos.regenerationEnergyLevel /*, weaponLevel, stockageEnergyLevel,energyInfos.stockageEnergyLevel, lifePointsLevel, */,
        ]
    );

    const getData = useCallback(
        async (energyInfos, starship) => {
            try {
                setIsLoading(true);
                // const data = await apiRef.getData(process.env.REACT_APP_URL + 'resources/energy');
                const dataPlace = await apiRef.getPlace(
                    process.env.REACT_APP_URL + "App/Calls/getPlace.php"
                );
                const dataEnergy = await apiRef.getData(
                    process.env.REACT_APP_URL + "App/CallsEnergy/getEnergy.php"
                );
                // // cristal sur Terre
                const dataCrystal = await apiRef.getCrystal(
                    process.env.REACT_APP_URL +
                        "App/CallsCrystal/getCrystal.php",
                    "terre"
                );
                // // cristal sur vaisseau
                const dataCrystalStarship = await apiRef.getData(
                    process.env.REACT_APP_URL +
                        "App/Calls/getCrystalStarship.php"
                );
                // // cristal sur planète autre que Terre
                const dataCrystalPlanet = await apiRef.getCrystal(
                    process.env.REACT_APP_URL +
                        "App/CallsCrystal/getCrystal.php",
                    dataPlace.place,
                    dataPlace.galaxy
                );
                // //stockage cristal sur planète
                const dataStockagePlanet = await apiRef.getCrystal(
                    process.env.REACT_APP_URL +
                        "App/Calls/getCrystalStockagePlanet.php",
                    dataPlace.place,
                    dataPlace.galaxy
                );

                const dataLevelsPlanet = await apiRef.getLevelsPlanet(
                    process.env.REACT_APP_URL +
                        "App/CallsLevel/getLevelsPlanet.php",
                    dataPlace.place,
                    dataPlace.galaxy
                );

                const dataGenerationCrystalPlanet = await apiRef.getInfosPlanet(
                    process.env.REACT_APP_URL +
                        "App/Calls/getCrystalPlanetInfos.php",
                    dataPlace.place,
                    dataPlace.galaxy,
                    "crystal_generation"
                );
                const dataNextGenerationCrystalPlanet =
                    await apiRef.getInfosPlanet(
                        process.env.REACT_APP_URL +
                            "App/Calls/getNextCrystalPlanetInfos.php",
                        dataPlace.place,
                        dataPlace.galaxy,
                        "crystal_generation"
                    );
                const dataNextStockageCrystalPlanet =
                    await apiRef.getInfosPlanet(
                        process.env.REACT_APP_URL +
                            "App/Calls/getNextCrystalPlanetInfos.php",
                        dataPlace.place,
                        dataPlace.galaxy,
                        "crystal_stockage"
                    );
                const dataStockageCrystalPlanet = await apiRef.getInfosPlanet(
                    process.env.REACT_APP_URL +
                        "App/Calls/getCrystalPlanetInfos.php",
                    dataPlace.place,
                    dataPlace.galaxy,
                    "crystal_stockage"
                );

                const dataGalaxyInfos = await apiRef.getGalaxyInfos(
                    process.env.REACT_APP_URL + "App/Calls/getGalaxyInfos.php",
                    galaxy
                );

                setGalaxyName(dataGalaxyInfos.name);

                // console.log(dataCrystalPlanet);
                // if (mounted.current) {
                // setEnergy(dataEnergy.energy);
                // console.log(dataCrystalPlanet.crystal);
                setStockCrystal(parseInt(dataCrystal.crystal, 10));
                setStockCrystalPlanet(dataCrystalPlanet.crystal);
                setStockageCrystalPlanet(dataStockagePlanet.quantity);
                setStockCrystalStarship(dataCrystalStarship.crystal);
                // console.log(dataGenerationCrystalPlanet);
                setEnergyInfos({
                    ...energyInfos,
                    energy: parseInt(dataEnergy.energy, 10),
                });
                // setStarship({
                //   ...starship,
                //   stockCrystalStarship: parseInt(dataCrystalStarship.crystal, 10),
                //   // nextStockageCrystalStarship:
                // });
                setPlanet({
                    ...planet,
                    stockCrystalPlanet: parseInt(dataCrystalPlanet.crystal, 10),
                    stockageCrystalPlanet: parseInt(
                        dataStockagePlanet.quantity,
                        10
                    ),
                    stockageCrystalPlanetLevel: parseInt(
                        dataLevelsPlanet.crystal_stockage_level,
                        10
                    ),
                    generationCrystalLevel: parseInt(
                        dataLevelsPlanet.crystal_level,
                        10
                    ),
                    generationCrystal: parseInt(
                        dataGenerationCrystalPlanet.quantity,
                        10
                    ),
                    nextGenerationCrystal: parseInt(
                        dataNextGenerationCrystalPlanet.quantity,
                        10
                    ),
                    generationCrystalNeeded: parseInt(
                        dataGenerationCrystalPlanet.crystal,
                        10
                    ),
                    nextStockageCrystal: parseInt(
                        dataNextStockageCrystalPlanet.quantity,
                        10
                    ),
                    stockageCrystalNeeded: parseInt(
                        dataStockageCrystalPlanet.crystal,
                        10
                    ),
                    image: dataCrystalPlanet.image,
                    galaxyName: dataGalaxyInfos.name,
                });
                setIsLoading(false);
                // }
            } catch (err) {
                console.error(err);
            }
        },
        [/*mounted,*/ place /*, starship, stockCrystal*/]
    );

    useEffect(() => {
        // console.log(energyInfos);
    }, [energyInfos]);

    useEffect(() => {
        // console.log(starship);
    }, [starship]);

    useEffect(() => {
        // console.log(planet);
    }, [planet]);

    const getCrystalInfos = useCallback(async () => {
        try {
            setIsLoading(true);
            // const data = await apiRef.getData(process.env.REACT_APP_URL + 'resources/energy');
            const dataPlace = await apiRef.getPlace(
                process.env.REACT_APP_URL + "App/Calls/getPlace.php"
            );
            // console.log(dataPlace);
            const dataEnergy = await apiRef.getData(
                process.env.REACT_APP_URL + "App/CallsEnergy/getEnergy.php"
            );
            // cristal sur Terre
            const dataCrystal = await apiRef.getCrystal(
                process.env.REACT_APP_URL + "App/CallsCrystal/getCrystal.php",
                "terre",
                0
            );
            // cristal sur vaisseau
            const dataCrystalStarship = await apiRef.getData(
                process.env.REACT_APP_URL + "App/Calls/getCrystalStarship.php"
            );
            // cristal sur planète autre que Terre
            const dataCrystalPlanet = await apiRef.getCrystal(
                process.env.REACT_APP_URL + "App/CallsCrystal/getCrystal.php",
                dataPlace.place,
                dataPlace.galaxy
            );
            //stockage cristal sur planète
            const dataStockagePlanet = await apiRef.getCrystal(
                process.env.REACT_APP_URL +
                    "App/Calls/getCrystalStockagePlanet.php",
                dataPlace.place,
                dataPlace.galaxy
            );

            // setEnergy(dataEnergy.energy);
            // console.log(dataPlace.place);
            // console.log(dataCrystalPlanet);
            // console.log(dataStockagePlanet);
            setStockCrystal(parseInt(dataCrystal.crystal, 10));
            setStockCrystalPlanet(dataCrystalPlanet.crystal);
            setStockageCrystalPlanet(dataStockagePlanet.crystal_stockage);
            setStockCrystalStarship(dataCrystalStarship.crystal);

            setEnergyInfos({
                ...energyInfos,
                energy: parseInt(dataEnergy.energy, 10),
            });
            setStarship({
                ...starship,
                stockCrystalStarship: parseInt(dataCrystalStarship.crystal, 10),
            });
            setPlanet({
                ...planet,
                stockCrystalPlanet: parseInt(dataCrystalPlanet.crystal, 10),
                stockageCrystalPlanet: parseInt(
                    dataStockagePlanet.crystal_stockage,
                    10
                ),
            });
            setIsLoading(false);
        } catch (err) {
            console.error(err);
        }
    }, [place]);

    useEffect(() => {
        getInfos();
    }, [getInfos]);

    //     useEffect(() => {
    //     getCrystalInfos();
    // }, [energyInfos.regenerationEnergyLevel]);

    useEffect(() => {
        getData(energyInfos);
        if (path.pathname != "/fight") {
            const timer = setInterval(() => {
                // console.log(energy);
                // if (energy < stockage) {
                //     let updatedEnergy = parseInt(energy, 10) + regeneration;
                //     if (updatedEnergy > stockage){
                //         updatedEnergy = stockage;
                //     }
                //     setEnergy(updatedEnergy);
                // }
                getData(energyInfos);
            }, 600000);
            // 60000 en temps normal
            return () => {
                // Each time a new useEffect is executed, the previous useEffect will be cleaned up
                // This function will be called to clear the previous setInterval timer
                clearInterval(timer);
            };
        }
    }, [energyInfos.energy]);

    // useEffect(() => {
    //     getInfos();
    // }, []);

    // useEffect(() => {
    //   setStockageEnergy(stockage.energy_capacity_level[stockageEnergyLevel]);
    // }, [stockageEnergyLevel]);
    // // console.log(stockageEnergy);

    // useEffect(() => {
    //   setRegenerationEnergy(regeneration.energy_regeneration_level[regenerationEnergyLevel]);
    //   // setRegenerationEnergyLevel(regenerationEnergyLevel);
    // }, [regenerationEnergyLevel]);

    // const handleAddingLevelRegenerationEnergy = () => {
    //   setRegenerationEnergyLevel(regenerationEnergyLevel + 1);
    //   addLevelRegenerationEnergy();
    // };
    // useEffect(() => {
    //   console.log(crystalEnergyRegeneration);
    // }, [crystalEnergyRegeneration]);
    // console.log(regenerationEnergyLevel);

    //   const getPlace = useCallback(async () => {
    //     try {
    //         setIsLoadingLocal(true);
    //         // const data = await apiRef.getData(process.env.REACT_APP_URL + 'resources/energy');
    //         const data = await apiRef.getPlace(process.env.REACT_APP_URL + 'App/Calls/getPlace.php');
    //         if (mounted.current) {
    //             switch(data.place){
    //               case 'earth':
    //                 setHome(<Earth energy={energy} stockage={stockage} isLoading={isLoading} />);
    //                 break;
    //               case 'moon':
    //                 setHome(<Moon energy={energy} stockage={stockage} isLoading={isLoading} />);
    //                 break;
    //               default:
    //                 setHome(null);
    //                 break;
    //             }
    //         }
    //         setIsLoadingLocal(false);

    //     } catch (err) {
    //         console.error(err);
    //     }
    // }, [mounted]);

    // useEffect(() => {
    //     getPlace();
    // }, [getPlace]);
    const planets = [
        "terre",
        "mars",
        "jupiter",
        "saturne",
        "uranus",
        "neptune",
    ];

    const planetNumbers = [];
    for (let i = 1; i <= 500; i++) {
        planetNumbers.push(i);
    }
    // console.log(planetNumbers);
    return (
        <>
            <Toaster />
            <div style={{ display: "flex" }}>
                {isLoading ? (
                    ""
                ) : (
                    <SideBar
                        path={path.pathname}
                        place={place}
                        setPlace={setPlace}
                        getData={getData}
                        getCrystalInfos={getCrystalInfos}
                        energyInfos={energyInfos}
                        setEnergyInfos={setEnergyInfos}
                        galaxy={galaxy}
                        choiceGalaxy={choiceGalaxy}
                        setChoiceGalaxy={setChoiceGalaxy}
                        setGalaxy={setGalaxy}
                    />
                )}
                <div>
                    <div className="App">
                        <header className="App-header">
                            <span
                                style={{
                                    letterSpacing: "50px",
                                    fontWeight: "lighter",
                                    fontSize: "36px",
                                }}
                            >
                                SERENITY
                            </span>
                            <br />
                            Bienvenue sur le jeu d'exploration spatiale !
                        </header>
                    </div>
                    {isLoading ? (
                        <div className="loading">Chargement</div>
                    ) : (
                        <Routes>
                            {/* <Route path="/" element={home} /> */}
                            {/* <Route path="/lune" element={<Moon
                                energy={parseInt(energy, 10)}
                                stockage={stockageEnergy}
                                isLoading={isLoading}
                                regeneration={regenerationEnergy}
                                generator={regenerationEnergyLevel}
                                setEnergy={setEnergy}
                                setPlace={setPlace}/>}
                            /> */}
                            {/* <Route path="/sign-in" element={<SignIn />} />
                            <PrivateRoute path="/" element={<Panel />} /> */}
                            <Route
                                path={"/fight"}
                                key={"fight"}
                                element={
                                    <Fight
                                        energyInfos={energyInfos}
                                        setEnergyInfos={setEnergyInfos}
                                    />
                                }
                            />
                            {planets.map((planetItem) => (
                                <Route
                                    path={`/${galaxy}/${planetItem}`}
                                    key={planetItem}
                                    element={
                                        <Planet
                                            isLoading={isLoading}
                                            setPlace={setPlace}
                                            stockCrystal={stockCrystal}
                                            getCrystalInfos={getCrystalInfos}
                                            getData={getData}
                                            place={planetItem}
                                            energyInfos={energyInfos}
                                            setEnergyInfos={setEnergyInfos}
                                            starship={starship}
                                            setStarship={setStarship}
                                            planet={planet}
                                            setPlanet={setPlanet}
                                            galaxy={galaxy}
                                            setGalaxy={setGalaxy}
                                        />
                                    }
                                />
                            ))}
                            {planetNumbers.map((number) => (
                                <Route
                                    path={`/1/${number}`}
                                    key={number}
                                    element={
                                        <Planet
                                            isLoading={isLoading}
                                            setPlace={setPlace}
                                            stockCrystal={stockCrystal}
                                            getCrystalInfos={getCrystalInfos}
                                            getData={getData}
                                            place={number}
                                            energyInfos={energyInfos}
                                            setEnergyInfos={setEnergyInfos}
                                            starship={starship}
                                            setStarship={setStarship}
                                            planet={planet}
                                            setPlanet={setPlanet}
                                            galaxy={galaxy}
                                            setGalaxy={setGalaxy}
                                            choiceGalaxy={choiceGalaxy}
                                        />
                                    }
                                />
                            ))}
                            {/* <Route path="/mars" element={<Planet
                            energy={parseInt(energy, 10)}
                            stockage={stockageEnergy}
                            isLoading={isLoading}
                            regeneration={regenerationEnergy}
                            nextRegeneration={regenerationNextEnergy}
                            generator={regenerationEnergyLevel}
                            setEnergy={setEnergy}
                            setPlace={setPlace}
                            regenerationEnergyLevel={regenerationEnergyLevel}
                            setRegenerationEnergyLevel={setRegenerationEnergyLevel}
                            crystalEnergyRegeneration={crystalEnergyRegeneration}
                            stockageCrystal={stockageCrystal}
                            stockCrystal={stockCrystal}
                            stockCrystalPlanet={stockCrystalPlanet}
                            stockageCrystalPlanet={stockageCrystalPlanet}
                            stockCrystalStarship={stockCrystalStarship}
                            getData={getData}
                            stockageEnergyLevel={stockageEnergyLevel}
                            setStockageEnergyLevel={setStockageEnergyLevel}
                            place='mars' />}
                            /> */}
                        </Routes>
                    )}
                </div>
            </div>
        </>
    );
}

export default App;
