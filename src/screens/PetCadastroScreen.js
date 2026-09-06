import React, { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  ScrollView,
} from 'react-native';

import { useCreatePet } from '../hooks/pets/useCreatePet';

export default function PetCadastroScreen({ navigation }) {
  const [nome, setNome] = useState('');
  const [sexo, setSexo] = useState('');
  const [raca, setRaca] = useState('');
  const [especie, setEspecie] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [idResponsavel, setIdResponsavel] = useState('');

  const createPetMutation = useCreatePet();

  const handleSubmit = () => {
    if (
      !nome ||
      !sexo ||
      !raca ||
      !especie ||
      !dataNascimento ||
      !idResponsavel
    ) {
      Alert.alert(
        'Atenção',
        'Preencha todos os campos.'
      );

      return;
    }

    const pet = {
      nome,
      sexo,
      raca,
      especie,
      dataNascimento,
      idResponsavel: Number(idResponsavel),
    };

    createPetMutation.mutate(pet, {
      onSuccess: () => {
        Alert.alert(
          'Sucesso',
          'Pet cadastrado com sucesso!',
          [
            {
              text: 'OK',
              onPress: () => navigation.goBack(),
            },
          ]
        );
      },

      onError: (error) => {
        Alert.alert(
          'Erro',
          error?.response?.data?.message ||
            'Não foi possível cadastrar o pet.'
        );
      },
    });
  };

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
      />

      <TextInput
        style={styles.input}
        placeholder="Sexo"
        value={sexo}
        onChangeText={setSexo}
      />

      <TextInput
        style={styles.input}
        placeholder="Raça"
        value={raca}
        onChangeText={setRaca}
      />

      <TextInput
        style={styles.input}
        placeholder="Espécie"
        value={especie}
        onChangeText={setEspecie}
      />

      <TextInput
        style={styles.input}
        placeholder="Data de nascimento"
        value={dataNascimento}
        onChangeText={setDataNascimento}
      />

      <TextInput
        style={styles.input}
        placeholder="ID do responsável"
        value={idResponsavel}
        onChangeText={setIdResponsavel}
        keyboardType="numeric"
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit}
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
    padding: 14,
    marginBottom: 15,
  },

  button: {
    backgroundColor: '#2E7D32',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});