import React, { useContext, useState } from 'react';
import { View, TextInput, Button, Alert, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthContext from '../auth/AuthContext';
import axios from 'axios';

const LoginScreen = ({ navigation }) => {
 const [username, setUsername] = useState('');
 const [password, setPassword] = useState('');
 const { setIsLoggedIn } = useContext(AuthContext); // Consumindo o contexto de autenticação

 const handleLogin = async () => {
    function getUserAccount() {
    return axios.get('');
    }

    try {
      const storedUsername = await AsyncStorage.getItem('username');
      const storedPassword = await AsyncStorage.getItem('password');
      console.log(storedUsername, storedPassword);
      console.log(username, password);
      await axios.post('http://localhost:8080/user', { username, email, password });

      navigation.navigate('Login'); 
      if (username !== storedUsername || password !== storedPassword) {
        alert('Error!\nInvalid username or password.');
      } else {
        setIsLoggedIn(true); // Atualiza o estado de autenticação global
        navigation.navigate('Home');
      }
    } catch (error) {
      alert('Error!\nThere was an error verifying user data.');
    }
        setIsLoggedIn(true); // Atualiza o estado de autenticação global
        navigation.navigate('Home');
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
        value={password}
        onChangeText={(text) => setPassword(text)}
        placeholder={'Password'}
        secureTextEntry={true}
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20 }}
      />
      <Button
        title={'Login'}
        onPress={handleLogin}
      />
      <Text style={{ marginTop: 20, textAlign: 'center' }}>Não tem conta?</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Registro')}>
        <Text style={{ color: 'blue', textAlign: 'center' }}>Clique aqui</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;