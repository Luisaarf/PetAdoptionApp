
import React, { useCallback, useState}from 'react';
import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackTypes } from '../App';
import GetAuth from '../api/api_login';

const LoginScreen = () => {
    const navigation = useNavigation<StackTypes>();
    const [emailInput, setEmailInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [inputStyle, setInputStyle] = useState( {...styles.input} );
    const [inputMessageStyle, setInputMessageStyle] = useState( {...styles.inputMessage} );
    const [inputMessage, setInputMessage] = useState('Usuário ou senha inválidos');

    const handleLogin = useCallback(() => {
      console.log('Login attempt:', emailInput, passwordInput);
      InputToDefault();
      if (emailInput !== '' && passwordInput !== '') {
        GetAuth({ username: emailInput, password: passwordInput }).then((result) => {
          result.responseStatus === 200 ? 
          navigation.navigate('Home', {token : result.data.token, type: result.data.type} )
          :  InputStyleError(result.data.message, result.responseStatus);
          
        });
      } else {
        InputStyleError('Preencha todos os campos', 0)
      }
    }, [emailInput, passwordInput, navigation]);

    const InputToDefault = () => {
      setInputStyle(
        {
             ...styles.input,
             borderColor: 'black'
          }
      );
      setInputMessageStyle(
        {
          ...styles.inputMessage,
          opacity: 0
        }
      );
    }

    const InputStyleError = (response : string, responseId : number) => {
      console.log('Error',responseId, ':', response)
      setInputStyle(
        {
             ...styles.input,
             borderColor: 'red'
          }
      );
      setInputMessageStyle(
        {
          ...styles.inputMessage,
          opacity: 1
        }
      );
      setInputMessage(response)
    }

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('../assets/ico.png')} />
      <Text style={[styles.text, styles.title]}>LOGIN</Text>
      <Text style={[styles.text, styles.directions]}>Insira seus dados para continuar</Text>
      <SafeAreaView>
        <Text style={[styles.text, styles.label]}>EMAIL</Text>
        <TextInput 
          style={inputStyle}
          placeholder="user@exemplo.com.br" 
          onChangeText={newText => setEmailInput(newText)}
          defaultValue={emailInput}
        />
        <Text style={[styles.text, styles.label]}>SENHA</Text>
        <TextInput 
          style={inputStyle}
          placeholder="*****" 
          secureTextEntry = {true}
          onChangeText={newText => setPasswordInput(newText)}
          defaultValue={passwordInput}
        />
        <Text style={inputMessageStyle}>{inputMessage}</Text>
        <View style={styles.button}>
          <TouchableOpacity style={styles.buttonPressable} onPress={() => {handleLogin()}}>
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>
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
    },
    inputMessage : {
      color: 'red',
      marginLeft: 30,
      marginRight: 30,
      opacity: 0
    }

  });

export default LoginScreen;