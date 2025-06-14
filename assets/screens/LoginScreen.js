import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useAuth } from '../../context/AuthContext';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const { login } = useAuth();

  const handleLogin = () => {
    if (username.trim()) {
      login(username.trim());
    } else {
      alert('Digite seu nome');
    }
  };

  return (
    <View style={styles.container}>
      <Image style={styles.image}
        source={require('../../assets/images/rungo_foto_login.jpg')}/>

      <Text style={styles.title}>Bem Vindo!</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu Login"
        value={username}
        onChangeText={setUsername}
      />

      <TouchableOpacity style={styles.LoginButton} onPress={handleLogin}>
        <Text style={styles.ButtonLabel}>Entrar</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
    alignItems: 'center',
  },

  title: {
    fontSize: 26,
    textAlign: 'center',
    marginBottom: -2,
    marginTop:'5%',
  },
  
  input: {
    borderWidth: 2,
    borderColor: '#32cd32',
    borderRadius: 6,
    padding: 12,
    width: '80%',
    marginBottom: 20,
  },
  LoginButton: {
    borderRadius:  30,
    borderWidth: 1,
    borderColor: '#32cd32',
    padding: 10,
    marginBottom: 7,
    width: '35%',//tamanho botao
    backgroundColor: '#48d1cc',
    textAlign: 'center'
    
  },

  ButtonLabel: {
    textAlign: 'center'
  },

  image: {
    height: '20%',
    width:'50%',
    textAlign: 'center',
    alignItems: 'center',
    resizeMode: 'contain',
    justifyContent: 'center',
    flex: 'flex-start',
    marginTop: '-35%',
    margin: 18,
  },
});
