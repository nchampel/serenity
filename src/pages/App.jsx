import '../App.css';
import SideBar from '../component/SideBar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Moon from './Moon';
import Earth from './Earth';
import { useEffect, useState, useCallback } from 'react';
import { apiRef } from "../api/apiRef"
import useMounted from 'react-use-mounted';

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
  // const stockage = {
  //   'energy_capacity_level': {1: 200000, 2: 400000}
  // };
  // const regeneration = {
  //   'energy_regeneration_level': {1: 20, 2: 100}
  // }
  // const stockage = 'passé';
  const getInfos = useCallback(async (isLoading, regenerationEnergyLevel, regenerationEnergy) => {
        try {
            setIsLoading(true);
            isLoading = true;
            // const data = await apiRef.getData(process.env.REACT_APP_URL + 'resources/energy');
            const dataEnergy = await apiRef.getData(process.env.REACT_APP_URL + 'App/Calls/getEnergy.php');
            const dataPlace = await apiRef.getPlace(process.env.REACT_APP_URL + 'App/Calls/getPlace.php');
            const dataLevels = await apiRef.getLevels(process.env.REACT_APP_URL + 'App/Calls/getLevels.php');
            const dataEnergyRegeneration = await apiRef.getEquipment(process.env.REACT_APP_URL + 'App/Calls/getEquipment.php', dataLevels.energy_regeneration_level, 'energy_regeneration');
            const dataEnergyCapacity = await apiRef.getEquipment(process.env.REACT_APP_URL + 'App/Calls/getEquipment.php', dataLevels.energy_capacity_level, 'energy_capacity');
            // console.log(typeof dataLevels.energy_regeneration_level);

            // await console.log(regenerationEnergyLevel);
            // const dataEquipment = await apiRef.getEquipment(process.env.REACT_APP_URL + 'App/Calls/getEquipment.php', dataLevels.energy_capacity_level, dataLevels.energy_regeneration_level);
            
            if (mounted.current) {
                isLoading = false;
                setEnergy(dataEnergy.energy);
                setStockageEnergyLevel(parseInt(dataLevels.energy_capacity_level, 10));
                setRegenerationEnergyLevel(parseInt(dataLevels.energy_regeneration_level, 10));
                regenerationEnergyLevel = parseInt(dataLevels.energy_regeneration_level, 10);
                setStockageEnergy(dataEnergyCapacity.data.quantity);
                setRegenerationEnergy(dataEnergyRegeneration.data.quantity);
                regenerationEnergy = parseInt(dataEnergyRegeneration.data.quantity, 10);
                
                switch(dataPlace.place){
                  case 'earth':
                    setHome(<Earth energy={parseInt(dataEnergy.energy, 10)} stockage={stockageEnergy} isLoading={isLoading} regeneration={regenerationEnergy} generator={regenerationEnergyLevel} />);
                    break;
                  case 'moon':
                    setHome(<Moon energy={parseInt(dataEnergy.energy, 10)} stockage={stockageEnergy} isLoading={isLoading} regeneration={regenerationEnergy} generator={regenerationEnergyLevel} />);
                    break;
                  default:
                    setHome(null);
                    break;
                }
                
                setIsLoading(false);
            }
            
            
        } catch (err) {
            console.error(err);
        }
            
    }, [mounted]);

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

    const add = () => {
      setRegenerationEnergyLevel(regenerationEnergyLevel + 1);
    };
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
  return (
    <>
    <div style={{display: 'flex'}}>
    <SideBar 
    // isOnMoon={isOnMoon}
    // isOnEarth={isOnEarth}
    />
    <div>
    <div className="App">
      <header className="App-header">
        Bienvenue sur Serenity, le jeu d'exploration spatiale !
      </header>
      <button onClick={add}>Augmenter</button>
    </div>
    {/* {isOnEarth && <Earth />} */}
    {isLoading ? (
      `Chargement`
    ) : (
      <Routes> 
          <Route path="/" element={home} />
          <Route path="/lune" element={<Moon energy={parseInt(energy, 10)} stockage={stockageEnergy} isLoading={isLoading} regeneration={regenerationEnergy} generator={regenerationEnergyLevel} />} />
        <Route path="/terre" element={<Earth energy={parseInt(energy, 10)} stockage={stockageEnergy} isLoading={isLoading} regeneration={regenerationEnergy} generator={regenerationEnergyLevel} />} />
        </Routes>
    )}
    
        </div>
        </div>
        </>
        
  );
}

export default App;
