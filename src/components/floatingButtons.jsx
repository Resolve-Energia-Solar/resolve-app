import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Alert,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { colors } from "../theme/colors";

export const FloatingButtons = () => {
  const openWhatsApp = async () => {
    const phoneNumber = '559140048688'
    const whatsappAppUrl = `whatsapp://send?phone=${phoneNumber}`
    const whatsappWebUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}`

    try {
      const appSupported = await Linking.canOpenURL(whatsappAppUrl)
      if (appSupported) {
        await Linking.openURL(whatsappAppUrl)
      } else {
        await Linking.openURL(whatsappWebUrl)
      }
    } catch (error) {
      console.error('Erro:', error)
      Alert.alert(
        'Erro',
        'Falha ao abrir o WhatsApp. Por favor, tente novamente mais tarde.',
      )
    }
  }
  const openPhone = () => {
    const phoneNumber = "tel:40048688";
    Linking.openURL(phoneNumber).catch((err) => console.error("Error:", err));
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={openWhatsApp} style={styles.button}>
        <Feather name="message-circle" size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity onPress={openPhone} style={styles.button}>
        <Feather name="phone" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    flexDirection: "row",
    bottom: 90,
    right: 24,
    gap: 8,
  },
  button: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.black,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },
});
