
import React, {useEffect, useState}from 'react';
import { StyleSheet, Text, View, Pressable, Image, ScrollView } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { useNavigation } from '@react-navigation/native';
import { StackTypes } from '../App';
import GetCategories from '../api/api_home_categories';
import GetAnimalDetail from '../api/api_details';
import GetAllAnimals from '../api/api_home_animals';

const optionsDropdown = [
    {label: 'Todos', value: 'Todos'}
];

type AnimalDataResponse = {
    id: number,
    name: string,
    age: number,
    categoryId: string,
    description: string,
    img: string,
}

const HomeScreen = () => {
    const navigation = useNavigation<StackTypes>();
    const token =  navigation.getState()?.routes[1]?.params?.token;
    const type = navigation.getState()?.routes[1]?.params?.type;
    const [data, setData] = useState<AnimalDataResponse[]>([]);
    const [dataToShow, setDataToShow] = useState<AnimalDataResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [value, setValue] = useState(optionsDropdown[0].value);
    const [isFirstLoad, setIsFirstLoad] = useState(true);


    useEffect(() => {
      if (isFirstLoad) {
        setLoading(true);
        GetCategories(token ?? '', type?? '').then((result) => {
            result.map((item : any) => {
                optionsDropdown.push({label: item.name, value: item.id});
            });
        });
        GetAllAnimals(token ?? '', type ?? '').then((result) => {
            setData(result);
            setDataToShow(result); 
        })
        setLoading(false);
        setIsFirstLoad(false);
      }
    }, [isFirstLoad]);

    const updateDataAnimal =  (categoryId : string) => {
        GetAllAnimals(token ?? '', type ?? '').then((result) => {
            setData(result);
        });
        const newData = data.filter((item) => { 
            if (categoryId === 'Todos') {
                return item
            } 
            if( item.categoryId === categoryId){ 
                console.log('igual')
               return item
            }
        })
        setDataToShow(newData); 
        setLoading(false);
    }

    const GetCategNamebyId = (id : string) => {
        const categoryName = optionsDropdown.find(item => item.value === id)?.label;
        if (categoryName === undefined) {
            // return 'Categoria não encontrada';
            return 'Schweizerischer Niederlaufhund 8'
        }
        if (Number(id) < 10){
            return categoryName + ' 0' + id;
         } else {
            return categoryName + ' ' + id;
         }

    }

    const handlePetDetail = () => {
        navigation.navigate('Details')
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
                onChange={item => {
                    setLoading(true);
                    setValue(item.value);
                    updateDataAnimal(item.value);
                    }}
            />
            <View style={styles.searchResults}>
                <Text style={styles.searchResultsText}>Resultados da busca:</Text>
                <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
                    {loading ? 
                        <Image style={styles.imageLoading} source={require('../assets/loading-7528_256.gif')} />
                        : 
                        dataToShow.length === 0 ? 
                            <Text style={styles.noResultText}>Nenhum resultado encontrado</Text> 
                            :
                            dataToShow.map((item, index) => (
                                <View  key={index}>
                                    <Pressable  key={item.id} style={styles.petContainerPressable} onPress={() => {handlePetDetail()}}>
                                        <Image style={styles.image} source={{uri:item.img}} />
                                        <View style={styles.petInfo}>
                                            <Text style={styles.petType}>{GetCategNamebyId(item.categoryId)}</Text>
                                            <Text style={styles.petName}>{item.name}</Text>
                                            <Text style={styles.petAge}>{item.age} Anos</Text>
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

        flexWrap: 'wrap',
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
        // flexWrap: 'wrap',
    },
    petType : {	
        fontWeight: 'bold',
        fontSize: 14,
        paddingLeft: 10,
        
        // flexWrap: 'wrap',
        // flex : 3,
    },
    petName : {
        fontWeight: 'bold',
        paddingLeft: 10,
    },
    petAge : {
        paddingLeft: 10,
    },
    scrollView : {
        maxHeight: 420,
    },
    scrollViewContent : {
        // overflow: 'hidden',
        borderRadius: 10,
        paddingBottom: 20,
    }
});

export default HomeScreen;