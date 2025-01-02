import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "../theme/colors";

export default function UnitInfo() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dados da Unidade</Text>
      <View style={styles.infoCard}>
        <InfoRow label="Unidade" value="São Paulo - SP" />
        <InfoRow label="Endereço" value="Av. Paulista, 1000" />
        <InfoRow label="Telefone" value="(11) 3333-4444" />
        <InfoRow label="CNPJ" value="12.345.678/0001-90" />
      </View>
    </View>
  );
}

function InfoRow({ label, value }) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}:</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    color: colors.black,
  },
  infoCard: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  row: {
    flexDirection: "row",
    marginBottom: 8,
  },
  label: {
    fontWeight: "600",
    width: 80,
    color: colors.black,
  },
  value: {
    flex: 1,
    color: "#666",
  },
});
