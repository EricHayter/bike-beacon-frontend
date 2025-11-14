import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
//import Icon from './Icon'

interface MapProps {
    setSelectedBike: (selected: boolean) => void;
}

function Map({ setSelectedBike }: MapProps) {
    const position: [number, number] = [45.424721, -75.695000];

    return (
        <MapContainer
            center={position}
            zoom={16}
            style={{ height: '100%', width: '100%', zIndex: 0 }}
        >
            <TileLayer
                attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                maxZoom={19}
            />
          <Marker
            position={position}
            eventHandlers={{
              click: () => setSelectedBike(true)
            }}
          >
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
    );
}

export default Map
