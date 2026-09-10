import { useEffect, useState } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  ScrollView,
  Modal,
  FlatList,
} from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';

import {
  useCreateAplicacaoVacina,
} from '../hooks/aplicacaoVacinas/useCreateAplicacaoVacina';

import {
  useAplicacoesVacina,
} from '../hooks/aplicacaoVacinas/useAplicacoesVacina';

import {
  useUpdateAplicacaoVacina,
} from '../hooks/aplicacaoVacinas/useUpdateAplicacaoVacina';

import {
  useVacinas,
} from '../hooks/vacinas/useVacinas';

import {
  useVeterinarios,
} from '../hooks/veterinarios/useVeterinarios';

import {
  useAuth,
} from '../context/AuthContext';

export default function AplicacaoVacinaScreen({
  navigation,
  route,
}) {
  const { user } = useAuth();

  const idPet =
    route?.params?.idPet ||
    route?.params?.pet?.idPet;

  const aplicacaoParaEditar =
    route?.params?.aplicacao || null;

  const modoEdicao =
    !!aplicacaoParaEditar;

  const [idVacina, setIdVacina] =
    useState(
      aplicacaoParaEditar?.idVacina
        ? Number(aplicacaoParaEditar.idVacina)
        : route?.params?.idVacina
          ? Number(route.params.idVacina)
          : null
    );

  const [vacinaSelecionada, setVacinaSelecionada] =
    useState(null);

  const [mostrarListaVacinas, setMostrarListaVacinas] =
    useState(false);

  const [dataSelecionada, setDataSelecionada] =
    useState(
      aplicacaoParaEditar?.dataAplicacao
        ? new Date(aplicacaoParaEditar.dataAplicacao)
        : new Date()
    );

  const [dataAplicacao, setDataAplicacao] =
    useState(
      aplicacaoParaEditar?.dataAplicacao
        ? String(
            aplicacaoParaEditar.dataAplicacao
          ).substring(0, 10)
        : ''
    );

  const [mostrarCalendario, setMostrarCalendario] =
    useState(false);

  const [dose, setDose] =
    useState(
      aplicacaoParaEditar?.dose || ''
    );

  const [observacao, setObservacao] =
    useState(
      aplicacaoParaEditar?.observacao || ''
    );

  const [idVeterinario, setIdVeterinario] =
    useState(
      aplicacaoParaEditar?.idVeterinario
        ? Number(aplicacaoParaEditar.idVeterinario)
        : null
    );

  const [veterinarioSelecionado, setVeterinarioSelecionado] =
    useState(null);

  const [mostrarListaVeterinarios, setMostrarListaVeterinarios] =
    useState(false);

  const [idAplicacaoVacina, setIdAplicacaoVacina] =
    useState(
      aplicacaoParaEditar?.idAplicacaoVacina
        ? Number(aplicacaoParaEditar.idAplicacaoVacina)
        : null
    );

  const createMutation =
    useCreateAplicacaoVacina();

  const updateMutation =
    useUpdateAplicacaoVacina();

  const aplicacoesQuery =
    useAplicacoesVacina();

  const vacinasQuery =
    useVacinas();

  const veterinariosQuery =
    useVeterinarios();

  /*
   * ========================================================
   * GERAR ID AUTOMÁTICO DA APLICAÇÃO
   * ========================================================
   */

  useEffect(() => {
    if (modoEdicao) {
      return;
    }

    if (!aplicacoesQuery.data) {
      return;
    }

    const aplicacoes =
      Array.isArray(aplicacoesQuery.data)
        ? aplicacoesQuery.data
        : [];

    const ids =
      aplicacoes
        .map((item) =>
          Number(item.idAplicacaoVacina)
        )
        .filter(
          (id) =>
            Number.isInteger(id) &&
            id > 0
        );

    const maiorId =
      ids.length > 0
        ? Math.max(...ids)
        : 0;

    setIdAplicacaoVacina(
      maiorId + 1
    );
  }, [
    aplicacoesQuery.data,
    modoEdicao,
  ]);

  /*
   * ========================================================
   * ENCONTRAR VACINA SELECIONADA
   * ========================================================
   */

  useEffect(() => {
    if (!vacinasQuery.data || !idVacina) {
      return;
    }

    const vacinas =
      Array.isArray(vacinasQuery.data)
        ? vacinasQuery.data
        : [];

    const encontrada =
      vacinas.find(
        (vacina) =>
          Number(vacina.idVacina) ===
          Number(idVacina)
      );

    if (encontrada) {
      setVacinaSelecionada(encontrada);
    }
  }, [
    vacinasQuery.data,
    idVacina,
  ]);

  /*
   * ========================================================
   * ENCONTRAR VETERINÁRIO SELECIONADO
   * ========================================================
   */

  useEffect(() => {
    if (
      !veterinariosQuery.data ||
      !idVeterinario
    ) {
      return;
    }

    const veterinarios =
      Array.isArray(
        veterinariosQuery.data
      )
        ? veterinariosQuery.data
        : [];

    const encontrado =
      veterinarios.find(
        (veterinario) =>
          Number(
            veterinario.idVeterinario
          ) ===
          Number(idVeterinario)
      );

    if (encontrado) {
      setVeterinarioSelecionado(
        encontrado
      );
    }
  }, [
    veterinariosQuery.data,
    idVeterinario,
  ]);

  /*
   * ========================================================
   * DATA
   * ========================================================
   */

  function formatarDataParaAPI(data) {
    const ano =
      data.getFullYear();

    const mes =
      String(
        data.getMonth() + 1
      ).padStart(2, '0');

    const dia =
      String(
        data.getDate()
      ).padStart(2, '0');

    return `${ano}-${mes}-${dia}`;
  }

  function formatarDataParaExibicao(data) {
    if (!data) {
      return '';
    }

    const dia =
      String(
        data.getDate()
      ).padStart(2, '0');

    const mes =
      String(
        data.getMonth() + 1
      ).padStart(2, '0');

    const ano =
      data.getFullYear();

    return `${dia}/${mes}/${ano}`;
  }

  function selecionarData(
    event,
    data
  ) {
    setMostrarCalendario(false);

    if (
      event?.type === 'dismissed' ||
      !data
    ) {
      return;
    }

    const hoje =
      new Date();

    hoje.setHours(
      0,
      0,
      0,
      0
    );

    data.setHours(
      0,
      0,
      0,
      0
    );

    /*
     * Aplicação não pode ficar
     * no passado.
     */

    if (data < hoje) {
      Alert.alert(
        'Data inválida',
        'A data da aplicação da vacina não pode ser anterior a hoje.'
      );

      return;
    }

    setDataSelecionada(data);

    setDataAplicacao(
      formatarDataParaAPI(data)
    );
  }

  /*
   * ========================================================
   * SELECIONAR VACINA
   * ========================================================
   */

  function selecionarVacina(vacina) {
    setVacinaSelecionada(vacina);
    setIdVacina(
      Number(vacina.idVacina)
    );
    setMostrarListaVacinas(false);
  }

  /*
   * ========================================================
   * SELECIONAR VETERINÁRIO
   * ========================================================
   */

  function selecionarVeterinario(veterinario) {
    setVeterinarioSelecionado(
      veterinario
    );

    setIdVeterinario(
      Number(
        veterinario.idVeterinario
      )
    );

    setMostrarListaVeterinarios(false);
  }

  /*
   * ========================================================
   * SALVAR
   * ========================================================
   */

  async function salvar() {
    if (
      !idPet ||
      Number(idPet) <= 0
    ) {
      Alert.alert(
        'Erro',
        'Pet não informado.'
      );

      return;
    }

    if (
      !modoEdicao &&
      (!idAplicacaoVacina ||
        Number(idAplicacaoVacina) <= 0)
    ) {
      Alert.alert(
        'Erro',
        'Não foi possível gerar o ID da aplicação.'
      );

      return;
    }

    if (
      !idVacina ||
      Number(idVacina) <= 0
    ) {
      Alert.alert(
        'Atenção',
        'Selecione uma vacina.'
      );

      return;
    }

    if (!dataAplicacao) {
      Alert.alert(
        'Atenção',
        'Selecione a data da aplicação.'
      );

      return;
    }

    if (
      !idVeterinario ||
      Number(idVeterinario) <= 0
    ) {
      Alert.alert(
        'Atenção',
        'Selecione um veterinário.'
      );

      return;
    }

    const dados = {
      idPet:
        Number(idPet),

      idVacina:
        Number(idVacina),

      dataAplicacao:
        `${dataAplicacao}T00:00:00`,

      dose:
        dose.trim(),

      observacao:
        observacao.trim(),

      idVeterinario:
        Number(idVeterinario),
    };

    try {
      if (modoEdicao) {
        await updateMutation.mutateAsync({
          id:
            Number(
              aplicacaoParaEditar.idAplicacaoVacina
            ),

          dados,
        });

        Alert.alert(
          'Sucesso',
          'Aplicação da vacina atualizada com sucesso!',
          [
            {
              text: 'OK',
              onPress: () =>
                navigation.goBack(),
            },
          ]
        );

        return;
      }

      dados.idAplicacaoVacina =
        Number(idAplicacaoVacina);

      await createMutation.mutateAsync(
        dados
      );

      Alert.alert(
        'Sucesso',
        'Aplicação da vacina cadastrada com sucesso!',
        [
          {
            text: 'OK',
            onPress: () =>
              navigation.goBack(),
          },
        ]
      );
    } catch (error) {
      console.log(
        'Erro ao salvar aplicação:',
        error?.response?.data ||
          error?.message ||
          error
      );

      let mensagem =
        'Não foi possível salvar a aplicação da vacina.';

      if (
        error?.response?.data?.errors
      ) {
        const erros =
          error.response.data.errors;

        const mensagens = [];

        Object.keys(erros).forEach(
          (campo) => {
            if (
              Array.isArray(
                erros[campo]
              )
            ) {
              mensagens.push(
                ...erros[campo]
              );
            }
          }
        );

        if (
          mensagens.length > 0
        ) {
          mensagem =
            mensagens.join('\n');
        }
      }

      Alert.alert(
        'Erro',
        mensagem
      );
    }
  }

  const carregando =
    createMutation.isPending ||
    updateMutation.isPending ||
    aplicacoesQuery.isLoading ||
    vacinasQuery.isLoading ||
    veterinariosQuery.isLoading;

  const vacinas =
    Array.isArray(vacinasQuery.data)
      ? vacinasQuery.data
      : [];

  const veterinarios =
    Array.isArray(
      veterinariosQuery.data
    )
      ? veterinariosQuery.data
      : [];

  return (
    <ScrollView
      contentContainerStyle={
        styles.container
      }
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.title}>
        {modoEdicao
          ? 'Editar Aplicação de Vacina'
          : 'Aplicação de Vacina'}
      </Text>

      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>
          Pet
        </Text>

        <Text style={styles.infoText}>
          ID do Pet: {idPet || 'Não informado'}
        </Text>
      </View>

      {/* ================================================= */}
      {/* VACINA */}
      {/* ================================================= */}

      <Text style={styles.label}>
        Vacina
      </Text>

      <TouchableOpacity
        style={styles.selectButton}
        onPress={() =>
          setMostrarListaVacinas(true)
        }
        disabled={carregando}
      >
        <Text
          style={
            vacinaSelecionada
              ? styles.selectText
              : styles.selectPlaceholder
          }
        >
          {vacinaSelecionada
            ? vacinaSelecionada.nome
            : 'Selecionar vacina'}
        </Text>
      </TouchableOpacity>

      {vacinaSelecionada?.descricao && (
        <View style={styles.descriptionBox}>
          <Text style={styles.descriptionText}>
            {vacinaSelecionada.descricao}
          </Text>
        </View>
      )}

      {/* ================================================= */}
      {/* VETERINÁRIO */}
      {/* ================================================= */}

      <Text style={styles.label}>
        Veterinário
      </Text>

      <TouchableOpacity
        style={styles.selectButton}
        onPress={() =>
          setMostrarListaVeterinarios(true)
        }
        disabled={carregando}
      >
        <Text
          style={
            veterinarioSelecionado
              ? styles.selectText
              : styles.selectPlaceholder
          }
        >
          {veterinarioSelecionado
            ? veterinarioSelecionado.nome ||
              `Veterinário #${veterinarioSelecionado.idVeterinario}`
            : 'Selecionar veterinário'}
        </Text>
      </TouchableOpacity>

      {/* ================================================= */}
      {/* DATA */}
      {/* ================================================= */}

      <Text style={styles.label}>
        Data da aplicação
      </Text>

      <TouchableOpacity
        style={styles.dateButton}
        onPress={() =>
          !carregando &&
          setMostrarCalendario(true)
        }
        disabled={carregando}
      >
        <Text
          style={
            dataAplicacao
              ? styles.dateText
              : styles.datePlaceholder
          }
        >
          {dataAplicacao
            ? formatarDataParaExibicao(
                dataSelecionada
              )
            : 'Selecionar data da aplicação'}
        </Text>
      </TouchableOpacity>

      {mostrarCalendario && (
        <DateTimePicker
          value={
            dataSelecionada || new Date()
          }
          mode="date"
          display="default"
          minimumDate={new Date()}
          onChange={selecionarData}
        />
      )}

      {/* ================================================= */}
      {/* DOSE */}
      {/* ================================================= */}

      <Text style={styles.label}>
        Dose
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Ex.: 1ª dose"
        value={dose}
        onChangeText={setDose}
        editable={!carregando}
        maxLength={50}
      />

      {/* ================================================= */}
      {/* OBSERVAÇÃO */}
      {/* ================================================= */}

      <Text style={styles.label}>
        Observação
      </Text>

      <TextInput
        style={[
          styles.input,
          styles.textArea,
        ]}
        placeholder="Observações sobre a aplicação"
        value={observacao}
        onChangeText={setObservacao}
        editable={!carregando}
        multiline
        numberOfLines={4}
        maxLength={255}
      />

      {/* ================================================= */}
      {/* INFORMAÇÕES */}
      {/* ================================================= */}

      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>
          Informações
        </Text>

        <Text style={styles.infoText}>
          ID da aplicação:{' '}
          {idAplicacaoVacina || 'Será gerado automaticamente'}
        </Text>

        <Text style={styles.infoText}>
          ID da vacina:{' '}
          {idVacina || 'Selecione uma vacina'}
        </Text>

        <Text style={styles.infoText}>
          ID do veterinário:{' '}
          {idVeterinario || 'Selecione um veterinário'}
        </Text>
      </View>

      {/* ================================================= */}
      {/* BOTÃO */}
      {/* ================================================= */}

      <TouchableOpacity
        style={[
          styles.button,
          carregando &&
            styles.buttonDisabled,
        ]}
        onPress={salvar}
        disabled={carregando}
      >
        {carregando ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>
            {modoEdicao
              ? 'Salvar Alterações'
              : 'Cadastrar Aplicação'}
          </Text>
        )}
      </TouchableOpacity>

      {/* ================================================= */}
      {/* MODAL DE VACINAS */}
      {/* ================================================= */}

      <Modal
        visible={mostrarListaVacinas}
        transparent
        animationType="slide"
        onRequestClose={() =>
          setMostrarListaVacinas(false)
        }
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>
              Selecionar Vacina
            </Text>

            <FlatList
              data={vacinas}
              keyExtractor={(item) =>
                String(item.idVacina)
              }
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.listItem}
                  onPress={() =>
                    selecionarVacina(item)
                  }
                >
                  <Text style={styles.listTitle}>
                    {item.nome}
                  </Text>

                  {item.descricao && (
                    <Text style={styles.listDescription}>
                      {item.descricao}
                    </Text>
                  )}
                </TouchableOpacity>
              )}
              ListEmptyComponent={
                <Text style={styles.emptyText}>
                  Nenhuma vacina encontrada na API.
                </Text>
              }
            />

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() =>
                setMostrarListaVacinas(false)
              }
            >
              <Text style={styles.cancelText}>
                Cancelar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* ================================================= */}
      {/* MODAL DE VETERINÁRIOS */}
      {/* ================================================= */}

      <Modal
        visible={mostrarListaVeterinarios}
        transparent
        animationType="slide"
        onRequestClose={() =>
          setMostrarListaVeterinarios(false)
        }
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>
              Selecionar Veterinário
            </Text>

            <FlatList
              data={veterinarios}
              keyExtractor={(item) =>
                String(item.idVeterinario)
              }
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.listItem}
                  onPress={() =>
                    selecionarVeterinario(item)
                  }
                >
                  <Text style={styles.listTitle}>
                    {item.nome ||
                      `Veterinário #${item.idVeterinario}`}
                  </Text>

                  {item.especialidade && (
                    <Text style={styles.listDescription}>
                      {item.especialidade}
                    </Text>
                  )}
                </TouchableOpacity>
              )}
              ListEmptyComponent={
                <Text style={styles.emptyText}>
                  Nenhum veterinário encontrado na API.
                </Text>
              }
            />

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() =>
                setMostrarListaVeterinarios(false)
              }
            >
              <Text style={styles.cancelText}>
                Cancelar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 40,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 25,
  },

  label: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 13,
    marginBottom: 15,
    backgroundColor: '#fff',
  },

  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },

  selectButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 14,
    marginBottom: 10,
    backgroundColor: '#fff',
  },

  selectText: {
    fontSize: 16,
    color: '#222',
  },

  selectPlaceholder: {
    fontSize: 16,
    color: '#777',
  },

  descriptionBox: {
    backgroundColor: '#f1f5f9',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
  },

  descriptionText: {
    color: '#555',
    fontSize: 14,
  },

  dateButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 14,
    marginBottom: 15,
    backgroundColor: '#fff',
  },

  dateText: {
    fontSize: 16,
    color: '#222',
  },

  datePlaceholder: {
    fontSize: 16,
    color: '#777',
  },

  infoCard: {
    backgroundColor: '#f1f5f9',
    borderRadius: 8,
    padding: 15,
    marginBottom: 18,
  },

  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  infoText: {
    fontSize: 14,
    marginBottom: 4,
  },

  button: {
    backgroundColor: '#2563eb',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 5,
  },

  buttonDisabled: {
    opacity: 0.6,
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },

  modalContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '80%',
  },

  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },

  listItem: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
  },

  listTitle: {
    fontSize: 17,
    fontWeight: 'bold',
  },

  listDescription: {
    marginTop: 5,
    color: '#666',
  },

  emptyText: {
    textAlign: 'center',
    padding: 20,
    color: '#666',
  },

  cancelButton: {
    padding: 15,
    alignItems: 'center',
    marginTop: 5,
  },

  cancelText: {
    color: '#dc2626',
    fontWeight: 'bold',
  },
});