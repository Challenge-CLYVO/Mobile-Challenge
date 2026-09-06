import { useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';

import { useAplicacoesVacina } from '../hooks/aplicacaoVacinas';
import { useVacinas } from '../hooks/vacinas';
import { usePets } from '../hooks/pets';

export default function LembretesScreen() {
  const {
    data: aplicacoes,
    isLoading: loadingAplicacoes,
    isError: erroAplicacoes,
    refetch: refetchAplicacoes,
  } = useAplicacoesVacina();

  const {
    data: vacinas,
    isLoading: loadingVacinas,
    isError: erroVacinas,
    refetch: refetchVacinas,
  } = useVacinas();

  const {
    data: pets,
    isLoading: loadingPets,
    isError: erroPets,
    refetch: refetchPets,
  } = usePets();

  const aplicacoesArray = Array.isArray(aplicacoes)
    ? aplicacoes
    : aplicacoes?.data || [];

  const vacinasArray = Array.isArray(vacinas)
    ? vacinas
    : vacinas?.data || [];

  const petsArray = Array.isArray(pets)
    ? pets
    : pets?.data || [];

  const lembretes = useMemo(() => {
    return aplicacoesArray
      .map((aplicacao) => {
        const vacina = vacinasArray.find(
          (item) =>
            Number(item.idVacina) ===
            Number(aplicacao.idVacina)
        );

        const pet = petsArray.find(
          (item) =>
            Number(item.idPet) ===
            Number(aplicacao.idPet)
        );

        return {
          ...aplicacao,
          vacina,
          pet,
        };
      })
      .sort((a, b) => {
        const dataA = new Date(a.dataAplicacao);
        const dataB = new Date(b.dataAplicacao);

        return dataA - dataB;
      });
  }, [
    aplicacoesArray,
    vacinasArray,
    petsArray,
  ]);

  const carregando =
    loadingAplicacoes ||
    loadingVacinas ||
    loadingPets;

  const ocorreuErro =
    erroAplicacoes ||
    erroVacinas ||
    erroPets;

  function atualizarDados() {
    refetchAplicacoes();
    refetchVacinas();
    refetchPets();
  }

  function formatarData(data) {
    if (!data) {
      return '-';
    }

    const dataObj = new Date(data);

    if (Number.isNaN(dataObj.getTime())) {
      return data;
    }

    return dataObj.toLocaleDateString('pt-BR');
  }

  function obterStatus(data) {
    if (!data) {
      return 'Sem data';
    }

    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    const dataAplicacao = new Date(data);
    dataAplicacao.setHours(0, 0, 0, 0);

    if (dataAplicacao < hoje) {
      return 'Aplicação registrada';
    }

    if (
      dataAplicacao.getTime() ===
      hoje.getTime()
    ) {
      return 'Aplicação hoje';
    }

    return 'Próxima aplicação';
  }

  if (carregando) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />

        <Text style={styles.loadingText}>
          Carregando lembretes...
        </Text>
      </View>
    );
  }

  if (ocorreuErro) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorTitle}>
          Não foi possível carregar os lembretes
        </Text>

        <Text style={styles.errorText}>
          Verifique se a API está funcionando e tente
          novamente.
        </Text>

        <TouchableOpacity
          style={styles.retryButton}
          onPress={atualizarDados}
        >
          <Text style={styles.retryButtonText}>
            Tentar novamente
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Lembretes
      </Text>

      <Text style={styles.subtitle}>
        Aplicações de vacina cadastradas
      </Text>

      {lembretes.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>
            Nenhum lembrete encontrado
          </Text>

          <Text style={styles.emptyText}>
            Quando uma aplicação de vacina for
            cadastrada, ela aparecerá aqui.
          </Text>
        </View>
      ) : (
        <FlatList
          data={lembretes}
          keyExtractor={(item) =>
            String(item.idAplicacaoVacina)
          }
          refreshing={carregando}
          onRefresh={atualizarDados}
          contentContainerStyle={
            styles.listContainer
          }
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.vacinaNome}>
                  {item.vacina?.nome ||
                    `Vacina #${item.idVacina}`}
                </Text>

                <View style={styles.statusContainer}>
                  <Text style={styles.statusText}>
                    {obterStatus(
                      item.dataAplicacao
                    )}
                  </Text>
                </View>
              </View>

              <View style={styles.infoContainer}>
                <Text style={styles.label}>
                  Pet
                </Text>

                <Text style={styles.value}>
                  {item.pet?.nome ||
                    `Pet #${item.idPet}`}
                </Text>
              </View>

              <View style={styles.infoContainer}>
                <Text style={styles.label}>
                  Data da aplicação
                </Text>

                <Text style={styles.value}>
                  {formatarData(
                    item.dataAplicacao
                  )}
                </Text>
              </View>

              <View style={styles.infoContainer}>
                <Text style={styles.label}>
                  Dose
                </Text>

                <Text style={styles.value}>
                  {item.dose || 'Não informada'}
                </Text>
              </View>

              <View style={styles.infoContainer}>
                <Text style={styles.label}>
                  Observação
                </Text>

                <Text style={styles.value}>
                  {item.observacao ||
                    'Nenhuma observação'}
                </Text>
              </View>

              <View style={styles.infoContainer}>
                <Text style={styles.label}>
                  Veterinário
                </Text>

                <Text style={styles.value}>
                  ID {item.idVeterinario}
                </Text>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },

  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 5,
  },

  subtitle: {
    fontSize: 15,
    color: '#666',
    marginBottom: 20,
  },

  listContainer: {
    paddingBottom: 20,
  },

  card: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    padding: 16,
    marginBottom: 15,
  },

  cardHeader: {
    marginBottom: 15,
  },

  vacinaNome: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  statusContainer: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: '#eee',
  },

  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
  },

  infoContainer: {
    marginBottom: 10,
  },

  label: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 2,
  },

  value: {
    fontSize: 16,
  },

  emptyContainer: {
    alignItems: 'center',
    marginTop: 50,
  },

  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  emptyText: {
    textAlign: 'center',
    color: '#666',
    lineHeight: 22,
  },

  errorTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },

  errorText: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 20,
  },

  retryButton: {
    backgroundColor: '#333',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },

  retryButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});