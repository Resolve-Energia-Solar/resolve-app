import { View, Text, TextInput, StyleSheet } from "react-native";
import { TextInputMask } from "react-native-masked-text";

export default function Input({
  label,
  placeholder,
  required,
  value,
  onChangeText,
  keyboardType,
  maskType, 
}) {
  const renderInput = () => {
    if (maskType === 'cpf') {
      return (
        <TextInputMask
          type={'cpf'}
          style={styles.input}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          placeholderTextColor="#adadad"
        />
      );
    }
    
    if (maskType === 'date') {
      return (
        <TextInputMask
          type={'custom'}
          options={{
            mask: '99/99/9999'
          }}
          style={styles.input}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          placeholderTextColor="#adadad"
        />
      );
    }

    return (
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        placeholderTextColor="#adadad"
      />
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {label}
        {required && <Text style={styles.required}>*</Text>}
      </Text>
      {renderInput()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: "#333",
  },
  required: {
    color: "#FF0000",
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: "#FFF",
  },
});
