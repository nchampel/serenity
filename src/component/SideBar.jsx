import { useCallback, useEffect, useState, Ref, ReactElement, forwardRef } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom'
import { apiRef } from '../api/apiRef';
import '../SideBar.css';
import useMounted from 'react-use-mounted';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from '@mui/material';
import { DataGrid, frFR } from '@mui/x-data-grid';

// const StyledLink = styled(Link)`
//     text-decoration: none;

//     &:focus, &:hover, &:visited, &:link, &:active {
//         text-decoration: none;
//     }
// `;

function SideBar(props) {
    const { path, place, energy, setEnergy, getData, getCrystalInfos, energyInfos, setEnergyInfos } = props;
    const navigate = useNavigate();
    const mounted = useMounted();
    const [energyTravel, setEnergyTravel] = useState(0);
    const [open, setOpen] = useState(false);
    const [choiceGalaxy, setChoiceGalaxy] = useState(0);
    const[infosPlanetsGalaxy, setInfosPlanetsGalaxy] = useState([]);
    // let {isOnEarth, isOnMoon} = props;
    // console.log(isOnEarth);
    // const handleDisplayEarth = () => {
    //     isOnEarth = true;
    //     isOnMoon = false;
    // };
    // const handleDisplayMoon = () => {
    //     isOnEarth = false;
    //     isOnMoon = true;
    // };

          const getEnergy = useCallback(async () => {
        try {

            // const data = await apiRef.getData(process.env.REACT_APP_URL + 'resources/energy');
            const dataEnergy = await apiRef.getData(process.env.REACT_APP_URL + 'App/Calls/getEnergy.php');
            // const dataEnergyCapacity = await apiRef.getEquipment(process.env.REACT_APP_URL + 'App/Calls/getEquipment.php', dataLevels.energy_capacity_level, 'energy_capacity');
            // console.log(typeof dataLevels.energy_regeneration_level);
            
            // setEnergy(parseInt(dataEnergy.energy, 10));

            setEnergyInfos({...energyInfos, energy: parseInt(dataEnergy.energy, 10)});
            
        } catch (err) {
            console.error(err);
        }
            
    }, []);

    const getEnergyTravel = useCallback(async (travel) => {
        try {

            // const data = await apiRef.getData(process.env.REACT_APP_URL + 'resources/energy');
            const data = await apiRef.getEnergyTravel(process.env.REACT_APP_URL + 'App/Calls/getEnergyTravel.php', travel);

            if (mounted.current) {
                // console.log(data.transport_energy);
                setEnergyTravel(parseInt(data.transport_energy, 10));
                return parseInt(data.transport_energy, 10);
            }
            
        } catch (err) {
            console.error(err);
        }
            
    }, [mounted]);

          const saveEnergyAfterTravel = useCallback(async (travel) => {
        try {
            // console.log(travel);
            // const data = await apiRef.getData(process.env.REACT_APP_URL + 'resources/energy');
            await apiRef.saveEnergyAfterTravel(process.env.REACT_APP_URL + 'App/Calls/saveEnergyAfterTravel.php', travel);
            // const dataEnergyCapacity = await apiRef.getEquipment(process.env.REACT_APP_URL + 'App/Calls/getEquipment.php', dataLevels.energy_capacity_level, 'energy_capacity');
                // console.log(travel);
        } catch (err) {
            console.error(err);
        }
            
    }, []);

    const getDataPlanetsGalaxy = useCallback(async (choiceGalaxy) => {
        try {
          console.log(choiceGalaxy);
            // console.log(travel);
            // const data = await apiRef.getData(process.env.REACT_APP_URL + 'resources/energy');
            const data = await apiRef.getDataPlanetsGalaxy(process.env.REACT_APP_URL + 'App/Calls/getDataPlanetsGalaxy.php', choiceGalaxy);
            // const dataEnergyCapacity = await apiRef.getEquipment(process.env.REACT_APP_URL + 'App/Calls/getEquipment.php', dataLevels.energy_capacity_level, 'energy_capacity');
            console.log(data);
            setInfosPlanetsGalaxy(data);
        } catch (err) {
            console.error(err);
        }
            
    });

    // useEffect(() => {
    //     getEnergy();
    // }, [energy]);

    // navigate("/terre", { replace: true });

    const substractEnergyTravel = (departure, arrival) => {
        const travel = departure + '-' + arrival;
        getEnergyTravel(travel).then(energyTravelResponse => { 
            // console.log(energyTravelResponse);
            if (energyInfos.energy >= energyTravelResponse) {
                // const energyUpdated = energy - energyTravel;
                // setEnergy(energyUpdated);
                // console.log(energy);
                
                const linkArrival = "/" + arrival;
                saveEnergyAfterTravel(travel);
                // pour mettre à jour l'énergie, le setenergy ici ne fonctionne pas après le refresh de la page, mais les fois d'après oui
                getEnergy();
                navigate(linkArrival, { replace: true });
                // getData();
                getCrystalInfos();
            } else {
                const linkDeparture = "/" + departure;
                toast.error('Pas assez d\'énergie pour aller sur ' + arrival[0].toUpperCase() + arrival.slice(1) + ' (' + energyTravelResponse + ' énergie nécessaire)', {duration: 10000});
                navigate(linkDeparture, { replace: true });
        }
    });
        // console.log(energytravel);
        // console.log(en);
                    //         console.log(energy);
                    // console.log(energyTravel);
                
    };
    // const planets = ['terre', 'mars', 'jupiter', 'saturne', 'uranus', 'neptune'];
    // {planets.map((planet) =>  {if (path !== '/terre') 
    //         return <div className="link" onClick={() => substractEnergyTravel(place, 'terre')}/*onClick={handleDisplayEarth}*/>Terre1</div>
    //         })} 

    const handleClose = () => {
        setOpen(false);
    };
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

// const rows = [
//   { id: 1, col1: 'Hello', col2: 'World' },
//   { id: 2, col1: 'DataGridPro', col2: 'is Awesome' },
//   { id: 3, col1: 'MUI', col2: 'is Amazing' },
// ];
const rows = [];

infosPlanetsGalaxy.forEach((planet) => {
  rows.push({
    id: planet.id,
    numberPlanet: planet.planet,
    isDestroyed: planet.is_destroyed,
    isVisited: planet.is_visited,
    lastVisit: planet.last_visit,
    hasEnemy: planet.has_enemy,
    crystalLevel: planet.crystal_level
  });
});

const columns = [
  { field: 'numberPlanet', headerName: 'N° planète', width: 140 },
  { field: 'col2', headerName: 'Énergie nécessaire', width: 140 },
  { field: 'isDestroyed', headerName: 'Détruite ?', width: 140, renderCell: (cellValues) => cellValues.row.isDestroyed === '1' ? 'Oui' : 'Non'},
    { field: 'isVisited', headerName: 'Visitée ?', width: 140, renderCell: (cellValues) => cellValues.row.isVisited === '1' ? 'Oui' : 'Non' },
  { field: 'lastVisit', headerName: 'Dernière visite', width: 200, renderCell: (cellValues) => cellValues.row.isVisited === '1' ? cellValues.row.lastVisit : '-' },
    { field: 'hasEnemy', headerName: 'Ennemi ?', width: 140, renderCell: (cellValues) => cellValues.row.hasEnemy === '1' ? 'Oui' : 'Non' },
  { field: 'crystalLevel', headerName: 'Niveau cristal', width: 140, renderCell: (cellValues) => cellValues.row.isVisited === '1' ? cellValues.row.crystalLevel : '-' },
    { field: 'col7', headerName: 'Mithril ?', width: 140 },
  { field: 'col8', headerName: 'Orichalque ?', width: 140 },
  { field: 'col9', headerName: 'Thorium ?', width: 140 },
];

  useEffect(() => {
  // console.log(choiceGalaxy);
}, [choiceGalaxy]);
    return (
        <>
        <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        fullWidth
        maxWidth='xl'
      >
        <DialogTitle>Planètes</DialogTitle>
        <DialogContent>
          {/* <DialogContentText id="alert-dialog-slide-description"> */}
            <Box style={{ height: 700, width: '100%' }}>
      <DataGrid
      height={300}
      rows={rows}
      columns={columns}
      localeText={frFR.components.MuiDataGrid.defaultProps.localeText}
//       componentsProps={{
//     pagination: {
//       labelRowsPerPage: 'Résultats par page'
//     }
//   }}
//   localeText={{columnMenuSortAsc: 'Tri croissant',
// footerTotalVisibleRows: (visibleCount, totalCount) =>
//     `${visibleCount.toLocaleString()} sur ${totalCount.toLocaleString()}`}}
   />
    </Box>
          {/* </DialogContentText> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>OK</Button>
        </DialogActions>
      </Dialog>
        <nav>
            {/* <Link className="link" to="/">Accueil</Link> */}
            <h3>Système solaire</h3>
            {path !== '/terre' && (
            <div className="link" 
            onClick={() => substractEnergyTravel(place, 'terre')}/*onClick={handleDisplayEarth}*/>Terre</div>
            )}
            {path !== '/mars' && (
            <div className="link"
            onClick={() => substractEnergyTravel(place, 'mars')}/*onClick={handleDisplayMoon}*/>Mars</div>
            )}
            {path !== '/jupiter' && (
            <div className="link"
            onClick={() => substractEnergyTravel(place, 'jupiter')}>Jupiter</div>
            )}
            {path !== '/saturne' && (
            <div className="link"
            onClick={() => substractEnergyTravel(place, 'saturne')}>Saturne</div>
            )}
            {path !== '/uranus' && (
            <div className="link"
            onClick={() => substractEnergyTravel(place, 'uranus')}>Uranus</div>
            )}
            {path !== '/neptune' && (
            <div className="link"
            onClick={() => substractEnergyTravel(place, 'neptune')}>Neptune</div>
            )}
            {energyInfos.energy >= 800000 && (
            <>
            <div style={{ height: '20px' }}></div>
            <h3>Galaxies</h3>
            <div
            className="link"
            onClick={() => {setOpen(true); setChoiceGalaxy(1); getDataPlanetsGalaxy(1)}}>
                Andromède
                </div>
            </>
            )}
        </nav>
        </>
    );
}
export default SideBar