import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../theme/colors";

export default function NotificationCard({ title, description, time }) {
  return (
    <View style={styles.card}>
      <View style={styles.iconContainer}>
        <Ionicons name="notifications" size={24} color="#FFD700" />
      </View>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          <TouchableOpacity>
            <Ionicons name="close" size={20} color="#666" />
          </TouchableOpacity>
        </View>
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.time}>{time}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    flex: 1,
    marginRight: 8,
    color: colors.black,
  },
  description: {
    color: "#666",
    marginTop: 4,
  },
  time: {
    color: "#999",
    fontSize: 12,
    marginTop: 8,
  },
});
