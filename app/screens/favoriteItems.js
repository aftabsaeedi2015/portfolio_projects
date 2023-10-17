import React, { useState, useEffect } from 'react';
import { Text } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import ResultListItem from '../styledComponents/resultListItem'
import MainMenuBar from '../styledComponents/mainMenuBar';
import { useSelector } from 'react-redux';
import { getFavoriteAds } from './data/dbOperations';

function Favorites({ navigation }) {
  const [favorites, setFavorites] = useState([]);
  const user = useSelector((state) => state.user);
  const userId = user.userId;
  const styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
      display: 'flex',
      justifyContent: 'space-between',
      padding: 10,
    },
  });
  const handleSnackbar = () => {
    // Your code here
  };
  const itemSelectionHandler = () => {
    // Your code here
  };
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const result = await getFavoriteAds(userId);
        setFavorites(result);
      } catch (err) {
        console.log(err);
      }
    };
    fetchFavorites();
  }, []);

  return (
    <View style={styles.mainContainer}>
      <View>
      {favorites.map((item, index) => (
          <ResultListItem
            key={index}
            navigation={navigation}
            item={item}
            itemSelectionHandler={itemSelectionHandler}
            handleSnackbar={handleSnackbar}
          />
        ))}
        <Text>
          helo
        </Text>

      </View>
      <MainMenuBar navigation={navigation} />
    </View>
  );
}

export default Favorites;
