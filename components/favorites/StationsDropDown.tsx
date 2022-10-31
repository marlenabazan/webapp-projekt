import { useState, useEffect } from "react";
import { Picker } from '@react-native-picker/picker';

import delaysModel from '../../models/delays';

export default function StationsDropDown(props) {
    const [allStations, setAllStations] = useState([]);

    useEffect(() => {
        const allStations = async () => {
            setAllStations(await delaysModel.getStations());
        }
        allStations();
    }, []);

    const stationsList = allStations.map((station, index) => {
        return <Picker.Item key={index} label={station.AdvertisedLocationName} value={station.LocationSignature} />
    });

    return (
        <Picker
            selectedValue={props.currentStation?.LocationSignature}
            onValueChange={(itemValue) => {
                props.setCurrentStation({ LocationSignature: itemValue})
            }}>
            {stationsList}
        </Picker>
    )
};