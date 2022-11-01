import { createNativeStackNavigator } from "@react-navigation/native-stack";

import DelaysList from './DelaysList';
import UseTime from './UseTimeMap';

const Stack = createNativeStackNavigator();

export default function Delays() {
    return (
        <Stack.Navigator initialRouteName="Delays"
            screenOptions={{
                headerShown: false
            }}>
            <Stack.Screen name="DelaysList" component={DelaysList} />
            <Stack.Screen name="UseTime" component={UseTime} />
        </Stack.Navigator>
    );
};