import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Platform,
  Linking,
  Alert,
  ActivityIndicator,
} from "react-native";
import { WebView } from "react-native-webview";
import Checkbox from "expo-checkbox";
import { useGlobalContext } from "../../contexts/GlobalContext";
import { StatusBar } from "expo-status-bar";
import { colors } from "../../../src/theme/colors";
import StatusBarComponent from "../../components/statusBar";
import contractService from "../../services/contractService";

function ContractScreen() {
  const navigation = useNavigation();
  const { contract, isSigned: isSignedCustomer } = useGlobalContext();
  const [isSigned, setIsSigned] = useState(false);
  const [signLater, setSignLater] = useState(false);
  const [preview, setPreview] = useState(null);
  const [isSigning, setIsSigning] = useState(false);
  const [isAdvancing, setIsAdvancing] = useState(false);

  const requestSignatureKey =
    contract?.results[0]?.contract_submission?.request_signature_key;

  useEffect(() => {
    if (!requestSignatureKey) {
      navigation.navigate("Home");
    }
  }, [requestSignatureKey, navigation]);

  const handleSign = async () => {
    setIsSigning(true);
    try {
      if (requestSignatureKey) {
        const contractUrl = `https://app.clicksign.com/notarial/widget/signatures/${requestSignatureKey}/redirect`;
        const canOpen = await Linking.canOpenURL(contractUrl);
        if (canOpen) {
          await Linking.openURL(contractUrl);
          setIsSigned(true);
        }
      }
    } catch (error) {
      console.error("Erro ao redirecionar para assinatura:", error);
      Alert.alert("Erro", "Não foi possível abrir o link de assinatura.");
    } finally {
      setIsSigning(false);
    }
  };

  const handleAdvance = async () => {
    setIsAdvancing(true);
    setIsSigned(true);

    try {
      if (signLater) {
        navigation.navigate("Completion");
        return;
      }
      await new Promise((resolve) => setTimeout(resolve, 25000));

      const isSignedCheck = await isSignedCustomer();

      if (isSignedCheck) {
        navigation.navigate("Completion");
        return;
      }

      setIsSigned(false);
      Alert.alert(
        "Atenção",
        "Não encontramos a confirmação da assinatura do contrato em nosso sistema, possivelmente devido a um atraso na atualização. Se você já assinou, pode ignorar este aviso e avançar para a próxima etapa. Caso prefira uma confirmação adicional, tente novamente abaixo.",
        [
          {
            text: "Tentar Novamente",
            onPress: handleAdvance,
          },
          {
            text: "Avançar Mesmo Assim",
            onPress: () => {
              navigation.navigate("Completion");
            },
          },
          {
            text: "Fechar",
            style: "cancel", // Define o estilo do botão como "cancel" (opcional)
          },
        ]

      );
    } catch (error) {
      console.error("Erro ao avançar:", error);
      Alert.alert("Erro", "Ocorreu um erro ao tentar avançar.");
    } finally {
      setIsAdvancing(false);
    }
  };

  const htmlContent = `
    <html>
      <head>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.min.js"></script>
      </head>
      <body>
        <div id="pdf-container"></div> 
        <script>
          const base64PDF = '${preview}';  // Agora o preview é diretamente a string Base64
          const pdfData = atob(base64PDF); // Decodifica a string Base64 para binário

          const loadingTask = pdfjsLib.getDocument({ data: pdfData });
          loadingTask.promise.then(function(pdf) {
            const totalPages = pdf.numPages;
            const container = document.getElementById('pdf-container');

            for (let pageNumber = 1; pageNumber <= totalPages; pageNumber++) {
              pdf.getPage(pageNumber).then(function(page) {
                const scale = 1.5;
                const viewport = page.getViewport({ scale: scale });

                // Cria um novo canvas para cada página
                const canvas = document.createElement('canvas');
                container.appendChild(canvas);

                const context = canvas.getContext('2d');
                canvas.height = viewport.height;
                canvas.width = viewport.width;

                const renderContext = {
                  canvasContext: context,
                  viewport: viewport
                };

                page.render(renderContext);
              });
            }
          });
        </script>
      </body>
    </html>
  `;

  useEffect(() => {
    const fetchPreview = async () => {
      try {
        const response = await contractService.previewContract(contract?.results[0]?.id);
        setPreview(response);
      } catch (error) {
        console.warn("Erro ao buscar dados do contrato:", error.message);
      }
    };

    fetchPreview();
  }, [contract]);

  return (
    <View style={styles.container}>
      {Platform.OS !== "ios" ? (
        <StatusBar style="dark" backgroundColor={colors.yellowDark} />
      ) : (
        <StatusBarComponent />
      )}

      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <WebView
            javaScriptEnabled={true}
            domStorageEnabled={true}
            startInLoadingState={true}
            source={{ html: htmlContent }}
            style={styles.webview}
            onMessage={(event) => {
              const { event: eventName } = JSON.parse(event.nativeEvent.data);
              if (eventName === "signed") {
                setIsSigned(true);
              }
            }}
          />
          <View style={styles.checkboxContainer}>
            <Checkbox
              value={signLater}
              onValueChange={setSignLater}
              color={signLater ? colors.yellowDark : undefined}
            />
            <Text style={styles.checkboxLabel}>Desejo assinar depois</Text>
          </View>
          <View style={styles.buttonRow}>
            {!isSigned && !signLater && (
              <TouchableOpacity
                style={[styles.button, styles.advanceButton]}
                onPress={handleSign}
                disabled={isSigning}
              >
                <View style={styles.buttonContent}>
                  <Text style={styles.buttonText}>Assinar</Text>
                  {isSigning && <ActivityIndicator color={colors.white} style={styles.loading} />}
                </View>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={[
                styles.button,
                styles.advanceButton,
                {
                  backgroundColor:
                    isSigned || signLater ? colors.yellowDark : "gray",
                },
              ]}
              onPress={handleAdvance}
              activeOpacity={isSigned || signLater ? 0.8 : 1}
              disabled={(!isSigned && !signLater) || isAdvancing}
            >
              <View style={styles.buttonContent}>
                <Text style={styles.buttonText}>Avançar</Text>
                {isAdvancing && <ActivityIndicator color={colors.white} style={styles.loading} />}
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

export default ContractScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    borderRadius: 10,
    overflow: "hidden",
    elevation: 5,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  webview: {
    flex: 1,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    margin: 10,
  },
  checkboxLabel: {
    marginLeft: 8,
    fontSize: 16,
    color: colors.black,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: "center",
    marginHorizontal: 5,
  },
  advanceButton: {
    backgroundColor: colors.yellowDark,
    marginBottom: 10,
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "600",
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  loading: {
    marginLeft: 8,
  },
});