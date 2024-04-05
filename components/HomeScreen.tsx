
import React, {useState}from 'react';
import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { useNavigation } from '@react-navigation/native';
import { StackTypes } from '../App';

const optionsDropdown = [
    {label: 'Todos', value: 'Todos'},
    {label: 'Cachorros', value: 'Cachorros'},
    {label: 'Gatos', value: 'Gatos'},
    {label: 'Coelhos', value: 'Coelhos'},
    {label: 'Peixes', value: 'Peixes'}
];

const HomeScreen = () => {
    const navigation = useNavigation<StackTypes>();
    const [value, setValue] = useState(optionsDropdown[0].value);

    const handlePetDetail = () => {
        navigation.navigate('Details')
    }

    const ResultHandler = () => {
        return (
            <Pressable style={styles.petContainerPressable} onPress={() => {handlePetDetail()}}>
                    <Image style={styles.image} source={require('../assets/ico.png')} />
                    <View style={styles.petInfo}>
                        <Text style={styles.petType}>PET TYPE</Text>
                        <Text style={styles.petName}>Pet Name</Text>
                        <Text style={styles.petAge}>PET AGE</Text>
                    </View>
            </Pressable>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={[styles.text, styles.title]}>HOME</Text>
            <Text style={[styles.text, styles.directions]}>Escolha uma categoria para visualizar</Text>
            <Dropdown 
                style={styles.dropdown}
                data={optionsDropdown} 
                selectedTextStyle={styles.selectedTextDropdown}
                inputSearchStyle={styles.inputSearchDropdown}
                iconStyle={styles.iconDropdown}
                value={value}
                maxHeight={300}
                labelField='label'
                valueField='value'
                onChange={item => setValue(item.value)}
            />
            <View style={styles.searchResults}>
                <Text style={styles.searchResultsText}>Resultados da busca:</Text>
                {ResultHandler()}
            </View>
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
        marginBottom: 5
    },
    title: {
        fontWeight: 'bold',
    },
    searchResults: {
        backgroundColor: '#fae8ff',
    },
    searchResultsText:{
        marginLeft: 30,
        marginTop: 20,
        fontSize: 18,
        color: '#cb3ce3',
        fontWeight: 'bold',
    },
    dropdown: {
        backgroundColor: '#f9c100',
        borderRadius: 100,
        margin: 30,
        height: 40,
        marginTop: 10,
        width: 130,
        padding: 10,
        color: '#fff',
    },
    selectedTextDropdown: {
        color: '#fff',
        fontWeight: 'bold',
        paddingLeft: 10,
    },
    inputSearchDropdown: {
        color: '#fff',
    },
    iconDropdown: {
        tintColor: '#fff',
        paddingRight: 10,
    },
    petContainerPressable: {
        backgroundColor: '#fff',
        height : 70,
        marginLeft: 30,
        marginRight: 30,
        marginTop: 10,
        marginBottom: 10,
        display: 'flex',
        flexDirection: 'row',
        borderRadius: 10, 
    }, 
    image: {
        width: 70,
        height: 70,
        borderTopLeftRadius: 10, 
        borderBottomLeftRadius: 10,
        alignSelf: 'flex-start',
    },
    petInfo : {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    petType : {	
        paddingLeft: 10,
    },
    petName : {
        paddingLeft: 10,
    },
    petAge : {
        paddingLeft: 10,
    },
});

export default HomeScreen;