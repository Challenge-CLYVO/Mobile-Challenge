import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';

import {usePets} from '../hooks/pets/usePets';

import {useDeletePet} from '../hooks/pets/useDeletePet';

import {useAplicacoesVacina} from '../hooks/aplicacaoVacinas/useAplicacoesVacina';

import {useDeleteAplicacaoVacina} from '../hooks/aplicacaoVacinas/useDeleteAplicacaoVacina';

export default function PetVacinasScreen({ navigation }) {
  const {
    data: pets,
    isLoading: loadingPets,
    isError: errorPets,
    refetch: refetchPets,
  } = usePets();

  const {
    data: aplicacoes,
    isLoading: loadingAplicacoes,
    isError: errorAplicacoes,
    refetch: refetchAplicacoes,
  } = useAplicacoesVacina();

  const deletePetMutation = useDeletePet();
  const deleteAplicacaoMutation =
    useDeleteAplicacaoVacina();

  const petsArray = Array.isArray(pets)
    ? pets
    : pets?.data || [];

  const aplicacoesArray = Array.isArray(aplicacoes)
    ? aplicacoes
    : aplicacoes?.data || [];

  const loading =
    loadingPets ||
    loadingAplicacoes ||
    deletePetMutation.isPending ||
    deleteAplicacaoMutation.isPending;

  function obterAplicacoesDoPet(idPet) {
    return aplicacoesArray.filter(
      (aplicacao) =>
        Number(aplicacao.idPet) === Number(idPet)
    );
  }

  function excluirPet(pet) {
    Alert.alert(
      'Excluir pet',
      `Deseja realmente excluir ${pet.nome}?`,
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
              await deletePetMutation.mutateAsync(
                pet.idPet
              );

              Alert.alert(
                'Sucesso',
                'Pet excluído com sucesso.'
              );

              refetchPets();
            } catch (error) {
              console.log(
                'Erro ao excluir pet:',
                error
              );

              Alert.alert(
                'Erro',
                'Não foi possível excluir o pet.'
              );
            }
          },
        },
      ]
    );
  }

  function excluirAplicacao(aplicacao) {
    Alert.alert(
      'Excluir aplicação',
      'Deseja realmente excluir esta aplicação de vacina?',
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
              await deleteAplicacaoMutation.mutateAsync(
                aplicacao.idAplicacaoVacina
              );

              Alert.alert(
                'Sucesso',
                'Aplicação excluída com sucesso.'
              );

              refetchAplicacoes();
            } catch (error) {
              console.log(
                'Erro ao excluir aplicação:',
                error
              );

              Alert.alert(
                'Erro',
                'Não foi possível excluir a aplicação.'
              );
            }
          },
        },
      ]
    );
  }

  function atualizarDados() {
    refetchPets();
    refetchAplicacoes();
  }

  if (loadingPets || loadingAplicacoes) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />

        <Text style={styles.loadingText}>
          Carregando pets e aplicações...
        </Text>
      </View>
    );
  }

  if (errorPets || errorAplicacoes) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorTitle}>
          Erro ao carregar os dados
        </Text>

        <Text style={styles.errorText}>
          Não foi possível carregar pets ou aplicações
          de vacina.
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={atualizarDados}
        >
          <Text style={styles.buttonText}>
            Tentar novamente
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Pets e Vacinas
      </Text>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() =>
          navigation.navigate('PetCadastro')
        }
      >
        <Text style={styles.buttonText}>
          + Cadastrar Pet
        </Text>
      </TouchableOpacity>

      {petsArray.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            Nenhum pet cadastrado.
          </Text>
        </View>
      ) : (
        <FlatList
          data={petsArray}
          keyExtractor={(item) =>
            String(item.idPet)
          }
          refreshing={loading}
          onRefresh={atualizarDados}
          renderItem={({ item }) => {
            const aplicacoesDoPet =
              obterAplicacoesDoPet(item.idPet);

            return (
              <View style={styles.card}>
                <Text style={styles.petName}>
                  {item.nome}
                </Text>

                <Text style={styles.info}>
                  ID: {item.idPet}
                </Text>

                <Text style={styles.info}>
                  Espécie: {item.especie}
                </Text>

                <Text style={styles.info}>
                  Raça: {item.raca}
                </Text>

                <Text style={styles.info}>
                  Sexo: {item.sexo}
                </Text>

                <Text style={styles.info}>
                  Responsável: {item.nomeResponsavel || item.idResponsavel}
                </Text>

                <View style={styles.actions}>
                  <TouchableOpacity
                    style={styles.editButton}
                    onPress={() =>
                      navigation.navigate(
                        'PetEditar',
                        { pet: item }
                      )
                    }
                  >
                    <Text style={styles.buttonText}>
                      Editar Pet
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() =>
                      excluirPet(item)
                    }
                  >
                    <Text style={styles.buttonText}>
                      Excluir Pet
                    </Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  style={styles.vacinaButton}
                  onPress={() =>
                    navigation.navigate(
                      'AplicacaoVacina',
                      { pet: item }
                    )
                  }
                >
                  <Text style={styles.buttonText}>
                    + Adicionar Vacina
                  </Text>
                </TouchableOpacity>

                <View style={styles.vacinasSection}>
                  <Text style={styles.vacinasTitle}>
                    Vacinas do Pet
                  </Text>

                  {aplicacoesDoPet.length === 0 ? (
                    <Text style={styles.noVacina}>
                      Nenhuma aplicação cadastrada.
                    </Text>
                  ) : (
                    aplicacoesDoPet.map(
                      (aplicacao) => (
                        <View
                          key={
                            aplicacao.idAplicacaoVacina
                          }
                          style={styles.vacinaCard}
                        >
                          <Text
                            style={styles.vacinaText}
                          >
                            Vacina ID:{' '}
                            {aplicacao.idVacina}
                          </Text>

                          <Text
                            style={styles.vacinaText}
                          >
                            Data:{' '}
                            {aplicacao.dataAplicacao
                              ? aplicacao.dataAplicacao.substring(
                                  0,
                                  10
                                )
                              : '-'}
                          </Text>

                          <Text
                            style={styles.vacinaText}
                          >
                            Dose:{' '}
                            {aplicacao.dose ||
                              '-'}
                          </Text>

                          <Text
                            style={styles.vacinaText}
                          >
                            Observação:{' '}
                            {aplicacao.observacao ||
                              '-'}
                          </Text>

                          <View
                            style={
                              styles.vacinaActions
                            }
                          >
                            <TouchableOpacity
                              style={
                                styles.smallEditButton
                              }
                              onPress={() =>
                                navigation.navigate(
                                  'AplicacaoVacina',
                                  {
                                    pet: item,
                                  }
                                )
                              }
                            >
                              <Text
                                style={
                                  styles.buttonText
                                }
                              >
                                Editar
                              </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                              style={
                                styles.smallDeleteButton
                              }
                              onPress={() =>
                                excluirAplicacao(
                                  aplicacao
                                )
                              }
                            >
                              <Text
                                style={
                                  styles.buttonText
                                }
                              >
                                Excluir
                              </Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      )
                    )
                  )}
                </View>
              </View>
            );
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },

  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },

  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 15,
  },

  addButton: {
    backgroundColor: '#333',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },

  button: {
    backgroundColor: '#333',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  card: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
  },

  petName: {
    fontSize: 21,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  info: {
    marginBottom: 4,
  },

  actions: {
    flexDirection: 'row',
    marginTop: 12,
  },

  editButton: {
    flex: 1,
    backgroundColor: '#444',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 5,
  },

  deleteButton: {
    flex: 1,
    backgroundColor: '#b00020',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginLeft: 5,
  },

  vacinaButton: {
    backgroundColor: '#333',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },

  vacinasSection: {
    marginTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingTop: 12,
  },

  vacinasTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  noVacina: {
    color: '#777',
  },

  vacinaCard: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
  },

  vacinaText: {
    marginBottom: 4,
  },

  vacinaActions: {
    flexDirection: 'row',
    marginTop: 8,
  },

  smallEditButton: {
    flex: 1,
    backgroundColor: '#444',
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
    marginRight: 4,
  },

  smallDeleteButton: {
    flex: 1,
    backgroundColor: '#b00020',
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
    marginLeft: 4,
  },

  emptyContainer: {
    alignItems: 'center',
    marginTop: 30,
  },

  emptyText: {
    color: '#777',
    fontSize: 16,
  },

  errorTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },

  errorText: {
    textAlign: 'center',
    marginBottom: 20,
    color: '#b00020',
  },
});