import { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';

import { useLogin } from '../hooks/auth/useLogin';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const { iniciarSessao } = useAuth();
  const loginMutation = useLogin();
  const { colors } = useTheme();

  const styles = createStyles(colors);

  function validar() {
    if (!email.trim()) {
      Alert.alert('Erro', 'Informe o email.');
      return false;
    }

    if (!email.includes('@')) {
      Alert.alert('Erro', 'Informe um email válido.');
      return false;
    }

    if (!senha.trim()) {
      Alert.alert('Erro', 'Informe a senha.');
      return false;
    }

    return true;
  }

  async function entrar() {
    if (!validar()) {
      return;
    }

    try {
      const resultado = await loginMutation.mutateAsync({
        email: email.trim(),
        senha,
      });

      await iniciarSessao(resultado);
    } catch (error) {
      console.log('Erro no login:', error?.response?.status);

      let mensagem = 'Não foi possível realizar o login.';

      if (error?.response?.status === 401) {
        mensagem = 'Email ou senha inválidos.';
      } else if (error?.response?.data?.message) {
        mensagem = error.response.data.message;
      }

      Alert.alert('Erro no login', mensagem);
    }
  }

  const carregando = loginMutation.isPending;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>CLYVO VET</Text>

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        placeholderTextColor={colors.placeholder}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        value={email}
        onChangeText={setEmail}
        editable={!carregando}
        selectionColor={colors.primary}
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor={colors.placeholder}
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
        editable={!carregando}
        selectionColor={colors.primary}
      />

      <TouchableOpacity
        style={[
          styles.button,
          carregando && styles.buttonDisabled,
        ]}
        onPress={entrar}
        disabled={carregando}
        accessibilityRole="button"
      >
        {carregando ? (
          <ActivityIndicator color={colors.primaryText} />
        ) : (
          <Text style={styles.buttonText}>Entrar</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('Cadastro')}
        disabled={carregando}
        accessibilityRole="button"
      >
        <Text style={styles.link}>
          Não possui uma conta? Cadastre-se
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('CadastroVeterinario')}
        disabled={carregando}
        accessibilityRole="button"
      >
        <Text style={styles.vetLink}>Sou veterinário</Text>
      </TouchableOpacity>
    </View>
  );
}

function createStyles(colors) {
  return StyleSheet.create({
    container: {
      flex: 1,
      padding: 24,
      justifyContent: 'center',
      backgroundColor: colors.background,
    },

    title: {
      fontSize: 32,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 40,
      color: colors.text,
    },

    input: {
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.inputBackground,
      color: colors.text,
      borderRadius: 8,
      padding: 14,
      marginBottom: 15,
    },

    button: {
      backgroundColor: colors.primary,
      padding: 15,
      borderRadius: 8,
      alignItems: 'center',
      marginBottom: 20,
    },

    buttonDisabled: {
      opacity: 0.6,
    },

    buttonText: {
      color: colors.primaryText,
      fontWeight: 'bold',
      fontSize: 16,
    },

    link: {
      textAlign: 'center',
      color: colors.primary,
      marginBottom: 20,
    },

    vetLink: {
      textAlign: 'center',
      color: colors.secondary,
      fontWeight: 'bold',
    },
  });
}
