import React,{useState,useEffect}from 'react'
import { View,StyleSheet,ScrollView,Text } from 'react-native'
import ResultListItem from '../styledComponents/resultListItem'
import MessageInput from '../styledComponents/messageInput'
import {ChatBubble} from '../styledComponents/sellerBuyerMessage'
import { useRoute } from '@react-navigation/native';
import { useSelector, UseSelector } from 'react-redux'
import { deleteAdInteractions, getAdChatsHistory, getAdInteractionId, getChatInteractionHistory, getUserInfo, sendMessage } from './data/dbOperations'
import { Button, useTheme } from 'react-native-paper'
import { async } from '@firebase/util'





function SellerBuyerInteractionScreen({navigation}) {
    const theme = useTheme()
    const route = useRoute()
    const {adId,adData} = route.params
    const user = useSelector(state=>state.user)
    const userId = user.userId
    const changeInData = user.changeInData
    const [chats, setChats] = useState([])
    const [foundInteractionId,setFoundInteractionId] = useState('')
      useEffect(() => {
        const fetchAdChatHistory= async () => {
          try{
            const foundInteractionId = await getAdInteractionId(userId,adId)
            setFoundInteractionId(foundInteractionId)
            const response = await getChatInteractionHistory(foundInteractionId)
            setChats(response)
          }
          catch(err){
            console.log(err)
          }
        }
        fetchAdChatHistory()
      }, []);
      const handleRestartChatInteraction = async() => {
        const userInfo = await getUserInfo(userId)
        const name = userInfo.name
        const message = `${name} has restarted the conversation`
        await sendMessage(adId,userId,message)
        // dispatch({type: 'changeInData'})
          // Clear the input field
      };
      const deleteTheCurrentChatInteractionAndStartANewOne=async()=>{
        await deleteAdInteractions(userId,[adId])
        await handleRestartChatInteraction()
      }
      const styles = StyleSheet.create({
        parentContainer:{
            gap: 20,
            justifyContent: 'flex-end',
        },
        messagesContainer:{
          height: 450
        },
        deleteButton:{
          alignSelf: 'flex-end',
          backgroundColor: theme.colors.background,
          color: 'white',
          marginRight: 20,
          marginTop: 20
      },
    })
  return (
    <View style={styles.parentContainer}>
  <ResultListItem navigation={navigation} key ={adId} item ={{adId:adId,adData:adData}}/>
  {/* {adChatHistory.map((chat, index) => {
    return  <BuyerMessage key={index} message={chat.message} />
  })} */}
  <ScrollView style = {styles.messagesContainer}>
    {/* if user has interacted with the ad but there are no chats it means the other user has delete the chatinteraction */}
  {(foundInteractionId!='' && chats.length===0)?
  <>
  <Text>user has deleted this interaction</Text>
  <Button
    style = {styles.deleteButton}
    mode='contained'
    onPress={()=>deleteTheCurrentChatInteractionAndStartANewOne()}
    textColor={'white'}
    rippleColor={'white'}

    >
        start a new conversation
  </Button>
        </>:
  chats.map(chat=>{
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
