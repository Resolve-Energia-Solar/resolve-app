import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../theme/colors";

export default function StatusBarComponent() {
  return <View style={styles.container} />;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.yellowDark,
    justifyContent: "center",
    alignItems: "center",
    with: "100%",
    height: 50,
    padding: 16,
  },
});
