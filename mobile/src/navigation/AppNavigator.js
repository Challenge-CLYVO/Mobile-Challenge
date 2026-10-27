import { useEffect, useRef } from 'react';

import * as Notifications from 'expo-notifications';

import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
  createNavigationContainerRef,
} from '@react-navigation/native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

// Autenticação
import LoginScreen from '../screens/LoginScreen';
import CadastroScreen from '../screens/CadastroScreen';
import CadastroVeterinarioScreen from '../screens/CadastroVeterinarioScreen';

// Usuário
import HomeScreen from '../screens/HomeScreen';
import PerfilScreen from '../screens/PerfilScreen';
import LembretesScreen from '../screens/LembretesScreen';
import PetVacinasScreen from '../screens/PetVacinasScreen';
import PetCadastroScreen from '../screens/PetCadastroScreen';
import PetEditarScreen from '../screens/PetEditarScreen';
import AplicacaoVacinaScreen from '../screens/AplicacaoVacinaScreen';

// Veterinário
import HomeVeterinarioScreen from '../screens/HomeVeterinarioScreen';
import PacientesScreen from '../screens/PacientesScreen';
import VeterinariosScreen from '../screens/VeterinariosScreen';

const Stack = createNativeStackNavigator();
const navigationRef = createNavigationContainerRef();

function AuthStack({ screenOptions }) {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ title: 'Login' }}
      />

      <Stack.Screen
        name="Cadastro"
        component={CadastroScreen}
        options={{ title: 'Cadastro' }}
      />

      <Stack.Screen
        name="CadastroVeterinario"
        component={CadastroVeterinarioScreen}
        options={{ title: 'Cadastro Veterinário' }}
      />
    </Stack.Navigator>
  );
}

function UserStack({ screenOptions }) {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
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
        options={{ title: 'Perfil' }}
      />

      <Stack.Screen
        name="Lembretes"
        component={LembretesScreen}
        options={{ title: 'Lembretes' }}
      />

      <Stack.Screen
        name="PetVacinas"
        component={PetVacinasScreen}
        options={{ title: 'Pets e Vacinas' }}
      />

      <Stack.Screen
        name="PetCadastro"
        component={PetCadastroScreen}
        options={{ title: 'Cadastrar Pet' }}
      />

      <Stack.Screen
        name="PetEditar"
        component={PetEditarScreen}
        options={{ title: 'Editar Pet' }}
      />

      <Stack.Screen
        name="AplicacaoVacina"
        component={AplicacaoVacinaScreen}
        options={{ title: 'Aplicação de Vacina' }}
      />
    </Stack.Navigator>
  );
}

function VetStack({ screenOptions }) {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="HomeVeterinario"
        component={HomeVeterinarioScreen}
        options={{
          title: 'Home Veterinário',
          headerBackVisible: false,
        }}
      />

      <Stack.Screen
        name="Pacientes"
        component={PacientesScreen}
        options={{ title: 'Pacientes' }}
      />

      <Stack.Screen
        name="Veterinarios"
        component={VeterinariosScreen}
        options={{ title: 'Veterinários' }}
      />

      <Stack.Screen
        name="PetEditar"
        component={PetEditarScreen}
        options={{ title: 'Editar Pet' }}
      />

      <Stack.Screen
        name="PetCadastro"
        component={PetCadastroScreen}
        options={{ title: 'Cadastrar Pet para Paciente' }}
      />

      <Stack.Screen
        name="AplicacaoVacina"
        component={AplicacaoVacinaScreen}
        options={{ title: 'Aplicação de Vacina' }}
      />
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
  const { token, user, loading } = useAuth();
  const notificacaoPendenteRef = useRef(null);
  const respostaInicialLidaRef = useRef(false);
  const ultimaRespostaAoVivoRef = useRef(null);

  const navegarParaNotificacao = (dados) => {
    if (dados?.tipo !== 'aplicacao-vacina') {
      return;
    }

    const idAplicacaoVacina = Number(dados.idAplicacaoVacina);

    if (!Number.isInteger(idAplicacaoVacina) || idAplicacaoVacina <= 0) {
      return;
    }

    if (!token || !navigationRef.isReady()) {
      notificacaoPendenteRef.current = { idAplicacaoVacina };
      return;
    }

    notificacaoPendenteRef.current = null;

    const destino = user?.isVeterinario
      ? 'HomeVeterinario'
      : 'Lembretes';

    navigationRef.navigate(destino, { idAplicacaoVacina });
  };

  const processarNotificacaoPendente = () => {
    const pendente = notificacaoPendenteRef.current;

    if (!token || !pendente || !navigationRef.isReady()) {
      return;
    }

    notificacaoPendenteRef.current = null;

    const destino = user?.isVeterinario
      ? 'HomeVeterinario'
      : 'Lembretes';

    navigationRef.navigate(destino, {
      idAplicacaoVacina: pendente.idAplicacaoVacina,
    });
  };

  useEffect(() => {
    const tratarResposta = (resposta) => {
      if (!resposta) {
        return;
      }

      const identificador = resposta?.notification?.request?.identifier;

      if (identificador) {
        ultimaRespostaAoVivoRef.current = identificador;
      }

      navegarParaNotificacao(
        resposta?.notification?.request?.content?.data
      );
    };

    const inscricao =
      Notifications.addNotificationResponseReceivedListener(tratarResposta);

    // Consulta a resposta inicial apenas uma vez. Os toques seguintes são
    // tratados pelo listener, inclusive quando a mesma notificação é tocada de novo.
    if (!respostaInicialLidaRef.current) {
      respostaInicialLidaRef.current = true;

      Notifications.getLastNotificationResponseAsync()
        .then((resposta) => {
          const identificador =
            resposta?.notification?.request?.identifier;

          // Evita navegar duas vezes se o listener já recebeu este mesmo toque.
          if (
            identificador &&
            identificador === ultimaRespostaAoVivoRef.current
          ) {
            return;
          }

          if (resposta) {
            navegarParaNotificacao(
              resposta?.notification?.request?.content?.data
            );
          }
        })
        .catch((erro) => {
          console.warn(
            'Não foi possível recuperar o toque na última notificação:',
            erro?.message || erro
          );
        });
    }

    return () => inscricao.remove();
  }, [token, user?.isVeterinario]);

  useEffect(() => {
    processarNotificacaoPendente();
  }, [token, user?.isVeterinario]);

  const {
    theme,
    colors,
    isDark,
    loadingTheme,
  } = useTheme();

  if (loading || loadingTheme) {
    return null;
  }

  const baseTheme = isDark ? DarkTheme : DefaultTheme;

  const navigationTheme = {
    ...baseTheme,
    dark: isDark,
    colors: {
      ...baseTheme.colors,
      primary: colors.primary,
      background: colors.background,
      card: colors.surface,
      text: colors.text,
      border: colors.border,
      notification: colors.danger,
    },
  };

  const screenOptions = {
    headerStyle: {
      backgroundColor: colors.surface,
    },
    headerTintColor: colors.text,
    headerTitleStyle: {
      color: colors.text,
    },
    contentStyle: {
      backgroundColor: colors.background,
    },
  };

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={navigationTheme}
      onReady={processarNotificacaoPendente}
    >
      {!token ? (
        <AuthStack screenOptions={screenOptions} />
      ) : user?.isVeterinario ? (
        <VetStack screenOptions={screenOptions} />
      ) : (
        <UserStack screenOptions={screenOptions} />
      )}
    </NavigationContainer>
  );
}
