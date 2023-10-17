import React from 'react'
import {Card, Text,useTheme} from 'react-native-paper'
import { View,StyleSheet, Image, TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

const styles = StyleSheet.create({
    parentContainer : {
      display: 'flex',
      flexDirection: 'row',
      padding: 10,
      gap: 5,
      backgroundColor: 'red'
    },
    image: {
      height: 100,
      width: 100,
      borderRadius: 3
    },
    description: {
        gap: 10,
        justifyContent: 'space-between',
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 3,
        padding: 5
    },
    message:{
        fontStyle: 'italic'
    },
    text: {
        fontWeight: 'bold'
    },
    time: {
        alignSelf: 'flex-end'
    }

  })

function MessageItem({navigation}) {
    const theme = useTheme()

    const styles = StyleSheet.create({
        parentContainer : {
          display: 'flex',
          flexDirection: 'row',
          padding: 10,
          gap: 5,
          backgroundColor: theme.colors.background
        },
        image: {
          height: 100,
          width: 100,
          borderRadius: 3
        },
        description: {
            gap: 10,
            justifyContent: 'space-between',
            flex: 1,
            backgroundColor: 'white',
            borderRadius: 3,
            padding: 5
        },
        message:{
            fontStyle: 'italic'
        },
        text: {
            fontWeight: 'bold'
        },
        time: {
            alignSelf: 'flex-end'
        }

      })

  return (
        <View style = {styles.parentContainer}>
          <TouchableOpacity onPress={()=>{navigation.navigate('SellerBuyerInteractionScreen')}}>
            <Image source={require('../assets/phone.jpg')} style = {styles.image}/>
          </TouchableOpacity>
            <View style = {styles.description}>
                <View style = {styles.titleAndPrice}>
                    <Text style = {styles.text}>
                        iphone x
                    </Text>
                    <Text style = {styles.text}>
                        1000$
                    </Text>
                </View>
                <View style ={styles.messageContainer}>
                    <Text style = {styles.message}>
                        hello, i was interested to buy your iphone x
                    </Text>
                </View>
                <Text style = {styles.time}>
                    2 hours ago
                </Text>
            </View>

        </View>

  )
}

export default MessageItem
