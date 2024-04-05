
import React, {useState}from 'react';
import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, View, Button, SafeAreaView, TextInput, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackTypes } from '../App';

const LoginScreen = () => {
    const navigation = useNavigation<StackTypes>();
    const [emailInput, setEmailInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');

    const handleLogin = () => {
      console.log('Login attempt:', emailInput, passwordInput);
      emailInput != '' && passwordInput != '' ?
      navigation.navigate('Home'): console.log('Preencha todos os campos');
    }
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('../assets/ico.png')} />
      <Text style={[styles.text, styles.title]}>LOGIN</Text>
      <Text style={[styles.text, styles.directions]}>Insira seus dados para continuar</Text>
      <SafeAreaView>
        <Text style={[styles.text, styles.label]}>EMAIL</Text>
        <TextInput 
          style={styles.input}
          placeholder="user@exemplo.com.br" 
          onChangeText={newText => setEmailInput(newText)}
          defaultValue={emailInput}
        />
        <Text style={[styles.text, styles.label]}>SENHA</Text>
        <TextInput 
          style={styles.input}
          placeholder="*****" 
          secureTextEntry = {true}
          onChangeText={newText => setPasswordInput(newText)}
          defaultValue={passwordInput}
        />
        <View style={styles.button}>
          <Pressable style={styles.buttonPressable} onPress={() => {handleLogin()}}>
            <Text style={styles.buttonText}>Entrar</Text>
          </Pressable>
        </View>
      </SafeAreaView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: '#fff',
    },
    text : {
      fontSize: 15,
      alignSelf: 'flex-start',
      marginLeft: 30,
    },
    directions: {
      marginBottom: 35
    },
    title: {
      fontWeight: 'bold',
    },
    label:{ 
      color: "#cb3ce3",
      marginTop: 5,
      
    },
    image: {
      width: 40,
      height: 40,
      alignSelf: 'flex-start',
      margin: 30,
      marginBottom: 20
    },
    button: {
      margin: 30,
    },
    buttonPressable: {
      margin: 0,
      height: 50,
      borderRadius: 100 ,
      borderTopColor: "black",
      backgroundColor:"#cb3ce3",
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonText: {
      color: 'white',
      fontWeight: 'bold',
    },
    input : {
      height: 40,
      borderColor: 'black',
      borderTopWidth: 0,
      borderLeftWidth: 0,
      borderRightWidth: 0,
      borderBottomWidth: 1,
      borderWidth: 1,
      marginLeft: 30,
      marginRight: 30,
      marginBottom: 15
    }
  });

export default LoginScreen;