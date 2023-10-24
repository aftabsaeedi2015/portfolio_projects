import React ,{useEffect}from 'react'
import { useState } from 'react';
import {useSelector,useDispatch} from 'react-redux'
import { DeleteUserAds, getUserAds } from './data/dbOperations';
import {View,StyleSheet} from 'react-native'
import MyAdListItem from '../styledComponents/myAdListItem';
import { Button,Text, useTheme } from 'react-native-paper';
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
        }
        fetchUserAds()
    }, [changeInData])
    );

    const styles = StyleSheet.create({
        noAdsText:{
            fontSize: 20,
            fontWeight: 'bold',

        },
        parentContainer:{
            flex: 1,
            alignItems:'center',
            justifyContent: 'space-between',
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
        }

    })
  return (
    <View style = {styles.parentContainer}>
        <Button
        style = {styles.deleteButton}
        mode='contained'
        onPress={()=>deleteSelectedAds()}
        disabled = {selectedAds.length===0? true:false}
        textColor={'white'}
        rippleColor={'white'}

        >
            delete
        </Button>
        <View style ={styles.adContainer}>
    {myAds ? myAds.map((myAd,index)=>{
        return <MyAdListItem
        navigation = {navigation}
        key = {index}
        item = {myAd}
        addToSelectedAds ={addToSelectedAds}
        />

    }): <Text style = {styles.noAdsText}>You have not posted any ad</Text>
}
</View>
<MainMenuBar navigation={navigation}/>
    </View>
  )
}

export default MyAdsScreen
