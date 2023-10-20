import React,{useState,useEffect} from 'react'
// import data from '../screens/data/data'
import {Card, Text,Snackbar,useTheme} from 'react-native-paper'
import { View,StyleSheet} from 'react-native'
import ResultListItem from '../styledComponents/resultListItem'
import {useRoute} from '@react-navigation/native'
import { addToFavorites, getCategoryAds } from './data/dbOperations'
import MainMenuBar from '../styledComponents/mainMenuBar'
import {useSelector,useDispatch} from 'react-redux'




function SearchResultScreen({search_query,navigation}) {
  const theme = useTheme()
  const route = useRoute();
  const { category } = route.params;
  const [ads,setAds] = useState([])
  const user = useSelector(state=>state.user)
  const userId = user.userI
  const changeInData = user.changeInData
  const styles = StyleSheet.create({
    parentContainer: {
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between'
    }
  })
  useEffect( ()=>{
    const fetchAdsforCategory = async ()=>{
      try {
        const result = await getCategoryAds(category);
        setAds(result)
        console.log(category)
      } catch (err) {
        console.log(err);
      }
    }
    fetchAdsforCategory()
},[changeInData])
  return <View style = {styles.parentContainer}>
          <View>
          {ads.map((item,index)=>{
            return <ResultListItem
            key = {index}
            navigation={navigation}
            item = {item}
            />
          })}
            </View>
            <View>
              <MainMenuBar navigation={navigation}/>
            </View>
        </View>



}

export default SearchResultScreen
