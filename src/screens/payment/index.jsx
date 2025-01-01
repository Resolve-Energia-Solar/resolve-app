import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  Alert,
} from "react-native";
import { WebView } from "react-native-webview";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import Header from "../../components/header";

export default function PaymentScreen() {
  const [showWebView, setShowWebView] = useState(false);
  const [paymentCompleted, setPaymentCompleted] = useState(false);

  const handleNavigationChange = (navState) => {
    if (navState.url.includes("success")) {
      setPaymentCompleted(true);
      setShowWebView(false);
      Alert.alert("Pagamento Concluído", "Obrigado pelo pagamento!");
    }
  };

  if (showWebView) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <WebView
          source={{
            uri: "https://buy.stripe.com/test_fZe01Va1T13A1UIdQQ",
          }}
          style={{ flex: 1, marginTop: 50 }}
          onNavigationStateChange={handleNavigationChange}
        />
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => setShowWebView(false)}
        >
          <MaterialIcons name="arrow-back" size={20} color="#fff" />
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.containerOutline}>
      <Header title="Checkout" />
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            source={require("../../../assets/images/Group.png")}
           
          />
          <Text style={styles.title}>
            Plano Anual de Assistência e Monitoramento Resolve
          </Text>
          <Text style={styles.amount}>R$1500,00</Text>
        </View>

        <View style={styles.cardContainer}>
          <Text style={styles.cardTitle}>Pagamento com Cartão</Text>
          {!paymentCompleted ? (
            <TouchableOpacity
              style={styles.payButton}
              onPress={() => setShowWebView(true)}
            >
              <FontAwesome
                name="arrow-right"
                size={20}
                color="#fff"
                style={{ marginRight: 8 }}
              />
              <Text style={styles.payButtonText}>Pagar com Cartão</Text>
            </TouchableOpacity>
          ) : (
            <Text style={styles.successText}>Pagamento realizado com sucesso!</Text>
          )}
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
  cardContainer: {
    alignItems: "center",
    marginVertical: 32,
  },
  cardTitle: {
    fontSize: 16,
    marginBottom: 16,
    color: "#333",
  },
  payButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#000",
    paddingVertical: 16,
    borderRadius: 8,
    paddingHorizontal: 24,
  },
  payButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  successText: {
    fontSize: 16,
    fontWeight: "600",
    color: "green",
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#000",
    padding: 10,
    borderRadius: 50,
  },
});
