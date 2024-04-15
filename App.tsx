import React, {useState}from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationProp} from '@react-navigation/native-stack';
import LoginScreen from './components/LoginScreen';
import HomeScreen from './components/HomeScreen';
import DetailsScreen from './components/DetailsScreen';
import { AnimalDataResponse } from './types/AnimalData';

const Stack = createNativeStackNavigator();

type StackNavigation = {
  Login : undefined;
  Home: { token: string, type: string };
  Details: {pet : AnimalDataResponse, category: string, token : string, type : string};
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
          name="Home" 
          component={HomeScreen} 
          initialParams={{token: '', type: ''}}
        />
        <Stack.Screen 
          name="Details" 
          component={DetailsScreen}
          initialParams={{pet: {id: 0, name: '', age: 0, categoryId: '', img: '', description: '', phone: '', email: ''}, category: '', token: '', type: ''}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


export default App;



