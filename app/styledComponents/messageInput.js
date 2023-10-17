import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';

const SellerMessageWithInput = ({ onSendMessage }) => {
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = () => {
    if (inputMessage.trim() !== '') {
      // Call the callback function to add the message to the messages array
      onSendMessage(inputMessage);
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
