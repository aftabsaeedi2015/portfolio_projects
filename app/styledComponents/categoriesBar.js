import React from "react";
import { Text, useTheme } from "react-native-paper";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { getCategoryAds } from "../screens/data/dbOperations";


function CategoriesBar({ navigation }) {
  const theme = useTheme()
  const styles = StyleSheet.create({
    categoriesContainer: {
      display: "flex",
      flexDirection: "row",
      gap: 10,
      width: "100%",
      justifyContent: "space-evenly",
      alignItems: "flex-end",
      padding: 10,
      backgroundColor: theme.colors.secondary,
      borderRadius: '5%'
    },
    categoryItem: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    icon: {
      color: theme.colors.accent
    },
    text:{
      color: theme.colors.accent
    },
  });
  const categories = [
    {
      icon: "mobile",
      name: "electronics",
    },
    {
      icon: "car",
      name: "vehicles",
    },
    {
      icon: "tshirt",
      name: "clothing",
    },
    {
      icon: "book",
      name: "books",
    },
    {
      icon: "football-ball",
      name: "fitness",
    },
    {
      icon: "dog",
      name: "pets",
    },
  ];
  const handleCategorySelection = async (category) => {
    navigation.navigate("CategoryResult", { category: category });
  };
  return (
    <View style={styles.categoriesContainer}>
      {categories.map((category, index) => {
        return (
          <TouchableOpacity
            key={index}
            onPress={() => {
              handleCategorySelection(category.name);
            }}
          >
            <View style={styles.categoryItem}>
              <Icon name={category.icon} size={30} style={styles.icon} />
              <Text style = {styles.text}>{category.name}</Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default CategoriesBar;
