import L from "leaflet";
import markerIcon2x from "../images/marker-icon-2x.png"
import markerShadow from "../images/marker-shadow.png";
import markerIcon from "../images/marker-icon.png";

const leafletIcon = L.icon({
  iconUrl: markerIcon2x,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});

export default leafletIcon

