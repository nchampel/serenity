import '../App.css';
import '../index.css';
import SideBar from '../component/SideBar';
import { BrowserRouter as Router, Route, Routes, useNavigate, useLocation } from 'react-router-dom'
import { useEffect, useState, useCallback } from 'react';
import { apiRef } from "../api/apiRef"
import useMounted from 'react-use-mounted';
import Planet from '../component/Planet';
import { Toaster } from 'react-hot-toast';
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
  const [stockageEnergy, setStockageEnergy] = useState(200000);
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
            // console.log(typeof dataLevels.energy_regeneration_level);

            // await console.log(regenerationEnergyLevel);
            // const dataEquipment = await apiRef.getEquipment(process.env.REACT_APP_URL + 'App/Calls/getEquipment.php', dataLevels.energy_capacity_level, dataLevels.energy_regeneration_level);
            
            if (mounted.current) {
                // isLoading = false;
                setEnergy(parseInt(dataEnergy.energy, 10));
                setStockageEnergyLevel(parseInt(dataLevels.energy_capacity_level, 10));
                setRegenerationEnergyLevel(parseInt(dataLevels.energy_regeneration_level, 10));
                // regenerationEnergyLevel = parseInt(dataLevels.energy_regeneration_level, 10);
                setStockageEnergy(parseInt(dataEnergyCapacity.data.quantity));
                setRegenerationEnergy(parseInt(dataEnergyRegeneration.data.quantity));
                setNextRegenerationEnergy(dataNextEnergyRegeneration.data.quantity);
                setCrystalEnergyRegeneration(dataEnergyRegeneration.data.crystal);
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
            await apiRef.addLevel(process.env.REACT_APP_URL + 'App/Calls/addLevel.php', 'energy_regeneration_level');
            // const dataEnergyCapacity = await apiRef.getEquipment(process.env.REACT_APP_URL + 'App/Calls/getEquipment.php', dataLevels.energy_capacity_level, 'energy_capacity');
            // console.log(typeof dataLevels.energy_regeneration_level);

            // await console.log(regenerationEnergyLevel);
            // const dataEquipment = await apiRef.getEquipment(process.env.REACT_APP_URL + 'App/Calls/getEquipment.php', dataLevels.energy_capacity_level, dataLevels.energy_regeneration_level);
            
            // if (mounted.current) {
            //     isLoading = false;
            //     setEnergy(parseInt(dataEnergy.energy));
            //     setStockageEnergyLevel(parseInt(dataLevels.energy_capacity_level, 10));
            //     setRegenerationEnergyLevel(parseInt(dataLevels.energy_regeneration_level, 10));
            //     regenerationEnergyLevel = parseInt(dataLevels.energy_regeneration_level, 10);
            //     setStockageEnergy(parseInt(dataEnergyCapacity.data.quantity));
            //     setRegenerationEnergy(parseInt(dataEnergyRegeneration.data.quantity));
            //     regenerationEnergy = parseInt(dataEnergyRegeneration.data.quantity, 10);
            //     stockageEnergy = parseInt(dataEnergyCapacity.data.quantity, 10);
                
            //     switch(dataPlace.place){
            //       case 'earth':
            //         setHome(<Earth energy={parseInt(dataEnergy.energy, 10)} stockage={stockageEnergy} isLoading={isLoading} regeneration={regenerationEnergy} generator={regenerationEnergyLevel} />);
            //         break;
            //       case 'moon':
            //         setHome(<Moon energy={parseInt(dataEnergy.energy, 10)} stockage={stockageEnergy} isLoading={isLoading} regeneration={regenerationEnergy} generator={regenerationEnergyLevel} />);
            //         break;
            //       default:
            //         setHome(null);
            //         break;
            //     }
                
            //     setIsLoading(false);
            // }
            
            
        } catch (err) {
            console.error(err);
        }
            
    }, []);

    useEffect(() => {
        getInfos();
    }, [getInfos]);

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

    const handleAddingLevelRegenerationEnergy = () => {
      setRegenerationEnergyLevel(regenerationEnergyLevel + 1);
      addLevelRegenerationEnergy();
    };
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
    <SideBar path={path.pathname} place={place} energy={energy} setEnergy={setEnergy}
    // isOnMoon={isOnMoon}
    // isOnEarth={isOnEarth}
    />
    )}
    <div>
    <div className="App">
      <header className="App-header">
        Bienvenue sur Serenity, le jeu d'exploration spatiale !
      </header>
      {regenerationEnergyLevel < 12 && (
        <button onClick={handleAddingLevelRegenerationEnergy}>Augmenter la régénération de l'énergie ({String(crystalEnergyRegeneration * 60).replace(/(.)(?=(\d{3})+$)/g,'$1 ')} cristaux)</button>
      )}
      
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
            place='terre' />}
          />
        </Routes>
    )}
    
        </div>
        </div>
        </>
        
  );
}

export default App;
