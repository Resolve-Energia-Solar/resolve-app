import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Platform,
} from "react-native";
import { WebView } from "react-native-webview";
import Checkbox from "expo-checkbox";
import { useGlobalContext } from "../../contexts/GlobalContext";
import { StatusBar } from "expo-status-bar";
import { colors } from "../../../src/theme/colors";
import StatusBarComponent from "../../components/statusBar";

function ContractScreen() {
  const navigation = useNavigation();
  const { contract } = useGlobalContext();
  const [isSigned, setIsSigned] = useState(false);
  const [signLater, setSignLater] = useState(false);

  const requestSignatureKey =
    contract?.results[0]?.contract_submission?.request_signature_key;

  useEffect(() => {
    if (!requestSignatureKey) {
      navigation.navigate("Home");
    }
  }, [requestSignatureKey, navigation]);

  const handleAdvance = () => {
    if (isSigned || signLater) {
      navigation.navigate("Completion");
    }
  };

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Simple widget usage</title>
        <script src="https://cdn-public-library.clicksign.com/embedded/embedded.min-1.0.0.js" type="text/javascript"></script>
        <style>
          #container iframe {
            border: none !important;
          }
        </style>
      </head>
      <body>
        <div id="container" style="height: 650px"></div>
        <script type="text/javascript">
          var widget;
          var request_signature_key = '${requestSignatureKey}';
          
          widget = new Clicksign(request_signature_key);
          widget.endpoint = 'https://app.clicksign.com';
          widget.origin = '*';
          widget.mount('container');
          
          widget.on('loaded', function(ev) { console.log('loaded!'); });
          widget.on('signed', function(ev) { 
            console.log('signed!'); 
            window.ReactNativeWebView.postMessage(JSON.stringify({ event: 'signed' }));
          });
          widget.on('resized', function(height) {
            document.getElementById('container').style.height = height + 'px';
          });
        </script>
      </body>
    </html>
  `;

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
              disabled={!isSigned && !signLater}
            >
              <Text style={styles.buttonText}>Avançar</Text>
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
    shadowColor: "#000",
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
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
