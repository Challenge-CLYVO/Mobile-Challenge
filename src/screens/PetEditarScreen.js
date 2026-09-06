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

import { useUpdatePet } from '../hooks/pets/useUpdatePet';

export default function PetEditarScreen({
  navigation,
  route,
}) {
  const { pet } = route.params;

  const [nome, setNome] = useState(pet.nome || '');
  const [sexo, setSexo] = useState(pet.sexo || '');
  const [raca, setRaca] = useState(pet.raca || '');
  const [especie, setEspecie] = useState(
    pet.especie || ''
  );

  const [dataNascimento, setDataNascimento] =
    useState(
      pet.dataNascimento
        ? String(pet.dataNascimento).split('T')[0]
        : ''
    );

  const [idResponsavel, setIdResponsavel] =
    useState(
      String(pet.idResponsavel || '')
    );

  const updatePetMutation = useUpdatePet();

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

    const dados = {
      nome,
      sexo,
      raca,
      especie,
      dataNascimento,
      idResponsavel: Number(idResponsavel),
    };

    updatePetMutation.mutate(
      {
        id: pet.idPet,
        pet: dados,
      },
      {
        onSuccess: () => {
          Alert.alert(
            'Sucesso',
            'Pet atualizado com sucesso!',
            [
              {
                text: 'OK',
                onPress: () =>
                  navigation.goBack(),
              },
            ]
          );
        },

        onError: (error) => {
          Alert.alert(
            'Erro',
            error?.response?.data?.message ||
              'Não foi possível atualizar o pet.'
          );
        },
      }
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>
        Editar Pet
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
        disabled={updatePetMutation.isPending}
      >
        {updatePetMutation.isPending ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>
            Salvar alterações
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
    backgroundColor: '#1565C0',
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