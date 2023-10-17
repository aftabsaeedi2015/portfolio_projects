import React from 'react'
import {Text} from 'react-native-paper'
import { StyleSheet,View, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';


const styles =StyleSheet.create({
    categoriesContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        width: '100%',
        justifyContent: 'space-evenly',
        alignItems: 'flex-end',
        padding: 10
    },
    categoryItem: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    })
function ItemCategoriesBar({navigation,categoryHandler}) {
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
  return (
    <View style = {styles.categoriesContainer}>
        {categories.map(category=>{
        return <TouchableOpacity onPress = {()=>{categoryHandler(category.name)}}>
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

export default ItemCategoriesBar
