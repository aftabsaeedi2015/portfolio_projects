import React ,{useEffect}from 'react'
import { useState } from 'react';
import {useSelector,useDispatch} from 'react-redux'
import { DeleteUserAds, getUserAds } from './data/dbOperations';
import {View,StyleSheet,SafeAreaView} from 'react-native'
import MyAdListItem from '../styledComponents/myAdListItem';
import { Button,Text, useTheme,ActivityIndicator, Divider } from 'react-native-paper';
import MainMenuBar from '../styledComponents/mainMenuBar';
import { useFocusEffect } from '@react-navigation/native';



function MyAdsScreen({navigation}) {
    const theme = useTheme()
    const user = useSelector(state=>state.user)
    const userId = user.userId
    const dispatch = useDispatch()
    const changeInData = user.changeInData
    const [myAds,setMyAds] = useState([])
    const [selectedAds,setSelectedAds] = useState([])
    const [loading, setLoading] = useState(true)
    const addToSelectedAds =(adId,status)=>{
        if(status && !selectedAds.includes(adId)){
            setSelectedAds([...selectedAds,adId])
        }
        else if(!status){
            const newSelectedAds = selectedAds.filter(id => id !== adId);
            setSelectedAds(newSelectedAds)
        }
    }
    const deleteSelectedAds = async () => {
        console.log(selectedAds)
        try{
            await DeleteUserAds(userId,selectedAds)
            dispatch({type: 'changeInData'})
        }
        catch(err){
            console.log(err)
        }
    }
    useFocusEffect(
        React.useCallback(() => {
        const fetchUserAds =async ()=>{
            const response = await getUserAds(userId)
            setMyAds(response)
            setLoading(false)
        }
        fetchUserAds()
    }, [changeInData])
    );

    const styles = StyleSheet.create({
        safeArea:{
            flex: 1
        },
        noAdsText:{
            fontSize: 20,
            fontWeight: 'bold',

        },
        parentContainer:{
            flex: 1,
            alignItems:'center',
            justifyContent: 'flex-start',
        },
        deleteButton:{
            alignSelf: 'flex-end',
            backgroundColor: theme.colors.background,
            color: 'white',
            marginRight: 20,
            marginTop: 20
        },
        adContainer:{
            flex: 1,
            alignItems: 'flex-start',
            justifyContent: 'flex-start'
        },
        loadingIcon:{
            position: 'absolute',
            top: '50%',
            left: '50%'
          },

    })
  return (
    <SafeAreaView style={styles.safeArea}>
    <View style = {styles.parentContainer}>
        {loading&&<View style = {{flex: 1,backgroundColor: 'black'}}>
            <ActivityIndicator
                          animating={true}
                          size = {40}
                          style = {styles.loadingIcon}
                          color={theme.colors.background} />
                          </View>
              }
        {!loading&&<Button
        style = {styles.deleteButton}
        mode='contained'
        onPress={()=>deleteSelectedAds()}
        disabled = {selectedAds.length===0? true:false}
        textColor={'white'}
        rippleColor={'white'}

        >
            delete
        </Button>}
        <Divider style = {{backgroundColor: 'black'}}/>
        <View style ={styles.adContainer}>
    {!loading && myAds.map((myAd,index)=>{
        return <MyAdListItem
        navigation = {navigation}
        key = {index}
        item = {myAd}
        addToSelectedAds ={addToSelectedAds}
        />
    })}
    {myAds.length===0 && <Text>you have not posted any ad</Text>}
</View>
<MainMenuBar navigation={navigation}/>
    </View>
    </SafeAreaView>
  )
}

export default MyAdsScreen
