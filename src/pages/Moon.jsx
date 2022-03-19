import { useCallback, useEffect, useState } from "react";
import image from "../assets/lune.jpg"
import { apiRef } from "../api/apiRef"
import useMounted from 'react-use-mounted';

function Moon() {
    const mounted = useMounted();
    // const { image } = props;
    const [energy, setEnergy] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const getData = useCallback(async () => {
        try {
            // const data = await apiRef.getData(process.env.REACT_APP_URL + 'resources/energy');
            const data = await apiRef.getData(process.env.REACT_APP_URL + 'App/Calls/getEnergy.php');
            if (mounted.current) {
                setEnergy(data.energy);
            }
            setIsLoading(false);
            
        } catch (err) {
            console.error(err);
        }
            
    }, [mounted]);
    useEffect(() => {
        getData();
    }, [getData]);

    const handleEnergyAdding = (() => {
        // console.log(energy);
        setIsLoading(true);
        const updatedEnergy = parseInt(energy, 10) + 100;
        // apiRef.updateEnergy(process.env.REACT_APP_URL + 'resources/updateEnergy', updatedEnergy);
        apiRef.updateEnergy(process.env.REACT_APP_URL + 'App/Calls/updateEnergy.php', updatedEnergy);
        getData();
    });

    
    
    return (
        <div>
            {isLoading ? (
                `Chargement`
            ) : (
            <div style={{ backgroundImage: `url(${image})`, backgroundRepeat: 'no-repeat', height: '1000px', color: 'red'}}>
                Lune Energie : {energy}
                <button onClick={handleEnergyAdding}>Ajouter de l'énergie</button>
            </div>
            )}
        </div>
    );
}
export default Moon