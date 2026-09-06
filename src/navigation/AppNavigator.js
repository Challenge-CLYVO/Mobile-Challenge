import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreen';
import CadastroScreen from '../screens/CadastroScreen';
import HomeScreen from '../screens/HomeScreen';
import PerfilScreen from '../screens/PerfilScreen';
import LembretesScreen from '../screens/LembretesScreen';
import PetVacinasScreen from '../screens/PetVacinasScreen';
import CadastroVeterinarioScreen from '../screens/CadastroVeterinarioScreen';
import HomeVeterinarioScreen from '../screens/HomeVeterinarioScreen';
import PacientesScreen from '../screens/PacientesScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: true,
        }}
      >
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            title: 'Login',
          }}
        />

        <Stack.Screen
          name="Cadastro"
          component={CadastroScreen}
          options={{
            title: 'Cadastro',
          }}
        />

        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Home',
          }}
        />

        <Stack.Screen
          name="Perfil"
          component={PerfilScreen}
          options={{
            title: 'Perfil',
          }}
        />

        <Stack.Screen
          name="Lembretes"
          component={LembretesScreen}
          options={{
            title: 'Lembretes',
          }}
        />

        <Stack.Screen
          name="PetVacinas"
          component={PetVacinasScreen}
          options={{
            title: 'Pets e Vacinas',
          }}
        />

        <Stack.Screen
          name="CadastroVeterinario"
          component={CadastroVeterinarioScreen}
          options={{
            title: 'Cadastro Veterinário',
          }}
        />

        <Stack.Screen
          name="HomeVeterinario"
          component={HomeVeterinarioScreen}
          options={{
            title: 'Home Veterinário',
          }}
        />

        <Stack.Screen
          name="Pacientes"
          component={PacientesScreen}
          options={{
            title: 'Pacientes',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}