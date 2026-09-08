import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

import { usePets } from '../hooks/pets/usePets';
import { useDeletePet } from '../hooks/pets/useDeletePet';
import { useAuth } from '../context/AuthContext';

export default function PetVacinasScreen({
  navigation,
  route,
}) {
  const { user } = useAuth();

  const {
    data: pets = [],
    isLoading,
    isError,
    refetch,
  } = usePets();

  const deletePetMutation = useDeletePet();

  const idResponsavelFiltro =
    route?.params?.idResponsavel ||
    user?.idResponsavel;

  const meusPets = pets.filter(
    (pet) =>
      Number(pet.idResponsavel) ===
      Number(idResponsavelFiltro)
  );

  function excluirPet(idPet) {
    Alert.alert(
      'Excluir Pet',
      'Deseja realmente excluir este pet?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },

        {
          text: 'Excluir',
          style: 'destructive',

          onPress: () => {
            deletePetMutation.mutate(idPet, {
              onSuccess: () => {
                Alert.alert(
                  'Sucesso',
                  'Pet excluído com sucesso!'
                );
              },

              onError: (error) => {
                console.log(
                  error?.response?.data ||
                  error.message
                );

                Alert.alert(
                  'Erro',
                  'Não foi possível excluir o pet.'
                );
              },
            });
          },
        },
      ]
    );
  }

  function renderPet({ item }) {
    return (
      <View style={styles.card}>
        <Text style={styles.petName}>
          {item.nome}
        </Text>

        <Text>
          Espécie: {item.especie}
        </Text>

        <Text>
          Raça: {item.raca}
        </Text>

        <Text>
          Sexo: {item.sexo}
        </Text>

        <View style={styles.buttons}>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() =>
              navigation.navigate(
                'PetEditar',
                {
                  idPet: item.idPet,
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
              excluirPet(item.idPet)
            }
          >
            <Text style={styles.buttonText}>
              Excluir
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.vaccineButton}
          onPress={() =>
            navigation.navigate(
              'AplicacaoVacina',
              {
                idPet: item.idPet,
              }
            )
          }
        >
          <Text style={styles.buttonText}>
            Ver Vacinas
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Carregando pets...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.center}>
        <Text>
          Erro ao carregar os pets.
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={refetch}
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
        Meus Pets
      </Text>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() =>
          navigation.navigate('PetCadastro')
        }
      >
        <Text style={styles.buttonText}>
          + Adicionar Pet
        </Text>
      </TouchableOpacity>

      <FlatList
        data={meusPets}
        keyExtractor={(item) =>
          String(item.idPet)
        }
        renderItem={renderPet}
        refreshing={isLoading}
        onRefresh={refetch}
        ListEmptyComponent={
          <Text style={styles.empty}>
            Nenhum pet cadastrado.
          </Text>
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
    marginBottom: 15,
  },

  card: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },

  petName: {
    fontSize: 22,
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

  vaccineButton: {
    backgroundColor: '#16a34a',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },

  addButton: {
    backgroundColor: '#2563eb',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },

  button: {
    backgroundColor: '#2563eb',
    padding: 12,
    borderRadius: 8,
    marginTop: 15,
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  empty: {
    textAlign: 'center',
    marginTop: 30,
    fontSize: 16,
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});