import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export default function CadastroVeterinarioScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Cadastro Veterinário
      </Text>

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
        placeholder="CRV"
      />

      <TextInput
        style={styles.input}
        placeholder="Especialidade"
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('HomeVeterinario')}
      >
        <Text style={styles.buttonText}>
          Cadastrar Veterinário
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

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  back: {
    textAlign: 'center',
    marginTop: 20,
    color: '#1565C0',
  },
});