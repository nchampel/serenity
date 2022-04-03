import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import { useCallback } from 'react';
import { apiRef } from '../api/apiRef';
import toast from 'react-hot-toast';

const Infos = (props) => {
    const { energy, generator, stockage, regeneration, nextRegeneration, place, stockCrystal, stockageCrystal, stockCrystalPlanet,
        stockageCrystalPlanet, stockCrystalStarship, getData, nextCrystalStockageStarship } = props;
    const takeCrystalCallback = useCallback(async (place) => {
        try {
            // console.log(place);
            // const data = await apiRef.getData(process.env.REACT_APP_URL + 'resources/energy');
            const data = await apiRef.takeCrystal(process.env.REACT_APP_URL + 'App/Calls/takeCrystal.php', place);
            if (data.status === 200) {
                getData();
            } else if (data.status === 201) {
                toast.error('Pas assez de place');
            }
            
            // const dataEnergyCapacity = await apiRef.getEquipment(process.env.REACT_APP_URL + 'App/Calls/getEquipment.php', dataLevels.energy_capacity_level, 'energy_capacity');
            // console.log(typeof dataLevels.energy_regeneration_level);
            
        } catch (err) {
            console.error(err);
        }
            
    }, []);
    const discardCrystalCallback = useCallback(async () => {
        try {
            // console.log(place);
            // const data = await apiRef.getData(process.env.REACT_APP_URL + 'resources/energy');
            await apiRef.discardCrystal(process.env.REACT_APP_URL + 'App/Calls/discardCrystal.php');
            
            getData();
            
            
            // const dataEnergyCapacity = await apiRef.getEquipment(process.env.REACT_APP_URL + 'App/Calls/getEquipment.php', dataLevels.energy_capacity_level, 'energy_capacity');
            // console.log(typeof dataLevels.energy_regeneration_level);
            
        } catch (err) {
            console.error(err);
        }
            
    }, []);
    const takeCrystal = (place) => {
        takeCrystalCallback(place);
    };
        const discardCrystal = (place) => {
        discardCrystalCallback(place);
    };
    return (
    <Box>
        <Box sx={{ fontWeight: 'bold', fontSize: '18px'}}>Sur le vaisseau</Box>
        <Box sx={{ ml: 2}}>
            <br />
            Énergie : {String(energy).replace(/(.)(?=(\d{3})+$)/g,'$1 ')} / {String(stockage).replace(/(.)(?=(\d{3})+$)/g,'$1 ')}
            <br />
            Énergie : +{String(regeneration * 60).replace(/(.)(?=(\d{3})+$)/g,'$1 ')}/h
            <br />
            {generator < 12 ? (
                `(Suivant : +${String(nextRegeneration * 60).replace(/(.)(?=(\d{3})+$)/g,'$1 ')}/h)`
            ) : (
                `Niveau maximal de régénération d'énergie`
            )}
            <br />
            <br />
            Cristaux : {String(stockCrystalStarship).replace(/(.)(?=(\d{3})+$)/g,'$1 ')} / {String(stockageCrystal).replace(/(.)(?=(\d{3})+$)/g,'$1 ')}
            <br />
            (Suivant : {String(nextCrystalStockageStarship).replace(/(.)(?=(\d{3})+$)/g,'$1 ')})
            <br />
            <br />
            <br />
        </Box>
        <Box sx={{ fontWeight: 'bold', fontSize: '18px'}}>Sur la planète</Box>
        <Box sx={{ ml: 2}}>
            <br />
            {place === 'terre' && (
                <>
                Cristaux en stock : {String(stockCrystal).replace(/(.)(?=(\d{3})+$)/g,'$1 ')}
                <Button variant="outlined" onClick={() => discardCrystal()} sx={{ color: 'orange', display: 'block', margin: 'auto', marginTop: '10px', width: '230px'}}>Décharger le cristal</Button>
                </>
            )}
            {place !== 'terre' && (
                <>
                Cristaux en stock : {String(stockCrystalPlanet).replace(/(.)(?=(\d{3})+$)/g,'$1 ')} / {String(stockageCrystalPlanet).replace(/(.)(?=(\d{3})+$)/g,'$1 ')}
                <Button variant="outlined" onClick={() => takeCrystal(place)} sx={{ color: 'orange', display: 'block', margin: 'auto', marginTop: '10px', width: '230px'}}>Récupérer le cristal</Button>
                </>
            )}
        </Box>
    </Box>
    );
};

Infos.propTypes = {
    energy: PropTypes.number.isRequired,
    generator: PropTypes.number.isRequired,
    stockage: PropTypes.number.isRequired
};

export default Infos