
import React, {useEffect, useState}from 'react';
import { StyleSheet, Text, View, Pressable, Image, ScrollView } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { useNavigation } from '@react-navigation/native';
import { StackTypes } from '../App';
import GetCategories from '../api/api_home_categories';
import GetAllAnimals from '../api/api_home_animals';
import {AnimalDataResponse } from '../types/AnimalData';

const HomeScreen = () => {
    const navigation = useNavigation<StackTypes>();
    const {params} = navigation.getState()?.routes[1];
    const { token = '', type = '' } = params || {};
    const [allAnimals, setAllAnimal] = useState<AnimalDataResponse[]>([]);
    const [filteredAnimals, setFilteredAnimals] = useState<AnimalDataResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [isFirstLoad, setIsFirstLoad] = useState(true);
    const [optionsDropdown, setOptionsDropdown] = useState([ {label: 'Todos', value: 'Todos'}]);
    const [selectedCategory, setSelectedCategory] = useState(optionsDropdown[0].value);

    useEffect(() => {
        if (isFirstLoad) {
          setLoading(true);
          // para garantir que todas as operações assíncronas sejam concluídas antes de atualizar os estados
          //evitando múltiplas renderizações enquanto carrega os dados
          Promise.all([
            GetCategories(token ?? '', type ?? ''),
            GetAllAnimals(token ?? '', type ?? '')
          ]).then(([categories, animals]) => {
            const categoryOptions = categories.map((item: any) => ({
              label: item.name,
              value: item.id
            }));
            categoryOptions.unshift({label: 'Todos', value: 'Todos'});
            setOptionsDropdown(categoryOptions);
            setAllAnimal(animals);
            setFilteredAnimals(animals);
            setLoading(false);
            setIsFirstLoad(false);
          }).catch(error => {
            console.error("Erro ao carregar dados:", error);
            setLoading(false);
            setIsFirstLoad(false);
          });
        }
      }, [isFirstLoad, token, type]);

    useEffect(() => {
        updateDataAnimal(selectedCategory);
    }, [selectedCategory]);

    const updateDataAnimal = (categoryId: string) => {
        setLoading(true);
        if (categoryId === 'Todos') {
            setFilteredAnimals(allAnimals);
        } else {
            const newAllAnimals = allAnimals.filter(item => item.categoryId === categoryId);
            setFilteredAnimals(newAllAnimals);
        }
        setLoading(false);
    }

    const GetCategNamebyId = (id : string) => {
        const categoryFound = optionsDropdown.find(item => item.value === id)?.label;
        return categoryFound ?   
            Number(id) < 10 ?
                 categoryFound+ ' 0' + id : 
                 categoryFound + ' ' + id 
            : 'Categoria não encontrada';
    }

    const handlePetDetail = (animal : AnimalDataResponse) => {
        const categoryName = GetCategNamebyId(animal.categoryId);
        navigation.navigate('Details', {pet: animal, category: categoryName, token, type} )
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
                value={selectedCategory}
                maxHeight={300}
                labelField='label'
                valueField='value'
                onChange={item => {
                    setLoading(true);
                    setSelectedCategory(item.value);
                    updateDataAnimal(item.value);
                    }}
            />
            <View style={styles.searchResults}>
                <Text style={styles.searchResultsText}>Resultados da busca:</Text>
                <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
                    {loading ? 
                        <Image style={styles.imageLoading} source={require('../assets/loading-7528_256.gif')} />
                        : 
                        filteredAnimals.length === 0 ? 
                            <Text style={styles.noResultText}>Nenhum resultado encontrado</Text> 
                            :
                            filteredAnimals.map((item, index) => (
                                <View  key={index}>
                                    <Pressable  key={item.id} style={styles.petContainerPressable} onPress={() => {handlePetDetail(item)}}>
                                        <Image style={styles.image} source={{uri:item.img}} accessibilityLabel={`Imagem de ${item.name}`}/>
                                        <View style={styles.petInfo}>
                                            <Text style={styles.petType} accessibilityLabel={`Category: ${GetCategNamebyId(item.categoryId)}`}>{GetCategNamebyId(item.categoryId)}</Text>
                                            <Text style={styles.petName} accessibilityLabel={`Nome: ${item.name}`} >{item.name}</Text>
                                            <Text style={styles.petAge} accessibilityLabel={`Age: ${item.age} years`} >{item.age} Anos</Text>
                                        </View>
                                    </Pressable>
                                </View>
                            ))
                }
                </ScrollView>
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
    imageLoading: {
        width: 100,
        height: 100,
        alignSelf: 'center',
    },
    noResultText:{
        alignSelf: 'center',
        marginTop: 30,
        color: '#cb3ce3',
        fontSize: 18,
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
        height : 85,
        marginLeft: 30,
        marginRight: 30,
        marginTop: 10,
        marginBottom: 10,
        display: 'flex',
        flexDirection: 'row',
        borderRadius: 10,
    }, 
    image: {
        width: 85,
        height: 85,
        borderTopLeftRadius: 10, 
        borderBottomLeftRadius: 10,
        alignSelf: 'flex-start',
    },
    petInfo : {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: 200,
    },
    petType : {	
        fontWeight: 'bold',
        fontSize: 14,
        paddingLeft: 10,    
        marginBottom: 5,
        textAlign: 'left'
    },
    petName : {
        fontWeight: 'bold',
        paddingLeft: 10,
    },
    petAge : {
        paddingLeft: 10,
        fontSize: 12,
    },
    scrollView : {
        maxHeight: 420,
    },
    scrollViewContent : {
        borderRadius: 10,
        paddingBottom: 20,
    }
});

export default HomeScreen;