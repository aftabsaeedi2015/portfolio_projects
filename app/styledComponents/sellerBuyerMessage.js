import React from 'react';
import { View, Text } from 'react-native';
import { Avatar, Card, Paragraph } from 'react-native-paper';

const SellerMessage = ({ message }) => {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
      <Card style={{ backgroundColor: 'lightblue', maxWidth: '70%' }}>
        <Card.Content>
          <Paragraph>{message}</Paragraph>
        </Card.Content>
      </Card>
      <View style={{ marginRight: 16 }}>
        <Avatar.Image size={40} source={require('../assets/phone.jpg')} />
      </View>
    </View>
  );
};

const BuyerMessage = ({ message }) => {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
      <View style={{ marginLeft: 16 }}>
        <Avatar.Image size={40} source={require('../assets/phone.jpg')} />
      </View>
      <Card style={{ backgroundColor: 'lightgray', maxWidth: '70%' }}>
        <Card.Content>
          <Paragraph>{message}</Paragraph>
        </Card.Content>
      </Card>
    </View>
  );
};

export { SellerMessage, BuyerMessage };
