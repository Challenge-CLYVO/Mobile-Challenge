import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export default function LembretesScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lembretes</Text>

      <Text style={styles.message}>
        Aqui serão exibidas as próximas vacinas dos seus pets.
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('PetVacinas')}
      >
        <Text style={styles.buttonText}>
          Ver meus Pets e Vacinas
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
    fontSize: 16,
    marginBottom: 30,
  },

  button: {
    backgroundColor: '#2E7D32',
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
    color: '#2E7D32',
    marginTop: 20,
  },
});