import { useState } from 'react';

import {
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  ScrollView,
} from 'react-native';

import { useRegisterVeterinario } from '../hooks/auth/useRegisterVeterinario';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

export default function CadastroVeterinarioScreen({ navigation }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [telefone, setTelefone] = useState('');
  const [crv, setCrv] = useState('');
  const [especialidade, setEspecialidade] = useState('');

  const { iniciarSessao } = useAuth();
  const registerMutation = useRegisterVeterinario();
  const { colors } = useTheme();

  const styles = createStyles(colors);
  const carregando = registerMutation.isPending;

  function validar() {
    if (!nome.trim()) {
      Alert.alert('Erro', 'Informe o nome.');
      return false;
    }

    if (!email.trim()) {
      Alert.alert('Erro', 'Informe o email.');
      return false;
    }

    if (!email.includes('@')) {
      Alert.alert('Erro', 'Informe um email válido.');
      return false;
    }

    if (senha.length < 6) {
      Alert.alert('Erro', 'A senha deve possuir pelo menos 6 caracteres.');
      return false;
    }

    const telefoneNumeros = telefone.replace(/\D/g, '');

    if (telefoneNumeros.length < 10 || telefoneNumeros.length > 11) {
      Alert.alert('Erro', 'O telefone deve possuir 10 ou 11 números.');
      return false;
    }

    return true;
  }

  async function cadastrar() {
    if (!validar()) {
      return;
    }

    try {
      const resultado = await registerMutation.mutateAsync({
        nome: nome.trim(),
        email: email.trim(),
        senha,
        telefone: telefone.replace(/\D/g, ''),
        crv: crv.trim() || null,
        especialidade: especialidade.trim() || null,
      });

      await iniciarSessao(resultado);
    } catch (error) {
      console.log(
        'Erro no cadastro do veterinário:',
        error?.response?.status
      );

      let mensagem = 'Não foi possível realizar o cadastro do veterinário.';

      if (error?.response?.status === 409) {
        mensagem = 'Este email já está cadastrado.';
      } else if (error?.response?.data?.message) {
        mensagem = error.response.data.message;
      }

      Alert.alert('Erro no cadastro', mensagem);
    }
  }

  const inputProps = {
    editable: !carregando,
    placeholderTextColor: colors.placeholder,
    selectionColor: colors.primary,
    style: styles.input,
  };

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.title}>Cadastro Veterinário</Text>

      <TextInput
        {...inputProps}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
        maxLength={25}
        autoCapitalize="words"
      />

      <TextInput
        {...inputProps}
        placeholder="E-mail"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        {...inputProps}
        placeholder="Senha"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
        maxLength={255}
      />

      <TextInput
        {...inputProps}
        placeholder="Telefone"
        keyboardType="phone-pad"
        value={telefone}
        onChangeText={setTelefone}
        maxLength={11}
      />

      <TextInput
        {...inputProps}
        placeholder="CRV"
        value={crv}
        onChangeText={setCrv}
        maxLength={20}
      />

      <TextInput
        {...inputProps}
        placeholder="Especialidade"
        value={especialidade}
        onChangeText={setEspecialidade}
        maxLength={100}
      />

      <TouchableOpacity
        style={[styles.button, carregando && styles.buttonDisabled]}
        onPress={cadastrar}
        disabled={carregando}
      >
        {carregando ? (
          <ActivityIndicator color={colors.primaryText} />
        ) : (
          <Text style={styles.buttonText}>Cadastrar Veterinário</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.goBack()}
        disabled={carregando}
      >
        <Text style={styles.back}>Voltar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

function createStyles(colors) {
  return StyleSheet.create({
    scroll: {
      flex: 1,
      backgroundColor: colors.background,
    },

    container: {
      flexGrow: 1,
      padding: 24,
      justifyContent: 'center',
      backgroundColor: colors.background,
    },

    title: {
      fontSize: 28,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 30,
      color: colors.text,
    },

    input: {
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 8,
      padding: 14,
      marginBottom: 15,
      backgroundColor: colors.inputBackground,
      color: colors.text,
    },

    button: {
      backgroundColor: colors.primary,
      padding: 15,
      borderRadius: 8,
      alignItems: 'center',
    },

    buttonDisabled: {
      opacity: 0.6,
    },

    buttonText: {
      color: colors.primaryText,
      fontWeight: 'bold',
      textAlign: 'center',
    },

    back: {
      textAlign: 'center',
      marginTop: 20,
      color: colors.secondary,
    },
  });
}
