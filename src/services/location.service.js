import axios from "axios";
import { MAP_API_KEY } from "../utils/constants";

const LocationService = {
  getPlaceFromLatLng: ({ lat, lng }) => {
    // const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=100&types=food&rankby=prominence&key=${MAP_API_KEY}`;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${MAP_API_KEY}`;
    return axios.get(url);
  },
};
export default LocationService;
