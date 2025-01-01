import { View, Image, Text, StyleSheet } from "react-native";

export default function Avatar({ source, name = "", size = 48, }) {
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  if (source) {
    return (
      <Image
        source={source}
        style={[
          styles.avatar,
          { width: size, height: size, borderRadius: size / 2 },
        ]}
      />
    );
  }

  return (
    <View
      style={[
        styles.initialsContainer,
        { width: size, height: size, borderRadius: size / 2 },
      ]}
    >
      <Text style={styles.initials}>{getInitials(name)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    backgroundColor: "#E5E5E5",
  },
  initialsContainer: {
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  initials: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});
