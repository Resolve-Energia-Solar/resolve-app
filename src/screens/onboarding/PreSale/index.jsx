import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  Platform,
} from "react-native";
import Button from "../../../components/button";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { colors } from "../../../theme/colors";

export default function PreSaleOnboarding() {
  const navigation = useNavigation();

  const handleReadContract = () => {
    navigation.navigate("Contract");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" backgroundColor={colors.yellowDark} />
      <View
        style={Platform.OS === "ios" ? styles.content : styles.contentAndroid}
      >
        <Image
          source={require("../../../../assets/images/resolve-logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Image
          source={require("../../../../assets/images/banner-presale.png")}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.title}>Seja bem-vindo(a) ao{"\n"}app Resolve!</Text>
        <Text style={styles.description}>
          Para iniciar sua jornada, precisamos que você leia e assine o contrato
          do seu serviço de energia solar.
        </Text>
        <Button
          title="Ler Contrato"
          onPress={handleReadContract}
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
  content: {
    flex: 1,
    padding: 24,
    alignItems: "center",
  },
  contentAndroid: {
    flex: 1,
    padding: 24,
    alignItems: "center",
    marginTop: 20,
  },
  logo: {
    width: 120,
    height: 40,
    marginBottom: 40,
  },
  image: {
    width: "100%",
    height: 350,
    marginBottom: 24,
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
