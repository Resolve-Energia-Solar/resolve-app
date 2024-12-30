import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Header from "../../components/profileHeader";
import Banner from "../../components/banner";
import { useGlobalContext } from "../../contexts/GlobalContext";
import { ContractCard } from "../../components/contractCard";
import { BottomNav } from "../../components/bottomNav";
import { FloatingButtons } from "../../components/floatingButtons";

export default function Home() {
  const { contract } = useGlobalContext();
  const name = contract.results[0].customer.complete_name;
  console.log(name);
  return (
    <View style={styles.container}>
      <Header name={name}/>
      <ScrollView style={styles.content}>
        <Banner />
        <Text style={styles.title}>Seus contratos</Text>
        <Text style={styles.subtitle}>Sistemas em implantação</Text>
        <ContractCard
          number="02593"
          address="TV. 2ª de Queluz, 678"
          onPress={() => {}}
        />
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
