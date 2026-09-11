import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';

import { useAuth } from '../context/AuthContext';

export default function PerfilScreen({
  navigation,
}) {
  const {
    user,
    logout,
  } = useAuth();

  async function sair() {
    try {
      await logout();
    } catch (error) {
      console.log(
        'Erro ao sair:',
        error
      );

      Alert.alert(
        'Erro',
        'Não foi possível sair da conta.'
      );
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Meu Perfil
      </Text>

      <View style={styles.card}>
        <Text style={styles.label}>
          Nome
        </Text>

        <Text style={styles.value}>
          {user?.nome || 'Não informado'}
        </Text>

        <Text style={styles.label}>
          Email
        </Text>

        <Text style={styles.value}>
          {user?.email || 'Não informado'}
        </Text>

        <Text style={styles.label}>
          Telefone
        </Text>

        <Text style={styles.value}>
          {user?.telefone || 'Não informado'}
        </Text>

        <Text style={styles.label}>
          Tipo de conta
        </Text>

        <Text style={styles.value}>
          {user?.isVeterinario
            ? 'Veterinário'
            : 'Usuário'}
        </Text>
      </View>

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
    backgroundColor: '#fff',
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
  },

  card: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    padding: 20,
  },

  label: {
    fontSize: 14,
    color: '#777',
    marginTop: 10,
    marginBottom: 4,
  },

  value: {
    fontSize: 18,
    fontWeight: '500',
  },

  logoutButton: {
    marginTop: 30,
    backgroundColor: '#D32F2F',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },

  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});