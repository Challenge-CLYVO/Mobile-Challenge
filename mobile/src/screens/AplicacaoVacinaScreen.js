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
} from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';

import {
  useCreateAplicacaoVacina,
} from '../hooks/aplicacaoVacinas/useCreateAplicacaoVacina';

import {
  useAplicacoesVacina,
} from '../hooks/aplicacaoVacinas/useAplicacoesVacina';

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

  const [idVacina, setIdVacina] =
    useState(
      route?.params?.idVacina
        ? String(route.params.idVacina)
        : ''
    );

  const [dataAplicacao, setDataAplicacao] =
    useState('');

  const [dataSelecionada, setDataSelecionada] =
    useState(new Date());

  const [mostrarCalendario, setMostrarCalendario] =
    useState(false);

  const [dose, setDose] =
    useState('');

  const [observacao, setObservacao] =
    useState('');

  const [idVeterinario, setIdVeterinario] =
    useState(null);

  const [idAplicacaoVacina, setIdAplicacaoVacina] =
    useState(null);

  const createMutation =
    useCreateAplicacaoVacina();

  const aplicacoesQuery =
    useAplicacoesVacina();

  const veterinariosQuery =
    useVeterinarios();

  /*
   * ------------------------------------------------
   * DESCOBRIR AUTOMATICAMENTE O ID DA APLICAÇÃO
   * ------------------------------------------------
   */

  useEffect(() => {
    if (!aplicacoesQuery.data) {
      return;
    }

    const aplicacoes =
      Array.isArray(aplicacoesQuery.data)
        ? aplicacoesQuery.data
        : [];

    const ids = aplicacoes
      .map((item) =>
        Number(item.idAplicacaoVacina)
      )
      .filter((id) =>
        Number.isInteger(id) && id > 0
      );

    const maiorId =
      ids.length > 0
        ? Math.max(...ids)
        : 0;

    setIdAplicacaoVacina(
      maiorId + 1
    );
  }, [aplicacoesQuery.data]);

  /*
   * ------------------------------------------------
   * DESCOBRIR AUTOMATICAMENTE O VETERINÁRIO
   * ------------------------------------------------
   */

  useEffect(() => {
    /*
     * Primeiro tenta encontrar diretamente
     * no usuário logado.
     */

    const idVeterinarioUsuario =
      Number(
        user?.idVeterinario
      );

    if (
      Number.isInteger(idVeterinarioUsuario) &&
      idVeterinarioUsuario > 0
    ) {
      setIdVeterinario(
        idVeterinarioUsuario
      );

      return;
    }

    /*
     * Caso não exista idVeterinario na sessão,
     * procura na lista de veterinários pelo
     * idUsuario do usuário logado.
     */

    if (
      !veterinariosQuery.data ||
      !user
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
            veterinario.idUsuario
          ) === Number(
            user.idUsuario
          )
      );

    if (encontrado) {
      const id =
        Number(
          encontrado.idVeterinario
        );

      if (id > 0) {
        setIdVeterinario(id);
      }
    }
  }, [
    user,
    veterinariosQuery.data,
  ]);

  /*
   * ------------------------------------------------
   * DATA
   * ------------------------------------------------
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
      event.type === 'dismissed' ||
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
     * A aplicação da vacina NÃO pode
     * ser cadastrada no passado.
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
   * ------------------------------------------------
   * CADASTRAR
   * ------------------------------------------------
   */

  async function cadastrar() {
    if (!idPet || Number(idPet) <= 0) {
      Alert.alert(
        'Erro',
        'Pet não informado.'
      );

      return;
    }

    if (
      !idAplicacaoVacina ||
      Number(idAplicacaoVacina) <= 0
    ) {
      Alert.alert(
        'Erro',
        'Não foi possível gerar o ID da aplicação da vacina.'
      );

      return;
    }

    if (
      !idVacina.trim() ||
      Number(idVacina) <= 0
    ) {
      Alert.alert(
        'Erro',
        'Informe um ID de vacina válido.'
      );

      return;
    }

    if (!dataAplicacao) {
      Alert.alert(
        'Erro',
        'Informe a data da aplicação.'
      );

      return;
    }

    if (
      !idVeterinario ||
      Number(idVeterinario) <= 0
    ) {
      Alert.alert(
        'Erro',
        'Não foi possível identificar o veterinário.'
      );

      return;
    }

    const dados = {
      idAplicacaoVacina:
        Number(
          idAplicacaoVacina
        ),

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

    console.log(
      'Dados enviados para aplicação da vacina:',
      dados
    );

    try {
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
        'Erro ao cadastrar aplicação:',
        error?.response?.data ||
          error?.message ||
          error
      );

      let mensagem =
        'Não foi possível cadastrar a aplicação da vacina.';

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
      } else if (
        error?.response?.data?.message
      ) {
        mensagem =
          error.response.data.message;
      }

      Alert.alert(
        'Erro',
        mensagem
      );
    }
  }

  const carregando =
    createMutation.isPending ||
    aplicacoesQuery.isLoading ||
    veterinariosQuery.isLoading;

  /*
   * ------------------------------------------------
   * TELA
   * ------------------------------------------------
   */

  return (
    <ScrollView
      contentContainerStyle={
        styles.container
      }
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.title}>
        Aplicação de Vacina
      </Text>

      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>
          Pet
        </Text>

        <Text style={styles.infoText}>
          ID do Pet: {idPet || 'Não informado'}
        </Text>
      </View>

      <Text style={styles.label}>
        ID da vacina
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Ex: 1"
        keyboardType="numeric"
        value={idVacina}
        onChangeText={setIdVacina}
        editable={!carregando}
      />

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
        <View
          style={
            styles.calendarContainer
          }
        >
          <DateTimePicker
            value={
              dataSelecionada
            }
            mode="date"
            display="default"
            minimumDate={
              new Date()
            }
            onChange={
              selecionarData
            }
          />
        </View>
      )}

      <Text style={styles.label}>
        Dose
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Ex: 1ª dose"
        value={dose}
        onChangeText={setDose}
        editable={!carregando}
        maxLength={50}
      />

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
        onChangeText={
          setObservacao
        }
        editable={!carregando}
        multiline
        numberOfLines={4}
        maxLength={255}
      />

      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>
          Informações automáticas
        </Text>

        <Text style={styles.infoText}>
          ID da aplicação:{' '}
          {idAplicacaoVacina || 'Calculando...'}
        </Text>

        <Text style={styles.infoText}>
          ID do veterinário:{' '}
          {idVeterinario || 'Identificando...'}
        </Text>
      </View>

      <TouchableOpacity
        style={[
          styles.button,
          carregando &&
            styles.buttonDisabled,
        ]}
        onPress={cadastrar}
        disabled={carregando}
      >
        {carregando ? (
          <ActivityIndicator
            color="#fff"
          />
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
    flexGrow: 1,
    padding: 20,
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

  calendarContainer: {
    alignItems: 'center',
    marginBottom: 15,
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
    marginBottom: 30,
  },

  buttonDisabled: {
    opacity: 0.6,
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});