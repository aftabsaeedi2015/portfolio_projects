import React, { useState, useEffect } from "react";
import { Text, Button, useTheme, ActivityIndicator } from "react-native-paper";
import MessageListItem from "../styledComponents/MessageListItem";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteAdInteractions,
  getAdsInteractedWith,
  getSendOrReceivedMessages,
} from "./data/dbOperations";
import { View, StyleSheet,SafeAreaView } from "react-native";
import MainMenuBar from "../styledComponents/mainMenuBar";

function ReceivedMessagesScreen({ navigation }) {
  const theme = useTheme();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const userId = user.userId;
  const changeInData = user.changeInData;
  const [chatHistory, setChatHistory] = useState([]);
  const [selectedAdInteractions, setSelectedAdInteractions] = useState([]);
  const [loading, setLoading] = useState(true);
  const addToSelectedAdInteractions = (adId, status) => {
    if (status && !selectedAdInteractions.includes(adId)) {
      setSelectedAdInteractions([...selectedAdInteractions, adId]);
    } else if (!status) {
      const updaedselectedAdInteraction = selectedAdInteractions.filter(
        (id) => id !== adId
      );
      setSelectedAdInteractions(updaedselectedAdInteraction);
    }
  };
  const deleteSelectedAdInteraction = async () => {
    try {
      const result = await deleteAdInteractions(userId, selectedAdInteractions);
      dispatch({ type: "changeInData" });
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    setLoading(true);
    const fetchUserChatHistory = async () => {
      try {
        const adsInteractedWith = await getAdsInteractedWith(userId);
        console.log(adsInteractedWith);
        setChatHistory(adsInteractedWith);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUserChatHistory();
  }, [changeInData]);

  const styles = StyleSheet.create({
    parentContainer: {
      flex: 1,
      justifyContent: "space-between",
      gap: 10,
      padding: 10,
      alignItems: "center",
      backgroundColor: theme.colors.background,
    },
    deleteButton: {
      alignSelf: "flex-end",
      backgroundColor: theme.colors.accent,
      color: "white",
      marginRight: 20,
      marginTop: 20,
    },
    messagesContainer: {
      flex: 1,
      width: '100%',
      padding: 20,
      alignItems: 'center'
    },
    loadingIcon: {
      position: "absolute",
      top: "50%",
      left: "50%",
    },
  });
  return (
    <SafeAreaView style={styles.parentContainer}>
      {loading && (
        <ActivityIndicator
          animating={true}
          size={40}
          style={styles.loadingIcon}
          color={theme.colors.accent}
        />
      )}
      <Button
        style={styles.deleteButton}
        mode="contained"
        onPress={() => deleteSelectedAdInteraction()}
        disabled={selectedAdInteractions.length === 0 ? true : false}
        textColor={"white"}
        rippleColor={"white"}
      >
        delete
      </Button>
      <View style={styles.messagesContainer}>
        {chatHistory.map((ad) => {
          return (
            <MessageListItem
              navigation={navigation}
              ad={ad}
              addToSelectedAdInteractions={addToSelectedAdInteractions}
            />
          );
        })}
        {chatHistory.length === 0 && !loading && (
          <Text style = {{color: theme.colors.text,fontSize: 25}}>no chats to show</Text>
        )}
      </View>
      <MainMenuBar navigation={navigation} />
    </SafeAreaView>
  );
}

export default ReceivedMessagesScreen;
