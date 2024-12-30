import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

export const ContractCard = ({ number, address, onPress }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/truck.png")}
        style={styles.icon}
      />
      <View style={styles.textContainer}>
        <Text style={styles.contractNumber}>Contrato {number}</Text>
        <Text style={styles.address}>{address}</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text>Acompanhar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  icon: {
    width: 48,
    height: 48,
  },
  textContainer: {
    marginLeft: 12,
    flex: 1,
  },
  contractNumber: {
    fontWeight: "bold",
    fontSize: 16,
  },
  address: {
    color: "#666",
  },
  button: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 8,
  },
});
