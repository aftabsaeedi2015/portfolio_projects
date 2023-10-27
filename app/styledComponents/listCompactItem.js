import React, { useEffect, useState } from 'react'
import {StyleSheet} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import {Text,Card,Button,useTheme, ThemeProvider,Snackbar} from 'react-native-paper'
import { TouchableOpacity } from 'react-native'
import { existsInFavorites, getCoverImage,addToFavorites,removeFromFavorites, existsInUserAds } from '../screens/data/dbOperations';
import {useSelector,useDispatch} from 'react-redux'


// accepts object in the form of {adId: adId,adData:adData}
function ListCompactItem({navigation,item,fetchRefreshedData}) {
    const theme = useTheme()
    const styles = StyleSheet.create({
        item: {
            padding: 10,
            backgroundColor: 'white',
            width: 120,
            height:200,
            justifyContent: 'space-between'
        },
        itemImage: {
            height: 100,
        },
        blackIcon: {
            color: 'black'
        },
        blueIcon: {
            color: theme.colors.background
        },
        snackbar:{
          position: 'absolute',
          backgroundColor: theme.colors.background,
          top: 120,
          width: '100%'
        },
      snackbarText: {
      color: 'white'
      }
    })
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const userId = user.userId
    const changeInData = user.changeInData
    const [adData,setAdData] = useState({})
    const [adExistsInFavorites,setAdExistsInFavorites] = useState(false)
    const adId = item.adId
    const [downloadUrl,setDownloadUrl] = useState(null)
    const[snackbarVisiblility,setSnackbarVisibility] = useState(false)
    const [snackbarValue,setSnackbarValue] = useState('')
    const [adExistsInUserAds, setAdExistsInUserAds] = useState(false)
    const handleSnackbar=(response)=>{
        setSnackbarValue(response)
        setSnackbarVisibility(true)
      }
    const addToFavoriteHandler = async () => {
        dispatch({type: 'changeInData'})
        try {
          if (adExistsInFavorites) {
            // If the item is already in favorites, remove it
            const response = await removeFromFavorites(userId, item.adId); // You need to create this function
            handleSnackbar(response);
          } else {
            // If the item is not in favorites, add it
            const response = await addToFavorites(userId, item.adId);
            handleSnackbar(response);
          }
        } catch (err) {
          console.log(err);
        }
      };


      useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await existsInUserAds(userId,item.adId)
            setAdExistsInUserAds(response)
            console.log(adId)
            const downloadURL = await getCoverImage(adId);
            console.log('download url is ',downloadURL)
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
      }, [changeInData]);


  return <>
    <TouchableOpacity  onPress = {()=>{
      navigation.navigate('ItemDescription',{ item: item })
      dispatch({type: 'changeInData'})
      }}>
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
            {adExistsInUserAds ? null:
            <Icon
            name="heart"
            size={20}
            style={adExistsInFavorites ? styles.blueIcon : styles.blackIcon }
            onPress={()=>addToFavoriteHandler()}/>
            }
            </Card.Actions>
        </Card>
    </TouchableOpacity>
    <Snackbar
    style = {styles.snackbar}
    visible={snackbarVisiblility}
    onDismiss = {()=>{setSnackbarVisibility(false)}}
    duration = '2000'
    >
        <Text style = {styles.snackbarText}>
            {snackbarValue}
        </Text>
    </Snackbar>
    </>

}

export default ListCompactItem
