import React, { useEffect, useState } from 'react'
import {StyleSheet} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import {Text,Card,Button,useTheme, ThemeProvider} from 'react-native-paper'
import { TouchableOpacity } from 'react-native'
import { existsInFavorites, getCoverImage,addToFavorites,removeFromFavorites } from '../screens/data/dbOperations';
import {useSelector} from 'react-redux'

// accepts object in the form of {adId: adId,adData:adData}
function ListCompactItem({key,navigation,item,handleSnackbar}) {
    const theme = useTheme()
    const styles = StyleSheet.create({
        item: {
            padding: 10,
            backgroundColor: 'white',
            width: 120
        },
        itemImage: {
            height: 100
        },
        blackIcon: {
            color: 'black'
        },
        blueIcon: {
            color: theme.colors.background
        },
    })
    const user = useSelector(state => state.user)
    const userId = user.userId
    const [adData,setAdData] = useState({})
    const [adExistsInFavorites,setAdExistsInFavorites] = useState(false)
    const adId = item.adId
    const [downloadUrl,setDownloadUrl] = useState(null)
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
            const downloadURL = await getCoverImage(adId);
            setDownloadUrl(downloadURL);

            // Set the ad data
            setAdData(item.adData);

            // Set the heart color
            const exists = await existsInFavorites(userId, item.adId);
            setAdExistsInFavorites(exists)
          } catch (err) {
            console.log(err);
          }
        };

        fetchData();
      }, [adData,adExistsInFavorites]);


  return (
    <TouchableOpacity  onPress = {()=>{navigation.navigate('ItemDescription',{ item: item })}}>
        <Card style={styles.item}>
            <Card.Cover source={{uri : downloadUrl}} style={styles.itemImage}/>
            <Card.Content>
                <Text>
                    {adData.title}
                </Text>
                <Text>
                    ${adData.price}
                </Text>
            </Card.Content>
            <Card.Actions>
            <Icon name="heart" size={20} style={adExistsInFavorites ? styles.blueIcon : styles.blackIcon } onPress={()=>addToFavoriteHandler()}/>
            </Card.Actions>
        </Card>
    </TouchableOpacity>
  )
}

export default ListCompactItem
