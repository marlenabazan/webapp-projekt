import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { useState, useEffect, useRef } from "react";
import moment from 'moment';

import { Base, Typography } from '../../styles';

import MapView from 'react-native-maps';
import { Marker, Callout } from "react-native-maps";
import * as Location from 'expo-location';

import delaysModel from '../../models/delays';


export default function DelaysMap({ route, navigation }) {
    // const { reload } = route.params || false;
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
    // console.log(allDelays);
   
    const markers = allDelays.map((delay, index) => {
        // console.log(delay);

        let stationName = delay.AdvertisedLocationName;

        // if (!markersOnce.includes(stationName)) {
        //     markersOnce.push(stationName);
        // };
        // console.log(testMarkers);
    
        let coordinates = formatCoordinates(delay);
        
        let oldTime = moment(delay.AdvertisedTimeAtLocation).format('HH:mm');
        let newTime = moment(delay.EstimatedTimeAtLocation).format('HH:mm');
        // console.log(delay.ToLocation[0].LocationName);
        let toStation = stationsNames[delay.ToLocation[0].LocationName]
        // console.log(toStation);
        
        return <Marker
                    key={index} 
                    coordinate={{
                        latitude: parseFloat(coordinates[2]),
                        longitude: parseFloat(coordinates[1])
                    }}
                    title={stationName}
                    >
                        <Callout style={Base.callout}>
                                <Text style={Typography.stationName}>{delay.AdvertisedLocationName}</Text>
                                <Text>
                                    <Text>Till: {toStation} </Text>
                                    <Text style={Typography.oldTime}>{oldTime}</Text>
                                    <Text>- {newTime}</Text>
                                </Text>
                        </Callout>
                </Marker>
    });

    // const listOfDelays = allDelays.map((delay, index) => {
    //     return <View key={index}>
    //             <Text>{delay.AdvertisedLocationName}</Text>
    //         </View>
    // });

    return (
        <View style={Base.base}>
            <Text style={Typography.normal}>* För att se alla förseningar från en station klicka på stationens marker flera gånger eller gå till 
            {/* <Text style={Base.link} onPress={() => navigation.navigate('UseTime')}> link </Text> */}
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                    <Text style={Base.link}>        lista</Text>
                </TouchableOpacity> 
            </Text>
            <View style={styles.container}>
                <MapView
                    ref={map}
                    // key={marker}
                    style={styles.map}
                    // initialRegion={{
                    //     latitude: 56.1612,
                    //     longitude: 15.5869,
                    //     latitudeDelta: 2.1,
                    //     longitudeDelta: 2.1,
                    // }}
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