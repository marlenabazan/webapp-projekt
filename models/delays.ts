import config from '../config/config.json';
import Stations from "../interfaces/stations";
import moment from 'moment';

const delays = {
    getDelays: async function getDelays() {
        const response = await fetch(`${config.base_url}/delayed`);
        const result = await response.json();
        
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

        return delayedStations;
    },
    getStationsNames: async function getStationsNames() {
        const allStations = await this.getStations();
        const stationsNames = {};
        for (let station of allStations) {
            stationsNames[station.LocationSignature] = station.AdvertisedLocationName;
        }
       
        return stationsNames;
    },
    getAllDelaysFromStation: async function getAllDelaysFromStation(signature) {
        const allDelays = await this.getDelayedStations();
        const allDelaysFromStation = allDelays
            .filter(station => station.FromLocation !== undefined)
            .filter(station => station.FromLocation[0].LocationName === signature)
            .map((station) => ({
                ...station,
            })
        )
        return allDelaysFromStation;
    }
};

export default delays;