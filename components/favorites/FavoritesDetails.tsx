import { useEffect, useState } from "react";
import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import moment from 'moment';

import { Base, Typography } from '../../styles';

import delaysModel from '../../models/delays';

export default function FavoritesDetails({ route, navigation }) {
    const [delayDetails, setDelayDetails] = useState([]);
    const [stationsNames, setStationsNames] = useState({});

    useEffect(() => {
        (async () => {           
            setDelayDetails(await delaysModel.getAllDelaysFromStation(route.params.station));
            setStationsNames(await delaysModel.getStationsNames());
        })();
    }, []);

    const details = delayDetails.map((delay, index) => {
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

    return <ScrollView>
        <Text style={Typography.header2}> Förseningar från {stationsNames[route.params.station]}</Text>
            {details.length ? details : <Text style={Typography.info}>Inga förseningar </Text>}
        </ScrollView>
};
 