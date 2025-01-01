import React, { useState, useRef } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Text,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import { Video } from "expo-av";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../../theme/colors";

const { width, height } = Dimensions.get("window");

export default function VideoReels() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const videoRef = useRef(null);

  const navigation = useNavigation();

  const togglePlayback = async () => {
    if (isPlaying) {
      await videoRef.current.pauseAsync();
    } else {
      await videoRef.current.playAsync();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    videoRef.current.setIsMutedAsync(!isMuted);
  };

  const onProgress = (status) => {
    if (status.durationMillis && status.positionMillis) {
      setProgress(status.positionMillis / status.durationMillis);
    }
  };

  const onEnd = () => {
    setShowModal(true);
    setIsPlaying(false);
  };

  const skipToHome = async () => {
    if (videoRef.current) {
      await videoRef.current.stopAsync(); // Encerra o vídeo e o áudio
    }
    navigation.navigate("Home");
  };

  const replayVideo = () => {
    videoRef.current.replayAsync();
    setIsPlaying(true);
    setShowModal(false);
  };

  return (
    <View style={styles.container}>
      <Video
        ref={videoRef}
        source={{
          uri: "https://f005.backblazeb2.com/file/yougo-app/Cursos/Reels+Processos+Internos.mp4",
        }}
        style={styles.video}
        resizeMode="cover"
        isMuted={isMuted}
        shouldPlay={isPlaying}
        onError={(error) => console.log("Video playback error", error)}
        onPlaybackStatusUpdate={(status) => {
          if (status.didJustFinish) {
            onEnd();
          }
          onProgress(status);
        }}
      />

      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: `${progress * 100}%` }]} />
      </View>

      <View style={styles.controlsContainer}>
        <TouchableOpacity style={styles.controlButton} onPress={togglePlayback}>
          {isPlaying ? (
            <Ionicons name="pause-circle" color={colors.white} size={50} />
          ) : (
            <Ionicons name="play-circle" color={colors.white} size={50} />
          )}
        </TouchableOpacity>

        <TouchableOpacity style={styles.controlButton} onPress={toggleMute}>
          {isMuted ? (
            <MaterialIcons name="volume-off" color={colors.white} size={30} />
          ) : (
            <MaterialIcons name="volume-up" color={colors.white} size={30} />
          )}
        </TouchableOpacity>

        <TouchableOpacity style={styles.controlButton} onPress={skipToHome}>
          <Text style={styles.skipButtonText}>Pular Vídeo</Text>
        </TouchableOpacity>
      </View>

      <Modal
        transparent={true}
        visible={showModal}
        animationType="fade"
        onRequestClose={() => setShowModal(false)}
      >
        <TouchableWithoutFeedback onPress={() => setShowModal(false)}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>

        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>O vídeo acabou!</Text>

          <View style={styles.modalButtonsContainer}>
            <TouchableOpacity style={styles.modalButton} onPress={replayVideo}>
              <Text style={styles.modalButtonText}>Ver Novamente</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={skipToHome}>
              <Text style={styles.modalButtonText}>Ir para Home</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width,
    height: "100%",
    backgroundColor: colors.black,
    position: "relative",
  },
  video: {
    width: "100%",
    height: "100%",
  },
  controlsContainer: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  controlButton: {
    padding: 10,
  },
  skipButtonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "bold",
  },
  progressBarContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 5,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
  progressBar: {
    height: 5,
    backgroundColor: colors.yellowDark,
  },
  modalOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    position: "absolute",
    bottom: 100,
    left: 20,
    right: 20,
    backgroundColor: "#333",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    color: "#fff",
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
  modalButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  modalButton: {
    backgroundColor: colors.yellowDark,
    padding: 10,
    borderRadius: 5,
    width: "45%",
    alignItems: "center",
  },
  modalButtonText: {
    color: "#111",
    fontSize: 16,
    fontWeight: "bold",
  },
});
