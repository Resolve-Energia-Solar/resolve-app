import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../theme/colors";

const InfoRow = ({ label, value, iconName }) => (
  <View style={styles.row}>
    <MaterialIcons name={iconName} size={24} color="#555" style={styles.icon} />
    <View style={styles.textContainer}>
      <Text style={styles.label}>{label}:</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  </View>
);

export default function UnitInfo({ unit }) {
  // Verifica se os dados da unidade estão disponíveis
  if (!unit || !unit.address || !unit.name) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Dados da Unidade</Text>
        <Text style={styles.noDataMessage}>Dados da unidade não disponíveis.</Text>
      </View>
    );
  }

  const { name, address } = unit;

  const fullAddress = `${address.street}, ${address.number}${
    address.complement ? `, ${address.complement}` : ""
  }, ${address.neighborhood} - ${address.city}, ${address.state} - CEP: ${
    address.zip_code
  }`;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dados da Unidade</Text>
      <View style={styles.infoCard}>
        <InfoRow label="Unidade" value={name || "N/A"} iconName="business" />
        <InfoRow
          label="Endereço"
          value={fullAddress}
          iconName="location-on"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F8F8F8",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
  },
  noDataMessage: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
    marginTop: 20,
  },
  infoCard: {
    backgroundColor: colors.white,
    padding: 16,
    borderRadius: 8,
    shadowColor: colors.black,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  icon: {
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  label: {
    fontWeight: "bold",
    color: "#555",
  },
  value: {
    color: "#333",
  },
});
