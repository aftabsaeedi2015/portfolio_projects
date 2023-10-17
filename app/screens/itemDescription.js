import React, { useEffect, useState } from 'react'
import {Text} from 'react-native-paper'
import {StyleSheet,View,Image, ScrollView} from 'react-native'
import  Icon  from 'react-native-vector-icons/FontAwesome'
// import {MapView,Marker} from 'react-native-maps';
import ListCompactItem from '../styledComponents/listCompactItem';
import { useRoute } from '@react-navigation/native';
import { getCategoryAds } from './data/dbOperations';

const styles = StyleSheet.create({
  parentContainer: {
    padding: 10,
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    paddingBottom: 20
  },
  imageContainer: {
    height: 400,
    width: '100%'
  },
  image: {
    height: 400,
    width: 'auto'
  },
  locationContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  costAndLocationContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  desccription: {
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5
  },
  profileDetails: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5

  },
  profileImage: {
    borderRadius: '50%',
    height: 70,
    width: 70
  },
  profileText: {
    display: 'flex',
    gap: 10,
  },
  mapContainer: {
    width: '100%',
    height: 400
  },
  map: {
    width: '100%',
    height: 200
  },
  similarItemsContainer: {
    display: 'flex',
    flexDirection: 'row',
    height: 200,
    gap: 10,
    marginTop: 10
  }
})

function ItemDescription({navigation}) {
  const route = useRoute();
  const { item } = route.params;
  const [similarAds,setSimilarAds] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getCategoryAds(item.adData.category);
        setSimilarAds(result);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);


  const similarItems = [
    {
      title: 'iphone x',
      description: '1 year old',
      image: require('../assets/phone.jpg')
    },
    {
        title: 'iphone x',
        description: '1 year old',
        image: require('../assets/phone.jpg')
    },
    {
    title: 'iphone x',
    description: '1 year old',
    image: require('../assets/phone.jpg')
    },
    {
      title: 'iphone x',
      description: '1 year old',
      image: require('../assets/phone.jpg')
    },
    {
    title: 'iphone x',
    description: '1 year old',
    image: require('../assets/phone.jpg')
    }
   ]
  return <ScrollView
      style = {styles.parentContainer}
      showsVerticalScrollIndicator = {false}
      >
        <View style = {styles.imageContainer}>
          <Image source={require('../assets/phone.jpg')} style = {styles.image}/>
        </View>
        <View >
          <Text style = {{fontSize: 30}} >
            {item.adData.title}
          </Text>
        </View>
        <View style = {styles.costAndLocationContainer}>
          <Text style = {{fontSize: 30}}>
            {item.adData.price}
          </Text>
          <View style = {styles.locationContainer}>
            <Icon name = 'mobile' size={40}/>
            <Text style = {{fontSize: 30}} >
              {item.adData.location}
            </Text>
          </View>
        </View>
        <View style = {styles.desccription}>
          <Text>
            {item.adData.desccription}
          </Text>
        </View>
          <View style = {styles.profileDetails}>
            <Image source={require('../assets/phone.jpg')} style = {styles.profileImage}/>
            <View style = {styles.profileText}>
              <Text>
                Aftab
              </Text>
              <Text>
                Aftab
              </Text>
            </View>
        </View>
        <View>
          <Text>
            Location on the map
          </Text>
          <View style = {styles.mapContainer} >
            {/* <MapView style = {styles.map}>
            </MapView> */}
          </View>
        </View>
        <View>
          <Text>
            similar items
          </Text>
          <ScrollView
          alwaysBounceHorizontal={true}
          bounces = {true}
          horizontal = {true}
          showsHorizontalScrollIndicator = {false}
          >
            <View style = {styles.similarItemsContainer}>
            {similarAds.map((similarAd,index)=>{
              return similarAd.adId!=item.adId? <ListCompactItem key={index} item = {similarAd} navigation = {navigation} /> : null
            })}
            </View>
          </ScrollView>
        </View>
      </ScrollView>
}

export default ItemDescription
