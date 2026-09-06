import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export default function PetVacinasScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pets e Vacinas</Text>

      <Text style={styles.message}>
        Aqui serão exibidos seus pets e as aplicações de vacinas.
      </Text>

      <TouchableOpacity
        style={styles.button}
      >
        <Text style={styles.buttonText}>
          Adicionar Pet
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
      >
        <Text style={styles.buttonText}>
          Adicionar Aplicação de Vacina
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
    marginBottom: 30,
    fontSize: 16,
  },

  button: {
    backgroundColor: '#2E7D32',
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
    color: '#2E7D32',
    marginTop: 20,
  },
});