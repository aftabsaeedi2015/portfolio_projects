import React, { useState, useEffect } from "react";
import { useTheme, ActivityIndicator } from "react-native-paper";
import { View, StyleSheet, Text,SafeAreaView } from "react-native";
import ResultListItem from "../styledComponents/resultListItem";
import { useRoute } from "@react-navigation/native";
import { getAdsMatchingSearchQuery } from "./data/dbOperations";
import MainMenuBar from "../styledComponents/mainMenuBar";
import { useSelector } from "react-redux";
import { ScrollView } from "react-native";

function SearchResultScreen({ navigation }) {
  const theme = useTheme();
  const route = useRoute();
  const { searchQuery } = route.params;
  const [ads, setAds] = useState([]);
  const user = useSelector((state) => state.user);
  const userId = user.userI;
  const changeInData = user.changeInData;
  const [loading, setLoading] = useState(true);
  const styles = StyleSheet.create({
    parentContainer: {
      display: "flex",
      flex: 1,
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: 'center',
      backgroundColor: theme.colors.background
    },
    loadingIcon: {
      position: "absolute",
      top: "50%",
      left: "50%",
    },
    noResultTextContainer: {
      position: "absolute",
      top: "50%",
      left: "45%",
    },
  });
  useEffect(() => {
    const fetchAdsforCategory = async () => {
      try {
        const response = await getAdsMatchingSearchQuery(searchQuery);
        setAds(response);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAdsforCategory();
  }, [changeInData]);
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
      <ScrollView
      showsVerticalScrollIndicator = {false}
      >
        {ads.map((ad, index) => {
          return (
            <ResultListItem key={index} navigation={navigation} item={ad} />
          );
        })}
        {ads.length === 0 && (
          <Text style = {{color: theme.colors.text,fontSize: 25,marginTop: 30}}>no ads found</Text>
        )}
      </ScrollView>
      <View>
        <MainMenuBar navigation={navigation} />
      </View>
    </SafeAreaView>
  );
}

export default SearchResultScreen;
