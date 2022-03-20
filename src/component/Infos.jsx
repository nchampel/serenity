import PropTypes from 'prop-types';

const Infos = (props) => {
    const { energy, generator, stockage} = props;
    return (
        <div>
            Energie : {String(energy).replace(/(.)(?=(\d{3})+$)/g,'$1 ')} / {stockage}
            <br />
            Niveau du générateur : {generator}
        </div>
    );
};

Infos.propTypes = {
    energy: PropTypes.number.isRequired,
    generator: PropTypes.number.isRequired,
    stockage: PropTypes.number.isRequired
};

export default Infos