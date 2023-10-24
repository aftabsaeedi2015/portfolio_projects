import React, { useEffect, useState } from 'react'
import {Text,Card,Button,useTheme} from 'react-native-paper'
import { StyleSheet,View,TextInput, SafeAreaView, TouchableOpacity,ScrollView } from 'react-native'
import SearchBar from '../styledComponents/searchBar'
import Icon from 'react-native-vector-icons/FontAwesome';
import ListCompactItem from '../styledComponents/listCompactItem';
import MainMenuBar from '../styledComponents/mainMenuBar';
import ItemCategoriesBar from '../styledComponents/itemCategoriesBar';
import {getAllAds, getCategoryAds} from './data/dbOperations'
import {useSelector} from 'react-redux'
import { useFocusEffect } from '@react-navigation/native';

function HomepageScreen({navigation}) {
    const [ads,setAds] = useState([])
    const theme = useTheme()
    const [searchQuery, setSearchQuery] = React.useState('');
    const user = useSelector(state=>state.user)
    const changeInData = user.changeInData
    const handleSearch = ()=>{console.log(searchQuery)}
      const fetchData = async () => {
        try {
          const allAds = await getAllAds();
          const adIds = Object.keys(allAds);
          const adsData = Object.values(allAds);
          const adsArray = adIds.map((adId, index) => ({ adId : adId , adData: adsData[index] }));
          setAds(adsArray);
        } catch (err) {console.log(err)}
      };
      // everytime user navigates to this page it gets the updated data
      useFocusEffect(
        React.useCallback(() => {
          fetchData()
        }, [])
      );
    const styles =StyleSheet.create({
        safeArea: {
            flex: 1,
            backgroundColor: theme.colors.background, // You can set the background color of the safe area if needed
          },
        parentContainer: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            flex: 1,
            padding: 10,
            backgroundColor: theme.colors.primary,
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
        searchBarContainer: {
            // width: "100%"

        },
        searchBar: {
        },
    })
  return (
    <SafeAreaView style={styles.safeArea}>
    <View style = {styles.parentContainer}>
        <View style = {styles.searchBarContainer}>
            <SearchBar
            style ={styles.searchBar}
            placeholder="search for items"
            value={searchQuery}
            onChangeText={(query) => setSearchQuery(query)}
            handleSearch = {handleSearch}
            navigation={navigation}
            />
        </View>
        {<ItemCategoriesBar navigation ={navigation}/>}
        <ScrollView contentContainerStyle = {styles.itemContainer}>
            <View style={styles.itemRow}>
                {ads.map((ad,index)=>{
                    return <ListCompactItem key = {index} navigation = {navigation} item = {ad}/>
                })}
            </View>
        </ScrollView>

        <MainMenuBar navigation={navigation}/>
    </View>
    </SafeAreaView>
  )
}

export default HomepageScreen
