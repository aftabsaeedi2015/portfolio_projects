import React, { useEffect, useState } from 'react'
import {StyleSheet} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import {Text,Card,Button,useTheme} from 'react-native-paper'
import { TouchableOpacity } from 'react-native'
import { existsInFavorites, getCoverImage,addToFavorites } from '../screens/data/dbOperations';
import {useSelector} from 'react-redux'

// accepts object in the form of {adId: adId,adData:adData}
function ListCompactItem({navigation,item,handleSnackbar}) {
    const styles = StyleSheet.create({
        item: {
            padding: 10,
            backgroundColor: 'white',
            width: 120
        },
        itemImage: {
            height: 100
        },
        icon: {
            color: heartColor
        },
    })
    const user = useSelector(state => state.user)
    const userId = user.userId
    const [adData,setAdData] = useState({})
    const [heartColor,setHeartColor] = useState('black')
    const adId = item.adId
    const [downloadUrl,setDownloadUrl] = useState(null)
    const addToFavoriteHandler = async () => {
        try {
          console.log('hell');
          const response = await addToFavorites(userId, item.adId);
          handleSnackbar(response);
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
            setHeartColor(exists ? 'blue' : 'black');
          } catch (err) {
            console.log(err);
          }
        };

        fetchData();
      }, [adData]);


  return (
    <TouchableOpacity key = {adId} onPress = {()=>{navigation.navigate('ItemDescription',{ item: item })}}>
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
            <Icon name="heart" size={20} style={styles.icon} onPress={()=>addToFavoriteHandler()}/>
            </Card.Actions>
        </Card>
    </TouchableOpacity>
  )
}

export default ListCompactItem
