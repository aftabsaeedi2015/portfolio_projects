import React from "react";
import { Text, useTheme } from "react-native-paper";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";



function MainMenuBar({navigation}) {
  const theme = useTheme()
  const styles = StyleSheet.create({
    appBar: {
      display: "flex",
      flexDirection: "row",
      width: "100%",
      justifyContent: "space-around",
      backgroundColor: theme.colors.secondary,
      borderRadius: '50%',
      padding: 10
    },
    icon: {
      color: theme.colors.icon
    },
    appBarItem: {
      justifyContent: 'center',
      alignItems: 'center'
    },

  });
  return (
    <View style={styles.appBar}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Home");
        }}
      >
        <View style={styles.appBarItem}>
          <Icon name="home" size={30} style={styles.icon} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("MyAds");
        }}
      >
        <View style={styles.appBarItem}>
          <Icon name="book" size={30} style={styles.icon} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Post");
        }}
      >
        <View style={styles.appBarItem}>
          <Icon name="pencil" size={30} style={styles.icon} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Favorites");
        }}
      >
        <View style={styles.appBarItem}>
          <Icon name="heart" size={30} style={styles.icon} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Message");
        }}
      >
        <View style={styles.appBarItem}>
          <Icon name="envelope" size={30} style={styles.icon} />
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default MainMenuBar;
