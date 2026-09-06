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

import { useVacinas } from '../hooks/vacinas/useVacinas';
import { useCreateAplicacaoVacina } from '../hooks/aplicacaoVacinas/useCreateAplicacaoVacina';

export default function AplicacaoVacinaScreen({
  navigation,
  route,
}) {
  const { pet } = route.params;

  const [idVacina, setIdVacina] = useState('');
  const [dataAplicacao, setDataAplicacao] =
    useState('');
  const [dose, setDose] = useState('');
  const [observacao, setObservacao] =
    useState('');
  const [idVeterinario, setIdVeterinario] =
    useState('');

  const {
    data: vacinas,
    isLoading: vacinasLoading,
  } = useVacinas();

  const createMutation =
    useCreateAplicacaoVacina();

  const listaVacinas = Array.isArray(vacinas)
    ? vacinas
    : [];

  const handleSubmit = () => {
    if (
      !idVacina ||
      !dataAplicacao ||
      !idVeterinario
    ) {
      Alert.alert(
        'Atenção',
        'Preencha os campos obrigatórios.'
      );

      return;
    }

    const aplicacao = {
      idAplicacaoVacina:
        Math.floor(Math.random() * 100000) + 1,
      idPet: pet.idPet,
      idVacina: Number(idVacina),
      dataAplicacao,
      dose: dose || null,
      observacao: observacao || null,
      idVeterinario: Number(idVeterinario),
    };

    createMutation.mutate(aplicacao, {
      onSuccess: () => {
        Alert.alert(
          'Sucesso',
          'Aplicação de vacina cadastrada!',
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
            'Não foi possível cadastrar a aplicação.'
        );
      },
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>
        Aplicar Vacina
      </Text>

      <Text style={styles.pet}>
        Pet: {pet.nome}
      </Text>

      <Text style={styles.sectionTitle}>
        Vacinas disponíveis
      </Text>

      {vacinasLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        listaVacinas.map((vacina) => (
          <TouchableOpacity
            key={vacina.idVacina}
            style={[
              styles.vacinaButton,
              Number(idVacina) ===
                vacina.idVacina &&
                styles.vacinaSelecionada,
            ]}
            onPress={() =>
              setIdVacina(
                String(vacina.idVacina)
              )
            }
          >
            <Text
              style={
                Number(idVacina) ===
                vacina.idVacina
                  ? styles.selectedText
                  : styles.vacinaText
              }
            >
              {vacina.nome}
            </Text>

            {vacina.descricao ? (
              <Text style={styles.description}>
                {vacina.descricao}
              </Text>
            ) : null}
          </TouchableOpacity>
        ))
      )}

      <TextInput
        style={styles.input}
        placeholder="Data da aplicação"
        value={dataAplicacao}
        onChangeText={setDataAplicacao}
      />

      <TextInput
        style={styles.input}
        placeholder="Dose"
        value={dose}
        onChangeText={setDose}
      />

      <TextInput
        style={styles.input}
        placeholder="Observação"
        value={observacao}
        onChangeText={setObservacao}
      />

      <TextInput
        style={styles.input}
        placeholder="ID do veterinário"
        value={idVeterinario}
        onChangeText={setIdVeterinario}
        keyboardType="numeric"
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit}
        disabled={createMutation.isPending}
      >
        {createMutation.isPending ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>
            Cadastrar Aplicação
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
    marginBottom: 15,
  },

  pet: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  vacinaButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 14,
    marginBottom: 10,
  },

  vacinaSelecionada: {
    borderWidth: 2,
    borderColor: '#2E7D32',
  },

  vacinaText: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  selectedText: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  description: {
    marginTop: 4,
    color: '#666',
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 14,
    marginTop: 15,
  },

  button: {
    backgroundColor: '#6A1B9A',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});