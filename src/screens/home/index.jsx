import { View, Text, ScrollView, StyleSheet } from "react-native";
import Header from "../../components/profileHeader";
import Banner from "../../components/banner";
import { useGlobalContext } from "../../contexts/GlobalContext";
import { ContractCard } from "../../components/contractCard";
import { BottomNav } from "../../components/bottomNav";
import { FloatingButtons } from "../../components/floatingButtons";
import { useNavigation } from "@react-navigation/native";
import PlanCard from "../../components/planCard";

export default function Home() {
  const { contract } = useGlobalContext();
  const name = contract.results[0].customer.complete_name;
  const contractNumber = contract.results[0].contract_number;
  const navigation = useNavigation();
  const handleNavigate = () => {
    navigation.navigate("ContractTracking");
  };
  return (
    <View style={styles.container}>
      <Header name={name} />
      <ScrollView style={styles.content}>
        <Banner />
        <Text style={styles.title}>Seus contratos</Text>
        <Text style={styles.subtitle}>Sistemas em implantação</Text>
        <ContractCard
          number={contractNumber}
          address=""
          handleNavigate={handleNavigate}
        />
        <PlanCard />
      </ScrollView>
      <BottomNav />
      <FloatingButtons />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  content: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 16,
  },
});
