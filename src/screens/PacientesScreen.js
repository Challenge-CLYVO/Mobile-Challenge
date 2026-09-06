import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export default function PacientesScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pacientes</Text>

      <Text style={styles.message}>
        Aqui serão exibidos os usuários e seus pets.
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('PetVacinas')}
      >
        <Text style={styles.buttonText}>
          Gerenciar Pets e Vacinas
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.back}>
          Voltar
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
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },

  message: {
    textAlign: 'center',
    fontSize: 16,
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

  back: {
    textAlign: 'center',
    color: '#1565C0',
    marginTop: 20,
  },
});