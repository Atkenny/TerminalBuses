// src/navigation/AppNavigation.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen'; // Aquí visualizamos los buses registrados
import AddBusScreen from '../screens/AddBusScreen'; // Aquí agregamos un nuevo bus
import UpdateBusScreen from '../screens/UpdateBusScreen'; // Para actualizar un bus

const Stack = createStackNavigator();

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Buses Registrados' }} />
        <Stack.Screen name="AddBus" component={AddBusScreen} options={{ title: 'Agregar Bus' }} />
        <Stack.Screen name="UpdateBus" component={UpdateBusScreen} options={{ title: 'Actualizar Bus' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
