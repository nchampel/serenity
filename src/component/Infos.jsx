import PropTypes from 'prop-types';
import Box from '@mui/material/Box';

const Infos = (props) => {
    const { energy, generator, stockage, regeneration, nextRegeneration} = props;
    return (
    <Box>
            Energie : {String(energy).replace(/(.)(?=(\d{3})+$)/g,'$1 ')} / {String(stockage).replace(/(.)(?=(\d{3})+$)/g,'$1 ')}
            <br />
            Energie : +{String(regeneration * 60).replace(/(.)(?=(\d{3})+$)/g,'$1 ')}/h
            <br />
            {generator < 12 ? (
                `(Suivant : +${String(nextRegeneration * 60).replace(/(.)(?=(\d{3})+$)/g,'$1 ')}/h)`
            ) : (
                `Niveau maximal de régénération d'énergie`
            )}
            <br />
            <br />
            Cristaux : {String(0).replace(/(.)(?=(\d{3})+$)/g,'$1 ')}
        </Box>
    );
};

Infos.propTypes = {
    energy: PropTypes.number.isRequired,
    generator: PropTypes.number.isRequired,
    stockage: PropTypes.number.isRequired
};

export default Infos