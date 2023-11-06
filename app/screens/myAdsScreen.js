import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DeleteUserAds, getUserAds } from "./data/dbOperations";
import { View, StyleSheet, SafeAreaView } from "react-native";
import MyAdListItem from "../styledComponents/myAdListItem";
import {
  Button,
  Text,
  useTheme,
  ActivityIndicator,
  Divider,
} from "react-native-paper";
import MainMenuBar from "../styledComponents/mainMenuBar";
import { useFocusEffect } from "@react-navigation/native";

function MyAdsScreen({ navigation }) {
  const theme = useTheme();
  const user = useSelector((state) => state.user);
  const userId = user.userId;
  const dispatch = useDispatch();
  const changeInData = user.changeInData;
  const [myAds, setMyAds] = useState([]);
  const [selectedAds, setSelectedAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const addToSelectedAds = (adId, status) => {
    if (status && !selectedAds.includes(adId)) {
      setSelectedAds([...selectedAds, adId]);
    } else if (!status) {
      const newSelectedAds = selectedAds.filter((id) => id !== adId);
      setSelectedAds(newSelectedAds);
    }
  };
  const deleteSelectedAds = async () => {
    console.log(selectedAds);
    try {
      await DeleteUserAds(userId, selectedAds);
      dispatch({ type: "changeInData" });
    } catch (err) {
      console.log(err);
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      const fetchUserAds = async () => {
        const response = await getUserAds(userId);
        setMyAds(response);
        setLoading(false);
      };
      fetchUserAds();
    }, [changeInData])
  );

  const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    noAdsText: {
      fontSize: 20,
      fontWeight: "bold",
    },
    parentContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "flex-start",
      backgroundColor: theme.colors.background,

    },
    deleteButton: {
      alignSelf: "flex-end",
      backgroundColor: theme.colors.accent,
      marginRight: 20,
      marginTop: 20,
      marginBottom: 20,
    },
    adContainer: {
      flex: 1,
      alignItems: "flex-start",
      justifyContent: "flex-start",
      gap: 5
    },
    loadingIcon: {
      position: "absolute",
      top: "80%",
      left: "50%",
    },
  });
  return (
    <SafeAreaView style={styles.safeArea}>
      {loading && (
          <View style={{ flex: 1 }}>
            <ActivityIndicator
              animating={true}
              size={40}
              style={styles.loadingIcon}
              color={theme.colors.accent}
            />
          </View>
        )}
      <View style={styles.parentContainer}>

        {!loading && (
          <Button
            style={styles.deleteButton}
            mode="contained"
            onPress={() => deleteSelectedAds()}
            disabled={selectedAds.length === 0 ? true : false}
            labelStyle={{color: theme.colors.accentText}}
            rippleColor={"white"}
          >
            delete
          </Button>
        )}
        <Divider style={{ backgroundColor: "black" }} />
        <View style={styles.adContainer}>
          {!loading &&
            myAds.map((myAd, index) => {
              return (
                <MyAdListItem
                  navigation={navigation}
                  key={index}
                  item={myAd}
                  addToSelectedAds={addToSelectedAds}
                />
              );
            })}
          {myAds.length === 0 && !loading && <Text style = {{color: theme.colors.background,fontSize: 25}}>you have not posted any ad</Text>}
        </View>

      </View>
      <MainMenuBar navigation={navigation} />
    </SafeAreaView>
  );
}

export default MyAdsScreen;
