import React,{useState,useEffect}from 'react'
import { View,StyleSheet,ScrollView } from 'react-native'
import ResultListItem from '../styledComponents/resultListItem'
import MessageInput from '../styledComponents/messageInput'
import {ChatBubble} from '../styledComponents/sellerBuyerMessage'
import { useRoute } from '@react-navigation/native';
import { useSelector, UseSelector } from 'react-redux'
import { getAdChatsHistory, getChatInteractionHistory } from './data/dbOperations'




const styles = StyleSheet.create({
    parentContainer:{
        gap: 20,
        justifyContent: 'flex-end',
    },
    messagesContainer:{
      height: 450
    }
})
function SellerBuyerInteractionScreen({navigation}) {
    const route = useRoute()
    console.log(route.params)
    const {chatInteractionId,adId,adData} = route.params
    console.log(chatInteractionId)
    const item ={adId: adId,adData:adData}
    const user = useSelector(state=>state.user)
    const userId = user.userId
    const changeInData = user.changeInData
    const [chats, setChats] = useState([])
      useEffect(() => {
        const fetchAdChatHistory= async () => {
          try{
            const response = await getChatInteractionHistory(chatInteractionId)
            setChats(response)
          }
          catch(err){
            console.log(err)
          }
        }
        fetchAdChatHistory()
      }, [changeInData]);
  return (
    <View style={styles.parentContainer}>
  <ResultListItem navigation={navigation} key ={adId} item ={item}/>
  {/* {adChatHistory.map((chat, index) => {
    console.log(chat)
    return  <BuyerMessage key={index} message={chat.message} />
  })} */}
  <ScrollView style = {styles.messagesContainer}>
  {chats==='' ? null:chats.map(chat=>{
    const senderId = chat.senderId
    const myMessage = senderId===userId
    return <ChatBubble key={Math.random()} message={chat.message} isSent={myMessage}/>
  })}
  </ScrollView>
  <MessageInput adId = {adId}/>
</View>
  )
}

export default SellerBuyerInteractionScreen
