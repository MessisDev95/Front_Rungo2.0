import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function QrScannerScreen({ navigation }) {
  const [hasPermission, requestPermission] = useCameraPermissions();
  const [isScanning, setIsScanning] = useState(true);
  const [qrValue, setQrValue] = useState('');

  const handleBarCodeScanned = ({ type, data }) => {
    setIsScanning(false);
    setQrValue(data);
  };

  if (!hasPermission) {
    return (
      <View style={styles.container}>
        <Text>Precisamos da sua permissão para usar a câmera.</Text>
        <Button title="Permitir" onPress={requestPermission} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {isScanning ? (
        <>
          <View style={styles.cameraContainer}>
            <CameraView
              style={StyleSheet.absoluteFillObject}
              onBarcodeScanned={handleBarCodeScanned}
              barcodeScannerSettings={{
                barcodeTypes: ['qr'],
              }}
            />
          </View>
          <Button title="Cancelar" onPress={() => navigation.goBack()} />
        </>
      ) : (
        <>
          <Text style={styles.qrText}>QR Lido: {qrValue}</Text>
          <Button title="Escanear Novamente" onPress={() => setIsScanning(true)} />
          <Button title="Voltar" onPress={() => navigation.goBack()} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  cameraContainer: {
    flex: 1,
    height: 300,
    marginVertical: 20,
    overflow: 'hidden',
    borderRadius: 12,
  },
  qrText: {
    marginTop: 20,
    fontSize: 18,
    textAlign: 'center',
  },
});
