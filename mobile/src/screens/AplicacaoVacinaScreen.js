import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';

import {useAplicacoesVacina} from '../hooks/aplicacaoVacinas/useAplicacoesVacina';
import {useCreateAplicacaoVacina} from '../hooks/aplicacaoVacinas/useCreateAplicacaoVacina';
import {useUpdateAplicacaoVacina} from '../hooks/aplicacaoVacinas/useUpdateAplicacaoVacina';
import {useDeleteAplicacaoVacina} from '../hooks/aplicacaoVacinas/useDeleteAplicacaoVacina';


import { useVacinas } from '../hooks/vacinas/useVacinas';

export default function AplicacaoVacinaScreen({ route }) {
  const pet = route?.params?.pet;

  const [modoEdicao, setModoEdicao] = useState(false);
  const [aplicacaoSelecionada, setAplicacaoSelecionada] = useState(null);

  const [idVacina, setIdVacina] = useState('');
  const [dataAplicacao, setDataAplicacao] = useState('');
  const [dose, setDose] = useState('');
  const [observacao, setObservacao] = useState('');
  const [idVeterinario, setIdVeterinario] = useState('');

  const {
    data: aplicacoes,
    isLoading: carregandoAplicacoes,
    isError: erroAplicacoes,
    refetch,
  } = useAplicacoesVacina();

  const {
    data: vacinas,
    isLoading: carregandoVacinas,
    isError: erroVacinas,
  } = useVacinas();

  const createMutation = useCreateAplicacaoVacina();
  const updateMutation = useUpdateAplicacaoVacina();
  const deleteMutation = useDeleteAplicacaoVacina();

  const aplicacoesArray = Array.isArray(aplicacoes)
    ? aplicacoes
    : aplicacoes?.data || [];

  const vacinasArray = Array.isArray(vacinas)
    ? vacinas
    : vacinas?.data || [];

  const aplicacoesDoPet = pet
    ? aplicacoesArray.filter(
        (item) => Number(item.idPet) === Number(pet.idPet)
      )
    : aplicacoesArray;

  function limparFormulario() {
    setModoEdicao(false);
    setAplicacaoSelecionada(null);
    setIdVacina('');
    setDataAplicacao('');
    setDose('');
    setObservacao('');
    setIdVeterinario('');
  }

  function iniciarEdicao(aplicacao) {
    setModoEdicao(true);
    setAplicacaoSelecionada(aplicacao);

    setIdVacina(String(aplicacao.idVacina || ''));
    setDataAplicacao(
      aplicacao.dataAplicacao
        ? aplicacao.dataAplicacao.substring(0, 10)
        : ''
    );
    setDose(aplicacao.dose || '');
    setObservacao(aplicacao.observacao || '');
    setIdVeterinario(String(aplicacao.idVeterinario || ''));
  }

  function validarFormulario() {
    if (!idVacina.trim()) {
      Alert.alert('Erro', 'Informe o ID da vacina.');
      return false;
    }

    if (!dataAplicacao.trim()) {
      Alert.alert('Erro', 'Informe a data da aplicação.');
      return false;
    }

    if (!idVeterinario.trim()) {
      Alert.alert('Erro', 'Informe o ID do veterinário.');
      return false;
    }

    if (!pet?.idPet) {
      Alert.alert(
        'Erro',
        'Nenhum pet foi selecionado para esta aplicação.'
      );
      return false;
    }

    return true;
  }

  async function salvarAplicacao() {
    if (!validarFormulario()) {
      return;
    }

    try {
      if (modoEdicao && aplicacaoSelecionada) {
        const dadosAtualizacao = {
          idPet: Number(pet.idPet),
          idVacina: Number(idVacina),
          dataAplicacao: dataAplicacao,
          dose: dose || null,
          observacao: observacao || null,
          idVeterinario: Number(idVeterinario),
        };

        await updateMutation.mutateAsync({
          id: aplicacaoSelecionada.idAplicacaoVacina,
          dados: dadosAtualizacao,
        });

        Alert.alert(
          'Sucesso',
          'Aplicação de vacina atualizada com sucesso.'
        );
      } else {
        const novaAplicacao = {
          idAplicacaoVacina:
            Math.floor(Math.random() * 100000) + 1,
          idPet: Number(pet.idPet),
          idVacina: Number(idVacina),
          dataAplicacao: dataAplicacao,
          dose: dose || null,
          observacao: observacao || null,
          idVeterinario: Number(idVeterinario),
        };

        await createMutation.mutateAsync(novaAplicacao);

        Alert.alert(
          'Sucesso',
          'Aplicação de vacina criada com sucesso.'
        );
      }

      limparFormulario();
      refetch();
    } catch (error) {
      console.log('Erro ao salvar aplicação:', error);

      const mensagem =
        error?.response?.data?.message ||
        error?.response?.data ||
        'Não foi possível salvar a aplicação de vacina.';

      Alert.alert('Erro', String(mensagem));
    }
  }

  function excluirAplicacao(aplicacao) {
    Alert.alert(
      'Excluir aplicação',
      'Tem certeza que deseja excluir esta aplicação de vacina?',
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
                aplicacao.idAplicacaoVacina
              );

              Alert.alert(
                'Sucesso',
                'Aplicação de vacina excluída com sucesso.'
              );

              if (
                aplicacaoSelecionada?.idAplicacaoVacina ===
                aplicacao.idAplicacaoVacina
              ) {
                limparFormulario();
              }

              refetch();
            } catch (error) {
              console.log(
                'Erro ao excluir aplicação:',
                error
              );

              const mensagem =
                error?.response?.data?.message ||
                error?.response?.data ||
                'Não foi possível excluir a aplicação.';

              Alert.alert('Erro', String(mensagem));
            }
          },
        },
      ]
    );
  }

  function obterNomeVacina(id) {
    const vacina = vacinasArray.find(
      (item) => Number(item.idVacina) === Number(id)
    );

    return vacina?.nome || `Vacina #${id}`;
  }

  const salvando =
    createMutation.isPending ||
    updateMutation.isPending;

  const excluindo = deleteMutation.isPending;

  if (carregandoAplicacoes || carregandoVacinas) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>
          Carregando aplicações de vacina...
        </Text>
      </View>
    );
  }

  if (erroAplicacoes || erroVacinas) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>
          Não foi possível carregar os dados.
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => refetch()}
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
        Aplicações de Vacina
      </Text>

      {pet && (
        <View style={styles.petContainer}>
          <Text style={styles.petTitle}>
            Pet selecionado
          </Text>

          <Text style={styles.petName}>
            {pet.nome}
          </Text>

          <Text style={styles.petInfo}>
            ID do Pet: {pet.idPet}
          </Text>
        </View>
      )}

      <View style={styles.form}>
        <Text style={styles.formTitle}>
          {modoEdicao
            ? 'Editar aplicação'
            : 'Nova aplicação'}
        </Text>

        <Text style={styles.label}>
          ID da vacina
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Ex: 1"
          keyboardType="numeric"
          value={idVacina}
          onChangeText={setIdVacina}
        />

        {vacinasArray.length > 0 && (
          <View style={styles.vacinasContainer}>
            <Text style={styles.label}>
              Vacinas disponíveis
            </Text>

            <FlatList
              horizontal
              data={vacinasArray}
              keyExtractor={(item) =>
                String(item.idVacina)
              }
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.vacinaButton,
                    Number(idVacina) ===
                      Number(item.idVacina) &&
                      styles.vacinaButtonSelecionada,
                  ]}
                  onPress={() =>
                    setIdVacina(
                      String(item.idVacina)
                    )
                  }
                >
                  <Text
                    style={styles.vacinaButtonText}
                  >
                    {item.nome}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        )}

        <Text style={styles.label}>
          Data da aplicação
        </Text>

        <TextInput
          style={styles.input}
          placeholder="YYYY-MM-DD"
          value={dataAplicacao}
          onChangeText={setDataAplicacao}
        />

        <Text style={styles.label}>
          Dose
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Ex: 1ª dose"
          value={dose}
          onChangeText={setDose}
        />

        <Text style={styles.label}>
          Observação
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Observação"
          value={observacao}
          onChangeText={setObservacao}
        />

        <Text style={styles.label}>
          ID do veterinário
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Ex: 1"
          keyboardType="numeric"
          value={idVeterinario}
          onChangeText={setIdVeterinario}
        />

        <TouchableOpacity
          style={[
            styles.button,
            salvando && styles.buttonDisabled,
          ]}
          onPress={salvarAplicacao}
          disabled={salvando}
        >
          {salvando ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>
              {modoEdicao
                ? 'Atualizar aplicação'
                : 'Criar aplicação'}
            </Text>
          )}
        </TouchableOpacity>

        {modoEdicao && (
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={limparFormulario}
            disabled={salvando}
          >
            <Text style={styles.cancelButtonText}>
              Cancelar edição
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <Text style={styles.listTitle}>
        Aplicações cadastradas
      </Text>

      {aplicacoesDoPet.length === 0 ? (
        <Text style={styles.emptyText}>
          Nenhuma aplicação de vacina cadastrada.
        </Text>
      ) : (
        <FlatList
          data={aplicacoesDoPet}
          keyExtractor={(item) =>
            String(item.idAplicacaoVacina)
          }
          refreshing={carregandoAplicacoes}
          onRefresh={refetch}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>
                {obterNomeVacina(item.idVacina)}
              </Text>

              <Text style={styles.cardText}>
                ID aplicação:{' '}
                {item.idAplicacaoVacina}
              </Text>

              <Text style={styles.cardText}>
                ID pet: {item.idPet}
              </Text>

              <Text style={styles.cardText}>
                ID vacina: {item.idVacina}
              </Text>

              <Text style={styles.cardText}>
                Data:{' '}
                {item.dataAplicacao
                  ? item.dataAplicacao.substring(0, 10)
                  : '-'}
              </Text>

              <Text style={styles.cardText}>
                Dose: {item.dose || '-'}
              </Text>

              <Text style={styles.cardText}>
                Observação:{' '}
                {item.observacao || '-'}
              </Text>

              <Text style={styles.cardText}>
                ID veterinário:{' '}
                {item.idVeterinario}
              </Text>

              <View style={styles.actions}>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() =>
                    iniciarEdicao(item)
                  }
                  disabled={excluindo}
                >
                  <Text style={styles.buttonText}>
                    Editar
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() =>
                    excluirAplicacao(item)
                  }
                  disabled={excluindo}
                >
                  {excluindo ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text style={styles.buttonText}>
                      Excluir
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          )}
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

  petContainer: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: '#f0f0f0',
  },

  petTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },

  petName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 5,
  },

  petInfo: {
    marginTop: 4,
  },

  form: {
    marginBottom: 20,
  },

  formTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 5,
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },

  vacinasContainer: {
    marginTop: 5,
  },

  vacinaButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    marginRight: 8,
  },

  vacinaButtonSelecionada: {
    backgroundColor: '#ddd',
    borderColor: '#333',
  },

  vacinaButtonText: {
    fontWeight: 'bold',
  },

  button: {
    marginTop: 15,
    backgroundColor: '#333',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },

  buttonDisabled: {
    opacity: 0.6,
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  cancelButton: {
    marginTop: 10,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#999',
  },

  cancelButtonText: {
    fontWeight: 'bold',
  },

  listTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#666',
  },

  card: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 15,
    marginBottom: 12,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  cardText: {
    marginBottom: 4,
  },

  actions: {
    flexDirection: 'row',
    marginTop: 10,
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

  errorText: {
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 15,
    color: '#b00020',
  },
});