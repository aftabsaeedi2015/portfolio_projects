import React from 'react'
import { View,StyleSheet } from 'react-native'
import ListItem from '../styledComponents/resultListItem'
import MessageInput from '../styledComponents/messageInput'
import {SellerMessage,BuyerMessage} from '../styledComponents/sellerBuyerMessage'



const styles = StyleSheet.create({
    parentContainer:{
        gap: 20,
        justifyContent: 'flex-end',
    }
})
function SellerBuyerInteractionScreen({navigation}) {
    const [messages,setMessages] = React.useState([
        " hello there, i was interested in buying your iphone",
        " hi, yes you can. how much do you bid?"
    ])
    const handleSendMessage = (message) => {
        console.log("hell")
        setMessages([...messages, message]);
      };
  return (
    <View style={styles.parentContainer}>
  <ListItem navigation={navigation} />
  <SellerMessage message={messages[0]} />
  <BuyerMessage message={messages[1]} />
  {messages.map((message, index) => {
    return  <BuyerMessage key={index} message={message} />
  })}
  <MessageInput messages={messages} onSendMessage={handleSendMessage} />
</View>




  )
}

export default SellerBuyerInteractionScreen
