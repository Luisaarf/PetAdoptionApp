import React, {useState}from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationProp} from '@react-navigation/native-stack';
import LoginScreen from './components/LoginScreen';
import HomeScreen from './components/HomeScreen';
import DetailsScreen from './components/DetailsScreen';

const Stack = createNativeStackNavigator();

type StackNavigation = {
  Login : undefined;
  Home: undefined;
}

export type StackTypes = NativeStackNavigationProp<StackNavigation>;

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen 
          name="Login" 
          component={LoginScreen}
        />
        <Stack.Screen 
          name="Home" component={HomeScreen}
        />
        <Stack.Screen 
          name="Details" component={DetailsScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


export default App;



