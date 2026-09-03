import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import Home from '../screens/Home';
import CadastroPet from '../screens/CadastroPet';
import ListaPets from '../screens/ListaPets';
import Lembretes from '../screens/Lembretes';
import Perfil from '../screens/Perfil';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: true,
        }}
      >
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: 'CLYVO VET' }}
        />

        <Stack.Screen
          name="CadastroPet"
          component={CadastroPet}
          options={{ title: 'Cadastrar Pet' }}
        />

        <Stack.Screen
          name="ListaPets"
          component={ListaPets}
          options={{ title: 'Meus Pets' }}
        />

        <Stack.Screen
          name="Lembretes"
          component={Lembretes}
          options={{ title: 'Lembretes' }}
        />

        <Stack.Screen
          name="Perfil"
          component={Perfil}
          options={{ title: 'Perfil' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}