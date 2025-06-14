import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, View, Text } from 'react-native';

import { AuthProvider, useAuth } from './context/AuthContext';
import QrScannerScreen from './assets/screens/QrScannerScreen';
import LoginScreen from './assets/screens/LoginScreen';
import MainScreen from './assets/screens/MainScreen'; // Importa o MainScreen

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
        </>
      )}
    </Stack.Navigator>
  );
}

function HomeScreen({ navigation }) {
  const { logout } = useAuth();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>Bem-vindo ao App</Text>

      <Button
        title="Abrir Scanner de QR Code"
        onPress={() => navigation.navigate('QR Scanner')}
      />

      <Button
        title="Tela Funcionários"
        onPress={() => navigation.navigate('Funcionarios')}
        style={{ marginTop: 20 }}
      />

      <View style={{ marginTop: 20 }}>
        <Button title="Sair" color="red" onPress={logout} />
      </View>
    </View>
  );
}
