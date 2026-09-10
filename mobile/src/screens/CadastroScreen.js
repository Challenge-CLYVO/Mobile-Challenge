import { useState } from 'react';

import {
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  ScrollView,
  View,
} from 'react-native';

import {
  useRegister,
} from '../hooks/auth/useRegister';

import {
  useAuth,
} from '../context/AuthContext';

import DateTimePicker from '@react-native-community/datetimepicker';

export default function CadastroScreen({
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

  const [cpf, setCpf] =
    useState('');

  const [dataNascimento, setDataNascimento] =
    useState('');

  const [dataSelecionada, setDataSelecionada] =
    useState(new Date());

  const [mostrarCalendario, setMostrarCalendario] =
    useState(false);

  const {
    iniciarSessao,
  } = useAuth();

  const registerMutation =
    useRegister();

  function formatarDataParaAPI(data) {
    const ano = data.getFullYear();

    const mes = String(
      data.getMonth() + 1
    ).padStart(2, '0');

    const dia = String(
      data.getDate()
    ).padStart(2, '0');

    return `${ano}-${mes}-${dia}`;
  }

  function formatarDataParaExibicao(data) {
    const dia = String(
      data.getDate()
    ).padStart(2, '0');

    const mes = String(
      data.getMonth() + 1
    ).padStart(2, '0');

    const ano = data.getFullYear();

    return `${dia}/${mes}/${ano}`;
  }

  function selecionarData(event, data) {
    setMostrarCalendario(false);

    if (event.type === 'dismissed' || !data) {
      return;
    }

    const hoje = new Date();

    hoje.setHours(
      23,
      59,
      59,
      999
    );

    if (data > hoje) {
      Alert.alert(
        'Data inválida',
        'A data de nascimento não pode ser futura.'
      );
      return;
    }

    setDataSelecionada(data);

    setDataNascimento(
      formatarDataParaAPI(data)
    );
  }

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

    const cpfNumeros =
      cpf.replace(/\D/g, '');

    if (cpfNumeros.length !== 11) {
      Alert.alert(
        'Erro',
        'O CPF deve possuir 11 números.'
      );
      return false;
    }

    if (!dataNascimento) {
      Alert.alert(
        'Erro',
        'Informe a data de nascimento.'
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
          nome: nome.trim(),

          email:
            email.trim(),

          senha,

          telefone:
            telefone.replace(/\D/g, ''),

          cpf:
            cpf.replace(/\D/g, ''),

          dataNascimento:
            `${dataNascimento}T00:00:00`,
        });

      await iniciarSessao(
        resultado
      );

    } catch (error) {
      console.log(
        'Erro no cadastro:',
        error
      );

      let mensagem =
        'Não foi possível realizar o cadastro.';

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
      } else if (
        error?.response?.data?.errors
      ) {
        const erros =
          error.response.data.errors;

        const primeiroCampo =
          Object.keys(erros)[0];

        if (primeiroCampo) {
          mensagem =
            erros[primeiroCampo][0] ||
            mensagem;
        }
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
        Criar conta
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
        placeholder="CPF"
        keyboardType="numeric"
        value={cpf}
        onChangeText={setCpf}
        editable={!carregando}
        maxLength={11}
      />

      <Text style={styles.label}>
        Data de nascimento
      </Text>

      <TouchableOpacity
        style={styles.dateButton}
        onPress={() =>
          !carregando &&
          setMostrarCalendario(true)
        }
        disabled={carregando}
      >
        <Text
          style={
            dataNascimento
              ? styles.dateText
              : styles.datePlaceholder
          }
        >
          {dataNascimento
            ? formatarDataParaExibicao(
                dataSelecionada
              )
            : 'Selecionar data de nascimento'}
        </Text>
      </TouchableOpacity>

      {mostrarCalendario && (
        <View style={styles.calendarContainer}>
          <DateTimePicker
            value={dataSelecionada}
            mode="date"
            display="default"
            maximumDate={new Date()}
            onChange={selecionarData}
          />
        </View>
      )}

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
            Cadastrar
          </Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() =>
          navigation.navigate(
            'Login'
          )
        }
        disabled={carregando}
      >
        <Text style={styles.link}>
          Já possui uma conta? Entrar
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
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 14,
    marginBottom: 15,
  },

  label: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  dateButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 14,
    marginBottom: 15,
    backgroundColor: '#fff',
  },

  dateText: {
    fontSize: 16,
    color: '#222',
  },

  datePlaceholder: {
    fontSize: 16,
    color: '#777',
  },

  calendarContainer: {
    alignItems: 'center',
    marginBottom: 15,
  },

  button: {
    backgroundColor: '#2E7D32',
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

  link: {
    textAlign: 'center',
    marginTop: 20,
    color: '#2E7D32',
  },
});