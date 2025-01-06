import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { colors } from "../theme/colors";

export default function SellerInfo({ seller }) {
  const { complete_name, email, phone_numbers, profile_picture } = seller || {};

  if (!seller) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Seu Vendedor</Text>
        <Text style={styles.noDataMessage}>Dados do vendedor não disponíveis.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Seu Vendedor</Text>
      <View style={styles.card}>
        <View style={styles.profileSection}>
          <Image
            style={styles.avatar}
            source={{
              uri: profile_picture || "https://i.pravatar.cc/100",
            }}
          />
          <View style={styles.nameSection}>
            <Text style={styles.name}>
              {complete_name || "Nome não disponível"}
            </Text>
            <Text style={styles.role}>Consultor de Vendas</Text>
          </View>
        </View>
        {/* Exemplo de como adicionar outras informações */}
        {email && <InfoItem label="Email" value={email} />}
        {phone_numbers && phone_numbers.length > 0 && (
          <InfoItem label="Telefone" value={phone_numbers[0]} />
        )}
      </View>
    </View>
  );
}

function InfoItem({ label, value }) {
  return (
    <View style={styles.infoItem}>
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
  noDataMessage: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
    marginTop: 20,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  nameSection: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.black,
  },
  role: {
    color: "#666",
    marginTop: 4,
  },
  contactSection: {
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 16,
  },
  infoItem: {
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
