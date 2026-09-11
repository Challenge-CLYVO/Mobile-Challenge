import { useState } from 'react';

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

import DateTimePicker from '@react-native-community/datetimepicker';

import { useCreatePet } from '../hooks/pets/useCreatePet';
import { usePets } from '../hooks/pets/usePets';
import { useAuth } from '../context/AuthContext';

export default function PetCadastroScreen({ navigation, route }) {
  const { user } = useAuth();

  const idResponsavel =
    route?.params?.idResponsavel || user?.idResponsavel;

  const [nome, setNome] = useState('');
  const [sexo, setSexo] = useState('');
  const [raca, setRaca] = useState('');
  const [especie, setEspecie] = useState('');

  const [dataNascimento, setDataNascimento] = useState(null);
  const [mostrarCalendario, setMostrarCalendario] = useState(false);

  const createPetMutation = useCreatePet();

  // Busca os pets para descobrir automaticamente o próximo ID.
  const {
    data: pets = [],
    isLoading: carregandoPets,
  } = usePets();

  function obterProximoIdPet() {
    if (!Array.isArray(pets) || pets.length === 0) {
      return 1;
    }

    const ids = pets
      .map((pet) => Number(pet.idPet))
      .filter((id) => Number.isInteger(id) && id > 0);

    if (ids.length === 0) {
      return 1;
    }

    return Math.max(...ids) + 1;
  }

  function formatarData(data) {
    if (!data) {
      return '';
    }

    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();

    return `${dia}/${mes}/${ano}`;
  }

  function formatarDataParaAPI(data) {
    if (!data) {
      return null;
    }

    const ano = data.getFullYear();
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const dia = String(data.getDate()).padStart(2, '0');

    return `${ano}-${mes}-${dia}T00:00:00`;
  }

  function selecionarData(event, dataSelecionada) {
    setMostrarCalendario(false);

    if (event?.type === 'dismissed') {
      return;
    }

    if (!dataSelecionada) {
      return;
    }

    const hoje = new Date();

    // Remove horas para comparar somente a data.
    hoje.setHours(0, 0, 0, 0);
    dataSelecionada.setHours(0, 0, 0, 0);

    if (dataSelecionada > hoje) {
      Alert.alert(
        'Data inválida',
        'A data de nascimento não pode ser no futuro.'
      );
      return;
    }

    setDataNascimento(dataSelecionada);
  }

  async function cadastrarPet() {
    if (!nome.trim()) {
      Alert.alert('Atenção', 'Informe o nome do pet.');
      return;
    }

    if (!sexo.trim()) {
      Alert.alert('Atenção', 'Informe o sexo do pet.');
      return;
    }

    if (!raca.trim()) {
      Alert.alert('Atenção', 'Informe a raça do pet.');
      return;
    }

    if (!especie.trim()) {
      Alert.alert('Atenção', 'Informe a espécie do pet.');
      return;
    }

    if (!dataNascimento) {
      Alert.alert(
        'Atenção',
        'Selecione a data de nascimento do pet.'
      );
      return;
    }

    if (!idResponsavel || Number(idResponsavel) <= 0) {
      Alert.alert(
        'Erro',
        'Responsável não encontrado. Faça login novamente.'
      );
      return;
    }

    if (carregandoPets) {
      Alert.alert(
        'Aguarde',
        'Estamos carregando os dados dos pets.'
      );
      return;
    }

    const idPet = obterProximoIdPet();

    const dados = {
      idPet,
      nome: nome.trim(),
      sexo: sexo.trim(),
      raca: raca.trim(),
      especie: especie.trim(),
      dataNascimento: formatarDataParaAPI(dataNascimento),
      idResponsavel: Number(idResponsavel),
    };

    console.log('Dados enviados para cadastro do pet:', dados);

    createPetMutation.mutate(dados, {
      onSuccess: () => {
        Alert.alert(
          'Sucesso',
          `Pet cadastrado com sucesso!\nID do pet: ${idPet}`
        );

        navigation.goBack();
      },

      onError: (error) => {
        console.log(
          'Erro ao cadastrar pet:',
          error?.response?.data || error.message
        );

        const resposta = error?.response?.data;

        let mensagem =
          'Não foi possível cadastrar o pet.';

        if (resposta?.errors) {
          const erros = Object.values(resposta.errors)
            .flat()
            .join('\n');

          if (erros) {
            mensagem = erros;
          }
        }

        Alert.alert('Erro ao cadastrar', mensagem);
      },
    });
  }

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.title}>
        Cadastrar Pet
      </Text>

      <Text style={styles.subtitle}>
        Informe os dados do seu pet
      </Text>

      <Text style={styles.label}>
        Nome
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Ex.: Rex"
        value={nome}
        onChangeText={setNome}
        maxLength={25}
      />

      <Text style={styles.label}>
        Sexo
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Ex.: Macho"
        value={sexo}
        onChangeText={setSexo}
        maxLength={9}
      />

      <Text style={styles.label}>
        Raça
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Ex.: Golden"
        value={raca}
        onChangeText={setRaca}
        maxLength={15}
      />

      <Text style={styles.label}>
        Espécie
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Ex.: Cachorro"
        value={especie}
        onChangeText={setEspecie}
        maxLength={15}
      />

      <Text style={styles.label}>
        Data de nascimento
      </Text>

      <TouchableOpacity
        style={styles.dateButton}
        onPress={() => setMostrarCalendario(true)}
      >
        <Text
          style={
            dataNascimento
              ? styles.dateText
              : styles.datePlaceholder
          }
        >
          {dataNascimento
            ? formatarData(dataNascimento)
            : 'Selecionar data'}
        </Text>
      </TouchableOpacity>

      {mostrarCalendario && (
        <DateTimePicker
          value={dataNascimento || new Date()}
          mode="date"
          display="default"
          maximumDate={new Date()}
          onChange={selecionarData}
        />
      )}

      <View style={styles.infoBox}>
        <Text style={styles.infoText}>
          O ID do pet será gerado automaticamente.
        </Text>

        {!carregandoPets && (
          <Text style={styles.infoId}>
            Próximo ID: {obterProximoIdPet()}
          </Text>
        )}
      </View>

      <TouchableOpacity
        style={[
          styles.button,
          createPetMutation.isPending && styles.buttonDisabled,
        ]}
        onPress={cadastrarPet}
        disabled={
          createPetMutation.isPending ||
          carregandoPets
        }
      >
        {createPetMutation.isPending ||
        carregandoPets ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>
            Cadastrar Pet
          </Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 5,
  },

  subtitle: {
    fontSize: 15,
    color: '#666',
    marginBottom: 25,
  },

  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
    color: '#333',
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    backgroundColor: '#fff',
    fontSize: 16,
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
    color: '#888',
  },

  infoBox: {
    backgroundColor: '#f1f5f9',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
  },

  infoText: {
    color: '#555',
    fontSize: 14,
  },

  infoId: {
    marginTop: 4,
    fontWeight: 'bold',
    color: '#2563eb',
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
    fontSize: 16,
  },
});