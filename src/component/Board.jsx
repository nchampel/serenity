import { Box, Button } from "@mui/material";
import { useCallback } from "react";
import { apiRef } from "../api/apiRef";

function Board(props) {
    const { regenerationEnergyLevel, setRegenerationEnergyLevel, crystalEnergyRegeneration, place, stockCrystal, crystalStockageStarship, stockageEnergyLevel } = props;

    const addLevelStarship = useCallback(async (type) => {
            try {

            // const data = await apiRef.getData(process.env.REACT_APP_URL + 'resources/energy');
            await apiRef.addLevelStarship(process.env.REACT_APP_URL + 'App/Calls/addLevelStarship.php', type);
            // const dataEnergyCapacity = await apiRef.getEquipment(process.env.REACT_APP_URL + 'App/Calls/getEquipment.php', dataLevels.energy_capacity_level, 'energy_capacity');
            // console.log(typeof dataLevels.energy_regeneration_level);
            
            } catch (err) {
                console.error(err);
            }
            
        }, []);

    const addLevelPlanet = useCallback(async (type) => {
            try {

            // const data = await apiRef.getData(process.env.REACT_APP_URL + 'resources/energy');
            await apiRef.addLevelPlanet(process.env.REACT_APP_URL + 'App/Calls/addLevelPlanet.php', type, place);
            // const dataEnergyCapacity = await apiRef.getEquipment(process.env.REACT_APP_URL + 'App/Calls/getEquipment.php', dataLevels.energy_capacity_level, 'energy_capacity');
            // console.log(typeof dataLevels.energy_regeneration_level);
            
            } catch (err) {
                console.error(err);
            }
            
        }, []);

    const handleAddingLevelStarship = (type) => {
        switch(type) {
            case 'energy_regeneration_level':
                console.log(stockCrystal);
                console.log(crystalEnergyRegeneration);
                if (parseInt(stockCrystal, 10) >= parseInt(crystalEnergyRegeneration, 10)) {
                    setRegenerationEnergyLevel(regenerationEnergyLevel + 1);
                    addLevelStarship(type);
                }
            break;
            default:
                console.log('erreur de type handleAddingLevelStarship');
            break;
        }
        
        
    };

        const handleAddingLevelPlanet = (type) => {
            // à corriger
        setRegenerationEnergyLevel(regenerationEnergyLevel + 1);
        addLevelPlanet(type);
    };

    return (
        <>
        <Box>
        {regenerationEnergyLevel < 12 && place === 'terre' && (
        <>
        {/* <button onClick={handleAddingLevelRegenerationEnergy}>Augmenter la régénération de l'énergie ({String(crystalEnergyRegeneration * 60).replace(/(.)(?=(\d{3})+$)/g,'$1 ')} cristaux)</button> */}
        <Button variant="outlined" onClick={() => {handleAddingLevelStarship('energy_regeneration_level')}} sx={{ color: 'orange', display: 'block', margin: 'auto', marginBottom: '10px', width: '500px'}}>Augmenter la régénération de l'énergie ({String(crystalEnergyRegeneration).replace(/(.)(?=(\d{3})+$)/g,'$1 ')} cristaux)</Button>
        {/* <Button variant="outlined" onClick={handleAddingLevelRegenerationEnergy} sx={{ color: 'orange', display: 'block', margin: 'auto', marginBottom: '10px', width: '500px' }}>Augmenter la puissance des armes ({String(crystalEnergyRegeneration * 60).replace(/(.)(?=(\d{3})+$)/g,'$1 ')} cristaux)</Button> */}
        </>
      )}
        {stockageEnergyLevel < 12 && place === 'terre' && (
        <>
        {/* <button onClick={handleAddingLevelRegenerationEnergy}>Augmenter la régénération de l'énergie ({String(crystalEnergyRegeneration * 60).replace(/(.)(?=(\d{3})+$)/g,'$1 ')} cristaux)</button> */}
        <Button variant="outlined" onClick={() => {handleAddingLevelStarship('energy_capacity_level')}} sx={{ color: 'orange', display: 'block', margin: 'auto', marginBottom: '10px', width: '500px'}}>Augmenter le stockage de l'énergie ({String(crystalStockageStarship).replace(/(.)(?=(\d{3})+$)/g,'$1 ')} cristaux)</Button>
        {/* <Button variant="outlined" onClick={handleAddingLevelRegenerationEnergy} sx={{ color: 'orange', display: 'block', margin: 'auto', marginBottom: '10px', width: '500px' }}>Augmenter la puissance des armes ({String(crystalEnergyRegeneration * 60).replace(/(.)(?=(\d{3})+$)/g,'$1 ')} cristaux)</Button> */}
        </>
      )}
      {regenerationEnergyLevel < 12 && place !== 'terre' && (
        <Button variant="outlined" onClick={() => {addLevelPlanet('crystal_level')}} sx={{ color: 'orange', display: 'block', margin: 'auto', marginBottom: '10px', width: '500px'}}>Augmenter la génération de cristaux ({String(crystalEnergyRegeneration).replace(/(.)(?=(\d{3})+$)/g,'$1 ')} cristaux)</Button>
      )}
        {regenerationEnergyLevel < 12 && place !== 'terre' && (
        <Button variant="outlined" onClick={() => {handleAddingLevelPlanet('crystal_stockage_level')}} sx={{ color: 'orange', display: 'block', margin: 'auto', marginBottom: '10px', width: '500px'}}>Augmenter le stockage des cristaux ({String(crystalEnergyRegeneration).replace(/(.)(?=(\d{3})+$)/g,'$1 ')} cristaux)</Button>
      )}
      </Box>
      </>
    );
}
export default Board;