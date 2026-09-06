import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';

import { usePets } from '../hooks/pets/usePets';
import { useDeletePet } from '../hooks/pets/useDeletePet';

export default function PetVacinasScreen({ navigation }) {
  const {
    data: pets,
    isLoading,
    isError,
    error,
    refetch,
  } = usePets();

  const deletePetMutation = useDeletePet();

  const handleDeletePet = (id) => {
    Alert.alert(
      'Excluir Pet',
      'Tem certeza que deseja excluir este pet?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => {
            deletePetMutation.mutate(id);
          },
        },
      ]
    );
  };

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>
          Carregando pets...
        </Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>
          Não foi possível carregar os pets.
        </Text>

        <Text style={styles.errorDetails}>
          {error?.message || 'Erro desconhecido'}
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

  const listaPets = Array.isArray(pets) ? pets : [];

  const renderPet = ({ item }) => {
    return (
      <View style={styles.card}>
        <Text style={styles.petName}>
          {item.nome}
        </Text>

        <Text style={styles.info}>
          Espécie: {item.especie || '-'}
        </Text>

        <Text style={styles.info}>
          Raça: {item.raca || '-'}
        </Text>

        <Text style={styles.info}>
          Sexo: {item.sexo || '-'}
        </Text>

        <Text style={styles.info}>
          Data de nascimento: {item.dataNascimento || '-'}
        </Text>

        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() =>
              navigation.navigate('PetEditar', {
                pet: item,
              })
            }
          >
            <Text style={styles.buttonText}>
              Editar
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.vaccineButton}
            onPress={() =>
              navigation.navigate('AplicacaoVacina', {
                pet: item,
              })
            }
          >
            <Text style={styles.buttonText}>
              Vacinas
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => handleDeletePet(item.idPet)}
            disabled={deletePetMutation.isPending}
          >
            <Text style={styles.buttonText}>
              Excluir
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

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
          + Adicionar Pet
        </Text>
      </TouchableOpacity>

      {listaPets.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            Nenhum pet cadastrado.
          </Text>
        </View>
      ) : (
        <FlatList
          data={listaPets}
          keyExtractor={(item) =>
            String(item.idPet)
          }
          renderItem={renderPet}
          contentContainerStyle={styles.list}
          refreshing={isLoading}
          onRefresh={refetch}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  loadingText: {
    marginTop: 10,
  },

  errorText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },

  errorDetails: {
    textAlign: 'center',
    marginBottom: 20,
  },

  errorContainer: {
    alignItems: 'center',
  },

  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  emptyText: {
    fontSize: 18,
  },

  list: {
    paddingBottom: 30,
  },

  card: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 16,
    marginBottom: 15,
  },

  petName: {
    fontSize: 21,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  info: {
    fontSize: 15,
    marginBottom: 5,
  },

  actions: {
    flexDirection: 'row',
    marginTop: 15,
    gap: 8,
  },

  addButton: {
    backgroundColor: '#2E7D32',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },

  editButton: {
    flex: 1,
    backgroundColor: '#1565C0',
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
  },

  vaccineButton: {
    flex: 1,
    backgroundColor: '#6A1B9A',
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
  },

  deleteButton: {
    flex: 1,
    backgroundColor: '#C62828',
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
  },

  button: {
    backgroundColor: '#2E7D32',
    padding: 14,
    borderRadius: 8,
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});