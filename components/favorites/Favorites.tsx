import { createNativeStackNavigator } from "@react-navigation/native-stack";

import FavoritesList from "./FavoritesList";
import FavoritesDetails from "./FavoritesDetails";
import UseTime from '../delays/UseTimeMap';

const Stack = createNativeStackNavigator();

export default function Favorites() {
    return (
        <Stack.Navigator initialRouteName="Favorites"
            screenOptions={{
                headerShown: false
            }}>
            <Stack.Screen name="FavoritesList" component={FavoritesList} />
            <Stack.Screen name="Details" component={FavoritesDetails} />
            <Stack.Screen name="UseTime" component={UseTime} />
        </Stack.Navigator>
    );
};