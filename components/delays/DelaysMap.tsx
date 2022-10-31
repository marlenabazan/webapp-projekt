import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { useState, useEffect, useRef } from "react";
import moment from 'moment';

import { Base, Typography } from '../../styles';

import MapView from 'react-native-maps';
import { Marker, Callout } from "react-native-maps";
import * as Location from 'expo-location';

import delaysModel from '../../models/delays';


export default function DelaysMap({ route, navigation }) {
    const [allDelays, setAllDelays] = useState([]);
    const [locationMarker, setLocationMarker] = useState(null);
    const [stationsNames, setStationsNames] = useState({});

    const map = useRef(null);

    // if (reload) {
    //     reloadDelays();
    // }

    // async function reloadDelays() {
    //     setAllDelays(await delaysModel.getDelayedStations());
    // }

    // useEffect(() => {
    //     (async () => {
    //         reloadDelays();
    //     })();
    // }, []);

    useEffect(() => {
        (async () => {
            setAllDelays(await delaysModel.getDelayedStations());
            setStationsNames(await delaysModel.getStationsNames());
        })();
    }, []);  

    useEffect(() => {
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
    
            if (status !== 'granted') {
                setErrorMessage('Permission to access location was denied');
                return;
            }

            const currentLocation = await Location.getCurrentPositionAsync({});
    
            setLocationMarker(<Marker
                identifier="Min plats"
                coordinate={{
                    latitude: currentLocation.coords.latitude,
                    longitude: currentLocation.coords.longitude
                }}
                title="Min plats"
                pinColor="blue"
            />);
        })();
    }, []);

    function formatCoordinates(station) {
        let coordinates = station.Geometry.WGS84.replace(/\(|\)/g, '');
        let coordinatesArr = coordinates.split(' ');

        return coordinatesArr;
    };   
   
    const markers = allDelays.map((delay, index) => {
        let stationName = delay.AdvertisedLocationName;
        let coordinates = formatCoordinates(delay);
        let oldTime = moment(delay.AdvertisedTimeAtLocation).format('HH:mm');
        let newTime = moment(delay.EstimatedTimeAtLocation).format('HH:mm');
        let toStation = stationsNames[delay.ToLocation[0].LocationName]
        
        return <Marker
                    key={index} 
                    coordinate={{
                        latitude: parseFloat(coordinates[2]),
                        longitude: parseFloat(coordinates[1])
                    }}
                    title={stationName}
                    >
                        <Callout style={Base.callout}>
                                <Text style={Typography.stationName}>{stationName}</Text>
                                <Text>
                                    <Text>Till: {toStation} </Text>
                                    <Text style={Typography.oldTime}>{oldTime}</Text>
                                    <Text> {newTime}</Text>
                                </Text>
                        </Callout>
                </Marker>
    });


    return (
        <View style={Base.base}>
            <Text style={Typography.normal}>* För att se alla förseningar gå till 
                <TouchableOpacity onPress={() => navigation.navigate('DelaysList')}>
                    <Text style={Base.link}>        lista</Text>
                </TouchableOpacity> 
            </Text>
            <View style={styles.container}>
                <MapView
                    ref={map}
                    // key={marker}
                    style={styles.map}
                    initialRegion={{
                        latitude: 62.755508,
                        longitude: 14.390204,
                        latitudeDelta: 15.1,
                        longitudeDelta: 15.1,
                    }}
                    >
                    {locationMarker}
                    {markers}
                </MapView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
}); 