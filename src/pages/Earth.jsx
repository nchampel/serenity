import image from "../assets/terre.jpg"
import { apiRef } from "../api/apiRef"
// import useMounted from 'react-use-mounted';
import { useCallback, useEffect, useState } from "react";
import Infos from "../component/Infos";

function Earth(props) {
    //  const mounted = useMounted();
     const {stockage, energy, isLoading} = props;
    // const { image } = props;
    const [energyLocal, setEnergy] = useState(energy);
    // const [isLoading, setIsLoading] = useState(true);
    // console.log('test');
    // const getData = useCallback(async () => {
    //     try {
    //         // const data = await apiRef.getData(process.env.REACT_APP_URL + 'resources/energy');
    //         const data = await apiRef.getData(process.env.REACT_APP_URL + 'App/Calls/getEnergy.php');
    //         if (mounted.current) {
    //             setEnergy(data.energy);
    //         }
    //         setIsLoading(false);
            
    //     } catch (err) {
    //         console.error(err);
    //     }
            
    // }, [mounted]);
    // useEffect(() => {
    //     getData();
    // }, [getData]);

    // const handleEnergyAdding = (() => {
    //     // console.log(energy);
    //     setIsLoading(true);
    //     const updatedEnergy = parseInt(energy, 10) + 100;
    //     // apiRef.updateEnergy(process.env.REACT_APP_URL + 'resources/updateEnergy', updatedEnergy);
    //     apiRef.updateEnergy(process.env.REACT_APP_URL + 'App/Calls/updateEnergy.php', updatedEnergy);
    //     getData();
    // });

    useEffect(() => {
        const timer = setInterval(() => {
            // console.log(energy);
            if (energyLocal < 200000) {
                let updatedEnergy = parseInt(energyLocal, 10) + 20;
                if (updatedEnergy > 200000){
                    updatedEnergy = 200000;
                }
                setEnergy(updatedEnergy);
            }
        }, 10000);
        
        return () => {
            // Each time a new useEffect is executed, the previous useEffect will be cleaned up
            // This function will be called to clear the previous setInterval timer
            clearInterval(timer);
        };
    }, [energyLocal]);
    return (
        <div>
        {isLoading ? (
                `Chargement`
            ) : (
        <div style={{ backgroundImage: `url(${image})`, backgroundRepeat: 'no-repeat', height: '900px', color: 'white'}}>
            Terre                
            <Infos
            // stockage={stockage}
            // generator={generator}
            energy={energyLocal}
            />
            <button>Augmenter la génération d'énergie</button>
        </div>
        )}
        </div>
    );
}
export default Earth