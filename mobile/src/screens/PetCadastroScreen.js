import { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

import { useCreatePet } from '../hooks/pets/useCreatePet';
import { useAuth } from '../context/AuthContext';

export default function PetCadastroScreen({ navigation, route }) {
  const { user } = useAuth();

  const idResponsavel =
    route?.params?.idResponsavel || user?.idResponsavel;

  const [nome, setNome] = useState('');
  const [sexo, setSexo] = useState('');
  const [raca, setRaca] = useState('');
  const [especie, setEspecie] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');

  const createPetMutation = useCreatePet();

  async function cadastrarPet() {
    if (!nome || !sexo || !raca || !especie || !dataNascimento) {
      Alert.alert(
        'Atenção',
        'Preencha todos os campos.'
      );
      return;
    }

    if (!idResponsavel || idResponsavel <= 0) {
      Alert.alert(
        'Erro',
        'Responsável não encontrado.'
      );
      return;
    }

    const dados = {
      nome,
      sexo,
      raca,
      especie,
      dataNascimento,
      idResponsavel,
    };

    createPetMutation.mutate(dados, {
      onSuccess: () => {
        Alert.alert(
          'Sucesso',
          'Pet cadastrado com sucesso!'
        );

        navigation.goBack();
      },

      onError: (error) => {
        console.log(
          'Erro ao cadastrar pet:',
          error?.response?.data || error.message
        );

        Alert.alert(
          'Erro',
          'Não foi possível cadastrar o pet.'
        );
      },
    });
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>
        Cadastrar Pet
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
        maxLength={25}
      />

      <TextInput
        style={styles.input}
        placeholder="Sexo"
        value={sexo}
        onChangeText={setSexo}
        maxLength={9}
      />

      <TextInput
        style={styles.input}
        placeholder="Raça"
        value={raca}
        onChangeText={setRaca}
        maxLength={15}
      />

      <TextInput
        style={styles.input}
        placeholder="Espécie"
        value={especie}
        onChangeText={setEspecie}
        maxLength={15}
      />

      <TextInput
        style={styles.input}
        placeholder="Data de nascimento"
        value={dataNascimento}
        onChangeText={setDataNascimento}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={cadastrarPet}
        disabled={createPetMutation.isPending}
      >
        {createPetMutation.isPending ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>
            Cadastrar Pet
          </Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 25,
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },

  button: {
    backgroundColor: '#2563eb',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});