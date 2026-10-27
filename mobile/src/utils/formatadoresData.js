export function formatarDataParaAPI(data) {
  const ano = data.getFullYear();
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const dia = String(data.getDate()).padStart(2, '0');

  return `${ano}-${mes}-${dia}`;
}

export function formatarDataParaExibicao(data) {
  if (!data) {
    return '';
  }

  const dia = String(data.getDate()).padStart(2, '0');
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const ano = data.getFullYear();

  return `${dia}/${mes}/${ano}`;
}

export function formatarData(data) {
  if (!data) {
    return '';
  }

  const dataObj = new Date(data);
  const dia = String(dataObj.getDate()).padStart(2, '0');
  const mes = String(dataObj.getMonth() + 1).padStart(2, '0');
  const ano = dataObj.getFullYear();

  return `${dia}/${mes}/${ano}`;
}

export function formatarHorario(data) {
  if (!data) {
    return '';
  }

  const dataObj = new Date(data);
  const horas = String(dataObj.getHours()).padStart(2, '0');
  const minutos = String(dataObj.getMinutes()).padStart(2, '0');

  return `${horas}:${minutos}`;
}