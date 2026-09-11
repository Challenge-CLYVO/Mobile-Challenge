import { useMemo } from 'react';

import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

import {
  useUsuarios,
} from '../hooks/usuarios/useUsuarios';

import {
  useVeterinarios,
} from '../hooks/veterinarios/useVeterinarios';

export default function VeterinariosScreen() {
  const {
    data: usuarios = [],
    isLoading: loadingUsuarios,
  } = useUsuarios();

  const {
    data: veterinarios = [],
    isLoading: loadingVeterinarios,
  } = useVeterinarios();

  const listaVeterinarios =
    useMemo(() => {
      return veterinarios.map(
        (veterinario) => {
          const usuario =
            usuarios.find(
              (item) =>
                Number(
                  item.idUsuario
                ) ===
                Number(
                  veterinario.idUsuario
                )
            );

          return {
            ...veterinario,
            nome:
              usuario?.nome ||
              veterinario.nome ||
              `Veterinário #${veterinario.idVeterinario}`,

            email:
              usuario?.email ||
              '',

            telefone:
              usuario?.telefone ||
              '',
          };
        }
      );
    }, [
      veterinarios,
      usuarios,
    ]);

  const loading =
    loadingUsuarios ||
    loadingVeterinarios;

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator
          size="large"
        />

        <Text>
          Carregando veterinários...
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Veterinários
      </Text>

      <Text style={styles.description}>
        Usuários cadastrados como veterinários.
      </Text>

      <FlatList
        data={listaVeterinarios}

        keyExtractor={(item) =>
          String(
            item.idVeterinario
          )
        }

        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>
              {item.nome}
            </Text>

            <Text>
              E-mail: {item.email || 'Não informado'}
            </Text>

            <Text>
              Telefone: {item.telefone || 'Não informado'}
            </Text>

            <Text>
              CRV: {item.crv || item.CRV || 'Não informado'}
            </Text>

            <Text>
              Especialidade:{' '}
              {item.especialidade ||
                'Não informada'}
            </Text>
          </View>
        )}

        ListEmptyComponent={
          <View style={styles.empty}>
            <Text>
              Nenhum veterinário encontrado.
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
    color: '#666',
  },

  card: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 15,
    marginBottom: 12,
  },

  name: {
    fontSize: 21,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  empty: {
    alignItems: 'center',
    marginTop: 30,
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});