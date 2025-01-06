import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { WebView } from "react-native-webview";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../../theme/colors";

export default function PaymentScreen({ navigation }) {
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleNavigationChange = (navState) => {
    if (navState.url.includes("success")) {
      setPaymentCompleted(true);
      Alert.alert("Pagamento Concluído", "Obrigado pelo pagamento!");
    }
  };

  const handleLoadStart = () => {
    setLoading(true);
  };

  const handleLoadEnd = () => {
    setLoading(false);
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.yellowDark} />
          <Text style={styles.loadingText}>Carregando...</Text>
        </View>
      )}
      <WebView
        source={{
          uri: "https://pay.validapix.tech/f690ac02-1a94-4d84-b98b-f2362bf930bb",
        }}
        style={{ flex: 1 }}
        onNavigationStateChange={handleNavigationChange}
        onLoadStart={handleLoadStart}
        onLoadEnd={handleLoadEnd}
      />

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => handleGoBack()}
      >
        <MaterialIcons name="arrow-back" size={15} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  loadingContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.8)", // Fundo semi-transparente
    zIndex: 10, // Para exibir acima do WebView
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#000",
  },
  backButton: {
    position: "absolute",
    marginTop: 50,
    left: 20,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#000",
    padding: 10,
    borderRadius: 50,
  },
  backButtonText: {
    color: "#fff",
    marginLeft: 8,
  },
});
