import React, { useState, useEffect } from 'react';
import { Button, Text } from 'react-native-paper';
import { View, StyleSheet,ScrollView } from 'react-native';
import MainMenuBar from '../styledComponents/mainMenuBar';
import { useSelector } from 'react-redux';
import { getFavoriteAds } from './data/dbOperations';
import FavoritesListItem from '../styledComponents/favoritesListItem';

function FavoritesScreen({ navigation }) {
  console.log('favorites')
  const [favorites, setFavorites] = useState([]);
  const user = useSelector((state) => state.user);
  const userId = user.userId;
  const changeInData = user.changeInData
  const styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
      display: 'flex',
      justifyContent: 'space-between',
      padding: 10,
    },
    itemContainer: {
      display: 'flex',
      gap: 5,
      flex: 1,
      alignItems: 'center',
      // justifyContent: 'center'

  },
  itemRow: {
      display: 'flex',
      flexDirection: 'row',
      // alignItems: 'flex-start',
      width: '100%',
      flexWrap: 'wrap',
      // flex: 1,
      gap: 10,
      justifyContent: 'flex-start',
  },
  });
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const result = await getFavoriteAds(userId)
        console.log(result)
        setFavorites(result)
      } catch (err) {
        console.log(err);
      }
    };
    fetchFavorites();
  }, [changeInData])
  const handleClick=()=>{
    console.log(favorites)
  }
  return  <View style={styles.mainContainer}>
            <ScrollView contentContainerStyle = {styles.itemContainer}>
              <View style={styles.itemRow}>
            {
              favorites.map((item, index) => (
                <FavoritesListItem
                  key={index}
                  navigation={navigation}
                  item={item}
                />
              ))
            }
            </View>
            </ScrollView>
            <Button
            mode='contained'
            onPress={()=>handleClick()}

            >
              hello
            </Button>
            <MainMenuBar navigation={navigation} />
          </View>
}

export default FavoritesScreen;
