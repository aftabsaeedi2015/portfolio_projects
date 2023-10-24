import React,{useState,useEffect} from 'react'
import { Text,Button,useTheme } from 'react-native-paper'
import MessageListItem from '../styledComponents/MessageListItem'
import {useSelector} from 'react-redux'
import { deleteAdInteractions, getAdsInteractedWith, getSendOrReceivedMessages } from './data/dbOperations'
import {View,StyleSheet} from 'react-native'

function ReceivedMessagesScreen({navigation}) {
  const theme = useTheme()
  const user = useSelector(state=>state.user)
  const userId = user.userId
  const changeInData = user.changeInData
  const [chatHistory,setChatHistory] = useState([])
  const [selectedAdInteractions,setSelectedAdInteractions] = useState([])
  const addToSelectedAdInteractions =(adId,status)=>{
      if(status && !selectedAdInteractions.includes(adId)){
          setSelectedAdInteractions([...selectedAdInteractions,adId])
      }
      else if(!status){
          const updaedselectedAdInteraction = selectedAdInteractions.filter(id => id !== adId);
          setSelectedAdInteractions(updaedselectedAdInteraction)
      }
  }
  const deleteSelectedAdInteraction = async () => {
    try{
        const result = await deleteAdInteractions(userId,selectedAdInteractions)
        // dispatch({type: 'changeInData'})
    }
    catch(err){
        console.log(err)
    }
}
  useEffect(()=>{
    const fetchUserChatHistory = async () => {
      try{
        const adsInteractedWith = await getAdsInteractedWith(userId)
        setChatHistory(adsInteractedWith)
      }
      catch(err){
        console.log(err)
      }
    }
    fetchUserChatHistory()
  },[changeInData])

  const styles = StyleSheet.create({
    deleteButton:{
      alignSelf: 'flex-end',
      backgroundColor: theme.colors.background,
      color: 'white',
      marginRight: 20,
      marginTop: 20
  },

  })
  return (
    <View>
      <Button
        style = {styles.deleteButton}
        mode='contained'
        onPress={()=>deleteSelectedAdInteraction()}
        disabled = {selectedAdInteractions.length===0? true:false}
        textColor={'white'}
        rippleColor={'white'}

        >
            delete
        </Button>
    {chatHistory.map(ad=>{
      return <MessageListItem navigation={navigation} ad={ad} addToSelectedAdInteractions={addToSelectedAdInteractions}/>
    })}
    </View>
  )
}

export default ReceivedMessagesScreen
