import { useEffect, useState } from 'react';

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

import { usePet } from '../hooks/pets/usePet';
import { useUpdatePet } from '../hooks/pets/useUpdatePet';
import { useTheme } from '../context/ThemeContext';

export default function PetEditarScreen({ navigation, route }) {
  const { idPet } = route.params;
  const { colors, isDark } = useTheme();

  const styles = criarEstilos(colors);

  const {
    data: pet,
    isLoading,
    isError,
  } = usePet(idPet);

  const updatePetMutation = useUpdatePet();

  const [nome, setNome] = useState('');
  const [sexo, setSexo] = useState('');
  const [raca, setRaca] = useState('');
  const [especie, setEspecie] = useState('');
  const [dataNascimento, setDataNascimento] = useState(null);
  const [mostrarCalendario, setMostrarCalendario] = useState(false);

  useEffect(() => {
    if (pet) {
      setNome(pet.nome || '');
      setSexo(pet.sexo || '');
      setRaca(pet.raca || '');
      setEspecie(pet.especie || '');

      if (pet.dataNascimento) {
        const data = new Date(pet.dataNascimento);

        data.setHours(0, 0, 0, 0);
        setDataNascimento(data);
      }
    }
  }, [pet]);

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

  function selecionarData(event, data) {
    setMostrarCalendario(false);

    if (event?.type === 'dismissed' || !data) {
      return;
    }

    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    data.setHours(0, 0, 0, 0);

    if (data > hoje) {
      Alert.alert(
        'Data inválida',
        'A data de nascimento não pode ser no futuro.'
      );
      return;
    }

    setDataNascimento(data);
  }

  function salvarAlteracoes() {
    if (
      !nome.trim() ||
      !sexo.trim() ||
      !raca.trim() ||
      !especie.trim() ||
      !dataNascimento
    ) {
      Alert.alert('Atenção', 'Preencha todos os campos.');
      return;
    }

    const dados = {
      nome: nome.trim(),
      sexo: sexo.trim(),
      raca: raca.trim(),
      especie: especie.trim(),
      dataNascimento: formatarDataParaAPI(dataNascimento),
      idResponsavel: pet.idResponsavel,
    };

    updatePetMutation.mutate(
      {
        id: idPet,
        pet: dados,
      },
      {
        onSuccess: () => {
          Alert.alert('Sucesso', 'Pet atualizado com sucesso!');
          navigation.goBack();
        },

        onError: (error) => {
          console.log(
            'Erro ao atualizar pet:',
            error?.response?.data || error.message
          );

          Alert.alert(
            'Erro',
            'Não foi possível atualizar o pet.'
          );
        },
      }
    );
  }

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.statusText}>Carregando pet...</Text>
      </View>
    );
  }

  if (isError || !pet) {
    return (
      <View style={styles.center}>
        <Text style={styles.statusText}>
          Não foi possível carregar o pet.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.title}>Editar Pet</Text>

      <Text style={styles.label}>Nome</Text>
      <TextInput
        style={styles.input}
        value={nome}
        onChangeText={setNome}
        placeholder="Nome"
        placeholderTextColor={colors.textSecondary}
        maxLength={25}
        editable={!updatePetMutation.isPending}
        selectionColor={colors.primary}
      />

      <Text style={styles.label}>Sexo</Text>
      <TextInput
        style={styles.input}
        value={sexo}
        onChangeText={setSexo}
        placeholder="Sexo"
        placeholderTextColor={colors.textSecondary}
        maxLength={9}
        editable={!updatePetMutation.isPending}
        selectionColor={colors.primary}
      />

      <Text style={styles.label}>Raça</Text>
      <TextInput
        style={styles.input}
        value={raca}
        onChangeText={setRaca}
        placeholder="Raça"
        placeholderTextColor={colors.textSecondary}
        maxLength={15}
        editable={!updatePetMutation.isPending}
        selectionColor={colors.primary}
      />

      <Text style={styles.label}>Espécie</Text>
      <TextInput
        style={styles.input}
        value={especie}
        onChangeText={setEspecie}
        placeholder="Espécie"
        placeholderTextColor={colors.textSecondary}
        maxLength={15}
        editable={!updatePetMutation.isPending}
        selectionColor={colors.primary}
      />

      <Text style={styles.label}>Data de nascimento</Text>

      <TouchableOpacity
        style={styles.dateButton}
        onPress={() => setMostrarCalendario(true)}
        disabled={updatePetMutation.isPending}
        activeOpacity={0.7}
      >
        <Text style={styles.dateText}>
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
          themeVariant={isDark ? 'dark' : 'light'}
        />
      )}

      <TouchableOpacity
        style={[
          styles.button,
          updatePetMutation.isPending && styles.buttonDisabled,
        ]}
        onPress={salvarAlteracoes}
        disabled={updatePetMutation.isPending}
        activeOpacity={0.8}
      >
        {updatePetMutation.isPending ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.buttonText}>
            Salvar Alterações
          </Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}

function criarEstilos(colors) {
  return StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: colors.background,
    },

    container: {
      padding: 20,
      paddingBottom: 40,
      backgroundColor: colors.background,
      flexGrow: 1,
    },

    title: {
      fontSize: 28,
      fontWeight: 'bold',
      marginBottom: 25,
      color: colors.text,
    },

    label: {
      fontSize: 14,
      fontWeight: '600',
      marginBottom: 6,
      color: colors.text,
    },

    input: {
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 8,
      padding: 12,
      marginBottom: 15,
      backgroundColor: colors.surface,
      color: colors.text,
    },

    dateButton: {
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 8,
      padding: 14,
      marginBottom: 20,
      backgroundColor: colors.surface,
    },

    dateText: {
      fontSize: 16,
      color: colors.text,
    },

    button: {
      backgroundColor: colors.primary,
      padding: 15,
      borderRadius: 8,
      alignItems: 'center',
    },

    buttonDisabled: {
      opacity: 0.6,
    },

    buttonText: {
      color: '#FFFFFF',
      fontWeight: 'bold',
    },

    center: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      backgroundColor: colors.background,
    },

    statusText: {
      color: colors.text,
      marginTop: 10,
      textAlign: 'center',
    },
  });
}