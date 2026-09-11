import { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  ScrollView,
} from 'react-native';

import {
  useRegisterVeterinario,
} from '../hooks/auth/useRegisterVeterinario';

import {
  useAuth,
} from '../context/AuthContext';

export default function CadastroVeterinarioScreen({
  navigation,
}) {
  const [nome, setNome] =
    useState('');

  const [email, setEmail] =
    useState('');

  const [senha, setSenha] =
    useState('');

  const [telefone, setTelefone] =
    useState('');

  const [crv, setCrv] =
    useState('');

  const [especialidade, setEspecialidade] =
    useState('');

  const {
    iniciarSessao,
  } = useAuth();

  const registerMutation =
    useRegisterVeterinario();

  function validar() {
    if (!nome.trim()) {
      Alert.alert(
        'Erro',
        'Informe o nome.'
      );
      return false;
    }

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

    if (senha.length < 6) {
      Alert.alert(
        'Erro',
        'A senha deve possuir pelo menos 6 caracteres.'
      );
      return false;
    }

    const telefoneNumeros =
      telefone.replace(/\D/g, '');

    if (
      telefoneNumeros.length < 10 ||
      telefoneNumeros.length > 11
    ) {
      Alert.alert(
        'Erro',
        'O telefone deve possuir 10 ou 11 números.'
      );
      return false;
    }

    return true;
  }

  async function cadastrar() {
    if (!validar()) {
      return;
    }

    try {
      const resultado =
        await registerMutation.mutateAsync({
          nome:
            nome.trim(),

          email:
            email.trim(),

          senha,

          telefone:
            telefone.replace(/\D/g, ''),

          crv:
            crv.trim() || null,

          especialidade:
            especialidade.trim() || null,
        });

      await iniciarSessao(
        resultado
      );

    } catch (error) {
      console.log(
        'Erro no cadastro do veterinário:',
        error
      );

      let mensagem =
        'Não foi possível realizar o cadastro do veterinário.';

      if (
        error?.response?.status === 409
      ) {
        mensagem =
          'Este email já está cadastrado.';
      } else if (
        error?.response?.data?.message
      ) {
        mensagem =
          error.response.data.message;
      }

      Alert.alert(
        'Erro no cadastro',
        mensagem
      );
    }
  }

  const carregando =
    registerMutation.isPending;

  return (
    <ScrollView
      contentContainerStyle={
        styles.container
      }
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.title}>
        Cadastro Veterinário
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
        editable={!carregando}
        maxLength={25}
      />

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
        maxLength={255}
      />

      <TextInput
        style={styles.input}
        placeholder="Telefone"
        keyboardType="phone-pad"
        value={telefone}
        onChangeText={setTelefone}
        editable={!carregando}
        maxLength={11}
      />

      <TextInput
        style={styles.input}
        placeholder="CRV"
        value={crv}
        onChangeText={setCrv}
        editable={!carregando}
        maxLength={20}
      />

      <TextInput
        style={styles.input}
        placeholder="Especialidade"
        value={especialidade}
        onChangeText={setEspecialidade}
        editable={!carregando}
        maxLength={100}
      />

      <TouchableOpacity
        style={[
          styles.button,
          carregando &&
            styles.buttonDisabled,
        ]}
        onPress={cadastrar}
        disabled={carregando}
      >
        {carregando ? (
          <ActivityIndicator
            color="#fff"
          />
        ) : (
          <Text style={styles.buttonText}>
            Cadastrar Veterinário
          </Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() =>
          navigation.goBack()
        }
        disabled={carregando}
      >
        <Text style={styles.back}>
          Voltar
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    justifyContent: 'center',
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 14,
    marginBottom: 15,
  },

  button: {
    backgroundColor: '#1565C0',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },

  buttonDisabled: {
    opacity: 0.6,
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  back: {
    textAlign: 'center',
    marginTop: 20,
    color: '#1565C0',
  },
});