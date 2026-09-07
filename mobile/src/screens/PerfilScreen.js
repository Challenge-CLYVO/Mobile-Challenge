import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export default function PerfilScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meu Perfil</Text>

      <Text style={styles.label}>Nome</Text>
      <Text style={styles.value}>Usuário</Text>

      <Text style={styles.label}>E-mail</Text>
      <Text style={styles.value}>usuario@email.com</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Voltar</Text>
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

  label: {
    fontSize: 14,
    color: '#666',
    marginTop: 15,
  },

  value: {
    fontSize: 18,
    marginTop: 5,
  },

  button: {
    backgroundColor: '#2E7D32',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 30,
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});