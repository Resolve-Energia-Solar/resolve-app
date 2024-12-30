import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import ProfileHeader from "../../components/profileHeader";
import PersonalInfo from "../../components/personalInfo";
import DocumentsList from "../../components/documentsList";
import { BottomNav } from "../../components/bottomNav";

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <ProfileHeader />
      <ScrollView style={styles.content}>
        <PersonalInfo />
        <DocumentsList />
      </ScrollView>
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
