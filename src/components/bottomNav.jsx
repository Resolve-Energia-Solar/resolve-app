import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { colors } from '../../src/theme/colors';

export const BottomNav = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const getItemColor = (currentRoute) => 
    route.name === currentRoute ? colors.yellow : colors.gray;

  const getTextStyle = (currentRoute) =>
    route.name === currentRoute ? [styles.label, styles.active] : styles.label;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.item}
        onPress={() => navigation.navigate('Profile')}
      >
        <Feather name="user" size={24} color={getItemColor('Profile')} />
        <Text style={getTextStyle('Profile')}>Perfil</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.item}
        onPress={() => navigation.navigate('Home')}
      >
        <Feather name="home" size={24} color={getItemColor('Home')} />
        <Text style={getTextStyle('Home')}>Início</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.item}
        onPress={() => navigation.navigate('support')}
      >
        <Feather name="message-circle" size={24} color={getItemColor('support')} />
        <Text style={getTextStyle('support')}>Suporte</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.item}
        onPress={() => navigation.navigate('Notifications')}
      >
        <Feather name="bell" size={24} color={getItemColor('Notifications')} />
        <Text style={getTextStyle('Notifications')}>Avisos</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingVertical: 16,
    backgroundColor: 'white',
  },
  item: {
    flex: 1,
    alignItems: 'center',
  },
  label: {
    marginTop: 4,
    fontSize: 12,
    color: colors.gray,
  },
  active: {
    color: colors.yellow,
  },
});
