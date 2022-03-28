import PropTypes from 'prop-types';
import Box from '@mui/material/Box';

const Infos = (props) => {
    const { energy, generator, stockage} = props;
    return (
    <Box>
            Energie : {String(energy).replace(/(.)(?=(\d{3})+$)/g,'$1 ')} / {String(stockage).replace(/(.)(?=(\d{3})+$)/g,'$1 ')}
            <br />
            Niveau du générateur : {generator}
        </Box>
    );
};

Infos.propTypes = {
    energy: PropTypes.number.isRequired,
    generator: PropTypes.number.isRequired,
    stockage: PropTypes.number.isRequired
};

export default Infos