import React , { useEffect, useState } from 'react'
import {Card, Text,Snackbar} from 'react-native-paper'
import { View,StyleSheet, Image, TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { addToFavorites, getCoverImage,existsInFavorites } from '../screens/data/dbOperations'
import {useSelector,useDispatch} from 'react-redux'

function ResultListItem({navigation,item,itemSelectionHandler,handleSnackbar}) {
    const styles = StyleSheet.create({
        parentContainer : {
          display: 'flex',
          flexDirection: 'row',
          padding: 10
        },
        card: {
          display: 'flex',
          flexDirection: 'row'
        },
        image: {
          height: 100,
          width: 100
        },
        descriptionContainer: {
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          padding: 5
        },
        descriptionUp: {

        },
        descriptionDown: {
          width: 250,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'end',
          justifyContent: 'space-between',

        },
        locationDescription: {
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 3,
        },
        heart:{
          color: heartColor
        }

      })
    const user = useSelector(state=>state.user)
    const userId = user.userId
    const [heartColor,setHeartColor] = useState('')
    const [downloadUrl,setDownloadUrl] = useState(null)
    const addToFavoriteHandler = async () => {
      try {
        const response = await addToFavorites(userId, item.adId);
        handleSnackbar(response);
      } catch (err) {
        console.log(err);
      }
    };

    useEffect(() => {
      const fetchData = async () => {
        try {
          const downloadURL = await getCoverImage(item.adId);
          setDownloadUrl(downloadURL);

          // decide the color of the heart
          const exists = await existsInFavorites(userId, item.adId);
          setHeartColor(exists ? 'blue' : 'black');
        } catch (err) {
          console.log(err);
        }
      };

      fetchData();
    }, []);

  return (
    <View style = {styles.parentContainer}>
          <TouchableOpacity onPress={()=>{itemSelectionHandler(item)}}>
            <Image source={{uri: downloadUrl}} style = {styles.image}/>
          </TouchableOpacity>
          <View style={styles.descriptionContainer}>
            <View style ={styles.descriptionUp}>
              <Text>
               {item.adData.title}
              </Text>
              <Text>
              {item.adData.price}
              </Text>
            </View>
            <View style = {styles.descriptionDown}>
              <View style={styles.locationDescription}>
                <Icon name={'mobile'} size={30} style={styles.icon}/>
                <Text>
                {item.adData.location}
                </Text>
              </View>
              <Icon name={'heart'} size={20} style={styles.heart} onPress={()=>{addToFavoriteHandler()}}/>
            </View>
          </View>
        </View>
  )
}

export default ResultListItem
