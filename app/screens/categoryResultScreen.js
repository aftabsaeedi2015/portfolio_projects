import React,{useState,useEffect} from 'react'
// import data from '../screens/data/data'
import {Card, Text,Snackbar,useTheme,ActivityIndicator} from 'react-native-paper'
import { View,StyleSheet} from 'react-native'
import ResultListItem from '../styledComponents/resultListItem'
import {useRoute} from '@react-navigation/native'
import { addToFavorites, getCategoryAds } from './data/dbOperations'
import MainMenuBar from '../styledComponents/mainMenuBar'
import {useSelector,useDispatch} from 'react-redux'




function CategoryResult({search_query,navigation}) {
  const theme = useTheme()
  const route = useRoute();
  const { category } = route.params;
  const [ads,setAds] = useState([])
  const user = useSelector(state=>state.user)
  const userId = user.userI
  const changeInData = user.changeInData
  const [loading, setLoading] = useState(true)
  const styles = StyleSheet.create({
    parentContainer: {
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between'
    },
    loadingIcon:{
      position: 'absolute',
      top: '50%',
      left: '50%'
    },
  })
  useEffect( ()=>{
    const fetchAdsforCategory = async ()=>{
      try {
        const result = await getCategoryAds(category);
        setAds(result)
        setLoading(false)
      } catch (err) {
        console.log(err);
      }
    }
    fetchAdsforCategory()
},[changeInData])
  return <View style = {styles.parentContainer}>
          {loading&&<ActivityIndicator
                          animating={true}
                          size = {40}
                          style = {styles.loadingIcon}
                          color={theme.colors.background} />
              }
          <View>
          {!loading && ads.map((item,index)=>{
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

export default CategoryResult
