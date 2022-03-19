import image from "../assets/terre.jpg"

function Earth() {
    return (
        <div style={{ backgroundImage: `url(${image})`, backgroundRepeat: 'no-repeat', height: '1000px', color: 'red'}}>
            Terre
        </div>
    );
}
export default Earth