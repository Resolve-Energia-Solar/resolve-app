import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const DocumentItem = ({ title, address }) => (
  <View style={styles.documentContainer}>
    <View style={styles.documentHeader}>
      <View style={styles.iconContainer}>
        <Ionicons name="document-text" size={24} color="#666" />
      </View>
      <View style={styles.documentInfo}>
        <Text style={styles.documentTitle}>{title}</Text>
        {address && <Text style={styles.documentAddress}>{address}</Text>}
      </View>
    </View>
    
    <TouchableOpacity style={styles.documentButton}>
      <View style={styles.buttonContent}>
        <Ionicons name="book-outline" size={20} color="#333" />
        <Text style={styles.buttonText}>Meus Produtos Resolve</Text>
        <Ionicons name="chevron-down" size={20} color="#333" />
      </View>
    </TouchableOpacity>
    
    <TouchableOpacity style={styles.documentButton}>
      <View style={styles.buttonContent}>
        <Ionicons name="document-outline" size={20} color="#333" />
        <Text style={styles.buttonText}>Documentos do Contrato</Text>
        <Ionicons name="chevron-down" size={20} color="#333" />
      </View>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  documentContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  documentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconContainer: {
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    padding: 8,
    marginRight: 12,
  },
  documentInfo: {
    flex: 1,
  },
  documentTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  documentAddress: {
    fontSize: 14,
    color: '#666',
  },
  documentButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    color: '#333',
  },
});