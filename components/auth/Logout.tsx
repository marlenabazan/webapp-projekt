import authModel from "../../models/auth";
import { View, Text, Button } from "react-native";
import { Base, Typography } from '../../styles';

export default function Logout({ setIsLoggedIn }) {

    async function logOut() {
        await authModel.logout();
        setIsLoggedIn(false);
    }
    
    return (
        <View style={{ ...Base.base }}>
            <Text style={{ ...Typography.header2 }}>Logga ut?</Text>
            <Button
                title="Logga ut"
                onPress={logOut}
            />
        </View>
    );
};
