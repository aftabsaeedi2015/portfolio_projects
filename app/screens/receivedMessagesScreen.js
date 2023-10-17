import React from 'react'
import { Text } from 'react-native-paper'
import MessageItem from '../styledComponents/messageItem'

function Message({navigation}) {
  return (
    <>
    <MessageItem navigation={navigation}/>
    <MessageItem navigation={navigation}/>
    <MessageItem navigation={navigation}/>
    <MessageItem navigation={navigation}/>
    <MessageItem navigation={navigation}/>
    </>
  )
}

export default Message
