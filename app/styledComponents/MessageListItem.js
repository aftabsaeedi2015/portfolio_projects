import React, { useState, useEffect } from "react";
import { Card, Text, useTheme, Checkbox } from "react-native-paper";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { getAd, getCoverImage } from "../screens/data/dbOperations";
import { useSelector, useDispatch } from "react-redux";

function MessageListItem({ navigation, ad, addToSelectedAdInteractions }) {
  const theme = useTheme();
  const user = useSelector((state) => state.user);
  const { adId, adData } = ad;
  const [imageUrl, setimageUrl] = useState("");
  const [selectionStatus, setSelectionStatus] = useState(false);
  const styles = StyleSheet.create({
    parentContainer: {
      display: "flex",
      flexDirection: "row",
      padding: 5,
      gap: 5,
      backgroundColor: theme.colors.secondary,
      borderRadius: 5
    },
    image: {
      height: 100,
      width: 100,
      borderRadius: 3,
    },
    description: {
      justifyContent: "space-between",
      flex: 1,
      backgroundColor: "white",
      borderRadius: 3,
      padding: 5,
      height: 100,
    },
    message: {
      fontStyle: "italic",
    },
    text: {
      fontWeight: "bold",
    },
    checkboxContainer: {
      position: 'absolute',
      top: 5,
      right: 5,
      alignSelf: 'flex-end',
      borderWidth: 1,
      borderColor: theme.colors.accent,
      borderRadius: '50%',

    },
  });
  useEffect(() => {
    const fetchAdData = async () => {
      try {
        const url = await getCoverImage(adId);
        console.log(url)
        setimageUrl(url);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAdData();
  }, []);
  return (
    <View style={styles.parentContainer}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("SellerBuyerInteractionScreen", ad);
        }}
      >
        <Image source={{ uri: imageUrl }} style={styles.image} />
      </TouchableOpacity>
      <View style={styles.description}>
        <View style={styles.titleAndPrice}>
          <Text style={styles.text}>{adData.title}</Text>
          <Text style={styles.text}>{adData.price}</Text>
        </View>
        <View style={styles.messageContainer}>
          <Text style={styles.message}>
            hello, i was interested to buy your iphone x
          </Text>
        </View>
        <View style={styles.checkboxContainer}>
          <Checkbox
            status={selectionStatus ? "checked" : "unchecked"}
            onPress={() => {
              setSelectionStatus((prevStatus) => {
                const updatedStatus = !prevStatus;
                addToSelectedAdInteractions(adId, updatedStatus);
                return updatedStatus;
              });
            }}
            color={theme.colors.accent}
            style={styles.checkbox}
          />
        </View>
      </View>
    </View>
  );
}

export default MessageListItem;
