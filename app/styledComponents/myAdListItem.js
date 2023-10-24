import React , { useEffect, useState } from 'react'
import {Card, Text,Snackbar,useTheme,Checkbox} from 'react-native-paper'
import { View,StyleSheet, Image, TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { addToFavorites, getCoverImage,existsInFavorites,removeFromFavorites } from '../screens/data/dbOperations'
import {useSelector,useDispatch} from 'react-redux'

// item is in the following format:
// {adId: adId,adData: adData}

function MyAdListItem({navigation,item,addToSelectedAds}) {
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
        blackIcon: {
          color: 'black'
        },
        blueIcon: {
          color: theme.colors.background
        },
        snackbar:{
          position: 'absolute',
          backgroundColor: theme.colors.background,
          top: 400,
          width: '100%'

        },
      snackbarText: {
      color: 'white'
      },
      checkboxContainer:{
        // borderRadius: 1,
        borderColor: 'black'
      }

      })
    const dispatch = useDispatch()
    const user = useSelector(state=>state.user)
    const userId = user.userId
    const changeInData = user.changeInData
    const [imageUrl,setImageUrl] = useState('')
    const[snackbarVisiblility,setSnackbarVisibility] = useState(false)
    const [snackbarValue,setSnackbarValue] = useState('')
    const [status, setStatus] = useState(false)
    const handleSnackbar=(response)=>{
        setSnackbarValue(response)
        setSnackbarVisibility(true)
      }


    useEffect(() => {
      const fetchData = async () => {
        try {
          const url = await getCoverImage(item.adId);
          setImageUrl(url);
        } catch (err) {
          console.log(err);
        }
      };

      fetchData();
    }, [changeInData]);

  return <>
    <TouchableOpacity style = {styles.parentContainer} key = {item.adId} onPress={()=>{navigation.navigate('ItemDescription',{ item: item })}}>
          <View>
            <Image source={{uri: imageUrl}} style = {styles.image}/>
          </View>
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
              <View stylel = {styles.checkboxContainer}>
              <Checkbox
            status = {status ? 'checked':'indeterminate'}
            onPress={() => {
                setStatus(prevStatus => {
                  const updatedStatus = !prevStatus;
                  addToSelectedAds(item.adId, updatedStatus);
                  return updatedStatus;
                });
              }}
              color={theme.colors.background}
              style = {{backgroundColor: 'red'}}
            />
              </View>
            </View>
          </View>
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

export default MyAdListItem
