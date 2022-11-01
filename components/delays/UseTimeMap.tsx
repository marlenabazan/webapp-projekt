import { StyleSheet, View } from 'react-native';

import MapView from 'react-native-maps';
import { Circle, Marker } from "react-native-maps";
// import { showMessage } from "react-native-flash-message";

import { Base } from '../../styles';

export default function UseTime({ route, navigation }) {

  const delay = route.params.delay;

  function getCoordinates(station) {
    let coordinates = station.Geometry.WGS84.replace(/\(|\)/g, '');
    let coordinatesArr = coordinates.split(' ');    

    return coordinatesArr;
  };

  const coordinates = getCoordinates(delay);

  const newTime = new Date(delay.EstimatedTimeAtLocation);
  const oldTime = new Date(delay.AdvertisedTimeAtLocation);

  let delayInMin = (newTime.getTime() - oldTime.getTime()) / 1000;
  delayInMin /= 60;

  const distance = (delayInMin - 5) * 100;

  const radius = distance / 2;

  const delta = radius/10000 <= 0 ? 0.01 : radius/10000

  // const circle = radius > 0 ? 
  //   <Circle
  //     key="circle"
  //     center={{
  //       latitude: parseFloat(coordinates[2]),
  //       longitude: parseFloat(coordinates[1])
  //     }}
  //     radius={radius}
  //     strokeColor = { '#1a66ff' }
  //     fillColor = { 'rgba(230,238,255,0.5)' }
  //   />
  //   :
  //   showMessage({
  //     message: "Inte tillräckligt med tid",
  //     description: "Du hinner inte se dig omkring",
  //     type: "warning"
  //   });

  const circle = radius > 0 ? 
    <Circle
      key="circle"
      center={{
        latitude: parseFloat(coordinates[2]),
        longitude: parseFloat(coordinates[1])
      }}
      radius={radius}
      strokeColor = { '#1a66ff' }
      fillColor = { 'rgba(230,238,255,0.5)' }
    />
    :
    null;

  return (
    <View style={Base.base}>
            <View style={styles.container}>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: parseFloat(coordinates[2]),
                        longitude: parseFloat(coordinates[1]),
                        latitudeDelta: delta,
                        longitudeDelta: delta,
                    }}
                    >
                    {circle}
                    <Marker
                      identifier="Stationen"
                      coordinate={{
                          latitude: parseFloat(coordinates[2]),
                          longitude: parseFloat(coordinates[1])
                      }}
                      title={delay.AdvertisedLocationName}
                      pinColor="blue"
                  />
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