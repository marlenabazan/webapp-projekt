import { Text, View, ScrollView, Button, TouchableOpacity } from 'react-native';
import { useState, useEffect } from "react";

import { Base, Typography } from '../../styles';

import StationsDropDown from './StationsDropDown';

import delaysModel from '../../models/delays';


export default function FavoritesList({ route, navigation }) {
    const [favorites, setFavorites] = useState([]);
    const [currentStation, setCurrentStation] = useState({});
    const [stationsNames, setStationsNames] = useState({});

    useEffect(() => {
        (async () => {
            setStationsNames(await delaysModel.getStationsNames());
            setFavorites(favorites);
        })();
    }, []);
  
    function addToFavorites(station) {
        favorites.push(station);
        setFavorites(favorites);
    };

    function removeFromFavorites(station) {
        const index = favorites.indexOf(station);
        const removed = favorites.splice(index, 1);
        setFavorites(favorites);
    }

    const favoriteStations = favorites.map((station, index) => {
        let stationName = stationsNames[station.LocationSignature];
        return <View key={index}>
                <Text>
                    <TouchableOpacity
                        // key={index}
                        onPress={() => {
                            console.log("TouchableOpacity");
                            navigation.navigate('Details', {
                                station: station.LocationSignature
                            });
                            }}>
                                <Text style={Typography.favorite}>{stationName}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        // key={index + " delete"}
                        onPress={() => {
                            console.log("TouchableOpacity Radera");
                            removeFromFavorites(station.LocationSignature);
                            navigation.navigate('FavoritesList', { reload: true });
                            }}>
                            <Text style={Typography.favoriteRemove}> (Radera)</Text>
                    </TouchableOpacity>
                    {/* <Button
                        title="Radera"
                        // key={index + " delete"}
                        onPress={() => {
                            console.log("TouchableOpacity Radera");
                            removeFromFavorites(station.LocationSignature);
                            navigation.navigate('FavoritesList', { reload: true });
                        }}
                    /> */}
                </Text>
            </View>
    });

    return (
        <ScrollView>
            <StationsDropDown
                currentStation={currentStation}
                setCurrentStation={setCurrentStation}
            />
            <Button
                title="Lägg till"
                onPress={()=> {
                    addToFavorites(currentStation);
                    navigation.navigate('FavoritesList', { reload: true });
                }}
            />
            <View
                        style={Base.separator}
                    />
            <Text style={Typography.header2}>Dina favoriter</Text>
            {favoriteStations.length ? favoriteStations : <Text style={Typography.info}>Du har inga favoritstationer</Text>}
        </ScrollView>
    );
};
