import React from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function UserList({ users, search, setSearch, selectedUser, onUserPress }) {
  const filteredUsers = users.filter(u => u.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <>
      <TextInput
        style={styles.input}
        placeholder="Buscar por nome"
        value={search}
        onChangeText={setSearch}
      />
      <ScrollView style={styles.scrollContainer}>
        <Text style={styles.subtitle}>Funcionários:</Text>
        {filteredUsers.map(user => (
          <TouchableOpacity
            key={user.id}
            style={[styles.userItem, selectedUser?.id === user.id && styles.selectedUserItem]}
            onPress={() => onUserPress(user)}>
            <Text style={styles.userName}>Nome: {user.name}</Text>
            <Text style={styles.userPosition}>Cargo: {user.position}</Text>
            <Text>PIN: {user.code}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </>
  );
}

import { TextInput } from 'react-native';

const styles = StyleSheet.create({
  input: { 
    height: 40, 
    borderColor: '#ccc', 
    borderWidth: 1, 
    borderRadius: 5, 
    paddingHorizontal: 10, 
    marginBottom: 15, 
    backgroundColor: '#fff' 
  },
  scrollContainer: { maxHeight: 200 },
  subtitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  userItem: { padding: 10, backgroundColor: '#eaeaea', borderRadius: 5, marginBottom: 10 },
  selectedUserItem: { backgroundColor: '#d0e6ff' },
  userName: { fontWeight: 'bold' },
  userPosition: { fontStyle: 'italic' },
});
