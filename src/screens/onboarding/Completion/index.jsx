import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  Platform,
} from "react-native";
import Button from "../../../components/button";
import { useNavigation } from "@react-navigation/native";

export default function CompletionScreen() {
  const navigation = useNavigation();

  const handleGoHome = () => {
    navigation.navigate("Home");
  };

  return (
    <SafeAreaView
      style={Platform.OS === "ios" ? styles.container : styles.containerAndroid}
    >
      <View style={styles.content}>
        <Image
          source={require("../../../../assets/images/resolve-logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Image
          source={require("../../../../assets/images/solar-panels.png")}
          style={styles.panels}
          resizeMode="contain"
        />
        <Text style={styles.title}>
          Parabéns! Sua jornada{"\n"}Resolve começou!
        </Text>
        <Text style={styles.description}>
          Obrigado por assinar o contrato. Agora, você tem acesso completo ao
          app e pode acompanhar a instalação do seu sistema de energia solar.
        </Text>
        <Button
          title="Ir para a Home"
          onPress={handleGoHome}
          style={styles.button}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  containerAndroid: {
    flex: 1,
    backgroundColor: "#FFF",
    marginTop: 20,
  },
  content: {
    flex: 1,
    padding: 24,
    alignItems: "center",
    zIndex: 1,
  },
  logo: {
    width: 120,
    height: 40,
    marginBottom: 40,
  },
  panels: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
    color: "#000",
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    color: "#666",
    marginBottom: 32,
    lineHeight: 24,
  },
  button: {
    marginTop: "auto",
    width: "100%",
  },
});
