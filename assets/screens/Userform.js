import React from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function UserForm({ name, setName, position, setPosition, editMode, onSubmit }) {
  const positions = ['Professor','RHU','Direção','Coordenador','Secretaria','Atendimento','Financeiro','Limpeza','Manutenção','Marketing','TI','Auxiliar Administrativo'];

  return (
    <View style={styles.formContainer}>
      <TextInput
        style={styles.input}
        placeholder="Digite o nome do Funcionário"
        value={name}
        onChangeText={setName}
      />
      <View style={styles.pickerContainer}>
        <Text style={styles.pickerLabel}>Cargo:</Text>
        <Picker
          selectedValue={position}
          style={styles.picker}
          onValueChange={setPosition}>
          {positions.map((pos, i) => <Picker.Item key={i} label={pos} value={pos} />)}
        </Picker>
      </View>
      <Button title={editMode ? 'Atualizar' : 'Cadastrar'} onPress={onSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: { marginBottom: 20 },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  pickerContainer: { marginBottom: 15 },
  pickerLabel: { marginBottom: 5, fontSize: 16 },
  picker: {
    width: '100%',
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
  },
});
