import React, { useState, useEffect } from 'react';
import { Button, Text,ActivityIndicator, useTheme } from 'react-native-paper';
import { View, StyleSheet,ScrollView } from 'react-native';
import MainMenuBar from '../styledComponents/mainMenuBar';
import { useSelector } from 'react-redux';
import { getFavoriteAds } from './data/dbOperations';
import FavoritesListItem from '../styledComponents/favoritesListItem';

function FavoritesScreen({ navigation }) {
  const theme = useTheme()
  const [favorites, setFavorites] = useState([]);
  const user = useSelector((state) => state.user);
  const userId = user.userId;
  const changeInData = user.changeInData
  const [loading, setLoading] = useState(true)
  const styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
      display: 'flex',
      justifyContent: 'space-between',
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
  loadingIcon:{
    position: 'absolute',
    top: '50%',
    left: '50%'
  },
  noAdsMessage:{
    position: 'absolute',
    top: 300,
    left: 60

  }
  });
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const result = await getFavoriteAds(userId)
        console.log(result)
        setFavorites(result)
        setLoading(false)
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
          {loading&&<ActivityIndicator
                      animating={true}
                      size = {40}
                      style = {styles.loadingIcon}
                      color={theme.colors.background} />
                    }
            <ScrollView contentContainerStyle = {styles.itemContainer}>
              <View style={styles.itemRow}>
            {
              !loading && favorites.map((item, index) => (
                <FavoritesListItem
                  key={index}
                  navigation={navigation}
                  item={item}
                />
              ))
            }
            {favorites.length===0 && !loading && <Text style = {styles.noAdsMessage}>you have not added any ad to you favorite</Text>}
            </View>
            </ScrollView>
            <MainMenuBar navigation={navigation} />
          </View>
}

export default FavoritesScreen;
