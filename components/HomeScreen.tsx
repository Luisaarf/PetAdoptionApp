
import React, {useState}from 'react';
import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, View, Button, SafeAreaView, TextInput } from 'react-native';

const HomeScreen = () => {
    return (
        <View style={styles.container}>
        <Text>Home Screen</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: '#fff',
    },
});

export default HomeScreen;