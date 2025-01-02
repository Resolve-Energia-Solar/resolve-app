import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { colors } from "../theme/colors";

export default function Header({ title }) {
  const navigation = useNavigation();
  const handleGoBack = () => {
    navigation.replace("Home");
  };
  return (
    <View style={Platform.OS === "ios" ? styles.header : styles.headerAndroid}>
      <StatusBar style="dark" backgroundColor={colors.yellowDark} />
      <View style={styles.profile}>
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity onPress={() => handleGoBack}>
          <Ionicons name="menu" size={30} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 50,
    backgroundColor: colors.yellowDark,
  },
  headerAndroid: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: colors.yellowDark,
  },
  profile: {
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    gap: 12,
    marginTop: 30,
  },
  backButton: {
    width: 35,
    height: 35,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
  },
});
