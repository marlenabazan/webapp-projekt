import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "./Login";
import Register from "./Register";

const Stack = createNativeStackNavigator();

export default function Auth(props) {
    return (
        <Stack.Navigator
        screenOptions={{
            headerShown: false
          }}
          initialRouteName="Login">
            <Stack.Screen name="Login">
                { (screenprops) => <Login {...screenprops} setIsLoggedIn={props.setIsLoggedIn} /> }
            </Stack.Screen>
            <Stack.Screen name="Register" component={Register} />
        </Stack.Navigator>
    )
};