import { View, Text, ScrollView, StyleSheet } from "react-native";
import Header from "../../components/profileHeader";
import Banner from "../../components/banner";
import { useGlobalContext } from "../../contexts/GlobalContext";
import { ContractCard } from "../../components/contractCard";
import { BottomNav } from "../../components/bottomNav";
import { FloatingButtons } from "../../components/floatingButtons";
import { useNavigation } from "@react-navigation/native";
import PlanCard from "../../components/planCard";
import { colors } from "../../theme/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Home() {
  const { contract } = useGlobalContext();
  const navigation = useNavigation();

  console.log("contract home", contract);
  const name =
    contract?.customerDetails?.name ||
    contract?.results?.[0]?.customer?.complete_name ||
    "Nome não disponível";
  const contractNumber =
    contract?.results?.[0]?.contract_number ||
    contract?.customerDetails?.sales?.[0]?.contract_number ||
    "Número do contrato não disponível";

  const handleNavigate = async () => {
    try {
      const hasVisited = await AsyncStorage.getItem("hasVisitedTrack");
      if (!hasVisited) {
        await AsyncStorage.setItem("hasVisitedTrack", "true");
        navigation.navigate("Accommodation");
      } else {
        navigation.navigate("ContractTracking");
      }
    } catch (error) {
      console.error("Erro ao acessar o AsyncStorage:", error);
    }
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
    color: colors.black,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 16,
    color: colors.black,
  },
});
