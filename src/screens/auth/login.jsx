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

export default function LoginScreen() {
  const navigation = useNavigation();
  const { setUserInfo, setContractData } = useGlobalContext();

  const [cpf, setCpf] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [saveLogin, setSaveLogin] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
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

  const saveData = async () => {
    if (saveLogin) {
      try {
        await AsyncStorage.setItem("savedCpf", cpf);
        await AsyncStorage.setItem("savedBirthDate", birthDate);
        await AsyncStorage.setItem("saveLogin", "true");
        console.log("Dados salvos com sucesso.");
      } catch (error) {
        console.log("Erro ao salvar dados no AsyncStorage:", error);
      }
    } else {
      try {
        await AsyncStorage.removeItem("savedCpf");
        await AsyncStorage.removeItem("savedBirthDate");
        await AsyncStorage.removeItem("saveLogin");
        console.log("Dados removidos com sucesso.");
      } catch (error) {
        console.log("Erro ao remover dados do AsyncStorage:", error);
      }
    }
  };

  const handleAccess = async () => {
    dismissKeyboard();

    if (!cpf || !birthDate) {
      setErrorMessage("Por favor, preencha todos os campos obrigatórios.");
      setShowAlert(true);
      return;
    }

    setIsLoading(true);

    try {
      const { success, user, error } = await loginService.login(
        cpf,
        birthDate,
        setUserInfo
      );

      setIsLoading(false);

      if (success) {
        if (saveLogin) {
          await saveData();
        }

        console.log("Login bem-sucedido!", user);

        try {
          console.log("Buscando dados do contrato...", user.id);
          const contractData = await contractService.getContractData(user.id);
          console.log("Dados do contrato:", contractData);

          const preSaleContract = contractData.results.find(
            (contract) =>
              (contract.is_pre_sale = true && contract.signature_date === null)
          );

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
          setErrorMessage("Erro ao obter dados do contrato.");
          setShowAlert(true);
          console.log("Erro ao buscar contrato:", contractError);
        }
      } else {
        setErrorMessage(error || "Erro desconhecido.");
        setShowAlert(true);
      }
    } catch (loginError) {
      setIsLoading(false);
      setErrorMessage("Erro ao realizar login. Tente novamente.");
      setShowAlert(true);
      console.log("Erro ao tentar realizar login:", loginError);
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
              required
              value={cpf}
              onChangeText={setCpf}
              keyboardType="numeric"
              maskType="cpf"
            />

            <Input
              label="Data de Nascimento"
              placeholder="01/01/1980"
              required
              value={birthDate}
              onChangeText={setBirthDate}
              maskType="date"
            />
            <View style={styles.checkboxContainer}>
              <Checkbox
                value={saveLogin}
                onValueChange={setSaveLogin}
                color={saveLogin ? "#FFB800" : undefined}
              />
              <Text style={styles.checkboxLabel}>Lembrar dados do login</Text>
            </View>

            <Button
              title={
                isLoading ? (
                  <ActivityIndicator
                    size="small"
                    color="#333"
                    style={styles.loading}
                  />
                ) : (
                  "Acessar"
                )
              }
              onPress={handleAccess}
              disabled={isLoading}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>

      {showAlert && (
        <Modal
          transparent={true}
          animationType="slide"
          visible={showAlert}
          onRequestClose={closeAlert}
        >
          <View style={styles.overlay}>
            <View style={styles.alertBox}>
              <Text style={styles.alertText}>{errorMessage}</Text>
              <TouchableOpacity style={styles.closeButton} onPress={closeAlert}>
                <Text style={styles.closeButtonText}>Fechar</Text>
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
    backgroundColor: "#FFB800",
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
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 24,
    width: "100%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    color: "#000",
  },
  required: {
    color: "#FF0000",
    fontSize: 12,
    marginBottom: 16,
  },
  loading: {
    marginTop: 10,
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
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  alertBox: {
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: 16,
    width: "85%",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    maxWidth: 400,
    marginHorizontal: 20,
  },

  alertText: {
    fontSize: 18,
    color: "#333",
    textAlign: "center",
    marginBottom: 16,
    fontWeight: "600",
  },

  closeButton: {
    backgroundColor: "#FFB800",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 12,
    marginTop: 16,
    alignItems: "center",
  },

  closeButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
