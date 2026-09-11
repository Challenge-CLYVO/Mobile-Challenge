import {
  useCallback,
  useMemo,
  useState,
} from 'react';

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
  useFocusEffect,
} from '@react-navigation/native';

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

import {
  useAuth,
} from '../context/AuthContext';

import {
  carregarTodosTerminos,
  excluirTerminoConsulta,
} from '../services/consultaLocalService';

export default function LembretesScreen({
  navigation,
}) {
  const { user } = useAuth();

  const {
    data: aplicacoes = [],
    isLoading: loadingAplicacoes,
    refetch: refetchAplicacoes,
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

  const [terminos, setTerminos] =
    useState({});

  /*
   * ========================================================
   * CARREGAR TÉRMINOS
   * ========================================================
   */

  const carregarDadosLocais =
    useCallback(async () => {
      const dados =
        await carregarTodosTerminos();

      setTerminos(dados);

      await refetchAplicacoes();
    }, [
      refetchAplicacoes,
    ]);

  useFocusEffect(
    useCallback(() => {
      carregarDadosLocais();
    }, [
      carregarDadosLocais,
    ])
  );

  /*
   * ========================================================
   * PETS DO USUÁRIO
   * ========================================================
   */

  const meusPets = useMemo(() => {
    return pets.filter(
      (pet) =>
        Number(
          pet.idResponsavel
        ) ===
        Number(
          user?.idResponsavel
        )
    );
  }, [
    pets,
    user,
  ]);

  const idsDosMeusPets =
    useMemo(() => {
      return meusPets.map(
        (pet) =>
          Number(
            pet.idPet
          )
      );
    }, [
      meusPets,
    ]);

  /*
   * ========================================================
   * DADOS DOS LEMBRETES
   * ========================================================
   */

  const lembretes =
    useMemo(() => {
      const agora =
        new Date();

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
                Number(
                  p.idPet
                ) ===
                Number(
                  item.idPet
                )
            );

          const vacina =
            vacinas.find(
              (v) =>
                Number(
                  v.idVacina
                ) ===
                Number(
                  item.idVacina
                )
            );

          const inicio =
            new Date(
              item.dataAplicacao
            );

          let termino =
            terminos[
              String(
                item.idAplicacaoVacina
              )
            ];

          /*
           * Aplicações antigas que ainda
           * não possuem término recebem
           * 1 hora automaticamente.
           */

          if (!termino) {
            termino =
              new Date(
                inicio.getTime() +
                  60 * 60 * 1000
              ).toISOString();
          }

          const dataTermino =
            new Date(
              termino
            );

          let status;

          if (
            agora < inicio
          ) {
            status =
              'agendado';
          } else if (
            agora <
            dataTermino
          ) {
            status =
              'andamento';
          } else {
            status =
              'concluido';
          }

          return {
            ...item,

            petNome:
              pet?.nome ||
              'Pet',

            vacinaNome:
              vacina?.nome ||
              'Vacina',

            inicio,
            termino:
              dataTermino,

            status,
          };
        })
        .sort(
          (a, b) =>
            a.inicio - b.inicio
        );
    }, [
      aplicacoes,
      pets,
      vacinas,
      idsDosMeusPets,
      terminos,
    ]);

  /*
   * ========================================================
   * FORMATAR DATA
   * ========================================================
   */

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

  /*
   * ========================================================
   * FORMATAR HORÁRIO
   * ========================================================
   */

  function formatarHorario(data) {
    if (!data) {
      return '';
    }

    const dataObj =
      new Date(data);

    const horas =
      String(
        dataObj.getHours()
      ).padStart(2, '0');

    const minutos =
      String(
        dataObj.getMinutes()
      ).padStart(2, '0');

    return `${horas}:${minutos}`;
  }

  /*
   * ========================================================
   * STATUS
   * ========================================================
   */

  function getStatusInfo(status) {
    if (
      status ===
      'agendado'
    ) {
      return {
        texto: 'Agendado',
        emoji: '🟡',
        estilo:
          styles.statusAgendado,
      };
    }

    if (
      status ===
      'andamento'
    ) {
      return {
        texto: 'Em andamento',
        emoji: '🔵',
        estilo:
          styles.statusAndamento,
      };
    }

    return {
      texto: 'Concluído',
      emoji: '🟢',
      estilo:
        styles.statusConcluido,
    };
  }

  /*
   * ========================================================
   * EXCLUIR
   * ========================================================
   */

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

          onPress:
            async () => {
              try {
                await deleteMutation.mutateAsync(
                  Number(
                    item.idAplicacaoVacina
                  )
                );

                await excluirTerminoConsulta(
                  Number(
                    item.idAplicacaoVacina
                  )
                );

                setTerminos(
                  (prev) => {
                    const novo = {
                      ...prev,
                    };

                    delete novo[
                      String(
                        item.idAplicacaoVacina
                      )
                    ];

                    return novo;
                  }
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

  const loading =
    loadingAplicacoes ||
    loadingPets ||
    loadingVacinas;

  if (loading) {
    return (
      <View
        style={
          styles.center
        }
      >
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
    <View
      style={styles.container}
    >
      <Text
        style={styles.title}
      >
        Lembretes
      </Text>

      <Text
        style={
          styles.description
        }
      >
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
        renderItem={({
          item,
        }) => {
          const statusInfo =
            getStatusInfo(
              item.status
            );

          return (
            <View
              style={styles.card}
            >
              <View
                style={[
                  styles.statusBadge,
                  statusInfo.estilo,
                ]}
              >
                <Text
                  style={
                    styles.statusText
                  }
                >
                  {statusInfo.emoji}{' '}
                  {
                    statusInfo.texto
                  }
                </Text>
              </View>

              <Text
                style={
                  styles.petName
                }
              >
                {item.petNome}
              </Text>

              <Text
                style={
                  styles.vaccine
                }
              >
                {item.vacinaNome}
              </Text>

              <Text
                style={
                  styles.date
                }
              >
                Data:{' '}
                {formatarData(
                  item.inicio
                )}
              </Text>

              <Text
                style={
                  styles.date
                }
              >
                Horário:{' '}
                {formatarHorario(
                  item.inicio
                )}
              </Text>

              <Text
                style={
                  styles.date
                }
              >
                Término estimado:{' '}
                {formatarHorario(
                  item.termino
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
                  {
                    item.observacao
                  }
                </Text>
              )}

              <View
                style={
                  styles.buttons
                }
              >
                <TouchableOpacity
                  style={
                    styles.editButton
                  }
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
                    styles.deleteButton
                  }
                  onPress={() =>
                    excluir(item)
                  }
                  disabled={
                    deleteMutation.isPending
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
          );
        }}
        ListEmptyComponent={
          <View
            style={
              styles.empty
            }
          >
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

const styles =
  StyleSheet.create({
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

    statusBadge: {
      alignSelf: 'flex-start',
      paddingHorizontal: 10,
      paddingVertical: 6,
      borderRadius: 20,
      marginBottom: 10,
    },

    statusAgendado: {
      backgroundColor:
        '#fef3c7',
    },

    statusAndamento: {
      backgroundColor:
        '#dbeafe',
    },

    statusConcluido: {
      backgroundColor:
        '#dcfce7',
    },

    statusText: {
      fontWeight: 'bold',
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
      backgroundColor:
        '#2563eb',
      padding: 12,
      borderRadius: 8,
      alignItems: 'center',
    },

    deleteButton: {
      flex: 1,
      backgroundColor:
        '#dc2626',
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
      justifyContent:
        'center',
      alignItems: 'center',
    },
  });