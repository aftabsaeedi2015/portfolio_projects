import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image, Text,ScrollView,SafeAreaView } from "react-native";
import { ActivityIndicator, useTheme } from "react-native-paper";
import { useSelector } from "react-redux";
import MyAdListItem from "../styledComponents/myAdListItem";
import ResultListItem from "../styledComponents/resultListItem";
import { getUserAds, getUserInfo } from "./data/dbOperations";
import { useRoute } from "@react-navigation/native";
import MainMenuBar from "../styledComponents/mainMenuBar";

function ProfileScreen({ navigation }) {
  const theme = useTheme()
  const user = useSelector((state) => state.user);
  const route = useRoute();
  const { ownerId,ownerName } = route.params;
  const changeInData = user.changeInData;
  const [myAds, setMyAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ownerInfo,setOwnerInfo] =useState({})
  const styles = StyleSheet.create({
    parentContainer: {
      flex: 1,
      flexDirection: "column",
    },
    profilePicContainer: {
      borderBottomWidth: 1,
      borderColor: theme.colors.background,

    },
    image: {
      height: 200,
      width: "auto",
    },
    userAdsContainer: {
      flex: 2,
    },
    adContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      gap: 1
    },
    text:{
      fontSize: 30,
      marginLeft: 20,
      color: theme.colors.background
    },
    loadingIcon: {
      position: "absolute",
      top: "50%",
      left: "50%",
    },
  });
  useEffect(() => {
    const fetchUserAds = async () => {
      const response = await getUserAds(ownerId);
      console.log(response);
      setMyAds(response);
      setLoading(false);
    };
    fetchUserAds();
  }, [changeInData]);
  return (
    <SafeAreaView style={styles.parentContainer}>
      {loading && (
          <ActivityIndicator
            animating={true}
            size={40}
            style={styles.loadingIcon}
            color={theme.colors.background}
          />
        )}
      <View style={styles.profilePicContainer}>
        <Image
          source={require("../assets/profilePic.png")}
          style={styles.image}
        />
        <Text style = {styles.text}>{ownerName}</Text>
      </View>
      <Text style = {styles.text}>posted ads</Text>
      <ScrollView style={styles.userAdsContainer}>
        <View style={styles.adContainer}>
          {!loading &&
            myAds.map((ad, index) => {
              return (
                <ResultListItem key={index} navigation={navigation} item={ad} />
              );
            })}
        </View>
      </ScrollView>
      <MainMenuBar navigation={navigation}/>
    </SafeAreaView>
  );
}

export default ProfileScreen;
