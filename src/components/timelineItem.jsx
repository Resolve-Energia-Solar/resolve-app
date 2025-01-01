import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export const TimelineItem = ({ item }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [rating, setRating] = useState(null);

  const isPending = !item.completed && !item.highlighted;
  const isCompleted = item.completed;
  const isCurrent = item.highlighted;
  const navigation = useNavigation(); 

  const handleAction = () => {
    if (item.onAction) {
      item.onAction(); 
    }
    if (item.route) {
      navigation.navigate(item.route); 
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.timelineLeft}>
        <FontAwesome
          name={isCompleted ? "check-circle" : isCurrent ? "clock-o" : "circle"}
          size={24}
          color={isCompleted ? "#10B981" : isCurrent ? "#FBBF24" : "#D1D5DB"}
        />
        <View style={styles.line} />
      </View>
      <View
        style={[
          styles.content,
          isCompleted && styles.completedCard,
          isCurrent && styles.currentCard,
          isPending && styles.pendingCard,
        ]}
      >
        <View style={styles.header}>
          <Text style={styles.title}>{item.title || "Sem título"}</Text>
          {!isPending && (
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <FontAwesome name="question-circle" size={20} color="#6B7280" />
            </TouchableOpacity>
          )}
        </View>
        <Text style={styles.date}>{item.date || "Sem data"}</Text>
        <Text style={styles.description}>
          {item.description || "Sem descrição"}
        </Text>
        {item.actionText && (
          <TouchableOpacity style={styles.actionButton} onPress={handleAction}>
            <FontAwesome
              name={item.icon || "question-circle"}
              size={16}
              color="#4A90E2"
            />
            <Text style={styles.actionText}>{item.actionText}</Text>
          </TouchableOpacity>
        )}
        {isCompleted && (
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingText}>Avalie esta etapa:</Text>
            <View style={styles.stars}>
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity key={star} onPress={() => setRating(star)}>
                  <FontAwesome
                    name="star"
                    size={24}
                    color={star <= rating ? "#FBBF24" : "#D1D5DB"}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Detalhes</Text>
              <Text style={styles.modalText}>
                {item.description || "Sem descrição disponível"}
              </Text>
              <TouchableOpacity
                style={styles.modalCloseButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalCloseButtonText}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginBottom: 16,
  },
  timelineLeft: {
    width: 32,
    alignItems: "center",
  },
  line: {
    width: 2,
    flex: 1,
    backgroundColor: "#D1D5DB",
    marginTop: 4,
  },
  content: {
    flex: 1,
    marginLeft: 16,
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  completedCard: {
    borderLeftWidth: 4,
    borderLeftColor: "#10B981",
  },
  currentCard: {
    borderLeftWidth: 4,
    borderLeftColor: "#FBBF24",
  },
  pendingCard: {
    borderLeftWidth: 4,
    borderLeftColor: "#E5E7EB",
    opacity: 0.7,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontWeight: "600",
    fontSize: 16,
    color: "#333",
  },
  date: {
    marginTop: 8,
    fontSize: 14,
    color: "#6B7280",
  },
  description: {
    marginTop: 8,
    fontSize: 14,
    color: "#6B7280",
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#E5F6FF",
    borderRadius: 8,
  },
  actionText: {
    marginLeft: 8,
    color: "#4A90E2",
    fontWeight: "600",
  },
  ratingContainer: {
    marginTop: 16,
    alignItems: "flex-start",
  },
  ratingText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  stars: {
    flexDirection: "row",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
    width: "80%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 14,
    color: "#333",
    marginBottom: 20,
  },
  modalCloseButton: {
    alignSelf: "flex-end",
    backgroundColor: "#FBBF24",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  modalCloseButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
});

