import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

import { AuthProvider, useAuth } from './context/AuthContext';
import QrScannerScreen from './assets/screens/QrScannerScreen';
import LoginScreen from './assets/screens/LoginScreen';
import MainScreen from './assets/screens/MainScreen'; // Importa o MainScreen
import SigninScreen from './assets/screens/SigninScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}

function MainNavigator() {
  const { user } = useAuth();

  return (
    <Stack.Navigator>
      {!user ? (
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ headerShown: false }} 
        />
      ) : (
        <>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="QR Scanner" component={QrScannerScreen} />
          <Stack.Screen name="Funcionarios" component={MainScreen} />
          <Stack.Screen name="Cadastro" component={SigninScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}

function HomeScreen({ navigation }) {
  const { logout } = useAuth();

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('./assets/images/rungo_logo_semfungo.png')}/>

      <Text style={styles.title}>Onde deseja ir?</Text>

      <TouchableOpacity style={styles.button1} onPress={() => navigation.navigate('QR Scanner')}>
        <Text>Abrir Scanner de QR Code</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button2} onPress={() => navigation.navigate('Funcionarios')}>
        <Text>Lista de funcionários</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button2} onPress={() => navigation.navigate('Cadastro')}>
        <Text>Cadastro de funcionário</Text>
      </TouchableOpacity>

      <View style={{ marginTop: 20 }}>
        <Button title="Logout" color="red" onPress={logout} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#87ceeb',
  },
  title: {
     fontSize: 20,
     marginBottom: 20
  },
  button1: {
   borderRadius:  30,
    borderWidth: 1,
    borderColor: '#32cd32',
    padding: 10,
    marginBottom: 7,
    width: '50%',//tamanho botao
    backgroundColor: '#48d1cc',
    textAlign: 'center'
  },
  button2: {
   borderRadius:  30,
    borderWidth: 1,
    borderColor: '#32cd32',
    padding: 10,
    marginBottom: 7,
    width: '50%',//tamanho botao
    backgroundColor: '#48d1cc',
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
    margin: 30,
  },
});


