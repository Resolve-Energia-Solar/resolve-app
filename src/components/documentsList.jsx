import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { DocumentItem } from "./documentItem";

export default function DocumentsList({ contract }) {
  const contractNumber = contract.results[0].contract_number;
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Seus documentos</Text>
      <DocumentItem title={`Contrato ${contractNumber}`} address="" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
