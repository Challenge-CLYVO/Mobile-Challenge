import {
  useCallback,
} from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from 'react-native';

import {
  useFocusEffect,
} from '@react-navigation/native';

import {
  useAuth,
} from '../context/AuthContext';

import {
  useLembretesVeterinario,
} from '../hooks/veterinarios/useLembretesVeterinario';

export default function HomeVeterinarioScreen({
  navigation,
}) {
  const {
    user,
    logout,
  } = useAuth();

  const {
    data: lembretes = [],
    isLoading,
    refetch,
  } =
    useLembretesVeterinario();

  /*
   * Atualiza os lembretes sempre que
   * o veterinário voltar para a Home.
   */

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );

  function formatarData(data) {
    if (!data) {
      return '';
    }

    const dataObj =
      new Date(data);

    const dia =
      String(
        dataObj.getDate()
      ).padStart(2, '0');

    const mes =
      String(
        dataObj.getMonth() + 1
      ).padStart(2, '0');

    const ano =
      dataObj.getFullYear();

    return `${dia}/${mes}/${ano}`;
  }

  function formatarHora(data) {
    if (!data) {
      return '';
    }

    const dataObj =
      new Date(data);

    const hora =
      String(
        dataObj.getHours()
      ).padStart(2, '0');

    const minuto =
      String(
        dataObj.getMinutes()
      ).padStart(2, '0');

    return `${hora}:${minuto}`;
  }

  return (
    <ScrollView
      contentContainerStyle={
        styles.container
      }
    >
      <Text style={styles.title}>
        Área do Veterinário
      </Text>

      <Text style={styles.subtitle}>
        Bem-vindo ao CLYVO VET
      </Text>

      {/* ================================================= */}
      {/* BARRA DE LEMBRETES */}
      {/* ================================================= */}

      <View style={styles.reminderSection}>
        <View style={styles.reminderHeader}>
          <View>
            <Text style={styles.reminderTitle}>
              Lembretes de Consultas
            </Text>

            <Text style={styles.reminderSubtitle}>
              Aplicações de vacina agendadas
            </Text>
          </View>

          <View style={styles.counter}>
            <Text style={styles.counterText}>
              {lembretes.length}
            </Text>
          </View>
        </View>

        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator />

            <Text style={styles.loadingText}>
              Carregando consultas...
            </Text>
          </View>
        ) : lembretes.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>
              Nenhuma consulta agendada
            </Text>

            <Text style={styles.emptyText}>
              Quando uma aplicação de vacina
              for vinculada a você, ela aparecerá
              aqui como lembrete.
            </Text>
          </View>
        ) : (
          <View>
            {lembretes.map(
              (lembrete) => (
                <View
                  key={
                    lembrete.idAplicacaoVacina
                  }
                  style={
                    styles.reminderCard
                  }
                >
                  <View
                    style={
                      styles.reminderIcon
                    }
                  >
                    <Text
                      style={
                        styles.reminderIconText
                      }
                    >
                      📅
                    </Text>
                  </View>

                  <View
                    style={
                      styles.reminderContent
                    }
                  >
                    <Text
                      style={
                        styles.consultationTitle
                      }
                    >
                      Consulta para vacinação
                    </Text>

                    <Text
                      style={
                        styles.reminderInfo
                      }
                    >
                      Paciente:{' '}
                      {lembrete.pacienteNome}
                    </Text>

                    <Text
                      style={
                        styles.reminderInfo
                      }
                    >
                      Pet:{' '}
                      {lembrete.petNome}
                    </Text>

                    <Text
                      style={
                        styles.reminderInfo
                      }
                    >
                      Vacina:{' '}
                      {lembrete.vacinaNome}
                    </Text>

                    <Text
                      style={
                        styles.reminderDate
                      }
                    >
                      {formatarData(
                        lembrete.dataAplicacao
                      )}
                    </Text>

                    <Text
                      style={
                        styles.reminderTime
                      }
                    >
                      Horário:{' '}
                      {formatarHora(
                        lembrete.dataAplicacao
                      )}
                    </Text>
                  </View>
                </View>
              )
            )}
          </View>
        )}
      </View>

      {/* ================================================= */}
      {/* PACIENTES */}
      {/* ================================================= */}

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate(
            'Pacientes'
          )
        }
      >
        <Text style={styles.buttonText}>
          Ver Pacientes
        </Text>
      </TouchableOpacity>

      {/* ================================================= */}
      {/* VETERINÁRIOS */}
      {/* ================================================= */}

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate(
            'Veterinarios'
          )
        }
      >
        <Text style={styles.buttonText}>
          Ver Veterinários
        </Text>
      </TouchableOpacity>

      {/* ================================================= */}
      {/* SAIR */}
      {/* ================================================= */}

      <TouchableOpacity
        onPress={logout}
        style={styles.logoutButton}
      >
        <Text style={styles.logoutText}>
          Sair
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    paddingBottom: 40,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  subtitle: {
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 25,
  },

  /*
   * =======================================================
   * LEMBRETES
   * =======================================================
   */

  reminderSection: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#dbe3ec',
    borderRadius: 14,
    padding: 16,
    marginBottom: 22,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,

    elevation: 3,
  },

  reminderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },

  reminderTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  reminderSubtitle: {
    color: '#666',
    marginTop: 3,
  },

  counter: {
    minWidth: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#1565C0',
    justifyContent: 'center',
    alignItems: 'center',
  },

  counterText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },

  loadingContainer: {
    padding: 20,
    alignItems: 'center',
  },

  loadingText: {
    marginTop: 8,
    color: '#666',
  },

  emptyContainer: {
    backgroundColor: '#f8fafc',
    borderRadius: 10,
    padding: 15,
  },

  emptyTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },

  emptyText: {
    color: '#666',
    lineHeight: 20,
  },

  reminderCard: {
    flexDirection: 'row',
    backgroundColor: '#f8fafc',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
  },

  reminderIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#e3f2fd',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  reminderIconText: {
    fontSize: 20,
  },

  reminderContent: {
    flex: 1,
  },

  consultationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },

  reminderInfo: {
    fontSize: 14,
    marginBottom: 2,
  },

  reminderDate: {
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 7,
  },

  reminderTime: {
    color: '#555',
    marginTop: 2,
  },

  /*
   * =======================================================
   * BOTÕES
   * =======================================================
   */

  button: {
    backgroundColor: '#1565C0',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  logoutButton: {
    padding: 15,
    alignItems: 'center',
  },

  logoutText: {
    color: '#C62828',
    fontWeight: 'bold',
  },
});