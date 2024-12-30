import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Background from "../../components/background";

export default function SplashScreen() {
  const navigation = useNavigation();
  const logoScale = useRef(new Animated.Value(0.5)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(logoScale, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      navigation.replace("Login");
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Background />

      <Animated.Image
        source={require("../../../assets/images/resolve-logo.png")}
        style={[
          styles.logo,
          {
            transform: [{ scale: logoScale }],
            opacity: logoOpacity,
          },
        ]}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFB800",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 160,
    height: 160,
  },
});
