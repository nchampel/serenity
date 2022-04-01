import { Box, Button } from "@mui/material";
import { useCallback } from "react";
import { apiRef } from "../api/apiRef";

function Board(props) {
    const { regenerationEnergyLevel, setRegenerationEnergyLevel, crystalEnergyRegeneration } = props;

    const addLevelRegenerationEnergy = useCallback(async () => {
            try {

            // const data = await apiRef.getData(process.env.REACT_APP_URL + 'resources/energy');
            await apiRef.addLevel(process.env.REACT_APP_URL + 'App/Calls/addLevel.php', 'energy_regeneration_level');
            // const dataEnergyCapacity = await apiRef.getEquipment(process.env.REACT_APP_URL + 'App/Calls/getEquipment.php', dataLevels.energy_capacity_level, 'energy_capacity');
            // console.log(typeof dataLevels.energy_regeneration_level);
            
            } catch (err) {
                console.error(err);
            }
            
        }, []);

    const handleAddingLevelRegenerationEnergy = () => {
        setRegenerationEnergyLevel(regenerationEnergyLevel + 1);
        addLevelRegenerationEnergy();
    };

    return (
        <>
        <Box>
        {regenerationEnergyLevel < 12 && (
        <>
        {/* <button onClick={handleAddingLevelRegenerationEnergy}>Augmenter la régénération de l'énergie ({String(crystalEnergyRegeneration * 60).replace(/(.)(?=(\d{3})+$)/g,'$1 ')} cristaux)</button> */}
        <Button variant="outlined" onClick={handleAddingLevelRegenerationEnergy} sx={{ color: 'orange', display: 'block', margin: 'auto', marginBottom: '10px', width: '500px'}}>Augmenter la régénération de l'énergie ({String(crystalEnergyRegeneration * 60).replace(/(.)(?=(\d{3})+$)/g,'$1 ')} cristaux)</Button>
        <Button variant="outlined" onClick={handleAddingLevelRegenerationEnergy} sx={{ color: 'orange', display: 'block', margin: 'auto', marginBottom: '10px', width: '500px' }}>Augmenter la puissance des armes ({String(crystalEnergyRegeneration * 60).replace(/(.)(?=(\d{3})+$)/g,'$1 ')} cristaux)</Button>
        </>
      )}
      </Box>
      </>
    );
}
export default Board;