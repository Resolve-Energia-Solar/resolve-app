import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableWithoutFeedback,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Input from "../../components/input";
import Button from "../../components/button";
import Background from "../../components/background";
import { dismissKeyboard } from "../../utils/keyboardUtils";
import loginService from "../../services/authService";
import contractService from "../../services/contractService";
import { useGlobalContext } from "../../contexts/GlobalContext";
import { useNavigation } from "@react-navigation/native";
import Checkbox from "expo-checkbox";
import { colors } from "../../theme/colors";
import { MaterialIcons } from "@expo/vector-icons";

export default function LoginScreen() {
  const navigation = useNavigation();
  const { setUserInfo, setContractData } = useGlobalContext();

  const [cpf, setCpf] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [saveLogin, setSaveLogin] = useState(false);
  const [errorMessage, setErrorMessage] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadSavedData = async () => {
      try {
        const savedCpf = await AsyncStorage.getItem("savedCpf");
        const savedBirthDate = await AsyncStorage.getItem("savedBirthDate");
        const rememberLogin = await AsyncStorage.getItem("saveLogin");

        if (savedCpf && savedBirthDate && rememberLogin === "true") {
          setCpf(savedCpf);
          setBirthDate(savedBirthDate);
          setSaveLogin(true);
        }
      } catch (error) {
        console.log("Erro ao carregar dados do AsyncStorage:", error);
      }
    };

    loadSavedData();
  }, []);

  const saveLoginData = async () => {
    try {
      await AsyncStorage.multiSet([
        ["savedCpf", cpf],
        ["savedBirthDate", birthDate],
        ["saveLogin", "true"],
      ]);
      console.log("Dados salvos com sucesso.");
    } catch (error) {
      console.log("Erro ao salvar dados no AsyncStorage:", error);
    }
  };

  const removeLoginData = async () => {
    try {
      await AsyncStorage.multiRemove([
        "savedCpf",
        "savedBirthDate",
        "saveLogin",
      ]);
      console.log("Dados removidos com sucesso.");
    } catch (error) {
      console.log("Erro ao remover dados do AsyncStorage:", error);
    }
  };

  const handleAccess = async () => {
    dismissKeyboard();

    if (!cpf || !birthDate) {
      setErrorMessage(["Por favor, preencha todos os campos obrigatórios."]);
      setShowAlert(true);
      return;
    }

    setIsLoading(true);

    try {
      const { success, user, errors } = await loginService.login(
        cpf,
        birthDate,
        setUserInfo
      );

      if (success) {
        if (saveLogin) {
          await saveLoginData();
        } else {
          await removeLoginData();
        }

        console.log("Login bem-sucedido!", user);

        try {
          console.log("Buscando dados do contrato... userId:", user.id);
          const userIdClient = await AsyncStorage.getItem("userIdClient");
          console.log(
            "Buscando dados do contrato... userIdClient:",
            userIdClient
          );

          const contractData = await contractService.getContractData(
            user.id,
            userIdClient
          );
          console.log("Dados do contrato:", contractData);

          const preSaleContract = contractData?.results[0]?.signature_date ? false : true;


          if (preSaleContract) {
            console.log("Contrato de pré-venda encontrado:", preSaleContract);
            navigation.navigate("Pre-sale");
          } else {
            console.log(
              "Contrato de pré-venda não encontrado, redirecionando para a home."
            );
            navigation.navigate("Home");
          }

          setContractData(contractData);
        } catch (contractError) {
          const errorDetails =
            contractError.message || "Erro ao buscar dados do contrato.";

          setErrorMessage([`Erro ao obter dados do contrato: ${errorDetails}`]);
          setShowAlert(true);
          console.error("Erro ao buscar contrato:", errorDetails);
        }
      } else {
        setErrorMessage(errors);
        setShowAlert(true);
      }
    } catch (loginError) {
      setErrorMessage([`Erro ao realizar login: ${loginError.message}`]);
      setShowAlert(true);
      console.error("Erro ao tentar realizar login:", loginError.message);
    } finally {
      setIsLoading(false);
    }
  };

  const closeAlert = () => {
    setShowAlert(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <View style={styles.content}>
          <Background />
          <Image
            source={require("../../../assets/images/resolve-logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
          <View style={styles.card}>
            <Text style={styles.title}>Entrar</Text>
            <Input
              label="CPF"
              placeholder="000.000.000-00"
              placeholderTextColor="#adadad"
              required
              value={cpf}
              onChangeText={setCpf}
              keyboardType="numeric"
              maskType="cpf"
              color="#333"
            />

            <Input
              label="Data de Nascimento"
              placeholder="01/01/1980"
              placeholderTextColor="#adadad"
              color="#333"
              required
              value={birthDate}
              onChangeText={setBirthDate}
              maskType="date"
            />
            <View style={styles.checkboxContainer}>
              <Checkbox
                value={saveLogin}
                onValueChange={setSaveLogin}
                color={saveLogin ? colors.yellowDark : undefined}
              />
              <Text style={styles.checkboxLabel}>Lembrar dados do login</Text>
            </View>

            <Button
              title="Acessar"
              onPress={handleAccess}
              disabled={isLoading}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>

      {/* Modal de carregamento */}
      <Modal visible={isLoading} transparent>
        <View style={styles.loadingOverlay}>
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.yellowDark} />
            <Text style={styles.loadingText}>
              Espere um pouco... Já já estará tudo pronto para você! ;)
            </Text>
          </View>
        </View>
      </Modal>

      {/* Modal de alerta de erro */}
      {showAlert && (
        <Modal
          transparent={true}
          animationType="slide"
          visible={showAlert}
          onRequestClose={closeAlert}
        >
          <View style={styles.loadingOverlay}>
            <View style={styles.alertBox}>
              <MaterialIcons
                name="error-outline"
                size={48}
                color={colors.yellowDark}
              />

              {errorMessage.map((msg, index) => (
                <Text key={index} style={styles.alertText}>
                  {msg}
                </Text>
              ))}

              <TouchableOpacity style={styles.closeButton} onPress={closeAlert}>
                <Text style={styles.closeButtonText}>Voltar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.yellowDark,
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    zIndex: 1,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 24,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 24,
    width: "100%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    color: colors.black,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  checkboxLabel: {
    marginLeft: 8,
    fontSize: 16,
    color: "#333",
  },
  loadingOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  loadingContainer: {
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 10,
    width: "50%",
    height: "20%",
    alignItems: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  alertBox: {
    backgroundColor: colors.white,
    padding: 24,
    borderRadius: 16,
    width: "85%",
    alignItems: "center",
    justifyContent: "center",
  },
  alertText: {
    fontSize: 18,
    color: "#333",
    textAlign: "center",
    marginBottom: 16,
    fontWeight: "bold",
  },
  closeButton: {
    backgroundColor: colors.yellowDark,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 12,
    marginTop: 16,
  },
  closeButtonText: {
    color: colors.black,
    fontSize: 15,
    fontWeight: "bold",
  },
});
