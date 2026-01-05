import L from "leaflet"

const MarkerIcon = new L.Icon({
    iconUrl: '/marker.svg',
    iconSize: [48, 48],
    iconAnchor: [24, 44],
    popupAnchor: undefined,
    shadowUrl: undefined,
    shadowSize: undefined
});

export default MarkerIcon;
