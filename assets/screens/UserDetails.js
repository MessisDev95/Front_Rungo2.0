import React, { useRef, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

export default function UserDetails({
  selectedUser,
  scanLog,
  onCopy,
  onShare,
  onEdit,
  onDelete,
  qrRef
}) {
  if (!selectedUser) return null;

  return (
    <View style={styles.qrCodeContainer}>
      <Text style={styles.qrTitle}>
        Nome: {selectedUser.name}   Cargo: {selectedUser.position}
      </Text>

      <QRCode
        value={selectedUser.code}
        size={200}
        getRef={(c) => (qrRef.current = c)}
      />

      <View style={styles.buttonRow}>
        <Button title="Copiar" onPress={onCopy} />
        <Button title="Compartilhar" onPress={onShare} />
        <Button title="Editar" onPress={onEdit} />
        <Button title="Excluir" onPress={onDelete} />
      </View>

      <Text>Leituras: {scanLog[selectedUser.code] || 0}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  qrCodeContainer: {
     marginTop: '5%',
     alignItems: 'center',
     height: '65%',
     //backgroundColor:
     borderColor: '#7ee0e2',
     borderWidth: 3,
     backgroundColor: '#7ee0e2'

  },
  qrTitle: { 
     fontSize: 16,
     marginBottom: 5

     },
  buttonRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    marginVertical: 10 

  },


});

