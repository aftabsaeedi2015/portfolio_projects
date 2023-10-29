import React,{useState,useEffect} from 'react'
import {useTheme,ActivityIndicator} from 'react-native-paper'
import { View,StyleSheet,Text} from 'react-native'
import ResultListItem from '../styledComponents/resultListItem'
import {useRoute} from '@react-navigation/native'
import {getAdsMatchingSearchQuery } from './data/dbOperations'
import MainMenuBar from '../styledComponents/mainMenuBar'
import {useSelector} from 'react-redux'




function SearchResultScreen({navigation}) {
  const theme = useTheme()
  const route = useRoute()
  const {searchQuery} = route.params
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
      justifyContent: 'space-between',
    },
    loadingIcon:{
      position: 'absolute',
      top: '50%',
      left: '50%'
    },
    noResultTextContainer:{
      position: 'absolute',
      top: '50%',
      left: '45%',

    }
  })
  useEffect( ()=>{
    const fetchAdsforCategory = async ()=>{
      try {
        const response = await getAdsMatchingSearchQuery(searchQuery)
        setAds(response)
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
          {ads.map((ad,index)=>{
            return <ResultListItem
            key = {index}
            navigation={navigation}
            item = {ad}
            />
          })}
          {ads.length===0 && <Text style = {styles.noResultTextContainer}>
            no ads found
          </Text>
            }
            </View>
            <View>
              <MainMenuBar navigation={navigation}/>
            </View>
        </View>



}

export default SearchResultScreen
