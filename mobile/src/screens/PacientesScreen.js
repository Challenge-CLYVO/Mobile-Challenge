import { useMemo } from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

import {
  useUsuarios,
} from '../hooks/usuarios/useUsuarios';

import {
  useResponsaveis,
} from '../hooks/usuarios/useResponsaveis';

import {
  usePets,
} from '../hooks/pets/usePets';

export default function PacientesScreen({
  navigation,
}) {
  const {
    data: usuarios = [],
    isLoading: loadingUsuarios,
  } = useUsuarios();

  const {
    data: responsaveis = [],
    isLoading: loadingResponsaveis,
  } = useResponsaveis();

  const {
    data: pets = [],
    isLoading: loadingPets,
  } = usePets();

  const pacientes =
    useMemo(() => {
      return usuarios
        .map((usuario) => {
          const responsavel =
            responsaveis.find(
              (item) =>
                Number(
                  item.idUsuario
                ) ===
                Number(
                  usuario.idUsuario
                )
            );

          if (!responsavel) {
            return null;
          }

          const petsDoUsuario =
            pets.filter(
              (pet) =>
                Number(
                  pet.idResponsavel
                ) ===
                Number(
                  responsavel.idResponsavel
                )
            );

          return {
            ...usuario,
            responsavel,
            pets:
              petsDoUsuario,
          };
        })
        .filter(Boolean);
    }, [
      usuarios,
      responsaveis,
      pets,
    ]);

  const loading =
    loadingUsuarios ||
    loadingResponsaveis ||
    loadingPets;

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator
          size="large"
        />

        <Text>
          Carregando pacientes...
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Pacientes
      </Text>

      <Text style={styles.description}>
        Usuários cadastrados como responsáveis por pets.
      </Text>

      <FlatList
        data={pacientes}

        keyExtractor={(item) =>
          String(
            item.idUsuario
          )
        }

        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>
              {item.nome}
            </Text>

            <Text>
              E-mail: {item.email}
            </Text>

            <Text>
              Telefone: {item.telefone}
            </Text>

            <Text style={styles.subtitle}>
              Pets
            </Text>

            {item.pets.length === 0 ? (
              <Text>
                Nenhum pet cadastrado.
              </Text>
            ) : (
              item.pets.map(
                (pet) => (
                  <View
                    key={
                      pet.idPet
                    }
                    style={styles.pet}
                  >
                    <Text
                      style={
                        styles.petName
                      }
                    >
                      {pet.nome}
                    </Text>

                    <Text>
                      {pet.especie} - {pet.raca}
                    </Text>

                    <View
                      style={
                        styles.buttons
                      }
                    >
                      <TouchableOpacity
                        style={
                          styles.vaccineButton
                        }
                        onPress={() =>
                          navigation.navigate(
                            'AplicacaoVacina',
                            {
                              idPet:
                                pet.idPet,
                            }
                          )
                        }
                      >
                        <Text
                          style={
                            styles.buttonText
                          }
                        >
                          Vacinas
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={
                          styles.editButton
                        }
                        onPress={() =>
                          navigation.navigate(
                            'PetEditar',
                            {
                              idPet:
                                pet.idPet,
                            }
                          )
                        }
                      >
                        <Text
                          style={
                            styles.buttonText
                          }
                        >
                          Editar Pet
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )
              )
            )}

            {/* O veterinário pode cadastrar um pet
                PARA ESTE PACIENTE. */}

            {item.responsavel && (
              <TouchableOpacity
                style={
                  styles.addPetButton
                }
                onPress={() =>
                  navigation.navigate(
                    'PetCadastro',
                    {
                      idResponsavel:
                        item.responsavel
                          .idResponsavel,
                    }
                  )
                }
              >
                <Text
                  style={
                    styles.buttonText
                  }
                >
                  + Adicionar Pet ao Paciente
                </Text>
              </TouchableOpacity>
            )}
          </View>
        )}

        ListEmptyComponent={
          <Text>
            Nenhum paciente encontrado.
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
    marginBottom: 8,
  },

  description: {
    color: '#666',
    marginBottom: 20,
  },

  card: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },

  name: {
    fontSize: 21,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 8,
  },

  pet: {
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
  },

  petName: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  buttons: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 10,
  },

  vaccineButton: {
    flex: 1,
    backgroundColor: '#16a34a',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },

  editButton: {
    flex: 1,
    backgroundColor: '#2563eb',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },

  addPetButton: {
    backgroundColor: '#7c3aed',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});