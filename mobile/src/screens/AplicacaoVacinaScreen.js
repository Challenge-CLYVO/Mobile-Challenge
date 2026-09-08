import { useEffect, useMemo, useState } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
} from 'react-native';

import {
  useAplicacoesVacina,
} from '../hooks/aplicacaoVacinas/useAplicacoesVacina';

import {
  useCreateAplicacaoVacina,
} from '../hooks/aplicacaoVacinas/useCreateAplicacaoVacina';

import {
  useUpdateAplicacaoVacina,
} from '../hooks/aplicacaoVacinas/useUpdateAplicacaoVacina';

import {
  useDeleteAplicacaoVacina,
} from '../hooks/aplicacaoVacinas/useDeleteAplicacaoVacina';

import {
  useVacinas,
} from '../hooks/vacinas/useVacinas';

import {
  usePets,
} from '../hooks/pets/usePets';

import {
  useVeterinarios,
} from '../hooks/veterinarios/useVeterinarios';

export default function AplicacaoVacinaScreen({
  navigation,
  route,
}) {
  const petSelecionado =
    route?.params?.idPet || null;

  const {
    data: aplicacoes = [],
    isLoading: loadingAplicacoes,
    refetch,
  } = useAplicacoesVacina();

  const {
    data: vacinas = [],
    isLoading: loadingVacinas,
  } = useVacinas();

  const {
    data: pets = [],
    isLoading: loadingPets,
  } = usePets();

  const {
    data: veterinarios = [],
    isLoading: loadingVeterinarios,
  } = useVeterinarios();

  const createMutation =
    useCreateAplicacaoVacina();

  const updateMutation =
    useUpdateAplicacaoVacina();

  const deleteMutation =
    useDeleteAplicacaoVacina();

  const [editando, setEditando] = useState(null);

  const [idPet, setIdPet] = useState(
    petSelecionado
      ? String(petSelecionado)
      : ''
  );

  const [idVacina, setIdVacina] = useState('');

  const [dataAplicacao, setDataAplicacao] =
    useState('');

  const [dose, setDose] = useState('');

  const [observacao, setObservacao] =
    useState('');

  const [idVeterinario, setIdVeterinario] =
    useState('');

  useEffect(() => {
    if (petSelecionado) {
      setIdPet(String(petSelecionado));
    }
  }, [petSelecionado]);

  const aplicacoesFiltradas = useMemo(() => {
    if (!petSelecionado) {
      return aplicacoes;
    }

    return aplicacoes.filter(
      (item) =>
        Number(item.idPet) ===
        Number(petSelecionado)
    );
  }, [aplicacoes, petSelecionado]);

  function limparFormulario() {
    setEditando(null);

    setIdPet(
      petSelecionado
        ? String(petSelecionado)
        : ''
    );

    setIdVacina('');
    setDataAplicacao('');
    setDose('');
    setObservacao('');
    setIdVeterinario('');
  }

  function editar(item) {
    setEditando(item);

    setIdPet(String(item.idPet));
    setIdVacina(String(item.idVacina));

    setDataAplicacao(
      item.dataAplicacao
        ? String(item.dataAplicacao).substring(
          0,
          10
        )
        : ''
    );

    setDose(item.dose || '');
    setObservacao(item.observacao || '');

    setIdVeterinario(
      String(item.idVeterinario)
    );
  }

  function salvar() {
    if (
      !idPet ||
      !idVacina ||
      !dataAplicacao ||
      !idVeterinario
    ) {
      Alert.alert(
        'Atenção',
        'Preencha Pet, Vacina, Data e Veterinário.'
      );

      return;
    }

    if (editando) {
      const dados = {
        idPet: Number(idPet),
        idVacina: Number(idVacina),
        dataAplicacao,
        dose,
        observacao,
        idVeterinario: Number(
          idVeterinario
        ),
      };

      updateMutation.mutate(
        {
          id: editando.idAplicacaoVacina,
          dados,
        },
        {
          onSuccess: () => {
            Alert.alert(
              'Sucesso',
              'Aplicação atualizada!'
            );

            limparFormulario();
          },

          onError: (error) => {
            console.log(
              error?.response?.data ||
              error.message
            );

            Alert.alert(
              'Erro',
              'Não foi possível atualizar a aplicação.'
            );
          },
        }
      );

      return;
    }

    const maiorId = aplicacoes.reduce(
      (maior, item) =>
        Math.max(
          maior,
          Number(
            item.idAplicacaoVacina || 0
          )
        ),
      0
    );

    const dados = {
      idAplicacaoVacina: maiorId + 1,
      idPet: Number(idPet),
      idVacina: Number(idVacina),
      dataAplicacao,
      dose: dose || null,
      observacao: observacao || null,
      idVeterinario: Number(
        idVeterinario
      ),
    };

    createMutation.mutate(dados, {
      onSuccess: () => {
        Alert.alert(
          'Sucesso',
          'Aplicação de vacina cadastrada!'
        );

        limparFormulario();
      },

      onError: (error) => {
        console.log(
          error?.response?.data ||
          error.message
        );

        Alert.alert(
          'Erro',
          'Não foi possível cadastrar a aplicação.'
        );
      },
    });
  }

  function excluir(id) {
    Alert.alert(
      'Excluir aplicação',
      'Deseja realmente excluir esta aplicação?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },

        {
          text: 'Excluir',
          style: 'destructive',

          onPress: () => {
            deleteMutation.mutate(id, {
              onSuccess: () => {
                Alert.alert(
                  'Sucesso',
                  'Aplicação excluída!'
                );
              },

              onError: (error) => {
                console.log(
                  error?.response?.data ||
                  error.message
                );

                Alert.alert(
                  'Erro',
                  'Não foi possível excluir a aplicação.'
                );
              },
            });
          },
        },
      ]
    );
  }

  function nomeVacina(id) {
    const vacina = vacinas.find(
      (item) =>
        Number(item.idVacina) === Number(id)
    );

    return vacina
      ? vacina.nome
      : `Vacina #${id}`;
  }

  function nomePet(id) {
    const pet = pets.find(
      (item) =>
        Number(item.idPet) === Number(id)
    );

    return pet
      ? pet.nome
      : `Pet #${id}`;
  }

  const carregando =
    loadingAplicacoes ||
    loadingVacinas ||
    loadingPets ||
    loadingVeterinarios;

  if (carregando) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />

        <Text>
          Carregando dados...
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>
        Aplicações de Vacina
      </Text>

      <View style={styles.form}>
        <Text style={styles.subtitle}>
          {editando
            ? 'Editar aplicação'
            : 'Nova aplicação'}
        </Text>

        <TextInput
          style={styles.input}
          placeholder="ID do Pet"
          value={idPet}
          onChangeText={setIdPet}
          keyboardType="numeric"
          editable={!petSelecionado}
        />

        <Text style={styles.help}>
          Vacinas disponíveis:
        </Text>

        {vacinas.map((vacina) => (
          <TouchableOpacity
            key={vacina.idVacina}
            style={[
              styles.option,
              Number(idVacina) ===
              Number(vacina.idVacina) &&
              styles.optionSelected,
            ]}
            onPress={() =>
              setIdVacina(
                String(vacina.idVacina)
              )
            }
          >
            <Text>
              {vacina.nome}
            </Text>
          </TouchableOpacity>
        ))}

        <TextInput
          style={styles.input}
          placeholder="Data da aplicação (AAAA-MM-DD)"
          value={dataAplicacao}
          onChangeText={setDataAplicacao}
        />

        <TextInput
          style={styles.input}
          placeholder="Dose"
          value={dose}
          onChangeText={setDose}
          maxLength={50}
        />

        <TextInput
          style={styles.input}
          placeholder="Observação"
          value={observacao}
          onChangeText={setObservacao}
          maxLength={50}
        />

        <Text style={styles.help}>
          Veterinários disponíveis:
        </Text>

        {veterinarios.map((vet) => (
          <TouchableOpacity
            key={vet.idVeterinario}
            style={[
              styles.option,
              Number(idVeterinario) ===
              Number(
                vet.idVeterinario
              ) &&
              styles.optionSelected,
            ]}
            onPress={() =>
              setIdVeterinario(
                String(
                  vet.idVeterinario
                )
              )
            }
          >
            <Text>
              {vet.especialidade ||
                `Veterinário #${vet.idVeterinario}`}
            </Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          style={styles.saveButton}
          onPress={salvar}
          disabled={
            createMutation.isPending ||
            updateMutation.isPending
          }
        >
          <Text style={styles.buttonText}>
            {editando
              ? 'Salvar Alterações'
              : 'Cadastrar Aplicação'}
          </Text>
        </TouchableOpacity>

        {editando && (
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={limparFormulario}
          >
            <Text style={styles.buttonText}>
              Cancelar Edição
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <Text style={styles.subtitle}>
        Aplicações cadastradas
      </Text>

      {aplicacoesFiltradas.map((item) => (
        <View
          key={item.idAplicacaoVacina}
          style={styles.card}
        >
          <Text style={styles.cardTitle}>
            {nomePet(item.idPet)}
          </Text>

          <Text>
            Vacina: {nomeVacina(item.idVacina)}
          </Text>

          <Text>
            Data: {String(
              item.dataAplicacao
            ).substring(0, 10)}
          </Text>

          <Text>
            Dose: {item.dose || '-'}
          </Text>

          <Text>
            Observação: {item.observacao || '-'}
          </Text>

          <View style={styles.buttons}>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => editar(item)}
            >
              <Text style={styles.buttonText}>
                Editar
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() =>
                excluir(
                  item.idAplicacaoVacina
                )
              }
            >
              <Text style={styles.buttonText}>
                Excluir
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}

      {aplicacoesFiltradas.length === 0 && (
        <Text style={styles.empty}>
          Nenhuma aplicação cadastrada.
        </Text>
      )}
    </ScrollView>
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
    marginBottom: 20,
  },

  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 10,
  },

  form: {
    marginBottom: 20,
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },

  help: {
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 8,
  },

  option: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    borderRadius: 8,
    marginBottom: 6,
  },

  optionSelected: {
    borderWidth: 2,
  },

  saveButton: {
    backgroundColor: '#16a34a',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },

  cancelButton: {
    backgroundColor: '#6b7280',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },

  card: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },

  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  buttons: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 12,
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
    textAlign: 'center',
    marginVertical: 20,
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});