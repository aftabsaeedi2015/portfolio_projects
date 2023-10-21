import React,{useState,useEffect} from 'react'
import { Text } from 'react-native-paper'
import MessageListItem from '../styledComponents/MessageListItem'
import {useSelector} from 'react-redux'
import { getAdsInteractedWith, getSendOrReceivedMessages } from './data/dbOperations'
import {View} from 'react-native'

function ReceivedMessagesScreen({navigation}) {
  const user = useSelector(state=>state.user)
  const userId = user.userId
  const changeInData = user.changeInData
  const [chatHistory,setChatHistory] = useState([])

  useEffect(()=>{
    const fetchUserChatHistory = async () => {
      try{
        const chatsInteractedWith = await getAdsInteractedWith(userId)
        console.log("these are the chats",chatsInteractedWith)
        setChatHistory(chatsInteractedWith)
      }
      catch(err){
        console.log(err)
      }
    }
    fetchUserChatHistory()
  },[changeInData])
  return (
    <View>
    {chatHistory.map(ad=>{
      return <MessageListItem navigation={navigation} ad={ad}/>
    })}
    </View>
  )
}

export default ReceivedMessagesScreen
