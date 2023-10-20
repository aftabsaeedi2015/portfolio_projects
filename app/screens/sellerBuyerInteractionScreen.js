import React,{useState,useEffect}from 'react'
import { View,StyleSheet } from 'react-native'
import ResultListItem from '../styledComponents/resultListItem'
import MessageInput from '../styledComponents/messageInput'
import {SellerMessage,BuyerMessage} from '../styledComponents/sellerBuyerMessage'
import { useRoute } from '@react-navigation/native';
import { useSelector, UseSelector } from 'react-redux'
import { getAdChatsHistory } from './data/dbOperations'



const styles = StyleSheet.create({
    parentContainer:{
        gap: 20,
        justifyContent: 'flex-end',
    }
})
function SellerBuyerInteractionScreen({navigation}) {
    const route = useRoute()
    const {adId,adData} = route.params
    const item ={adId: adId,adData:adData}
    const user = useSelector(state=>state.user)
    const userId = user.userId
    const [adChatHistory, setAdChatHistory] = useState([])
    const [messages,setMessages] = React.useState([
        " hello there, i was interested in buying your iphone",
        " hi, yes you can. how much do you bid?"
    ])
      useEffect(() => {
        const fetchAdChatHistory= async () => {
          try{
            const chatHistory = await getAdChatsHistory(userId,adId)
            console.log(chatHistory)
            const chatHistoryArray = JSON.parse(chatHistory)
            setAdChatHistory(chatHistoryArray)
          }
          catch(err){
            console.log(err)
          }

        }
        // fetchAdChatHistory()
      }, []);
  return (
    <View style={styles.parentContainer}>
  <ResultListItem navigation={navigation} key ={adId} item ={item}/>
  {/* {adChatHistory.map((chat, index) => {
    console.log(chat)
    return  <BuyerMessage key={index} message={chat.message} />
  })} */}
  <MessageInput adId = {adId}/>
</View>
  )
}

export default SellerBuyerInteractionScreen
