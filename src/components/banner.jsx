import { View, Image, StyleSheet } from "react-native";

export default function Banner() {
  return (
    <View style={styles.banner}>
      <Image
        source={require("../../assets/images/banner.png")}
        style={styles.icon}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    marginVertical: 16,
    borderRadius: 12,
    width: "100%",
    justifyContent: "flex-end",
  },
  icon: {
    width: "100%",
    height: 144,
    alignSelf: "center",
    borderRadius: 10,
  },
  title: {
    color: "#FFF",
    fontSize: 18,
  },
  highlight: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
