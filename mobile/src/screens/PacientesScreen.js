import { useMemo } from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

import { useTheme } from '../context/ThemeContext';

import { useUsuarios } from '../hooks/usuarios/useUsuarios';
import { useResponsaveis } from '../hooks/usuarios/useResponsaveis';
import { usePets } from '../hooks/pets/usePets';

export default function PacientesScreen({ navigation }) {
  const { colors } = useTheme();

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

  const pacientes = useMemo(() => {
    return usuarios
      .map((usuario) => {
        const responsavel = responsaveis.find(
          (item) =>
            Number(item.idUsuario) === Number(usuario.idUsuario)
        );

        if (!responsavel) {
          return null;
        }

        const petsDoUsuario = pets.filter(
          (pet) =>
            Number(pet.idResponsavel) ===
            Number(responsavel.idResponsavel)
        );

        return {
          ...usuario,
          responsavel,
          pets: petsDoUsuario,
        };
      })
      .filter(Boolean);
  }, [usuarios, responsaveis, pets]);

  const loading =
    loadingUsuarios ||
    loadingResponsaveis ||
    loadingPets;

  if (loading) {
    return (
      <View
        style={[
          styles.center,
          { backgroundColor: colors.background },
        ]}
      >
        <ActivityIndicator size="large" color={colors.primary} />

        <Text style={{ color: colors.textSecondary, marginTop: 10 }}>
          Carregando pacientes...
        </Text>
      </View>
    );
  }

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.background },
      ]}
    >
      <Text style={[styles.title, { color: colors.text }]}>
        Pacientes
      </Text>

      <Text
        style={[
          styles.description,
          { color: colors.textSecondary },
        ]}
      >
        Usuários cadastrados como responsáveis por pets.
      </Text>

      <FlatList
        data={pacientes}
        keyExtractor={(item) => String(item.idUsuario)}
        renderItem={({ item }) => (
          <View
            style={[
              styles.card,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
              },
            ]}
          >
            <Text style={[styles.name, { color: colors.text }]}>
              {item.nome}
            </Text>

            <Text style={[styles.info, { color: colors.text }]}>
              E-mail: {item.email || 'Não informado'}
            </Text>

            <Text style={[styles.info, { color: colors.text }]}>
              Telefone: {item.telefone || 'Não informado'}
            </Text>

            <Text style={[styles.subtitle, { color: colors.text }]}>
              Pets
            </Text>

            {item.pets.length === 0 ? (
              <Text style={{ color: colors.textSecondary }}>
                Nenhum pet cadastrado.
              </Text>
            ) : (
              item.pets.map((pet) => (
                <View
                  key={pet.idPet}
                  style={[
                    styles.pet,
                    {
                      backgroundColor: colors.background,
                      borderColor: colors.border,
                    },
                  ]}
                >
                  <Text style={[styles.petName, { color: colors.text }]}>
                    {pet.nome}
                  </Text>

                  <Text style={{ color: colors.textSecondary }}>
                    {pet.especie} - {pet.raca}
                  </Text>

                  <View style={styles.buttons}>
                    <TouchableOpacity
                      style={styles.vaccineButton}
                      onPress={() =>
                        navigation.navigate('AplicacaoVacina', {
                          idPet: pet.idPet,
                        })
                      }
                    >
                      <Text style={styles.buttonText}>
                        Vacinas
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.editButton}
                      onPress={() =>
                        navigation.navigate('PetEditar', {
                          idPet: pet.idPet,
                        })
                      }
                    >
                      <Text style={styles.buttonText}>
                        Editar Pet
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            )}

            {item.responsavel && (
              <TouchableOpacity
                style={styles.addPetButton}
                onPress={() =>
                  navigation.navigate('PetCadastro', {
                    idResponsavel: item.responsavel.idResponsavel,
                  })
                }
              >
                <Text style={styles.buttonText}>
                  + Adicionar Pet ao Paciente
                </Text>
              </TouchableOpacity>
            )}
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={{ color: colors.textSecondary }}>
              Nenhum paciente encontrado.
            </Text>
          </View>
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
    marginBottom: 20,
  },

  card: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },

  name: {
    fontSize: 21,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  info: {
    fontSize: 15,
    marginBottom: 5,
  },

  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 8,
  },

  pet: {
    borderWidth: 1,
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

  empty: {
    alignItems: 'center',
    marginTop: 30,
  },
});