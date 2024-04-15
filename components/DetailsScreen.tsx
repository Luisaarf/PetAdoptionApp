import React, {useState, useEffect}from 'react';
import { Image, StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import GetAnimalDetail from '../api/api_details';
import { useNavigation } from '@react-navigation/native';
import { StackTypes } from '../App';
import { AnimalDataResponse } from '../types/AnimalData';

const DetailsScreen = () => {
    const navigation = useNavigation<StackTypes>();
    const {pet, category, token, type} = navigation.getState()?.routes[2]?.params as 
    {pet: AnimalDataResponse, category: string, token: string, type: string};
    const [isFirstLoad, setIsFirstLoad] = useState(true);
    const [data, setData] = useState<AnimalDataResponse>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      if (isFirstLoad) {
        setLoading(true);
        GetAnimalDetail(pet ?? '', token ?? '', type ?? '').then((result) => {
            setData(result); 
        })
        setLoading(false);
        setIsFirstLoad(false);
      }
    }, [isFirstLoad]);


    return (
        <View style={styles.container}>
            {loading && data ? 
                <Image source={require('../assets/loading-7528_256.gif')} style={{width: 200, height: 200}}/> 
             :
                <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
                    <Image source={{uri:data?.img}} style={{width: 385, height: 385}}/>
                    <TouchableOpacity style={[styles.buttonPressable, styles.buttonMoreImg]}>
                        <Text style={styles.buttonText}>+</Text>
                    </TouchableOpacity>
                    <View style={styles.headerInfo}>
                        <Text style={[styles.text, styles.petCategory]}>{category}</Text>
                        <Text style={styles.petName}>{data?.name}</Text>
                        <Text style={styles.text}> Age: {data?.age}</Text>
                    </View>
                    <Text style={[styles.text, styles.description]}> {data?.description}</Text>
                    <View style={styles.contactSession}>
                        <Text style={[styles.text, styles.contactTitle]}>Contact Information</Text>
                        <Text style={styles.text}>Number: {data?.phone}</Text>
                        <Text style={styles.text}>Email: {data?.email}</Text>
                    </View>
                    <TouchableOpacity style={styles.buttonPressable} onPress={() => navigation.goBack()}>
                         <Text style={styles.buttonText}>Voltar</Text>
                    </TouchableOpacity>
                </ScrollView>
            }
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: '#fff',
      display: 'flex',
    },
    text:{
        marginLeft: 30,
        marginRight: 30,
        marginBottom: 10,
    },
    petCategory: {
        marginTop:10,
        fontSize: 18,
    },
    petName: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#cb3ce3'
    },
    headerInfo : {
        width: '90%',
        borderBottomWidth : 1,
        alignItems: 'center',
        marginBottom: 20,
    },
    description: {
        marginBottom: 20,
    },
    contactSession: {
        backgroundColor: '#f0e68c',
        width: '100%',
        alignItems: 'center',
        marginBottom: 10,
    },
    contactTitle: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
    },
    buttonPressable: {
        width: 50,
        height: 50,
        borderRadius: 100 ,
        borderTopColor: "black",
        backgroundColor:"#cb3ce3",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonMoreImg: {
        zIndex: 1,
        alignSelf: 'flex-end',
        position: 'absolute',
        top: 310,
        right: 20
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    scrollView : {
        flex: 1,
    },
    scrollViewContent : {
        borderRadius: 10,
        paddingBottom: 20,
        flexGrow: 1,
        alignItems: 'center',
    }
})

export default DetailsScreen;