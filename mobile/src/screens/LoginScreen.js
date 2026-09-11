import React, { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';

import {
  useLogin,
} from '../hooks/auth/useLogin';

import {
  useAuth,
} from '../context/AuthContext';

export default function LoginScreen({
  navigation,
}) {
  const [email, setEmail] =
    useState('');

  const [senha, setSenha] =
    useState('');

  const {
    iniciarSessao,
  } = useAuth();

  const loginMutation =
    useLogin();

  function validar() {
    if (!email.trim()) {
      Alert.alert(
        'Erro',
        'Informe o email.'
      );

      return false;
    }

    if (!email.includes('@')) {
      Alert.alert(
        'Erro',
        'Informe um email válido.'
      );

      return false;
    }

    if (!senha.trim()) {
      Alert.alert(
        'Erro',
        'Informe a senha.'
      );

      return false;
    }

    return true;
  }

  async function entrar() {
    if (!validar()) {
      return;
    }

    try {
      const resultado =
        await loginMutation.mutateAsync({
          email: email.trim(),
          senha,
        });

      await iniciarSessao(resultado);
    } catch (error) {
      console.log(
        'Erro no login:',
        error
      );

      let mensagem =
        'Não foi possível realizar o login.';

      if (
        error?.response?.status === 401
      ) {
        mensagem =
          'Email ou senha inválidos.';
      } else if (
        error?.response?.data?.message
      ) {
        mensagem =
          error.response.data.message;
      }

      Alert.alert(
        'Erro no login',
        mensagem
      );
    }
  }

  const carregando =
    loginMutation.isPending;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        CLYVO VET
      </Text>

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        value={email}
        onChangeText={setEmail}
        editable={!carregando}
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
        editable={!carregando}
      />

      <TouchableOpacity
        style={[
          styles.button,
          carregando &&
          styles.buttonDisabled,
        ]}
        onPress={entrar}
        disabled={carregando}
      >
        {carregando ? (
          <ActivityIndicator
            color="#fff"
          />
        ) : (
          <Text style={styles.buttonText}>
            Entrar
          </Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() =>
          navigation.navigate(
            'Cadastro'
          )
        }
        disabled={carregando}
      >
        <Text style={styles.link}>
          Não possui uma conta?
          {' '}Cadastre-se
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() =>
          navigation.navigate(
            'CadastroVeterinario'
          )
        }
        disabled={carregando}
      >
        <Text style={styles.vetLink}>
          Sou veterinário
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
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 14,
    marginBottom: 15,
  },

  button: {
    backgroundColor: '#2E7D32',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },

  buttonDisabled: {
    opacity: 0.6,
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },

  link: {
    textAlign: 'center',
    color: '#2E7D32',
    marginBottom: 20,
  },

  vetLink: {
    textAlign: 'center',
    color: '#1565C0',
    fontWeight: 'bold',
  },
});