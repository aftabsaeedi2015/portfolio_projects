import React from "react";
import { Text, useTheme } from "react-native-paper";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useDispatch, useSelector } from "react-redux";




function MainMenuBar({navigation}) {
  const theme = useTheme()
  const user = useSelector((state) => state.user);
  const menuIndex = user.menuIndex
  const dispatch = useDispatch()
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
    selectedIcon: {
      color: theme.colors.icon,
    },
    unselectedIcon: {
      color: theme.colors.background,
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
          dispatch({type: 'setMenuIndex',payload: 0})
        }}
      >
        <View style={styles.appBarItem}>
          <Icon name="home" size={30} color={menuIndex===0?theme.colors.background: theme.colors.accent} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("MyAds");
          dispatch({type: 'setMenuIndex',payload: 1})
        }}
      >
        <View style={styles.appBarItem}>
          <Icon name="book" size={30} color={menuIndex===1 ? theme.colors.background: theme.colors.accent} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Post");
          dispatch({type: 'setMenuIndex',payload: 2})
        }}
      >
        <View style={styles.appBarItem}>
          <Icon name="pencil" size={30} color={menuIndex===2 ? theme.colors.background: theme.colors.accent} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Favorites");
          dispatch({type: 'setMenuIndex',payload: 3})
        }}
      >
        <View style={styles.appBarItem}>
          <Icon name="heart" size={30} color={menuIndex===3 ? theme.colors.background: theme.colors.accent} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Message");
          dispatch({type: 'setMenuIndex',payload: 4})
        }}
      >
        <View style={styles.appBarItem}>
          <Icon name="envelope" size={30} color={menuIndex===4 ? theme.colors.background: theme.colors.accent} />
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default MainMenuBar;
