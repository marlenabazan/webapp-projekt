import config from '../config/config.json';
import Stations from "../interfaces/stations";

const delays = {
    getDelays: async function getDelays() {
        const response = await fetch(`${config.base_url}/delayed`);
        const result = await response.json();
        // console.log(result.data);
        
        return result.data;
    },
    getStations: async function getStations(): Promise<Stations[]> {
        const response = await fetch(`${config.base_url}/stations`);
        const result = await response.json();

        return result.data;
    },
    getDelayedStations: async function getDelayedStations() {
        const allDelays = await this.getDelays();
        const allStations = await this.getStations();

        let delayedStations = allDelays
            .filter(delay => delay.FromLocation !== undefined)
            .map(delay => ({
                ...allStations.find(({ LocationSignature }) => delay.FromLocation[0].LocationName == LocationSignature ),
                ...delay,
            }));

        // console.log(delayedStations);

        return delayedStations;
    },
    getOneStation: async function getOneStation(short) {
        const allStations = await this.getStations();

        const stationName = allStations.find(({ LocationSignature }) => LocationSignature === short);

        return stationName.AdvertisedLocationName;
    },
    getStationsNames: async function getStationsNames() {
        const allStations = await this.getStations();
        const stationsNames = {};
        for (let station of allStations) {
            stationsNames[station.LocationSignature] = station.AdvertisedLocationName;
        }
        // const stationsNames = allStations.map(({ LocationSignature, AdvertisedLocationName }) => ({ LocationSignature: LocationSignature, AdvertisedLocationName: AdvertisedLocationName }));

        // const testname = stationsNames.find(({ LocationSignature }) => LocationSignature == "Bml");

        // console.log(stationsNames);
       
        return stationsNames;
    }
};

export default delays;