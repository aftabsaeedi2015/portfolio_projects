import React, { useEffect, useState } from "react";
import {
  Card,
  Text,
  Snackbar,
  ThemeProvider,
  useTheme,
} from "react-native-paper";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  addToFavorites,
  getCoverImage,
  existsInFavorites,
  removeFromFavorites,
  existsInUserAds,
} from "../screens/data/dbOperations";
import { useSelector, useDispatch } from "react-redux";

// item is in the following format:
// {adId: adId,adData: adData}

function ResultListItem({ navigation, item }) {
  const theme = useTheme();
  const styles = StyleSheet.create({
    parentContainer: {
      display: "flex",
      flexDirection: "row",
      padding: 5,
      backgroundColor:theme.colors.secondary,
      borderRadius: 5,
      marginTop: 4
    },
    card: {
      display: "flex",
      flexDirection: "row",
    },
    image: {
      height: 100,
      width: 100,
      borderRadius: 5
    },
    descriptionContainer: {
      alignItems: "flex-start",
      justifyContent: "space-between",
      padding: 5,
    },
    descriptionUp: {},
    descriptionDown: {
      width: 250,
      display: "flex",
      flexDirection: "row",
      alignItems: "end",
      justifyContent: "space-between",
    },
    locationDescription: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: 3,
    },
    whiteIcon: {
      color: theme.colors.accent,
    },
    redIcon: {
      color: 'red',
    },
    snackbar: {
      position: "absolute",
      backgroundColor: theme.colors.background,
      top: 100,
      width: "100%",
    },
    snackbarText: {
      color: "white",
    },
    text:{
      color: 'white'
    },
  });
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const userId = user.userId;
  const changeInData = user.changeInData;
  const [imageUrl, setImageUrl] = useState(null);
  const [adExistsInFavorites, setAdExistsInFavorites] = useState(false);
  const [snackbarVisiblility, setSnackbarVisibility] = useState(false);
  const [snackbarValue, setSnackbarValue] = useState("");
  const [adExistsInUserAds, setAdExistsInUserAds] = useState(false);
  const handleSnackbar = (response) => {
    setSnackbarValue(response);
    setSnackbarVisibility(true);
  };
  const addToFavoriteHandler = async () => {
    try {
      dispatch({ type: "changeInData" });
      if (adExistsInFavorites) {
        const response = await removeFromFavorites(userId, item.adId);
        handleSnackbar(response);
      } else {
        const response = await addToFavorites(userId, item.adId);
        handleSnackbar(response);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await existsInUserAds(userId, item.adId);
        setAdExistsInUserAds(response);
        const url = await getCoverImage(item.adId);
        setImageUrl(url);
        const exists = await existsInFavorites(userId, item.adId);
        setAdExistsInFavorites(exists);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [changeInData]);

  return (
    <>
      <TouchableOpacity
        style={styles.parentContainer}
        key={item.adId}
        onPress={() => {
          navigation.navigate("ItemDescription", { item: item });
        }}
      >
        <View>
          <Image source={{ uri: imageUrl }} style={styles.image} />
        </View>
        <View style={styles.descriptionContainer}>
          <View style={styles.descriptionUp}>
            <Text style = {styles.text}>{item.adData.title}</Text>
            <Text style = {styles.text}>{item.adData.price}</Text>
          </View>
          <View style={styles.descriptionDown}>
            <View style={styles.locationDescription}>
              <Icon name={"mobile"} size={30} style = {styles.text} />
              <Text style = {styles.text}>{item.adData.location}</Text>
            </View>
              <Icon
                name="heart"
                size={20}
                style={adExistsInFavorites ? styles.redIcon : styles.whiteIcon}
                onPress={() => addToFavoriteHandler()}
              />
          </View>
        </View>
      </TouchableOpacity>
      <Snackbar
        style={styles.snackbar}
        visible={snackbarVisiblility}
        onDismiss={() => {
          setSnackbarVisibility(false);
        }}
        duration="2000"
      >
        <Text style={styles.snackbarText}>{snackbarValue}</Text>
      </Snackbar>
    </>
  );
}

export default ResultListItem;
