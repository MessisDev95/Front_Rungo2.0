import React from 'react';
import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity } from 'react-native';
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
      <TouchableOpacity title={editMode ? 'Atualizar' : 'Cadastrar'} onPress={onSubmit} style={styles.SigninButton} >
        <Text style={styles.buttonSig}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: { 
    marginBottom: 20,
    backgroundColor: '#3eccc2b',

  },
  
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 5,
    backgroundColor: '#7ee0e2',

  },

  pickerContainer: {
     marginBottom: 15,
     

    },

  pickerLabel:{
     marginBottom: '2%',
     fontSize: 16,

    },

  picker: {
    width: '100%',
    backgroundColor: '#7ee0e2',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
  },

  SigninButton: {
    borderRadius:  30,
    borderWidth: 1,
    borderColor: '#69b1e8',
    padding: 10,
    marginBottom: 7,
    width: '50%',//tamanho botao
    backgroundColor: '#69b1e8',
    textAlign: 'center',
    alignItems:'center',
    
  },

  buttonSig: {
   textAlign: 'center',
  },
});
