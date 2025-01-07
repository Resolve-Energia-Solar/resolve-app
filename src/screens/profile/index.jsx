import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Modal,
  Text,
  TouchableOpacity,
} from "react-native";
import PersonalInfo from "../../components/personalInfo";
import DocumentsList from "../../components/documentsList";
import { BottomNav } from "../../components/bottomNav";
import Header from "../../components/header";
import { useNavigation } from "@react-navigation/native";
import { useGlobalContext } from "../../contexts/GlobalContext";
import { colors } from "../../theme/colors";
import { logout } from "../../services/authService";

export default function ProfileScreen() {
  const { contract, resetUser } = useGlobalContext();
  const navigation = useNavigation();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleLogout = async () => {
    try {
      await logout;
      resetUser();
      console.log("Logout realizado com sucesso.");
      navigation.navigate("Login");
    } catch (error) {
      console.log("Erro ao realizar logout:", error.message);
    }
  };

  const confirmLogout = () => {
    setShowLogoutModal(true);
  };

  const cancelLogout = () => {
    setShowLogoutModal(false);
  };

  const confirmAndLogout = () => {
    setShowLogoutModal(false);
    handleLogout();
  };

  return (
    <View style={styles.container}>
      <Header title="Perfil" handleGoBack={handleGoBack} />
      <ScrollView style={styles.content}>
        <PersonalInfo contract={contract} logout={confirmLogout} />
        <DocumentsList contract={contract} />
      </ScrollView>
      <BottomNav />
      <Modal
        transparent
        visible={showLogoutModal}
        onRequestClose={cancelLogout}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Deseja sair?</Text>
            <Text style={styles.modalMessage}>
              Você realmente deseja fazer logout? Esta ação não pode ser
              desfeita.
            </Text>
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={cancelLogout}
              >
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.confirmButton]}
                onPress={confirmAndLogout}
              >
                <Text style={styles.buttonText}>Sair</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    flex: 1,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: "80%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: colors.black,
  },
  modalMessage: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    color: colors.black,
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 5,
  },
  cancelButton: {
    backgroundColor: "#ccc",
  },
  confirmButton: {
    backgroundColor: "#ff5555",
  },
  buttonText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
  },
});
