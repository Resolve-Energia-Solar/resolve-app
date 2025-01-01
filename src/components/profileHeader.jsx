import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Avatar from "./avatar";
import { useNavigation } from "@react-navigation/native";

export default function ProfileHeader({ name, onPress }) {
  const displayName = name.split(" ").slice(0, 2).join(" ");
  const navigation = useNavigation();

  const handleProfile = () => {
    navigation.navigate("Profile");
  };
  return (
    <View style={styles.header}>
      <View style={styles.profile}>
        <View style={styles.avatar}>
          <TouchableOpacity onPress={handleProfile}>
            <Avatar name={name} source={null} />
          </TouchableOpacity>
          <View>
            <Text style={styles.greeting}>Olá,</Text>
            <Text style={styles.name}>{displayName}</Text>
          </View>
        </View>

       {/*  <TouchableOpacity>
          <Ionicons name="menu" size={24} color="black" />
        </TouchableOpacity> */}
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
  avatar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
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
