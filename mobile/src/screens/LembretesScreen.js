import { useMemo } from 'react';

import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';

import {
  useAplicacoesVacina,
} from '../hooks/aplicacaoVacinas/useAplicacoesVacina';

import {
  useDeleteAplicacaoVacina,
} from '../hooks/aplicacaoVacinas/useDeleteAplicacaoVacina';

import {
  usePets,
} from '../hooks/pets/usePets';

import {
  useVacinas,
} from '../hooks/vacinas/useVacinas';

import { useAuth } from '../context/AuthContext';

export default function LembretesScreen({
  navigation,
}) {
  const { user } = useAuth();

  const {
    data: aplicacoes = [],
    isLoading: loadingAplicacoes,
  } = useAplicacoesVacina();

  const {
    data: pets = [],
    isLoading: loadingPets,
  } = usePets();

  const {
    data: vacinas = [],
    isLoading: loadingVacinas,
  } = useVacinas();

  const deleteMutation =
    useDeleteAplicacaoVacina();

  const meusPets = useMemo(() => {
    return pets.filter(
      (pet) =>
        Number(pet.idResponsavel) ===
        Number(user?.idResponsavel)
    );
  }, [
    pets,
    user,
  ]);

  const idsDosMeusPets = useMemo(() => {
    return meusPets.map(
      (pet) =>
        Number(pet.idPet)
    );
  }, [
    meusPets,
  ]);

  const lembretes = useMemo(() => {
    return aplicacoes
      .filter((item) =>
        idsDosMeusPets.includes(
          Number(item.idPet)
        )
      )
      .map((item) => {
        const pet =
          pets.find(
            (p) =>
              Number(p.idPet) ===
              Number(item.idPet)
          );

        const vacina =
          vacinas.find(
            (v) =>
              Number(v.idVacina) ===
              Number(item.idVacina)
          );

        return {
          ...item,

          petNome:
            pet?.nome ||
            'Pet',

          vacinaNome:
            vacina?.nome ||
            'Vacina',
        };
      })
      .sort(
        (a, b) =>
          new Date(a.dataAplicacao) -
          new Date(b.dataAplicacao)
      );
  }, [
    aplicacoes,
    pets,
    vacinas,
    idsDosMeusPets,
  ]);

  const loading =
    loadingAplicacoes ||
    loadingPets ||
    loadingVacinas;

  function formatarData(data) {
    if (!data) {
      return '';
    }

    const dataObj =
      new Date(data);

    const dia =
      String(
        dataObj.getDate()
      ).padStart(2, '0');

    const mes =
      String(
        dataObj.getMonth() + 1
      ).padStart(2, '0');

    const ano =
      dataObj.getFullYear();

    return `${dia}/${mes}/${ano}`;
  }

  function excluir(item) {
    Alert.alert(
      'Excluir aplicação',
      `Deseja excluir a aplicação da vacina "${item.vacinaNome}" do pet "${item.petNome}"?`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },

        {
          text: 'Excluir',
          style: 'destructive',

          onPress: async () => {
            try {
              await deleteMutation.mutateAsync(
                Number(
                  item.idAplicacaoVacina
                )
              );

              Alert.alert(
                'Sucesso',
                'Aplicação da vacina excluída com sucesso!'
              );
            } catch (error) {
              console.log(
                'Erro ao excluir aplicação:',
                error?.response?.data ||
                  error?.message ||
                  error
              );

              Alert.alert(
                'Erro',
                'Não foi possível excluir a aplicação da vacina.'
              );
            }
          },
        },
      ]
    );
  }

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator
          size="large"
        />

        <Text>
          Carregando lembretes...
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Lembretes
      </Text>

      <Text style={styles.description}>
        Acompanhe as aplicações de vacina
        dos seus pets.
      </Text>

      <FlatList
        data={lembretes}

        keyExtractor={(item) =>
          String(
            item.idAplicacaoVacina
          )
        }

        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.petName}>
              {item.petNome}
            </Text>

            <Text style={styles.vaccine}>
              {item.vacinaNome}
            </Text>

            <Text style={styles.date}>
              Data:{' '}
              {formatarData(
                item.dataAplicacao
              )}
            </Text>

            {item.dose && (
              <Text>
                Dose: {item.dose}
              </Text>
            )}

            {item.observacao && (
              <Text>
                Observação:{' '}
                {item.observacao}
              </Text>
            )}

            <View style={styles.buttons}>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() =>
                  navigation.navigate(
                    'AplicacaoVacina',
                    {
                      idPet:
                        item.idPet,

                      aplicacao:
                        item,
                    }
                  )
                }
              >
                <Text style={styles.buttonText}>
                  Editar
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() =>
                  excluir(item)
                }
                disabled={
                  deleteMutation.isPending
                }
              >
                <Text style={styles.buttonText}>
                  Excluir
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        ListEmptyComponent={
          <View style={styles.empty}>
            <Text>
              Nenhuma aplicação de vacina
              encontrada.
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  description: {
    marginBottom: 20,
  },

  card: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 15,
    marginBottom: 12,
  },

  petName: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  vaccine: {
    fontSize: 18,
    marginVertical: 5,
  },

  date: {
    marginBottom: 5,
  },

  buttons: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 15,
  },

  editButton: {
    flex: 1,
    backgroundColor: '#2563eb',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },

  deleteButton: {
    flex: 1,
    backgroundColor: '#dc2626',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  empty: {
    alignItems: 'center',
    marginTop: 30,
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});