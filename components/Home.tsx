import { Text, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';

import { Base, Typography } from '../styles';

export default function Home() {
  return (<View style={Base.home}>
            <Text style={Typography.homeHeader}>TRAIN</Text>
              <Ionicons name="subway" size={392} color="purple" />
            <Text style={Typography.homeHeader}>DELAYS</Text>
          </View>
    
  );
};