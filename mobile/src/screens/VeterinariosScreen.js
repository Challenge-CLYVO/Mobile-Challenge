import { useMemo } from 'react';

import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

import { useTheme } from '../context/ThemeContext';

import { useUsuarios } from '../hooks/usuarios/useUsuarios';
import { useVeterinarios } from '../hooks/veterinarios/useVeterinarios';

export default function VeterinariosScreen() {
  const { colors } = useTheme();

  const {
    data: usuarios = [],
    isLoading: loadingUsuarios,
  } = useUsuarios();

  const {
    data: veterinarios = [],
    isLoading: loadingVeterinarios,
  } = useVeterinarios();

  const listaVeterinarios = useMemo(() => {
    return veterinarios.map((veterinario) => {
      const usuario = usuarios.find(
        (item) =>
          Number(item.idUsuario) ===
          Number(veterinario.idUsuario)
      );

      return {
        ...veterinario,
        nome:
          usuario?.nome ||
          veterinario.nome ||
          `Veterinário #${veterinario.idVeterinario}`,
        email: usuario?.email || '',
        telefone: usuario?.telefone || '',
      };
    });
  }, [veterinarios, usuarios]);

  const loading = loadingUsuarios || loadingVeterinarios;

  if (loading) {
    return (
      <View
        style={[
          styles.center,
          { backgroundColor: colors.background },
        ]}
      >
        <ActivityIndicator
          size="large"
          color={colors.primary}
        />

        <Text
          style={[
            styles.loadingText,
            { color: colors.textSecondary },
          ]}
        >
          Carregando veterinários...
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
        Veterinários
      </Text>

      <Text
        style={[
          styles.description,
          { color: colors.textSecondary },
        ]}
      >
        Usuários cadastrados como veterinários.
      </Text>

      <FlatList
        data={listaVeterinarios}
        keyExtractor={(item) => String(item.idVeterinario)}
        contentContainerStyle={
          listaVeterinarios.length === 0
            ? styles.emptyList
            : undefined
        }
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

            <Text style={[styles.info, { color: colors.text }]}>
              CRV: {item.crv || item.CRV || 'Não informado'}
            </Text>

            <Text style={[styles.info, { color: colors.text }]}>
              Especialidade: {item.especialidade || 'Não informada'}
            </Text>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
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
  },

  card: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    marginBottom: 12,
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

  emptyList: {
    flexGrow: 1,
    justifyContent: 'center',
  },

  empty: {
    alignItems: 'center',
    marginTop: 30,
  },

  emptyText: {
    fontSize: 15,
    textAlign: 'center',
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  loadingText: {
    marginTop: 10,
  },
});