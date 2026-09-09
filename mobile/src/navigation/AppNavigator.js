import React from 'react';

import {
  NavigationContainer,
} from '@react-navigation/native';

import {
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

import {
  useAuth,
} from '../context/AuthContext';

// =========================================================
// TELAS DE AUTENTICAÇÃO
// =========================================================

import LoginScreen from '../screens/LoginScreen';
import CadastroScreen from '../screens/CadastroScreen';
import CadastroVeterinarioScreen from '../screens/CadastroVeterinarioScreen';

// =========================================================
// TELAS DO USUÁRIO
// =========================================================

import HomeScreen from '../screens/HomeScreen';
import PerfilScreen from '../screens/PerfilScreen';
import LembretesScreen from '../screens/LembretesScreen';
import PetVacinasScreen from '../screens/PetVacinasScreen';
import PetCadastroScreen from '../screens/PetCadastroScreen';
import PetEditarScreen from '../screens/PetEditarScreen';
import AplicacaoVacinaScreen from '../screens/AplicacaoVacinaScreen';

// =========================================================
// TELAS DO VETERINÁRIO
// =========================================================

import HomeVeterinarioScreen from '../screens/HomeVeterinarioScreen';
import PacientesScreen from '../screens/PacientesScreen';

const Stack =
  createNativeStackNavigator();

// =========================================================
// STACK DE AUTENTICAÇÃO
// =========================================================

function AuthStack() {
  return (
    <Stack.Navigator>
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
        name="CadastroVeterinario"
        component={
          CadastroVeterinarioScreen
        }
        options={{
          title:
            'Cadastro Veterinário',
        }}
      />
    </Stack.Navigator>
  );
}

// =========================================================
// STACK DO USUÁRIO
// =========================================================

function UserStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Home',
          headerBackVisible: false,
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
        name="PetCadastro"
        component={PetCadastroScreen}
        options={{
          title: 'Cadastrar Pet',
        }}
      />

      <Stack.Screen
        name="PetEditar"
        component={PetEditarScreen}
        options={{
          title: 'Editar Pet',
        }}
      />

      <Stack.Screen
        name="AplicacaoVacina"
        component={
          AplicacaoVacinaScreen
        }
        options={{
          title:
            'Aplicação de Vacina',
        }}
      />
    </Stack.Navigator>
  );
}

// =========================================================
// STACK DO VETERINÁRIO
// =========================================================

function VetStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeVeterinario"
        component={
          HomeVeterinarioScreen
        }
        options={{
          title:
            'Home Veterinário',
          headerBackVisible: false,
        }}
      />

      <Stack.Screen
        name="Pacientes"
        component={PacientesScreen}
        options={{
          title: 'Pacientes',
        }}
      />

      <Stack.Screen
        name="PetCadastro"
        component={PetCadastroScreen}
        options={{
          title: 'Cadastrar Pet',
        }}
      />

      <Stack.Screen
        name="PetEditar"
        component={PetEditarScreen}
        options={{
          title: 'Editar Pet',
        }}
      />

      <Stack.Screen
        name="AplicacaoVacina"
        component={
          AplicacaoVacinaScreen
        }
        options={{
          title:
            'Aplicação de Vacina',
        }}
      />
    </Stack.Navigator>
  );
}

// =========================================================
// NAVEGADOR PRINCIPAL
// =========================================================

export default function AppNavigator() {
  const {
    token,
    user,
    loading,
  } = useAuth();

  if (loading) {
    return null;
  }

  return (
    <NavigationContainer>
      {!token ? (
        <AuthStack />
      ) : user?.isVeterinario ? (
        <VetStack />
      ) : (
        <UserStack />
      )}
    </NavigationContainer>
  );
}