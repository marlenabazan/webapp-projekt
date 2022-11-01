import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { useState, useEffect } from "react";
import moment from 'moment';

import { Base, Typography } from '../../styles';

import delaysModel from '../../models/delays';

export default function DelaysList({ route, navigation }) {
    const [allDelays, setAllDelays] = useState([]);
    const [stationsNames, setStationsNames] = useState({});

    useEffect(() => {
        (async () => {
            setAllDelays(await delaysModel.getDelayedStations());
            setStationsNames(await delaysModel.getStationsNames());
        })();
    }, []);

    const listOfDelays = allDelays.map((delay, index) => {
        let stationName = delay.AdvertisedLocationName;
        let toStationName = stationsNames[delay.ToLocation[0].LocationName];
        let oldTime = moment(delay.AdvertisedTimeAtLocation).format('HH:mm');
        let newTime = moment(delay.EstimatedTimeAtLocation).format('HH:mm');

        return <View key={index}>
                    <View>
                        <TouchableOpacity onPress={() => 
                            navigation.navigate('UseTime', {
                                delay: delay
                            })
                            }>
                            <Text style={Typography.header1}>
                                <Text>{stationName} </Text>
                                <Text>-&gt; {toStationName} </Text>
                            </Text> 
                        </TouchableOpacity>
                        <Text style={Typography.header1}>
                            <Text style={Typography.oldTime}>{oldTime}</Text>
                            <Text> {newTime}</Text>
                        </Text>
                    </View>
                    <View
                        style={Base.separator}
                    />
              </View>
    });

    return (
        <ScrollView>
            <Text style={Typography.normal}>Klicka på en station för att se hur mycket hinner du promenera innan tåget kommer</Text>
            <View style={Base.base}>
                {listOfDelays}
            </View>
        </ScrollView>
    );
};
