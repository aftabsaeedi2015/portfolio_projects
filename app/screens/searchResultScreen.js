import React,{useState} from 'react'
// import data from '../screens/data/data'
import {Card, Text,Snackbar,useTheme} from 'react-native-paper'
import { View,StyleSheet} from 'react-native'
import ResultListItem from '../styledComponents/resultListItem'
import {useRoute} from '@react-navigation/native'
import { addToFavorites } from './data/dbOperations'
import MainMenuBar from '../styledComponents/mainMenuBar'



function SearchResultScreen({search_query,navigation}) {
  const theme = useTheme()
  const route = useRoute();
  const { result } = route.params;
  const[snackbarVisiblility,setSnackbarVisibility] = useState(false)
  const [snackbarValue,setSnackbarValue] = useState('')
  console.log(result)
  const itemSelectionHandler = (item) => {
    navigation.navigate('ItemDescription',{item : item})
  }
  const handleSnackbar=(response)=>{
        setSnackbarValue(response)
        setSnackbarVisibility(true)
  }
  const styles = StyleSheet.create({
    parentContainer: {
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between'
    },
    snackbar:{
      display: 'absolute',
      top: 550,
      backgroundColor: theme.colors.background,
    },
    snackbarText: {
      color: 'white'
    }
  })
  return <View style = {styles.parentContainer}>
          <View>
          {result.map((item,index)=>{
            return <ResultListItem
            key = {index}
            navigation={navigation}
            item = {item}
            itemSelectionHandler={itemSelectionHandler}
            handleSnackbar={handleSnackbar}
            />
          })}
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
            </View>
            <View>
              <MainMenuBar/>
            </View>
        </View>



}

export default SearchResultScreen
