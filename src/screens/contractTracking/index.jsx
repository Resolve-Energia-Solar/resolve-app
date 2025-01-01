import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { ContractCard } from "../../components/contractTimeline";
import { TimelineItem } from "../../components/timelineItem";
import { BottomNav } from "../../components/bottomNav";
import Header from "../../components/header";
import { useGlobalContext } from "../../contexts/GlobalContext";

const timelineData = [
  {
    title: "Fechamento do Contrato",
    date: "Realizado em 15/02/2023",
    completed: true,
    actionText: "1 Arquivo em Anexo",
    icon: "file-text-o",
    onAction: () => {
      console.log("Abrindo documento do contrato");
    },
  },
  {
    title: "Acolhimento",
    date: "Realizado em 20/02/2023",
    completed: true,
    actionText: "Replay no Vídeo de primeiros passos",
    icon: "play-circle",
    route: "Reels",
    onAction: () => {
      console.log("Reproduzindo vídeo do acolhimento");
    },
  },
  {
    title: "Vistoria",
    date: "Realizado em 28/10/2024",
    description: "Avaliação técnica realizada no local do projeto.",
    status: "Concluída",
    completed: true,
  },
  {
    title: "Projeto de Engenharia",
    date: "Realizado em 05/11/2024",
    completed: true,
  },
  {
    title: "Solicitação do Parecer de Acesso",
    date: "Solicitado em 10/11/2024",
    status: "Solicitado",
    description: "Solicitado à concessionária de Energia do seu estado.",
    completed: false,
    highlighted: true,
  },
  {
    title: "Entrega de Kits",
    date: "Previsto para 15/11/2024",
    completed: false,
  },
  {
    title: "Instalação",
    date: "Previsto para 20/11/2024",
    completed: false,
  },
  {
    title: "Homologação",
    date: "Previsto para 25/12/2024",
    completed: false,
  },
];

export const ContractTrackingScreen = () => {
  const { contract } = useGlobalContext();
  const contractNumber = contract.results[0].contract_number;
  return (
    <View style={styles.container}>
      <Header title="Contratos" />

      <ScrollView style={styles.content}>
        <Text style={styles.title}>
          Acompanhe a jornada de implantação de seu sistema
        </Text>

        <ContractCard
          number={`Contrato ${contractNumber}`}
          address="Rua Antônio Barreto, 1198"
        />

        {timelineData.map((item, index) => (
          <TimelineItem key={index} item={item} />
        ))}
      </ScrollView>

      <BottomNav />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },
  content: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 16,
  },
});
