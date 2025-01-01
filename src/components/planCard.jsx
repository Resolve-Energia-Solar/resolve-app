import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function PlanCard() {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalText, setModalText] = useState("");

  const handleInfoPress = (infoText) => {
    setModalText(infoText);
    setModalVisible(true);
  };

  const navigation = useNavigation();
  const handleNavigate = () => {
    navigation.navigate("Payments");
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/solar-cleaning.png")}
        style={styles.image}
      />

      <View style={styles.content}>
        <Text style={styles.title}>
          Plano Anual de Assistência e Monitoramento
        </Text>

        <Text style={styles.price}>
          12x <Text style={styles.bold}>R$148,13</Text>
        </Text>
        <Text style={styles.subPrice}>ou R$1560 à vista</Text>

        <Text style={styles.sectionTitle}>
          Acesso por 12 meses aos seguintes serviços:
        </Text>
        <ScrollView style={styles.features}>
          {[
            "Acesso Premium ao Painel de Monitoramento no App",
            "Relatórios Mensais de geração e diagnóstico de consumo",
            "Suporte Técnico Ilimitado (Telefone e WhatsApp)",
            "Suporte e assistência com a concessionária de energia",
            "Atualização de Titularidade e Rateio: Até duas trocas inclusas.",
            "Configuração de Sistema: Configuração inicial e até 2 ajustes",
            "Um serviço de limpeza das placas solares",
          ].map((item, index) => (
            <View key={index} style={styles.featureItem}>
              <MaterialIcons name="check-circle" size={20} color="#FFD700" />
              <Text style={styles.featureText}>{item}</Text>
              <TouchableOpacity onPress={() => handleInfoPress(item)}>
                <MaterialIcons
                  name="info-outline"
                  size={20}
                  color="#BDBDBD"
                  style={styles.infoIcon}
                />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        <TouchableOpacity onPress={handleNavigate} style={styles.buyButton}>
          <Text style={styles.buyButtonText}>Comprar</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Mais informações</Text>
            <Text style={styles.modalText}>{modalText}</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>Entendi</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
    marginTop: 50,
    marginBottom: 50,
  },
  image: {
    width: "100%",
    height: 220,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    resizeMode: "cover",
  },
  content: {
    backgroundColor: "#FFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    marginTop: -20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
    color: "#333",
  },
  price: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 4,
    color: "#000",
  },
  bold: {
    fontWeight: "bold",
  },
  subPrice: {
    fontSize: 16,
    textAlign: "center",
    color: "#666",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  features: {
    marginBottom: 16,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  featureText: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    color: "#333",
  },
  infoIcon: {
    marginLeft: 8,
  },
  buyButton: {
    backgroundColor: "#FFD700",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 16,
  },
  buyButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: 300,
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  modalText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 20,
    textAlign: "center",
  },
  modalButton: {
    backgroundColor: "#FFD700",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
});
