import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { ContractCard } from "../../components/contractTimeline";
import { TimelineItem } from "../../components/timelineItem";
import { BottomNav } from "../../components/bottomNav";
import Header from "../../components/header";
import { useGlobalContext } from "../../contexts/GlobalContext";
import { colors } from "../../theme/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const ContractTrackingScreen = () => {
  const { contract } = useGlobalContext();
  const saleContract = contract?.customerDetails?.sales?.[0];

  const [accessToken, setAccessToken] = useState(null);
  const [project, setProject] = useState(null);
  const [fieldService, setFieldService] = useState(null);
  const [contractData, setContractData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAccessToken = async () => {
      try {
        const token = await AsyncStorage.getItem("accessToken");
        setAccessToken(token);
      } catch (error) {
        console.error("Erro ao carregar o token:", error);
      }
    };

    loadAccessToken();
  }, []);

  useEffect(() => {
    const fetchProjectData = async () => {
      const projectUrl = contract?.results?.[0]?.projects_urls;

      if (accessToken && projectUrl) {
        try {
          const response = await fetch(projectUrl, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          });

          const data = await response.json();
          setProject(data);

          const fieldServiceUrl =
            data?.field_services_urls?.["servico-de-vistoria"];
          const contractUrl = data?.contract_url;

          if (fieldServiceUrl) {
            const fieldServiceResponse = await fetch(fieldServiceUrl, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
              },
            });
            const fieldServiceData = await fieldServiceResponse.json();
            setFieldService(fieldServiceData);
          }

          if (contractUrl) {
            const contractResponse = await fetch(contractUrl, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
              },
            });
            const contractData = await contractResponse.json();
            setContractData(contractData);
          }
        } catch (error) {
          console.log("Erro ao buscar os dados do projeto:", error);
        } finally {
          setLoading(false);
        }
      } else {
        console.log("URL do projeto não encontrada ou token inválido.");
      }
    };

    fetchProjectData();
  }, [accessToken, contract]);

  const timelineData = [
    {
      title: "Fechamento do Contrato",
      date:
        contractData?.contract_date ||
        saleContract?.contract_date ||
        "Data não definida",
      completed:
        contractData?.is_signed || saleContract?.documents?.is_completed || false,
      actionText: contractData?.attachment_count
        ? `${contractData.attachment_count} Arquivo(s) em Anexo`
        : "Nenhum arquivo em anexo",
      icon: "file-text-o",
      onAction: () => {
        console.log("Abrindo documento do contrato");
      },
    },
    {
      title: "Acolhimento",
      date:
        saleContract?.customer_service_acceptance_records?.acceptance_date_time ||
        "Data não definida",
      completed:
        saleContract?.customer_service_acceptance_records?.is_completed || true,
      actionText: "Replay no Vídeo de primeiros passos",
      icon: "play-circle",
      route: "Reels",
      onAction: () => {
        console.log("Reproduzindo vídeo do acolhimento");
      },
    },
    {
      title: "Vistoria",
      date: fieldService?.schedule_date || "Data não definida",
      description:
        fieldService?.description ||
        "Avaliação técnica Concluída para o projeto.",
      status: fieldService?.status || "Status não definido",
      completed: fieldService?.is_completed || true,
      agent:
        fieldService?.schedule_agent.complete_name || "Agente não definido",
      agentPicture: fieldService?.schedule_agent.profile_picture || null,
    },
    {
      title: "Projeto de Engenharia",
      date:
        contractData?.engineering_project_date ||
        saleContract?.engineering_projects?.created_at ||
        "Data não definida",
      completed: saleContract?.engineering_projects?.is_completed || false,
    },
    {
      title: "Solicitação do Parecer de Acesso",
      date:
        contractData?.access_opinion_date ||
        saleContract?.access_opinion_requests?.request_date ||
        "Data não definida",
      status: saleContract?.access_opinion_requests?.status || "Solicitado",
      description: "Solicitado à concessionária de Energia do seu estado.",
      completed: saleContract?.access_opinion_requests?.is_completed || false,
      highlighted: false,
    },
    {
      title: "Entrega de Kits",
      date:
        contractData?.kits_delivery_date ||
        saleContract?.deliveries?.delivery_date ||
        "Previsto para 15/11/2024",
      completed: saleContract?.deliveries?.is_completed || false,
    },
    {
      title: "Instalação",
      date:
        contractData?.installation_date ||
        saleContract?.installations?.start_date ||
        "Previsto para 20/11/2024",
      completed: saleContract?.installations?.is_completed_technical || false,
    },
    {
      title: "Homologação",
      date:
        contractData?.homologation_date ||
        saleContract?.concessionaire_inspection_requests?.request_date ||
        "Previsto para 25/12/2024",
      completed:
        saleContract?.concessionaire_inspection_requests?.is_completed || false,
    },
  ];

  return (
    <View style={styles.container}>
      <Header title="Contratos" />

      <ScrollView style={styles.content}>
        <Text style={styles.title}>
          Acompanhe a jornada de implantação de seu sistema
        </Text>

        <ContractCard
          number={`Projeto ${
            project?.project_number ||
            saleContract?.contract_number ||
            "Número indisponível"
          }`}
          address=""
        />

        {timelineData.length > 0 ? (
          timelineData.map((item, index) => (
            <TimelineItem key={index} item={item} />
          ))
        ) : (
          <Text>Nenhum dado de timeline encontrado.</Text>
        )}
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
    color: colors.black,
  },
});
