import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

const CHAVE_NOTIFICACOES = '@clyvo_vet_notificacoes_vacina';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

async function carregarIdentificadores() {
  const conteudo = await AsyncStorage.getItem(CHAVE_NOTIFICACOES);

  if (!conteudo) {
    return {};
  }

  try {
    const dados = JSON.parse(conteudo);

    return dados && typeof dados === 'object' && !Array.isArray(dados)
      ? dados
      : {};
  } catch {
    return {};
  }
}

async function salvarIdentificadores(identificadores) {
  await AsyncStorage.setItem(
    CHAVE_NOTIFICACOES,
    JSON.stringify(identificadores),
  );
}

async function prepararNotificacoes() {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('lembretes-vacina', {
      name: 'Lembretes de vacinação',
      importance: Notifications.AndroidImportance.HIGH,
      sound: 'default',
    });
  }

  let permissao = await Notifications.getPermissionsAsync();

  if (!permissao.granted) {
    permissao = await Notifications.requestPermissionsAsync();
  }

  return permissao.granted;
}

export async function cancelarNotificacaoVacina(idAplicacao) {
  const chave = String(idAplicacao);
  const identificadores = await carregarIdentificadores();
  const identificador = identificadores[chave];

  if (!identificador) {
    return;
  }

  // Cancela o agendamento futuro, se ainda estiver pendente.
  try {
    await Notifications.cancelScheduledNotificationAsync(identificador);
  } catch (erro) {
    console.warn(
      'Não foi possível cancelar o agendamento da notificação:',
      erro?.message || erro
    );
  }

  // Remove também a notificação da central caso ela já tenha sido exibida.
  try {
    await Notifications.dismissNotificationAsync(identificador);
  } catch {
    // Pode não existir uma notificação exibida com esse identificador.
  }

  delete identificadores[chave];
  await salvarIdentificadores(identificadores);
}

export async function agendarNotificacaoVacina({
  idAplicacao,
  dataAplicacao,
}) {
  const id = Number(idAplicacao);

  if (!Number.isInteger(id) || id <= 0) {
    throw new Error('ID da aplicação de vacina inválido.');
  }

  const data = new Date(dataAplicacao);

  await cancelarNotificacaoVacina(id);

  if (Number.isNaN(data.getTime()) || data.getTime() <= Date.now()) {
    return null;
  }

  const permitido = await prepararNotificacoes();

  if (!permitido) {
    return null;
  }

  const identificador = await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Lembrete de vacinação',
      body: 'Está na hora da aplicação de vacina agendada para seu pet.',
      sound: 'default',
      data: {
        tipo: 'aplicacao-vacina',
        idAplicacaoVacina: id,
      },
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DATE,
      date: data,
      ...(Platform.OS === 'android'
        ? { channelId: 'lembretes-vacina' }
        : {}),
    },
  });

  const identificadores = await carregarIdentificadores();

  identificadores[String(id)] = identificador;

  await salvarIdentificadores(identificadores);

  return identificador;
}
