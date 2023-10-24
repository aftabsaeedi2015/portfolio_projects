import React from 'react'
import {Text} from 'react-native-paper'
import { StyleSheet,View, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';

const styles =StyleSheet.create({
    appBar: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around',
        backgroundColor: 'white'
    },
    icon:{

    },
    appBarItem: {

    }
    })

function MainMenuBar({navigation}) {
  return (
    <View style = {styles.appBar}>
            <TouchableOpacity onPress = {()=>{navigation.navigate('Home')}}>
                <View style = {styles.appBarItem}>
                    <Icon name="home" size={40} style={styles.icon}/>
                    <Text>Home</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress = {()=>{navigation.navigate('MyAds')}}>
                <View style = {styles.appBarItem}>
                    <Icon name="book" size={40} style={styles.icon}/>
                    <Text>My Ads</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress = {()=>{navigation.navigate('Post')}}>
                <View style = {styles.appBarItem}>
                    <Icon name="pencil" size={40} style={styles.icon}/>
                    <Text>Post</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress = {()=>{navigation.navigate('Favorites')}}>
                <View style = {styles.appBarItem}>
                    <Icon name="heart" size={35} style={styles.icon}/>
                    <Text>Favorites</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress = {()=>{navigation.navigate('Message')}}>
                <View style = {styles.appBarItem}>
                    <Icon name="envelope" size={40} style={styles.icon}/>
                    <Text>Messages</Text>
                </View>
            </TouchableOpacity>
        </View>
  )
}

export default MainMenuBar
