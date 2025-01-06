import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Header from "../../components/header";

export default function ProductScreen({ navigation }) {
  const [product] = React.useState({
    name: "Plano Anual de Assistência e Monitoramento Resolve",
    price: "R$ 1.560,00",
    image: require("../../../assets/images/Group.png"),
    features: [
      "Acesso Premium ao Painel de Monitoramento no App",
      "Relatórios Mensais de geração e diagnóstico de consumo",
      "Suporte Técnico Ilimitado (Telefone e WhatsApp)",
      "Suporte e assistência com a concessionária de energia",
      "Atualização de Titularidade e Rateio: Até duas trocas inclusas.",
      "Configuração de Sistema: Configuração inicial e até 2 ajustes",
      "Um serviço de limpeza das placas solares",
    ],
  });

  const handlePurchase = () => {
    navigation.navigate("Payment");
  };

  return (
    <View style={styles.containerOutline}>
      <Header title="Detalhes do Produto" />
      <View style={styles.container}>
        <View style={styles.header}>
          <Image source={product.image} style={styles.productImage} />
          <Text style={styles.title}>{product.name}</Text>
          <Text style={styles.amount}>{product.price}</Text>
        </View>

        <Text style={styles.sectionTitle}>
          Acesso por 12 meses aos seguintes serviços:
        </Text>
        <ScrollView style={styles.features}>
          {product.features.map((feature, index) => (
            <Text key={index} style={styles.featureItem}>
              - {feature}
            </Text>
          ))}
        </ScrollView>

        <View style={styles.cardContainer}>
          <TouchableOpacity
            style={styles.buyButton}
            onPress={handlePurchase}
            accessible={true}
            accessibilityLabel="Compre agora"
          >
            <MaterialIcons
              name="shopping-cart"
              size={20}
              color="#fff"
              style={styles.icon}
            />
            <Text style={styles.buyButtonText}>Compre Agora</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerOutline: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  header: {
    backgroundColor: "#f1f1f1",
    alignItems: "center",
    marginBottom: 24,
    padding: 16,
    borderRadius: 8,
  },
  productImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginBottom: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
    marginTop: 16,
  },
  amount: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginVertical: 5,
  },
  features: {
    marginVertical: 10,
  },
  featureItem: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  cardContainer: {
    alignItems: "center",
    marginVertical: 10,
  },
  buyButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#000",
    paddingVertical: 16,
    borderRadius: 8,
    paddingHorizontal: 24,
  },
  icon: {
    marginRight: 8,
  },
  buyButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
