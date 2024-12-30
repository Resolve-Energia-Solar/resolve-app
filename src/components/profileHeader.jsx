import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Avatar from "./avatar";

export default function ProfileHeader({ name }) {
  const displayName = name.split(" ").slice(0, 2).join(" ");

  return (
    <View style={styles.header}>
      <View style={styles.profile}>
        <Avatar name={name} source={null} />
        <View>
          <Text style={styles.greeting}>Olá,</Text>
          <Text style={styles.name}>{displayName}</Text>
        </View>
        <TouchableOpacity>
          <Ionicons name="menu" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 40,
    backgroundColor: "#FFB800",
    alignContent: "center",
    alignItems: "center",
  },
  profile: {
    width: "100%",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
  },
  greeting: {
    fontSize: 14,
    color: "#000",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  menu: {
    width: 24,
    height: 24,
  },
});
