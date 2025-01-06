import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { DocumentItem } from "./documentItem";
import { colors } from "../theme/colors";

export default function DocumentsList({ contract }) {
  const contractNumber =
    contract?.results?.[0]?.contract_number ||
    contract?.customerDetails?.sales?.[0]?.contract_number ||
    "Número do contrato não disponível";
  return (
    <View style={styles.container}>
      <Text color="#333" style={styles.sectionTitle}>
        Seus documentos
      </Text>
      <DocumentItem
        style={styles.documentItem}
        title={`Contrato ${contractNumber}`}
        address=""
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  documentItem: {
    color: colors.black,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
});
