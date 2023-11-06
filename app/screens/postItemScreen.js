import React, { useState } from "react";
import {
  Button,
  Text,
  TextInput,
  useTheme,
  Checkbox,
  Modal,
  Portal,
  List,
  Divider,
  ActivityIndicator,
} from "react-native-paper";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import MainMenuBar from "../styledComponents/mainMenuBar";
import { app } from "../../firebase";
import {
  getStorage,
  ref,
  uploadBytes,
  listAll,
  getDownloadURL,
} from "firebase/storage";
import * as ImagePicker from "expo-image-picker";
import { useSelector } from "react-redux";
import { addUserAd, uploadImages } from "../screens/data/dbOperations";
import { createAd } from "../screens/data/dataModel";

function PostItem({ navigation }) {
  const categories = [
    {
      title: "clothing",
      icon: "tshirt",
    },
    {
      title: "electronics",
      icon: "tablet",
    },
    {
      title: "books",
      icon: "book",
    },
    {
      title: "sport and fitness",
      icon: "football",
    },
    {
      title: "pets",
      icon: "cat",
    },
  ];
  const [showCategories, setShowCategories] = useState(false);
  const theme = useTheme();
  const [checked, setChecked] = useState(false);
  const [modalVisibility, setModalVisibility] = useState(false);
  const handleModalDismiss = () => {
    setModalVisibility(false);
  };
  const handleModalVisible = () => {
    setModalVisibility(true);
  };
  const [imageUrls, setImageUrls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [ad, setAd] = useState({
    title: "",
    price: "",
    description: "",
    location: "",
    category: "",
  });
  const userId = useSelector((state) => state.user);
  const storage = getStorage(app);
  var counter = 0;
  const selectImage = async () => {
    if (!loading) {
      let results = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [4, 3],
        quality: 0.2,
        allowsMultipleSelection: true,
      });
      if (!results.canceled) {
        const image_uri = results.assets[0].uri;

        setImageUrls([...imageUrls, image_uri]);
      }
    }
  };
  const handlePostAd = async () => {
    console.log(ad);
    try {
      setLoading(true);
      const ownerId = userId.userId;
      console.log(ad);
      const adModel = createAd({
        ownerId: ownerId,
        title: ad.title,
        price: ad.price,
        description: ad.description,
        location: ad.location,
        category: ad.category,
      });
      const adInfo = await addUserAd(ownerId, adModel);
      console.log(adInfo);
      const response = await uploadImages(imageUrls, adInfo.adId);
      navigation.navigate("MyAds");
    } catch (err) {
      console.error("Error uploading images:", err);
    }
  };

  const styles = StyleSheet.create({
    safeArea:{
      flex: 1,
      backgroundColor: theme.colors.background
    },
    parentContainer: {
      display: "flex",
      flexDirection: "column",
      padding: 10,
      gap: 30,
      backgroundColor: theme.colors.background,
      paddingTop: 50
    },
    title: {
      backgroundColor: theme.colors.accent,
      borderWidth: 1,
      borderColor: theme.colors.accent,
      borderRadius: 5,
      flex: 1,
    },
    price: {
      borderWidth: 1,
      backgroundColor: theme.colors.accent,
      borderColor: theme.colors.accent,
      borderRadius: 5,
      flex: 1,
    },
    firstRow: {
      display: "flex",
      flexDirection: "row",
      gap: 5,
    },
    descriptionInput: {
      borderWidth: 1,
      backgroundColor: theme.colors.accent,
      borderColor: theme.colors.accent,
      borderRadius: 5,

    },
    category: {
      color: theme.colors.accent,
      borderWidth: 1,
      borderColor: theme.colors.accent,
      zIndex: 1,
      backgroundColor: theme.colors.accent,
    },
    loadingIcon: {
      position: "absolute",
      top: "50%",
      left: "50%",
    },
    categoriesDropdown: {
      position: "absolute",
      backgroundColor: theme.colors.accent,
      borderWidth: 1,
      borderColor: theme.colors.accent,
      width: "100%",
      top: 50,
      borderRadius: 5,
      zIndex: 1,
    },
    phone: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      zIndex: -1,
    },
    checkBox:{
      backgroundColor: theme.colors.background,
      borderWidth: 1,
      borderColor: theme.colors.accent,
      borderRadius: '50%',
    },
    addressContainer: {
      backgroundColor: theme.colors.accent,
      borderWidth: 1,
      borderColor: theme.colors.accent,
      zIndex: -1,
      borderRadius: 5,
      color: 'white'
    },
    plusIcon: {
      color: theme.colors.accent,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: -1,
    },
    imageSection: {
      display: "flex",
      flexDirection: "row",
      gap: 40,
      justifyContent: "space-between",
      zIndex: -1,
    },
    imagesContainer: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      flex: 1,
      gap: 4,
    },
    image: {
      height: 100,
      width: 100,
      borderRadius: 5
    },
    removeImageIcon:{
      position: 'absolute',
      color: 'red',
      left: 75,
      zIndex: 1
    },
    modal: {
      backgroundColor: "rgba(0,0,0,0.3)",
      padding: 10,
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    modalImageContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flex: 1,
    },
    modalImage: {
      height: 400,
      width: 400,
    },
    button: {
      backgroundColor: theme.colors.accent,
    },
    buttonContainer: {
      display: "flex",
      flexDirection: "row",
      gap: 5,
      alignItems: "flex-end",
      justifyContent: "center",
      flex: 1,
      zIndex: -1
    },
  });

  return (
    <SafeAreaView style = {styles.safeArea}>
      <ScrollView>
        <View style={styles.parentContainer}>
          {loading && (
            <ActivityIndicator
              animating={true}
              size={40}
              style={styles.loadingIcon}
              color={theme.colors.background}
            />
          )}
          <View style={styles.firstRow}>
            <TextInput
              mode="flat"
              label="title"
              value={ad.title}
              style={styles.title}
              activeUnderlineColor = {theme.colors.accentText}
              onChangeText={(text) => setAd({ ...ad, title: text })}
            />

            <TextInput
              mode="flat"
              label="price"
              value={ad.price}
              style={styles.price}
              activeUnderlineColor = {theme.colors.accentText}
              onChangeText={(text) => setAd({ ...ad, price: text })}
            />
          </View>
          <View styles={styles.description}>
            <TextInput
              multiline
              mode="flat"
              label="description"
              value={ad.description}
              activeUnderlineColor = {theme.colors.accentText}
              style={styles.descriptionInput}
              onChangeText={(text) => setAd({ ...ad, description: text })}
            />
          </View>
          <View>
            <Button
              icon="arrow-right"
              mode="contained"
              onPress={() => setShowCategories(!showCategories)}
              contentStyle={{
                flexDirection: "row-reverse",
                justifyContent: "space-between",
              }}
              style={styles.category}
              labelStyle = {{color: theme.colors.accentText}}
            >
              select category
            </Button>
            {showCategories ? (
              <View style={styles.categoriesDropdown}>
                {categories.map((category) => {
                  return (
                    <>
                      <List.Item
                        key={Math.random()}
                        onPress={() => {
                          setShowCategories(false);
                          setAd({ ...ad, category: category.title });
                        }}
                        title={category.title}

                        left={(props) => (
                          <List.Icon {...props} icon={category.icon} color={theme.colors.accentText}/>
                        )}
                        titleStyle={{ color: theme.colors.accentText }}
                      />
                      {/* <Divider bold = {true}/> */}
                    </>
                  );
                })}
              </View>
            ) : null}
          </View>
          <View style={styles.phone}>
            <Text style = {{color: theme.colors.text}}>Phone Number</Text>
            <View style = {styles.checkBox}>
            <Checkbox
              status={checked ? "checked" : "unchecked"}
              onPress={() => {
                setChecked(!checked);
              }}
              color={theme.colors.accent}
              style={{ backgroundColor: theme.colors.accent }}
            />
            </View>
          </View>
          <View style={styles.addressContainer}>
            <TextInput
              mode="flat"
              label="address"
              value={ad.location}
              activeUnderlineColor = {theme.colors.accentText}
              onChangeText={(text) => setAd({ ...ad, location: text })}

            />
          </View>
          <View style={styles.imageSection}>
            <Icon
              name="upload"
              size={40}
              style={styles.plusIcon}
              onPress={selectImage}
              disabled={loading}
            />
            <View style={styles.imagesContainer}>
              <Portal style={{ backgroundColor: "red" }}>
                <Modal
                  visible={modalVisibility}
                  onDismiss={handleModalDismiss}
                  contentContainerStyle={styles.modal}
                >
                  <TouchableOpacity
                    onPress={() => {
                      setModalVisibility(false);
                    }}
                  >
                    <Icon name="close" size={50} />
                  </TouchableOpacity>
                  <View style={styles.modalImageContainer}>
                    <Image
                      alt="image"
                      source={require("../assets/phone.jpg")}
                      style={styles.modalImage}
                    />
                  </View>
                </Modal>
              </Portal>
              {imageUrls.map((url) => {
                return (
                  <TouchableOpacity onPress={handleModalVisible} key={url}>
                    <View style = {styles.uploadedImageContainer}>
                      <TouchableOpacity onPress={()=>{
                        const updatedUploadedImageUrls = imageUrls.filter(imageUrl => imageUrl !== url);
                        setImageUrls(updatedUploadedImageUrls)
                        }}
                        style = {{zIndex: 1}}
                        >
                      <Icon
                        name="close"
                        size={30}
                        style = {styles.removeImageIcon}

                        />
                      </TouchableOpacity>
                    <Image
                      alt="image"
                      source={{ uri: url }}
                      style={styles.image}
                    />
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <Button
              mode="filled"
              onPress={() => {
                handlePostAd();
              }}
              style={styles.button}
              labelStyle = {{color: theme.colors.accentText}}
              disabled={loading}
            >
              Post Ad
            </Button>
          </View>
        </View>
      </ScrollView>
      <MainMenuBar navigation={navigation} />
    </SafeAreaView>
  );
}

export default PostItem;
