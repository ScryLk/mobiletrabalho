import React, { useState } from 'react';
import { View, TextInput, Button, Alert, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const RegistroScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    // Aqui você pode adicionar a lógica de registro
    try {
      await AsyncStorage.setItem('username', username);
      await AsyncStorage.setItem('email', email);  
      await AsyncStorage.setItem('password', password);
      await axios.post('http://localhost:8080/user', { username, email, password });
      navigation.navigate('Login');
    } catch (error) {
      alert('Error!', 'There was an error saving user data.');
    }
  };


  return (
    <View>
      <TextInput
        value={username}
        onChangeText={(text) => setUsername(text)}
        placeholder={'Username'}
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20 }}
      />
      <TextInput
        value={email}
        onChangeText={(text) => setEmail(text)}
        placeholder={'Email'}
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20 }}
      />
      <TextInput
        value={password}
        onChangeText={(text) => setPassword(text)}
        placeholder={'Password'}
        secureTextEntry={true}
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20 }}
      />
      <Button
        title={'Register'}
        onPress={handleRegister}
      />
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={{ color: 'blue', textAlign: 'center', marginTop: 20 }}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegistroScreen;