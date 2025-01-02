import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { colors } from "../theme/colors";

export const ContractCard = ({ number, address }) => (
  <View style={styles.container}>
    <Image
      source={require("../../assets/images/truck.png")}
      style={styles.icon}
    />
    <View style={styles.info}>
      <Text style={styles.number}>{number}</Text>
      <Text style={styles.address}>{address}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 4,
  },
  info: {
    marginLeft: 12,
    flex: 1,
  },
  number: {
    fontWeight: "600",
    fontSize: 16,
    color: colors.black,
  },
  address: {
    color: "#6B7280",
    marginTop: 4,
    color: colors.black,
  },
});
