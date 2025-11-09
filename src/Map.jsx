import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function Map() {
    return (
        <MapContainer
            center={[51.505, -0.09]}
            zoom={13}
            style={{ height: '100%', width: '100%', zIndex: 0 }}
        >
            <TileLayer
                attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                maxZoom={19}
            />
        </MapContainer>
    );
}

export default Map
