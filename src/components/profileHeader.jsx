import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Avatar from "./avatar";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../theme/colors";
import { StatusBar } from "expo-status-bar";

export default function ProfileHeader({ name }) {
  const displayName = name.split(" ").slice(0, 2).join(" ");
  const navigation = useNavigation();

  const handleProfile = () => {
    navigation.navigate("Profile");
  };
  return (
    <View style={Platform.OS === "ios" ? styles.header : styles.headerAndroid}>
      <StatusBar style="dark" backgroundColor={colors.yellowDark} />
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
    paddingVertical: 30,
    backgroundColor: colors.yellowDark,
    alignContent: "center",
    alignItems: "center",
  },
  headerAndroid: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: colors.yellowDark,
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
    color: colors.black,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.black,
  },
  menu: {
    width: 24,
    height: 24,
  },
});
