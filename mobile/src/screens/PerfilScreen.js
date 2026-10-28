import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';

import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

export default function PerfilScreen() {
  const { user, logout } = useAuth();
  const { colors, isDark, changeTheme } = useTheme();

  async function sair() {
    try {
      await logout();
    } catch (error) {
      console.log('Erro ao sair:', error);

      Alert.alert(
        'Erro',
        'Nao foi possivel sair da conta.'
      );
    }
  }

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.background },
      ]}
    >
      <Text
        style={[
          styles.title,
          { color: colors.text },
        ]}
      >
        Meu Perfil
      </Text>

      <View
        style={[
          styles.card,
          {
            backgroundColor: colors.surface,
            borderColor: colors.border,
          },
        ]}
      >
        <Text style={[styles.label, { color: colors.textSecondary }]}>
          Nome
        </Text>
        <Text style={[styles.value, { color: colors.text }]}>
          {user?.nome || 'Nao informado'}
        </Text>

        <Text style={[styles.label, { color: colors.textSecondary }]}>
          Email
        </Text>
        <Text style={[styles.value, { color: colors.text }]}>
          {user?.email || 'Nao informado'}
        </Text>

        <Text style={[styles.label, { color: colors.textSecondary }]}>
          Telefone
        </Text>
        <Text style={[styles.value, { color: colors.text }]}>
          {user?.telefone || 'Nao informado'}
        </Text>

        <Text style={[styles.label, { color: colors.textSecondary }]}>
          Tipo de conta
        </Text>
        <Text style={[styles.value, { color: colors.text }]}>
          {user?.isVeterinario ? 'Veterinario' : 'Usuario'}
        </Text>
      </View>

      <View
        style={[
          styles.themeCard,
          {
            backgroundColor: colors.surface,
            borderColor: colors.border,
          },
        ]}
      >
        <View style={styles.themeTextContainer}>
          <Text style={[styles.themeTitle, { color: colors.text }]}>
            Tema {isDark ? 'escuro' : 'claro'}
          </Text>

          <Text style={[styles.themeDescription, { color: colors.textSecondary }]}>
            {isDark
              ? 'Ative para voltar ao tema claro.'
              : 'Ative para usar o tema escuro.'}
          </Text>
        </View>

        <Switch
          value={isDark}
          onValueChange={(enabled) =>
            changeTheme(enabled ? 'dark' : 'light')
          }
          trackColor={{
            false: colors.border,
            true: colors.primary,
          }}
          thumbColor={isDark ? colors.surface : '#FFFFFF'}
          accessibilityLabel="Alternar tema claro e escuro"
        />
      </View>

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={sair}
        accessibilityRole="button"
      >
        <Text style={styles.logoutText}>
          Sair
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
  },

  card: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 20,
  },

  label: {
    fontSize: 14,
    marginTop: 10,
    marginBottom: 4,
  },

  value: {
    fontSize: 18,
    fontWeight: '500',
  },

  themeCard: {
    marginTop: 20,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  themeTextContainer: {
    flex: 1,
    paddingRight: 12,
  },

  themeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  themeDescription: {
    fontSize: 13,
    marginTop: 4,
  },

  logoutButton: {
    marginTop: 24,
    backgroundColor: '#D32F2F',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },

  logoutText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});