import { useEffect, useState } from 'react';

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

import { usePet } from '../hooks/pets/usePet';
import { useUpdatePet } from '../hooks/pets/useUpdatePet';

export default function PetEditarScreen({
  navigation,
  route,
}) {
  const { idPet } = route.params;

  const {
    data: pet,
    isLoading,
    isError,
  } = usePet(idPet);

  const updatePetMutation = useUpdatePet();

  const [nome, setNome] = useState('');
  const [sexo, setSexo] = useState('');
  const [raca, setRaca] = useState('');
  const [especie, setEspecie] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');

  useEffect(() => {
    if (pet) {
      setNome(pet.nome || '');
      setSexo(pet.sexo || '');
      setRaca(pet.raca || '');
      setEspecie(pet.especie || '');
      setDataNascimento(
        pet.dataNascimento
          ? String(pet.dataNascimento).substring(0, 10)
          : ''
      );
    }
  }, [pet]);

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Carregando pet...</Text>
      </View>
    );
  }

  if (isError || !pet) {
    return (
      <View style={styles.center}>
        <Text>
          Não foi possível carregar o pet.
        </Text>
      </View>
    );
  }

  function salvarAlteracoes() {
    if (!nome || !sexo || !raca || !especie || !dataNascimento) {
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
      idResponsavel: pet.idResponsavel,
    };

    updatePetMutation.mutate(
      {
        id: idPet,
        pet: dados,
      },
      {
        onSuccess: () => {
          Alert.alert(
            'Sucesso',
            'Pet atualizado com sucesso!'
          );

          navigation.goBack();
        },

        onError: (error) => {
          console.log(
            error?.response?.data || error.message
          );

          Alert.alert(
            'Erro',
            'Não foi possível atualizar o pet.'
          );
        },
      }
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>
        Editar Pet
      </Text>

      <TextInput
        style={styles.input}
        value={nome}
        onChangeText={setNome}
        placeholder="Nome"
        maxLength={25}
      />

      <TextInput
        style={styles.input}
        value={sexo}
        onChangeText={setSexo}
        placeholder="Sexo"
        maxLength={9}
      />

      <TextInput
        style={styles.input}
        value={raca}
        onChangeText={setRaca}
        placeholder="Raça"
        maxLength={15}
      />

      <TextInput
        style={styles.input}
        value={especie}
        onChangeText={setEspecie}
        placeholder="Espécie"
        maxLength={15}
      />

      <TextInput
        style={styles.input}
        value={dataNascimento}
        onChangeText={setDataNascimento}
        placeholder="Data de nascimento"
      />

      <TouchableOpacity
        style={styles.button}
        onPress={salvarAlteracoes}
        disabled={updatePetMutation.isPending}
      >
        {updatePetMutation.isPending ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>
            Salvar Alterações
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
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});