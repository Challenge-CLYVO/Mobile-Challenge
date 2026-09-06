import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';

export default function CadastroScreen({ navigation }) {
  const handleCadastro = () => {
    Alert.alert(
      'Cadastro',
      'Cadastro realizado com sucesso!',
      [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Home'),
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Criar conta</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome"
      />

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleCadastro}
      >
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.link}>
          Já possui uma conta? Entrar
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

  button: {
    backgroundColor: '#2E7D32',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  link: {
    textAlign: 'center',
    color: '#2E7D32',
    marginTop: 10,
  },
});