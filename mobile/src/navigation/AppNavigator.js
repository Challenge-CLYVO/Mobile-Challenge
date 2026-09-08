import {
  NavigationContainer,
} from '@react-navigation/native';

import {
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

import { ActivityIndicator, View } from 'react-native';

import { useAuth } from '../context/AuthContext';

import LoginScreen from '../screens/LoginScreen';
import CadastroScreen from '../screens/CadastroScreen';
import CadastroVeterinarioScreen from '../screens/CadastroVeterinarioScreen';

import HomeScreen from '../screens/HomeScreen';
import PerfilScreen from '../screens/PerfilScreen';
import LembretesScreen from '../screens/LembretesScreen';
import PetVacinasScreen from '../screens/PetVacinasScreen';
import PetCadastroScreen from '../screens/PetCadastroScreen';
import PetEditarScreen from '../screens/PetEditarScreen';
import AplicacaoVacinaScreen from '../screens/AplicacaoVacinaScreen';

import HomeVeterinarioScreen from '../screens/HomeVeterinarioScreen';
import PacientesScreen from '../screens/PacientesScreen';

const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
      />

      <Stack.Screen
        name="Cadastro"
        component={CadastroScreen}
      />

      <Stack.Screen
        name="CadastroVeterinario"
        component={CadastroVeterinarioScreen}
      />
    </Stack.Navigator>
  );
}

function UserStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
      />

      <Stack.Screen
        name="Perfil"
        component={PerfilScreen}
      />

      <Stack.Screen
        name="Lembretes"
        component={LembretesScreen}
      />

      <Stack.Screen
        name="PetVacinas"
        component={PetVacinasScreen}
      />

      <Stack.Screen
        name="PetCadastro"
        component={PetCadastroScreen}
      />

      <Stack.Screen
        name="PetEditar"
        component={PetEditarScreen}
      />

      <Stack.Screen
        name="AplicacaoVacina"
        component={AplicacaoVacinaScreen}
      />
    </Stack.Navigator>
  );
}

function VetStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeVeterinario"
        component={HomeVeterinarioScreen}
      />

      <Stack.Screen
        name="Pacientes"
        component={PacientesScreen}
      />

      <Stack.Screen
        name="AplicacaoVacina"
        component={AplicacaoVacinaScreen}
      />
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
  const {
    token,
    user,
    loadingAuth,
  } = useAuth();

  if (loadingAuth) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
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