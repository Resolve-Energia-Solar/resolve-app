import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { DocumentItem } from "./documentItem";

export default function DocumentsList() {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Seus documentos</Text>
      <DocumentItem title="Contrato 02593" address="TV. 2ª de Queluz, 678" />
      <DocumentItem
        title="Contrato 02596"
        address="Rua Antonio Barreto, 1198"
      />
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
