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
  const stockage = 'passé';
  const getInfos = useCallback(async (energy, isLoading) => {
        try {
            setIsLoading(true);
            // const data = await apiRef.getData(process.env.REACT_APP_URL + 'resources/energy');
            const dataEnergy = await apiRef.getData(process.env.REACT_APP_URL + 'App/Calls/getEnergy.php');
            const dataPlace = await apiRef.getPlace(process.env.REACT_APP_URL + 'App/Calls/getPlace.php');
            if (mounted.current) {
                setEnergy(dataEnergy.energy);
                switch(dataPlace.place){
                  case 'earth':
                    setHome(<Earth energy={parseInt(dataEnergy.energy, 10)} stockage={stockage} isLoading={isLoading} />);
                    break;
                  case 'moon':
                    setHome(<Moon energy={parseInt(dataEnergy.energy, 10)} stockage={stockage} isLoading={isLoading} />);
                    break;
                  default:
                    setHome(null);
                    break;
                }
            }
            setIsLoading(false);
            
        } catch (err) {
            console.error(err);
        }
            
    }, [mounted]);
    useEffect(() => {
        getInfos();
    }, [getInfos]);
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
    </div>
    {/* {isOnEarth && <Earth />} */}
    {isLoading ? (
      `Chargement`
    ) : (
      <Routes> 
          <Route path="/" element={home} />
          <Route path="/lune" element={<Moon energy={parseInt(energy, 10)} stockage={stockage} isLoading={isLoading} />} />
        <Route path="/terre" element={<Earth energy={parseInt(energy, 10)} stockage={stockage} isLoading={isLoading} />} />
        </Routes>
    )}
    
        </div>
        </div>
        </>
        
  );
}

export default App;
