import React , { useEffect, useState } from 'react'
import {Card, Text,Snackbar, ThemeProvider,useTheme} from 'react-native-paper'
import { View,StyleSheet, Image, TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { addToFavorites, getCoverImage,existsInFavorites,removeFromFavorites } from '../screens/data/dbOperations'
import {useSelector,useDispatch} from 'react-redux'

function ResultListItem({navigation,key,item,itemSelectionHandler,handleSnackbar,}) {
  console.log(item)
  const theme = useTheme()
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
        },
        blackIcon: {
          color: 'black'
        },
        blueIcon: {
          color: theme.colors.background
        }

      })
    const user = useSelector(state=>state.user)
    const userId = user.userId
    const [heartColor,setHeartColor] = useState('')
    const [downloadUrl,setDownloadUrl] = useState(null)
    const [adExistsInFavorites,setAdExistsInFavorites] = useState(false)
    const addToFavoriteHandler = async () => {
      try {
        if (adExistsInFavorites) {
          // If the item is already in favorites, remove it
          const response = await removeFromFavorites(userId, item.adId); // You need to create this function
          handleSnackbar(response);
          setAdExistsInFavorites(false);
        } else {
          // If the item is not in favorites, add it
          const response = await addToFavorites(userId, item.adId);
          handleSnackbar(response);
          setAdExistsInFavorites(true);
        }
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
    <View style = {styles.parentContainer} key = {key}>
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
              <Icon name="heart" size={20} style={adExistsInFavorites ? styles.blueIcon : styles.blackIcon } onPress={()=>addToFavoriteHandler()}/>
            </View>
          </View>
        </View>
  )
}

export default ResultListItem
