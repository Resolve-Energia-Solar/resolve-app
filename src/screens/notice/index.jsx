import React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { notifications } from "../../data/notification";
import Header from "../../components/header";
import { FloatingButtons } from "../../components/floatingButtons";
import { BottomNav } from "../../components/bottomNav";
import NotificationCard from "../../components/notificationsCard";

export default function NotificationsScreen() {
  return (
    <View style={styles.container}>
      <Header title="Notificações" />
      <View style={styles.notificationHeader}>
        <Text style={styles.notificationTitle}>Painel de Avisos</Text>
        <Ionicons name="notifications-outline" size={24} color="black" />
      </View>

      <View style={styles.notificationsList}>
        {notifications.map((notification) => (
          <NotificationCard
            key={notification.id}
            title={notification.title}
            description={notification.description}
            time={notification.time}
          />
        ))}
      </View>

      <FloatingButtons />
      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  notificationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  notificationTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  notificationsList: {
    flex: 1,
    padding: 16,
  },
});
