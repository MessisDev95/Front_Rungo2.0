import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Alert, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Clipboard from 'expo-clipboard';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import QRCode from 'react-native-qrcode-svg';

import UserForm from './Userform';
import UserList from './UserList';
import UserDetails from './UserDetails';

export default function MainScreen() {
  const [name, setName] = useState('');
  const [position, setPosition] = useState('Professor');
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [scanLog, setScanLog] = useState({});
  const qrRef = useRef();

  useEffect(() => {
    loadUsers();
    loadScanLog();
  }, []);

  useEffect(() => {
    saveUsers();
  }, [users]);

  const loadUsers = async () => {
    try {
      const data = await AsyncStorage.getItem('users');
      if (data) setUsers(JSON.parse(data));
    } catch {
      Alert.alert('Erro', 'Falha ao carregar usuários');
    }
  };

  const saveUsers = async () => {
    try {
      await AsyncStorage.setItem('users', JSON.stringify(users));
    } catch {
      Alert.alert('Erro', 'Falha ao salvar usuário');
    }
  };

  const loadScanLog = async () => {
    const data = await AsyncStorage.getItem('scanLog');
    if (data) setScanLog(JSON.parse(data));
  };

  const generateRandomString = (length = 8) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };

  const handleRegister = () => {
    if (!name.trim()) {
      Alert.alert('Erro', 'Por favor, digite um nome');
      return;
    }
    if (editMode && selectedUser) {
      const updatedUsers = users.map(u => u.id === selectedUser.id ? { ...u, name: name.trim(), position } : u);
      setUsers(updatedUsers);
      setEditMode(false);
      setSelectedUser(null);
    } else {
      const newUser = {
        id: Date.now(),
        name: name.trim(),
        position,
        code: generateRandomString()
      };
      setUsers([...users, newUser]);
    }
    setName('');
    setPosition('Professor');
  };

  const handleUserPress = (user) => {
    setSelectedUser(selectedUser?.id === user.id ? null : user);
  };

  const handleEdit = () => {
    if (selectedUser) {
      setName(selectedUser.name);
      setPosition(selectedUser.position);
      setEditMode(true);
    }
  };

  const handleDelete = () => {
    if (!selectedUser) return;
    Alert.alert('Excluir', 'Deseja mesmo excluir este usuário?', [
      { text: 'Cancelar' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          const updatedList = users.filter(u => u.id !== selectedUser.id);
          setUsers(updatedList);
          setSelectedUser(null);
          await AsyncStorage.setItem('users', JSON.stringify(updatedList));
        },
      },
    ]);
  };

  const copyToClipboard = async () => {
    if (!selectedUser) return;
    await Clipboard.setStringAsync(selectedUser.code);
    Alert.alert('Copiado', 'PIN copiado para a área de transferência');
  };

  const shareQRCode = async () => {
  if (!qrRef.current || !selectedUser) return;

  qrRef.current.toDataURL(async (dataURL) => {
    const fileUri = FileSystem.cacheDirectory + `${selectedUser.code}.png`;
    await FileSystem.writeAsStringAsync(fileUri, dataURL, {
      encoding: FileSystem.EncodingType.Base64,
    });

    const canShare = await Sharing.isAvailableAsync();
    if (!canShare) {
      Alert.alert('Erro', 'Compartilhamento não disponível');
      return;
    }

    await Sharing.shareAsync(fileUri);
  });
};


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro de Funcionários</Text>

      <UserForm
        name={name}
        setName={setName}
        position={position}
        setPosition={setPosition}
        editMode={editMode}
        onSubmit={handleRegister}
      />

      <UserList
        users={users}
        search={search}
        setSearch={setSearch}
        selectedUser={selectedUser}
        onUserPress={handleUserPress}
      />

      <UserDetails
        selectedUser={selectedUser}
        scanLog={scanLog}
        onCopy={copyToClipboard}
        onShare={shareQRCode}
        onEdit={handleEdit}
        onDelete={handleDelete}
        qrRef={qrRef}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f0f0f0' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
});
