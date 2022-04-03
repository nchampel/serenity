import { Box, Button } from "@mui/material";
import { useCallback, useEffect } from "react";
import { apiRef } from "../api/apiRef";
import toast from 'react-hot-toast';
import PropTypes from 'prop-types';

function Board(props) {
    const { regenerationEnergyLevel, setRegenerationEnergyLevel, crystalEnergyRegeneration, place, stockCrystal, crystalStockageStarship, stockageEnergyLevel,
    setStockageEnergyLevel, crystalWeapon, weaponLevel, setWeaponLevel, energyInfos, setEnergyInfos } = props;

    const addLevelStarship = useCallback(async (type) => {
            try {

            // const data = await apiRef.getData(process.env.REACT_APP_URL + 'resources/energy');
            const data = await apiRef.addLevelStarship(process.env.REACT_APP_URL + 'App/Calls/addLevelStarship.php', type, place);
            // const dataEnergyCapacity = await apiRef.getEquipment(process.env.REACT_APP_URL + 'App/Calls/getEquipment.php', dataLevels.energy_capacity_level, 'energy_capacity');
            // console.log(typeof dataLevels.energy_regeneration_level);
            // if (data.status === 200) {
            //     console.log('test');
            // }
            if (data.status === 201) {
                toast.error('Pas assez de cristaux');
            } else if (data.status === 202) {
                toast.error('Pas sur Terre');
            }
            
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
                // console.log(stockCrystal);
                // console.log(crystalEnergyRegeneration);
                if (parseInt(stockCrystal, 10) >= parseInt(energyInfos.crystalEnergyRegeneration, 10)) {
                    // setRegenerationEnergyLevel(regenerationEnergyLevel + 1);
                    setEnergyInfos({...energyInfos, regenerationEnergyLevel: energyInfos.regenerationEnergyLevel + 1});
                    addLevelStarship(type);
                } else {
                    toast.error('Pas assez de cristaux');
                }
            break;
            case 'energy_capacity_level':
                // console.log(stockCrystal);
                // console.log(crystalEnergyRegeneration);
                if (parseInt(stockCrystal, 10) >= parseInt(crystalStockageStarship, 10)) {
                    // console.log(stockageEnergyLevel);
                    // console.log(stockageEnergyLevel + 1);
                    // setStockageEnergyLevel(stockageEnergyLevel + 1);
                    setEnergyInfos({...energyInfos, stockageEnergyLevel: energyInfos.stockageEnergyLevel + 1});
                    addLevelStarship(type);
                } else {
                    toast.error('Pas assez de cristaux');
                }
            break;
            case 'weapon_level':
                // console.log(stockCrystal);
                // console.log(crystalEnergyRegeneration);
                if (parseInt(stockCrystal, 10) >= parseInt(crystalWeapon, 10)) {
                    // console.log(stockageEnergyLevel);
                    // console.log(stockageEnergyLevel + 1);
                    setWeaponLevel(weaponLevel + 1);
                    addLevelStarship(type);
                } else {
                    toast.error('Pas assez de cristaux');
                }
            break;
            default:
                console.log('erreur de type handleAddingLevelStarship');
            break;
        }
        
        
    };

    // useEffect(() => {
        // console.log(stockageEnergyLevel);
    // }, [stockageEnergyLevel]);

    // useEffect(() => {
    //     console.log(regenerationEnergyLevel);
    // }, [regenerationEnergyLevel]);

        const handleAddingLevelPlanet = (type) => {
            switch(type) {
            case 'crystal_level':
                // console.log(stockCrystal);
                // console.log(crystalEnergyRegeneration);
                if (parseInt(stockCrystal, 10) >= parseInt(crystalEnergyRegeneration, 10)) {
                    setRegenerationEnergyLevel(regenerationEnergyLevel + 1);
                    addLevelStarship(type);
                } else {
                    toast.error('Pas assez de cristaux');
                }
            break;
            case 'crystal_stockage_level':
                // console.log(stockCrystal);
                // console.log(crystalEnergyRegeneration);
                if (parseInt(stockCrystal, 10) >= parseInt(crystalStockageStarship, 10)) {
                    // console.log(stockageEnergyLevel);
                    // console.log(stockageEnergyLevel + 1);
                    setStockageEnergyLevel(stockageEnergyLevel + 1);
                    addLevelStarship(type);
                } else {
                    toast.error('Pas assez de cristaux');
                }
            break;
            default:
                console.log('erreur de type handleAddingLevelPlanet');
            break;
        }
    };

    // console.log(energyInfos);

    return (
        <>
        <Box>
        {energyInfos.regenerationEnergyLevel < 12 && place === 'terre' && (
        <>
        {/* <button onClick={handleAddingLevelRegenerationEnergy}>Augmenter la régénération de l'énergie ({String(crystalEnergyRegeneration * 60).replace(/(.)(?=(\d{3})+$)/g,'$1 ')} cristaux)</button> */}
        <Button variant="outlined" onClick={() => {handleAddingLevelStarship('energy_regeneration_level')}} sx={{ color: 'orange', display: 'block', margin: 'auto', marginBottom: '10px', width: '500px'}}>Augmenter la régénération de l'énergie ({String(energyInfos.crystalEnergyRegeneration).replace(/(.)(?=(\d{3})+$)/g,'$1 ')} cristaux)</Button>
        {/* <Button variant="outlined" onClick={handleAddingLevelRegenerationEnergy} sx={{ color: 'orange', display: 'block', margin: 'auto', marginBottom: '10px', width: '500px' }}>Augmenter la puissance des armes ({String(crystalEnergyRegeneration * 60).replace(/(.)(?=(\d{3})+$)/g,'$1 ')} cristaux)</Button> */}
        </>
      )}
        {energyInfos.stockageEnergyLevel < 12 && place === 'terre' && (
        <>
        {/* <button onClick={handleAddingLevelRegenerationEnergy}>Augmenter la régénération de l'énergie ({String(crystalEnergyRegeneration * 60).replace(/(.)(?=(\d{3})+$)/g,'$1 ')} cristaux)</button> */}
        <Button variant="outlined" onClick={() => {handleAddingLevelStarship('energy_capacity_level')}} sx={{ color: 'orange', display: 'block', margin: 'auto', marginBottom: '10px', width: '500px'}}>Augmenter le stockage de l'énergie ({String(energyInfos.crystalStockageEnergy).replace(/(.)(?=(\d{3})+$)/g,'$1 ')} cristaux)</Button>
        {/* <Button variant="outlined" onClick={handleAddingLevelRegenerationEnergy} sx={{ color: 'orange', display: 'block', margin: 'auto', marginBottom: '10px', width: '500px' }}>Augmenter la puissance des armes ({String(crystalEnergyRegeneration * 60).replace(/(.)(?=(\d{3})+$)/g,'$1 ')} cristaux)</Button> */}
        </>
      )}
      {weaponLevel < 12 && place === 'terre' && (
        <>
        {/* <button onClick={handleAddingLevelRegenerationEnergy}>Augmenter la régénération de l'énergie ({String(crystalEnergyRegeneration * 60).replace(/(.)(?=(\d{3})+$)/g,'$1 ')} cristaux)</button> */}
        <Button variant="outlined" onClick={() => {handleAddingLevelStarship('weapon_level')}} sx={{ color: 'orange', display: 'block', margin: 'auto', marginBottom: '10px', width: '500px'}}>Augmenter la puissance des armes ({String(crystalWeapon).replace(/(.)(?=(\d{3})+$)/g,'$1 ')} cristaux)</Button>
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

Board.propTypes = {
    setRegenerationEnergyLevel: PropTypes.func,
    setStockageEnergyLevel: PropTypes.func
};
export default Board;