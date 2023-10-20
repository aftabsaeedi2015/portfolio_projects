import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { sendMessage } from '../screens/data/dbOperations';
import { useSelector, UseSelector } from 'react-redux';

const SellerMessageWithInput = ({ adId}) => {
  const [inputMessage, setInputMessage] = useState('');
  const user = useSelector(state=>state.user)
  const userId = user.userId
  const handleSendMessage = () => {
    if (inputMessage.trim() !== '') {
      sendMessage(adId,userId,inputMessage)
      // Clear the input field
      setInputMessage('');
    }
  };

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16 }}>
      <TextInput
        style={{ flex: 1, borderWidth: 1, borderColor: 'gray', borderRadius: 4, padding: 8 }}
        placeholder="Type your message..."
        value={inputMessage}
        onChangeText={(text) => setInputMessage(text)}
      />
      <Button title="Send" onPress={handleSendMessage} />
    </View>
  );
};

export default SellerMessageWithInput;
