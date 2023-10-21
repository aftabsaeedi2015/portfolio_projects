import React from 'react';
import { View, Text ,StyleSheet} from 'react-native';
import { Avatar, Card, Paragraph } from 'react-native-paper';

const ChatBubble = ({ key,message, isSent, profilePic }) => {
  return (
    <Card
    key = {key}
      style={[
        styles.chatBubble,
        isSent ? styles.sentBubble : styles.receivedBubble,
      ]}
    >
      <Card.Content style={styles.cardContent}>
        <Avatar.Image size={40} source={profilePic ? { uri: profilePic } : null} />
        <Text style={styles.messageText}>{message}</Text>
      </Card.Content>
    </Card>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  chatBubble: {
    maxWidth: '70%',
    alignSelf: 'flex-end',
    marginVertical: 8,
  },
  sentBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#007BFF',
  },
  receivedBubble: {
    backgroundColor: '#FFFFFF',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  messageText: {
    marginLeft: 10,
  },
});

export { ChatBubble };
