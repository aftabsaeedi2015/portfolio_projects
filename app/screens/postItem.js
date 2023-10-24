import React, { useState } from 'react'
import {Button, Text, TextInput, useTheme,Checkbox, Modal, Portal,List,Divider} from 'react-native-paper'
import {View,StyleSheet,Image, TouchableOpacity,ScrollView} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import MainMenuBar from '../styledComponents/mainMenuBar';
import {app} from '../../firebase'
import {getStorage,ref,uploadBytes,listAll, getDownloadURL} from 'firebase/storage'
import * as ImagePicker from 'expo-image-picker';
import {useSelector} from 'react-redux'
import {addUserAd, uploadImages} from '../screens/data/dbOperations'
import {createAd} from '../screens/data/dataModel'



function PostItem({navigation}) {
  const categories = [
    {
      title: 'clothing',
      icon: 'tshirt'
    },
    {
      title: 'electronics',
      icon: 'tablet'
    },
    {
      title: 'books',
      icon: 'book'
    },
    {
      title: 'sport and fitness',
      icon: 'football'
    },
    {
      title: 'pets',
      icon: 'cat'
    }
  ]
  const [showCategories,setShowCategories] = useState(false)
  const theme = useTheme()
  const [checked,setChecked] = useState(false)
  const [modalVisibility,setModalVisibility] = useState(false)
  const handleModalDismiss = ()=>{setModalVisibility(false)}
  const handleModalVisible = ()=>{setModalVisibility(true)}
  const [imageUrls,setImageUrls] = useState([])
  const [ad,setAd] = useState({
    title: '',
    price: '',
    description: '',
    location: '',
    category: ''
  })
  const userId = useSelector(state=>state.user)
  const storage = getStorage(app);
  var counter = 0
  const selectImage = async () => {
    let results = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 0.2,
      allowsMultipleSelection: true
    });
    if (!results.canceled) {
      const image_uri = results.assets[0].uri

      setImageUrls([...imageUrls,image_uri])
    }
  };
  const handlePostAd = async () => {
    console.log(ad)
    try {
      const ownerId = userId.userId
      console.log(ad)
      const adModel = createAd({ownerId: ownerId,title: ad.title,price: ad.price,description: ad.description,location:ad.location,category: ad.category})
      const adInfo = await addUserAd(ownerId,adModel)
      console.log(adInfo)
      const response = await uploadImages(imageUrls,adInfo.adId)
      navigation.navigate('MyAds')
    } catch (err) {
      console.error('Error uploading images:', err);
    }
  };


  const styles = StyleSheet.create({
    parentContainer: {
      display: 'flex',
      flexDirection: 'column',
      padding: 10,
      gap: 20,
    },
    title: {
      backgroundColor: 'white',
      flex: 1
    },
    firstRow: {
      display: 'flex',
      flexDirection: 'row',
      gap: 5
    },
    descriptionInput: {
      backgroundColor: 'white'
    },
    category: {
      color: 'black',
      borderWidth: 1,
      borderColor: 'black',
      zIndex: 1
    },

    categoriesDropdown:{
      position: 'absolute',
      backgroundColor: theme.colors.background,
      width: '100%',
      top: 50,
      borderRadius: 5,
      zIndex: 1
    },
    phone: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      zIndex: -1
    },
    addressContainer: {
      zIndex: -1,
      height: 170,
      gap: 5
    },
    plusIcon: {
      color: theme.colors.background,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: -1
    },
    imageSection: {
      display: 'flex',
      flexDirection: 'row',
      gap: 40,
      justifyContent: 'space-between',
      zIndex: -1
    },
    imagesContainer: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      flex: 1,
      gap: 4
    },
    image: {
      height: 100,
      width: 100
    },

    modal:{
      backgroundColor: 'rgba(0,0,0,0.3)',
      padding: 10,
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    modalImageContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1
    },
    modalImage: {
      height: 400,
      width: 400
    },
    button: {
      backgroundColor: theme.colors.background
    },
    buttonContainer: {
      display: 'flex',
      flexDirection: 'row',
      gap: 5,
      alignItems: 'flex-end',
      justifyContent: 'center',
      flex: 1,
    }
  })

  return <>
  <ScrollView>
  <View style ={styles.parentContainer}>
          <View
          style = {styles.firstRow}
          >
           <TextInput
            mode='outlined'
            label='title'
            value={ad.title}
            style={styles.title}
            onChangeText={text => setAd({ ...ad, title: text })}
          />

            <TextInput
            mode='outlined'
            label='price'
            value={ad.price}
            style = {styles.title}
            onChangeText={text => setAd({ ...ad, price: text })}
            />
          </View>
          <View styles = {styles.description}>
            <TextInput
            multiline
            mode= 'outlined'
            label='description'
            value = {ad.description}
            style = {styles.descriptionInput}
            onChangeText={text => setAd({ ...ad, description: text })}
            />
          </View>
          <View>
          <Button
          icon="arrow-right"
          mode="contained"
          onPress={() => setShowCategories(!showCategories)}
          contentStyle={{flexDirection: 'row-reverse',justifyContent: 'space-between'}}
          style = {styles.category}
          >
            select category
          </Button>
          {showCategories ? (
              <View style = {styles.categoriesDropdown}>
            {categories.map(category=>{
              return<>
                      <List.Item
                        key={Math.random()}
                        onPress={() => {
                          setShowCategories(false)
                          setAd({ ...ad, category: category.title })
                        }}
                        title={category.title}
                        left={props => <List.Icon {...props} icon={category.icon} />}
                        titleStyle = {{color: 'white'}}
                      />
                      {/* <Divider bold = {true}/> */}
                    </>
            })}
            </View>
          ): null}

          </View>
          <View style = {styles.phone}>
            <Text>
              Phone Number
            </Text>
          <Checkbox
              status={checked ? 'checked' : 'unchecked'}
              onPress={() => {
                setChecked(!checked);
              }}
              color = {theme.colors.background}
              style = {{backgroundColor: 'black'}}
            />
          </View>
          <View style = {styles.addressContainer}>
            <TextInput
            mode='outlined'
            label='address'
            value={ad.location}
            style = {styles.title}
            onChangeText={text => setAd({ ...ad, location: text })}
            />
          </View>
          <View style = {styles.imageSection}>
            <Icon
            name = 'plus'
            size = {50}
            style={styles.plusIcon}
            onPress = {selectImage}
            />
            <View style = {styles.imagesContainer}>
              <Portal
              style = {{backgroundColor: 'red'}}
              >
                <Modal
                visible = {modalVisibility}
                onDismiss = {handleModalDismiss}
                contentContainerStyle = {styles.modal}
                >
                  <TouchableOpacity onPress={()=>{setModalVisibility(false)}}>
                    <Icon name ='close' size ={50}/>
                  </TouchableOpacity>
                  <View style = {styles.modalImageContainer}>
                    <Image
                    alt='image'
                    source = {require('../assets/phone.jpg')}
                    style = {styles.modalImage}
                    />
                  </View>
                </Modal>
              </Portal>
              {imageUrls.map(url=>{
                return <TouchableOpacity
                        onPress={handleModalVisible}
                        key = {url}
                        >
                        <Image
                          alt='image'
                          source = {{ uri: url }}
                          style = {styles.image}/>
                        </TouchableOpacity>
              })}

            </View>
          </View>
          <View style = {styles.buttonContainer}>

            <Button
            mode="filled"
            onPress={()=>{handlePostAd()}}
            style={styles.button}

            >
              Post Ad
            </Button>
          </View>
        </View>
        </ScrollView>
        <MainMenuBar/>
        </>
}

export default PostItem
