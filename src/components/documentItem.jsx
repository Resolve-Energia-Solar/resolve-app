import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Linking,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../theme/colors";

export const DocumentItem = ({
  title,
  address,
  products = [],
  documents = [],
}) => {
  const [expandProducts, setExpandProducts] = useState(false);
  const [expandDocuments, setExpandDocuments] = useState(false);

  return (
    <View style={styles.documentContainer}>
      <View style={styles.documentHeader}>
        <View style={styles.iconContainer}>
          <Ionicons name="document-text" size={24} color="#666" />
        </View>
        <View style={styles.documentInfo}>
          <Text style={styles.documentTitle}>{title}</Text>
          {address && <Text style={styles.documentAddress}>{address}</Text>}
        </View>
      </View>

      {/* Meus Produtos Resolve */}
      <TouchableOpacity
        style={styles.documentButton}
        onPress={() => setExpandProducts(!expandProducts)}
      >
        <View style={styles.buttonContent}>
          <Ionicons name="book-outline" size={20} color="#333" />
          <Text style={styles.buttonText}>Meus Produtos Resolve</Text>
          <Ionicons
            name={expandProducts ? "chevron-up" : "chevron-down"}
            size={20}
            color="#333"
          />
        </View>
      </TouchableOpacity>
      {expandProducts && (
        <View style={styles.expansionContent}>
          {products.length > 0 ? (
            products.map((product, index) => (
              <Text key={index} style={styles.expansionItem}>
                {product}
              </Text>
            ))
          ) : (
            <Text style={styles.expansionItem}>Sem produtos disponíveis</Text>
          )}
        </View>
      )}

      {/* Documentos do Contrato */}
      <TouchableOpacity
        style={styles.documentButton}
        onPress={() => setExpandDocuments(!expandDocuments)}
      >
        <View style={styles.buttonContent}>
          <Ionicons name="document-outline" size={20} color="#333" />
          <Text style={styles.buttonText}>Documentos do Contrato</Text>
          <Ionicons
            name={expandDocuments ? "chevron-up" : "chevron-down"}
            size={20}
            color="#333"
          />
        </View>
      </TouchableOpacity>
      {expandDocuments && (
        <View style={styles.expansionContent}>
          {documents.length > 0 ? (
            documents.map((doc, index) => (
              <View key={index} style={styles.documentCard}>
                <Text style={styles.documentTitle}>
                  {doc.title || `Documento ${index + 1}`}
                </Text>
                {doc.description && (
                  <Text style={styles.documentDescription}>
                    {doc.description}
                  </Text>
                )}
                <TouchableOpacity
                  onPress={() => Linking.openURL(doc.link)}
                  style={styles.linkButton}
                >
                  <Text style={styles.linkText}>Abrir Documento</Text>
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <Text style={styles.expansionItem}>Sem documentos disponíveis</Text>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  documentContainer: {
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  documentHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  iconContainer: {
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
    padding: 8,
    marginRight: 12,
  },
  documentInfo: {
    flex: 1,
  },
  documentTitle: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 4,
  },
  documentAddress: {
    fontSize: 14,
    color: "#666",
  },
  documentButton: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonText: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    color: "#333",
  },
  expansionContent: {
    paddingLeft: 16,
    paddingTop: 8,
  },
  expansionItem: {
    fontSize: 14,
    color: "#333",
    marginBottom: 4,
  },
  linkButton: {
    padding: 8,
    borderRadius: 4,
    marginBottom: 8,
  },
  linkText: {
    fontSize: 14,
    color: "#333",
    textDecorationLine: "underline",
  },
  documentCard: {
    backgroundColor: "#f9f9f9",
    padding: 12,
    borderRadius: 6,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  documentDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
});
