import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import Header from "../../components/header";
import UnitInfo from "../../components/unitInfo";
import SellerInfo from "../../components/sellerInfo";
import { FloatingButtons } from "../../components/floatingButtons";
import { BottomNav } from "../../components/bottomNav";

export default function SupportScreen() {
  return (
    <View style={styles.container}>
      <Header title="Suporte" />
      <ScrollView style={styles.content}>
        <UnitInfo />
        <SellerInfo />
      </ScrollView>
      <FloatingButtons />
      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    flex: 1,
  },
});
