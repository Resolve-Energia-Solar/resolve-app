import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Avatar from "./avatar";
import { useGlobalContext } from "../contexts/GlobalContext";

export default function PersonalInfo() {
  const { contract } = useGlobalContext();
  const name = contract.results[0].customer.complete_name;
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Dados pessoais</Text>
      <View style={styles.profileImageContainer}>
        <Avatar name={name} source={null} />
        <View style={styles.cameraIcon}>
          <Ionicons name="camera" size={15} color="black" />
        </View>
      </View>

      <View style={styles.infoItem}>
        <Text style={styles.label}>Nome Completo</Text>
        <Text style={styles.value}>{name}</Text>
      </View>

      <View style={styles.infoItem}>
        <Text style={styles.label}>CPF</Text>
        <Text style={styles.value}>008.123.456-78</Text>
      </View>

      <View style={styles.infoItem}>
        <Text style={styles.label}>Telefone com DDD</Text>
        <Text style={styles.value}>(91) 99999-9999</Text>
      </View>

      <View style={styles.infoItem}>
        <Text style={styles.label}>E-mail</Text>
        <Text style={styles.value}>bruna.fernandes@gmail.com</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.logoutButton}>
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
    right: 0,
    bottom: 0,
    backgroundColor: "#FFD700",
    borderRadius: 15,
    padding: 5,
  },
  infoItem: {
    marginBottom: 16,
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
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  editButtonText: {
    color: "#333",
    fontSize: 14,
  },
  logoutButton: {
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  logoutButtonText: {
    color: "#333",
    fontSize: 14,
  },
});
