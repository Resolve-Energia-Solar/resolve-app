import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import Avatar from "./avatar";
import { FormatCPF } from "../utils/FormatedCPF";
import { colors } from "../theme/colors";

export default function PersonalInfo({ contract, logout }) {
  const [profileImage, setProfileImage] = useState(null);

  const firstDocument =
    contract?.results[0]?.customer?.first_document ||
    contract.customerDetails.first_document;
  const formattedCPF = FormatCPF(firstDocument);
  const name =
    contract?.results[0]?.customer?.complete_name ||
    contract.customerDetails.name;
  const email =
    contract?.results[0]?.customer?.email || contract.customerDetails.email;
  const phone =
    contract?.results[0]?.customer?.customer_contact_numbers?.[0]
      ?.phone_number ||
    contract?.customerDetails?.customer_contact_numbers?.[0]?.phone_number ||
    "Telefone não disponível";
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Dados pessoais</Text>
      <View style={styles.profileImageContainer}>
        {profileImage ? (
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
        ) : (
          <Avatar name={name} source={null} />
        )}
        <TouchableOpacity onPress={pickImage}>
          <View style={styles.cameraIcon}>
            <Ionicons name="camera" size={15} color="black" />
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.infoItem}>
        <Text style={styles.label}>Nome Completo</Text>
        <Text style={styles.value}>{name}</Text>
      </View>

      <View style={styles.infoItem}>
        <Text style={styles.label}>CPF</Text>
        <Text style={styles.value}>{formattedCPF}</Text>
      </View>

      <View style={styles.infoItem}>
        <Text style={styles.label}>Telefone com DDD</Text>
        <Text style={styles.value}>
          {!phone ? "Telefone não cadastrado" : phone}
        </Text>
      </View>

      <View style={styles.infoItem}>
        <Text style={styles.label}>E-mail</Text>
        <Text style={styles.value}>{email}</Text>
      </View>

      <View style={styles.buttonContainer}>
        {/* <TouchableOpacity style={styles.editButton}>
          <Ionicons name="pencil" size={17} color={colors.black} />
          <Text style={styles.editButtonText}>Editar</Text>
        </TouchableOpacity> */}
        <TouchableOpacity onPress={logout} style={styles.logoutButton}>
          <Ionicons name="log-out" size={17} color={colors.black} />
          <Text style={styles.logoutButtonText}>Sair do Aplicativo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "white",
    borderRadius: 8,
    margin: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: colors.black,
  },
  profileImageContainer: {
    marginBottom: 20,
    position: "relative",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  cameraIcon: {
    position: "absolute",
    left: 38,
    bottom: 0,
    backgroundColor: "#FFD700",
    borderRadius: 15,
    padding: 5,
  },
  infoItem: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    color: "#333",
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 20,
    gap: 10,
  },
  editButton: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  editButtonText: {
    color: "#333",
    fontSize: 14,
  },
  logoutButton: {
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  logoutButtonText: {
    color: "#333",
    fontSize: 14,
  },
});
