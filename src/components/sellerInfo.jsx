import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { colors } from "../theme/colors";

export default function SellerInfo() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Seu Vendedor</Text>
      <View style={styles.card}>
        <View style={styles.profileSection}>
          <Image
            style={styles.avatar}
            source={{ uri: "https://i.pravatar.cc/100" }}
          />
          <View style={styles.nameSection}>
            <Text style={styles.name}>João Silva</Text>
            <Text style={styles.role}>Consultor de Vendas</Text>
          </View>
        </View>
        <View style={styles.contactSection}>
          <InfoItem label="Email" value="joao.silva@empresa.com" />
          <InfoItem label="Telefone" value="(11) 99999-8888" />
        </View>
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
    color: colors.black,
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
