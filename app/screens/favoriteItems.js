import React from 'react'
import { Text } from 'react-native-paper'
import {View,StyleSheet} from 'react-native'
import ResultListItem from '../styledComponents/resultListItem'
import MainMenuBar from '../styledComponents/mainMenuBar'
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'space-between',
    padding: 10
  }
})
function Favorites({navigation}) {
  return (
    <View style = {styles.mainContainer}>
      <View>
        <ResultListItem navigation={navigation}/>
      </View>
      <MainMenuBar navigation={navigation}/>
    </View>
  )
}

export default Favorites
