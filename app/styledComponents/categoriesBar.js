import React from 'react'
import {Text} from 'react-native-paper'
import { StyleSheet,View, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { getCategoryAds } from '../screens/data/dbOperations';


const styles =StyleSheet.create({
    categoriesContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        width: '100%',
        justifyContent: 'space-evenly',
        alignItems: 'flex-end',
        padding: 10,
    },
    categoryItem: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon:{
    }
    })
function CategoriesBar({navigation}) {
    const categories = [
        {
            icon: 'mobile',
            name: 'electronics'
        },
        {
            icon: 'car',
            name: 'vehicles'
        },
        {
            icon: 'mobile',
            name: 'clothing'
        },
        {
            icon: 'car',
            name: 'more categories'
        },
    ]
    const handleCategorySelection = async (category) => {
          navigation.navigate('CategoryResult', { category: category });
    }
  return (
    <View style = {styles.categoriesContainer}>
        {categories.map((category,index)=>{
        return <TouchableOpacity key={index} onPress = {()=>{handleCategorySelection(category.name)}}>
                    <View style={styles.categoryItem}>
                        <Icon name={category.icon} size={50} style={styles.icon}/>
                        <Text>{category.name}</Text>
                    </View>
                </TouchableOpacity>
                }
        )}
    </View>
  )
}

export default CategoriesBar
