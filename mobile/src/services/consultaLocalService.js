import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@clyvo_vet_terminos_consultas';

/*
 * Estrutura armazenada:
 *
 * {
 *   "1": "2026-09-10T15:30:00.000",
 *   "2": "2026-09-11T16:00:00.000"
 * }
 */

async function carregarTerminos() {
  try {
    const dados =
      await AsyncStorage.getItem(
        STORAGE_KEY
      );

    if (!dados) {
      return {};
    }

    return JSON.parse(dados);
  } catch (error) {
    console.log(
      'Erro ao carregar términos locais:',
      error
    );

    return {};
  }
}

export async function salvarTerminoConsulta(
  idAplicacaoVacina,
  dataTermino
) {
  try {
    const dados =
      await carregarTerminos();

    dados[String(idAplicacaoVacina)] =
      dataTermino;

    await AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(dados)
    );
  } catch (error) {
    console.log(
      'Erro ao salvar término da consulta:',
      error
    );

    throw error;
  }
}

export async function buscarTerminoConsulta(
  idAplicacaoVacina
) {
  const dados =
    await carregarTerminos();

  return (
    dados[String(idAplicacaoVacina)] ||
    null
  );
}

export async function carregarTodosTerminos() {
  return await carregarTerminos();
}

export async function excluirTerminoConsulta(
  idAplicacaoVacina
) {
  try {
    const dados =
      await carregarTerminos();

    delete dados[
      String(idAplicacaoVacina)
    ];

    await AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(dados)
    );
  } catch (error) {
    console.log(
      'Erro ao excluir término local:',
      error
    );
  }
}