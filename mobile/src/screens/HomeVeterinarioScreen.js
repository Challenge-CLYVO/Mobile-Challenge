import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import {
  useAuth,
} from '../context/AuthContext';

export default function HomeVeterinarioScreen({ navigation }) {
  
  const { sair } = useAuth();
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Área do Veterinário
      </Text>

      <Text style={styles.subtitle}>
        Bem-vindo ao CLYVO VET
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Pacientes')}
      >
        <Text style={styles.buttonText}>
          Pacientes / Usuários
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('PetVacinas')}
      >
        <Text style={styles.buttonText}>
          Gerenciar Pets e Vacinas
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={sair}
      >
        <Text style={styles.logoutText}>
          Sair
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  subtitle: {
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 30,
  },

  button: {
    backgroundColor: '#1565C0',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  logoutButton: {
    padding: 15,
    alignItems: 'center',
  },

  logoutText: {
    color: '#C62828',
    fontWeight: 'bold',
  },
});