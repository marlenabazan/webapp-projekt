import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FlashMessage from 'react-native-flash-message';

import { Base } from './styles';

import Home from './components/Home';
import DelaysMap from './components/delays/DelaysMap';
import DelaysList from './components/delays/DelaysList';
import Auth from "./components/auth/Auth";
import Logout from "./components/auth/Logout";
import Favorites from "./components/favorites/Favorites";

import authModel from "./models/auth";

const Tab = createBottomTabNavigator();

const routeIcons = {
  "Home": "home",
  "Delays": "time",
  "DelaysList": "list",
  "Logga in": "lock-closed",
  "Logga ut": "log-out",
  "Favorites": "heart",
};

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(true);

//   useEffect(async () => {
//     setIsLoggedIn(await authModel.loggedIn());
// }, []);

useEffect(() => {
  async function logIn() {
    const response = await authModel.loggedIn();
  }
  logIn();
}, []);

  return (
    <SafeAreaView style={Base.container}>
      <NavigationContainer>
        <Tab.Navigator screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName = routeIcons[route.name] || "alert";

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'blue',
            tabBarInactiveTintColor: 'gray',
          })}
        >
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="Delays" component={DelaysMap} />
          
          <Tab.Screen name="DelaysList" component={DelaysList} />
          {isLoggedIn ? 
              <Tab.Screen name="Favorites" component={Favorites} />
              :
              <Tab.Screen name="Logga in">
                  { () => <Auth setIsLoggedIn={setIsLoggedIn} /> }
              </Tab.Screen>
          }
          {isLoggedIn ? 
              <Tab.Screen name="Logga ut">
              { () => <Logout setIsLoggedIn={setIsLoggedIn} /> }
          </Tab.Screen> : null
          }
        </Tab.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
      <FlashMessage position="top" />
    </SafeAreaView>
  );
}



