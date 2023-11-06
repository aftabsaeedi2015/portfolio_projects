import React, { useState, useEffect } from "react";
import { TextInput, StyleSheet, View, TouchableOpacity } from "react-native";
import { useTheme, List } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";
import { getSuggestedAdsByTitle } from "../screens/data/dbOperations";

function SearchBar({ navigation }) {
  const theme = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const handleSearch = () => {
    console.log(searchQuery);
  };
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestedAdsByTitle, setSuggestedAdsByTitle] = useState([]);
  useEffect(() => {
    const fetchSuggestedAds = async () => {
      try {
        const suggestedAds = await getSuggestedAdsByTitle(searchQuery);
        console.log(suggestedAds);
        setSuggestedAdsByTitle(suggestedAds);
      } catch (err) {
        console.log(err);
      }
    };
    fetchSuggestedAds();
  }, [searchQuery]);

  const styles = StyleSheet.create({
    input: {
      padding: 6,
      width: "70%",
      height: 50
    },
    searchButton: {},
    container: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      paddingLeft: 10,
      paddingRight: 10,
    },
    icons: {
      flexDirection: "row",
      gap: 30,
      color: theme.colors.background
    },
    suggestedAdsDropdown: {
      position: "absolute",
      backgroundColor: theme.colors.background,
      width: "100%",
      top: 50,
      borderRadius: 5,
    },
  });
  return (
    <View style={styles.container}>
      <Icon name="search" size={30} style={styles.icons} />
      <TextInput
        inlineImageLeft=""
        placeholder="search for ads"
        value={searchQuery}
        onChangeText={(query) => {
          setSearchQuery(query);
          setShowSuggestions(true);
        }}
        underlineColorAndroid="transparent"
        style={styles.input}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <View style={styles.icons}>
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Icon
          style = {styles.icons}
            name="close"
            size={30}
            onPress={() => {
              setSearchQuery("");
              setShowSuggestions(false);
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Icon
          style = {styles.icons}
            name="arrow-right"
            size={30}
            onPress={() =>
              navigation.navigate("SearchResult", { searchQuery: searchQuery })
            }
          />
        </TouchableOpacity>
      </View>
      {showSuggestions && searchQuery != "" && (
        <View style={styles.suggestedAdsDropdown}>
          {suggestedAdsByTitle.map((title, index) => {
            console.log(title);
            return (
              <>
                <List.Item
                  key={index}
                  onPress={() => {
                    setShowSuggestions(false);
                    navigation.navigate("SearchResult", { searchQuery: title });
                  }}
                  title={title}
                  titleStyle={{ color: "white" }}
                />
                {/* <Divider bold = {true}/> */}
              </>
            );
          })}
        </View>
      )}
    </View>
  );
}

export default SearchBar;
