import '../App.css';
import '../index.css';
import SideBar from '../component/SideBar';
import { BrowserRouter as Router, Route, Routes, useNavigate, useLocation } from 'react-router-dom'
import { useEffect, useState, useCallback } from 'react';
import { apiRef } from "../api/apiRef"
import useMounted from 'react-use-mounted';
import Planet from '../component/Planet';
import { Toaster } from 'react-hot-toast';
import { Button } from "@mui/material";
// import {useNavigation} from '@react-navigation/native';

// const place = 'test';

function App() {
  // const [isOnMoon, setIsOnMoon] = useState(false);
  // const [isOnEarth, setIsOnEarth] = useState(true);
  const mounted = useMounted();
  const [energy, setEnergy] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  // const [isLoadingLocal, setIsLoadingLocal] = useState(true);
  const [home, setHome] = useState(null);
  const [stockageEnergy, setStockageEnergy] = useState(40000);
  const [stockageCrystal, setStockageCrystal] = useState(40000);
  const [stockageEnergyLevel, setStockageEnergyLevel] = useState(1);
  const [regenerationEnergyLevel, setRegenerationEnergyLevel] = useState(1);
  const [regenerationEnergy, setRegenerationEnergy] = useState(20);
  const [regenerationNextEnergy, setNextRegenerationEnergy] = useState(0);
  const [crystalEnergyRegeneration, setCrystalEnergyRegeneration] = useState(0);
  const [place, setPlace] = useState('');
  const navigate = useNavigate();
  const path = useLocation();
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
    // const [nextCrystalStockageStarship setNextCrystalStockageStarship] = useState(0);

  const getInfos = useCallback(async (/*isLoading, regenerationEnergyLevel, regenerationEnergy, stockageEnergy*/) => {
        try {
            setIsLoading(true);
            // isLoading = true;
            // const data = await apiRef.getData(process.env.REACT_APP_URL + 'resources/energy');
            const dataEnergy = await apiRef.getData(process.env.REACT_APP_URL + 'App/Calls/getEnergy.php');
            const dataPlace = await apiRef.getPlace(process.env.REACT_APP_URL + 'App/Calls/getPlace.php');
            const dataLevels = await apiRef.getLevels(process.env.REACT_APP_URL + 'App/Calls/getLevels.php');
            // const nextLevelEnergy = dataLevels.energy_regeneration_level + 1;
            // console.log(nextLevelEnergy);
            const dataEnergyRegeneration = await apiRef.getEquipment(process.env.REACT_APP_URL + 'App/Calls/getEquipment.php', dataLevels.energy_regeneration_level, 'energy_regeneration');
            const dataNextEnergyRegeneration = await apiRef.getEquipment(process.env.REACT_APP_URL + 'App/Calls/getEquipment.php', parseInt(dataLevels.energy_regeneration_level, 10) + 1, 'energy_regeneration');
            const dataEnergyCapacity = await apiRef.getEquipment(process.env.REACT_APP_URL + 'App/Calls/getEquipment.php', dataLevels.energy_capacity_level, 'energy_capacity');
            const dataCrystalCapacity = await apiRef.getEquipment(process.env.REACT_APP_URL + 'App/Calls/getEquipment.php', dataLevels.crystal_capacity_level, 'crystal_capacity');
            // console.log(typeof dataLevels.energy_regeneration_level);

            // await console.log(regenerationEnergyLevel);
            // const dataEquipment = await apiRef.getEquipment(process.env.REACT_APP_URL + 'App/Calls/getEquipment.php', dataLevels.energy_capacity_level, dataLevels.energy_regeneration_level);
            
            if (mounted.current) {
                // isLoading = false;
                setEnergy(parseInt(dataEnergy.energy, 10));
                setStockageEnergyLevel(parseInt(dataLevels.energy_capacity_level, 10));
                setRegenerationEnergyLevel(parseInt(dataLevels.energy_regeneration_level, 10));
                // regenerationEnergyLevel = parseInt(dataLevels.energy_regeneration_level, 10);
                setStockageEnergy(parseInt(dataEnergyCapacity.quantity));
                setStockageCrystal(parseInt(dataCrystalCapacity.quantity));
                setRegenerationEnergy(parseInt(dataEnergyRegeneration.quantity));
                setNextRegenerationEnergy(dataNextEnergyRegeneration.quantity);
                setCrystalEnergyRegeneration(dataEnergyRegeneration.crystal);
                // regenerationEnergy = parseInt(dataEnergyRegeneration.data.quantity, 10);
                // stockageEnergy = parseInt(dataEnergyCapacity.data.quantity, 10);
                setPlace(dataPlace.place);
                
                switch(dataPlace.place){
                  case 'terre':
                    // setHome(<Earth energy={parseInt(dataEnergy.energy, 10)} stockage={stockageEnergy} isLoading={isLoading} regeneration={regenerationEnergy} generator={regenerationEnergyLevel} />);
                    navigate("/terre", { replace: true });
                    break;
                  case 'mars':
                    navigate("/mars", { replace: true });
                    // setHome(<Moon
                    //   energy={parseInt(dataEnergy.energy, 10)}
                    //   stockage={stockageEnergy}
                    //   isLoading={isLoading}
                    //   regeneration={regenerationEnergy}
                    //   generator={regenerationEnergyLevel}
                    //   setEnergy={setEnergy}/>);
                    break;
                  case 'jupiter':
                    navigate("/jupiter", { replace: true });
                    break;
                  case 'saturne':
                    navigate("/saturne", { replace: true });
                    break;
                  case 'uranus':
                    navigate("/uranus", { replace: true });
                    break;
                  case 'neptune':
                    navigate("/neptune", { replace: true });
                    break;
                  default:
                    navigate("/", { replace: true });
                    // setHome(null);
                    break;
                }
                
                setIsLoading(false);
            }
            
            
        } catch (err) {
            console.error(err);
        }
            
    }, [mounted, regenerationEnergyLevel]);

      const addLevelRegenerationEnergy = useCallback(async () => {
        try {

            // const data = await apiRef.getData(process.env.REACT_APP_URL + 'resources/energy');
            await apiRef.addLevelStarship(process.env.REACT_APP_URL + 'App/Calls/addLevelStarship.php', 'energy_regeneration_level');
            // const dataEnergyCapacity = await apiRef.getEquipment(process.env.REACT_APP_URL + 'App/Calls/getEquipment.php', dataLevels.energy_capacity_level, 'energy_capacity');
            // console.log(typeof dataLevels.energy_regeneration_level);
            
        } catch (err) {
            console.error(err);
        }
            
    }, []);

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

    const getCrystalInfos = useCallback(async () => {
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

            setEnergy(dataEnergy.energy);
            setStockCrystal(dataCrystal.crystal);
            setStockCrystalPlanet(dataCrystalPlanet.crystal);
            setStockageCrystalPlanet(dataStockagePlanet.crystal_stockage);
            setStockCrystalStarship(dataCrystalStarship.crystal);

            
        } catch (err) {
            console.error(err);
        }
            
    }, []);

    useEffect(() => {
        getInfos();
    }, [getInfos]);

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
    // console.log(home);
    // console.log(crystalEnergyRegeneration);
  return (
    <>
    <Toaster />
    <div style={{display: 'flex'}}>
      {isLoading ? (
      ''
    ) : (
    <SideBar path={path.pathname} place={place} energy={energy} setEnergy={setEnergy} getData={getData} getCrystalInfos ={getCrystalInfos }
    // isOnMoon={isOnMoon}
    // isOnEarth={isOnEarth}
    />
    )}
    <div>
    <div className="App">
      <header className="App-header">
        Bienvenue sur Serenity, le jeu d'exploration spatiale !
      </header>
    </div>
    {/* {isOnEarth && <Earth />} */}
    {isLoading ? (
      <div className='loading'>Chargement</div>
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
          <Route path="/mars" element={<Planet
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
            place='mars' />}
          />
          <Route path="/terre" element={<Planet
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
            place='terre' />}
          />
          <Route path="/jupiter" element={<Planet
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
            place='jupiter' />}
          />
          <Route path="/saturne" element={<Planet
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
            place='saturne' />}
          />
          <Route path="/uranus" element={<Planet
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
            place='uranus' />}
          />
          <Route path="/neptune" element={<Planet
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
            place='neptune' />}
          />
        </Routes>
    )}
    
        </div>
        </div>
        </>
        
  );
}

export default App;
