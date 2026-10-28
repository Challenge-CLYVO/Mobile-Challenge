import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';

export default function SelecaoListaModal({
  visivel,
  titulo,
  dados,
  chaveItem,
  renderizarItem,
  mensagemVazia,
  aoFechar,
  estilos,
}) {
  return (
    <Modal
      visible={visivel}
      transparent
      animationType="slide"
      onRequestClose={aoFechar}
    >
      <View style={estilos.modalOverlay}>
        <View style={estilos.modalContainer}>
          <Text style={estilos.modalTitle}>
            {titulo}
          </Text>

          <FlatList
            data={dados}
            keyExtractor={chaveItem}
            renderItem={renderizarItem}
            ListEmptyComponent={
              <Text style={estilos.emptyText}>
                {mensagemVazia}
              </Text>
            }
          />

          <TouchableOpacity
            style={estilos.cancelButton}
            onPress={aoFechar}
          >
            <Text style={estilos.cancelText}>
              Cancelar
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}