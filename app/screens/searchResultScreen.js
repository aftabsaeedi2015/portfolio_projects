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
    }
  })
  return <View style = {styles.parentContainer}>
          <View>
          {result.map((item,index)=>{
            return <ResultListItem
            key = {index}
            navigation={navigation}
            item = {item}
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
