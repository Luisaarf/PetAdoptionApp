
import React, {useState}from 'react';
import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, View, Button, SafeAreaView, TextInput } from 'react-native';

const LoginScreen = ({navigation}) => {
    const [emailInput, setEmailInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('../assets/ico.png')} />
      <Text style={styles.text}>LOGIN</Text>
      <Text style={styles.text}>Insira seus dados para continuar</Text>
      <SafeAreaView>
        <TextInput 
        style={styles.input}
        placeholder="user@exemplo.com.br" 
        onChangeText={newText => setEmailInput(newText)}
        defaultValue={emailInput}
        />
        <TextInput 
        style={styles.input}
        placeholder="*****" 
        secureTextEntry = {true}
        onChangeText={newText => setPasswordInput(newText)}
        defaultValue={passwordInput}
        />
        <View style={styles.buttonContainer}>
          <Button color="#841584" title="Entrar" onPress={() => {}} />
        </View>
      </SafeAreaView>
      <StatusBar style="auto" />
    </View>
  );
}

const ProfileScreen = ({navigation, route}) => {
    return <Text>This is {route.params.name}'s profile</Text>;
  };

const styles = StyleSheet.create({
    container: {
      flex: 1,
      // backgroundColor: '#fff',
      // alignItems: 'center',
      justifyContent: 'center',
      // alignSelf: 'flex-start',
    },
    text : {
      fontSize: 15,
      alignSelf: 'flex-start',
      marginLeft: 30,
    },
    image: {
      width: 50,
      height: 50,
      alignSelf: 'flex-start',
      margin: 30,
    },
    buttonContainer: {
      margin: 20,
    },
    input : {
      height: 40,
      width: 200,
      borderColor: 'blue',
      borderTopWidth: 0,
      borderBottomWidth: 1,
      borderWidth: 1,
      margin: 10,
      marginLeft: 30,
    }
  });

export default LoginScreen;