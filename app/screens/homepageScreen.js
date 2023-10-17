import React, { useEffect, useState } from 'react'
import {Text,Card,Button,useTheme, Snackbar} from 'react-native-paper'
import { StyleSheet,View,TextInput, SafeAreaView, TouchableOpacity,ScrollView } from 'react-native'
import SearchBar from '../styledComponents/searchBar'
import Icon from 'react-native-vector-icons/FontAwesome';
import ListCompactItem from '../styledComponents/listCompactItem';
import MainMenuBar from '../styledComponents/mainMenuBar';
import ItemCategoriesBar from '../styledComponents/itemCategoriesBar';
import {getAllAds, getCategoryAds} from './data/dbOperations'

function HomepageScreen({navigation}) {
    const [ads,setAds] = useState([])
    const theme = useTheme()
    const [searchQuery, setSearchQuery] = React.useState('');
    const[snackbarVisiblility,setSnackbarVisibility] = useState(false)
    const [snackbarValue,setSnackbarValue] = useState('')
    const handleSnackbar=(response)=>{
        setSnackbarValue(response)
        setSnackbarVisibility(true)
      }
    const handleSearch = ()=>{console.log(searchQuery)}
    const handleCategorySelection = async (category) => {
        try {
          const result = await getCategoryAds(category);
          navigation.navigate('SearchResult', { result: result });
        } catch (err) {
          console.log(err);
        }
      };

    useEffect( ()=>{
        const fetchData = async () => {
            try {
              const allAds = await getAllAds();
              const adIds = Object.keys(allAds);
              const adsData = Object.values(allAds);
              const adsArray = adIds.map((adId, index) => ({ adId : adId , adData: adsData[index] }));
              setAds(adsArray);
            } catch (err) {console.log(err)}
          };
          fetchData();
    },[])
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
        snackbar:{
            display: 'absolute',
            backgroundColor: theme.colors.background,
            top: -50
          },
        snackbarText: {
        color: 'white'
        }


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
        {<ItemCategoriesBar navigation ={navigation} categoryHandler = {handleCategorySelection}/>}
        <ScrollView contentContainerStyle = {styles.itemContainer}>
            <View style={styles.itemRow}>
                {ads.map((ad,index)=>{
                    return <ListCompactItem key = {index} navigation = {navigation} item = {ad} handleSnackbar={handleSnackbar} />
                })}
            </View>
        </ScrollView>
        <Snackbar
        style = {styles.snackbar}
        visible={snackbarVisiblility}
        onDismiss = {()=>{setSnackbarVisibility(false)}}
        duration = '2000'
        >
            <Text style = {styles.snackbarText}>
                {snackbarValue}
            </Text>
        </Snackbar>
        <MainMenuBar navigation={navigation}/>
    </View>
    </SafeAreaView>
  )
}

export default HomepageScreen
