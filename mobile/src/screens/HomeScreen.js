import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import {
  useAuth,
} from '../context/AuthContext';

import {
  useTheme,
} from '../context/ThemeContext';

export default function HomeScreen({ navigation }) {
  const { user, logout } = useAuth();
  const { colors } = useTheme();

  const styles = criarEstilos(colors);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Olá, {user?.nome || 'Usuário'}!
      </Text>

      <Text style={styles.subtitle}>
        Bem-vindo ao CLYVO VET
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Perfil')}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>
          Meu Perfil
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Lembretes')}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>
          Lembretes
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('PetVacinas')}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>
          Meus Pets e Vacinas
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={logout}
        style={styles.logoutButton}
        activeOpacity={0.7}
      >
        <Text style={styles.logoutText}>
          Sair
        </Text>
      </TouchableOpacity>
    </View>
  );
}

function criarEstilos(colors) {
  return StyleSheet.create({
    container: {
      flex: 1,
      padding: 24,
      justifyContent: 'center',
      backgroundColor: colors.background,
    },

    title: {
      fontSize: 30,
      fontWeight: 'bold',
      textAlign: 'center',
      color: colors.text,
      marginBottom: 8,
    },

    subtitle: {
      textAlign: 'center',
      fontSize: 18,
      marginBottom: 30,
      color: colors.textSecondary,
    },

    button: {
      backgroundColor: colors.primary,
      padding: 16,
      borderRadius: 8,
      marginBottom: 15,
      alignItems: 'center',
    },

    buttonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: 'bold',
    },

    logoutButton: {
      padding: 15,
      alignItems: 'center',
    },

    logoutText: {
      color: colors.danger,
      fontWeight: 'bold',
    },
  });
}