import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { DocumentItem } from "./documentItem";
import { colors } from "../theme/colors";

export default function DocumentsList({ contract }) {
  const contractNumber =
    contract?.results?.[0]?.contract_number ||
    contract?.customerDetails?.sales?.[0]?.contract_number ||
    "Número do contrato não disponível";

  const products = contract?.products || ["Sem produtos disponiveis"];
  const documents = contract?.documents || [
    {
      title: "Manual do Cliente Resolve",
      description: "Guia completo para o cliente sobre o sistema da Resolve.",
      link: "https://res.cloudinary.com/dyykoh8t4/image/upload/v1728137564/Resolve/Manual_do_Cliente_Resolve_3_zc7tbm.pdf",
    },
    {
      title: "Regulamento da Campanha de Indicação",
      description: "Detalhes sobre a campanha de indicação de dezembro.",
      link: "https://res.cloudinary.com/dyykoh8t4/image/upload/v1734469147/Resolve/Regulamento_da_Campanha_de_Indica%C3%A7%C3%A3o_de_Dezembro_Resolve_Energia_Solar_ewgwdc.pdf",
    },
  ];

  return (
    <View style={styles.container}>
      <Text color="#333" style={styles.sectionTitle}>
        Seus documentos
      </Text>
      <DocumentItem
        style={styles.documentItem}
        title={`Contrato ${contractNumber}`}
        products={products}
        documents={documents}
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
