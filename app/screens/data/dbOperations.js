import {app} from '../../../firebase'
import { getDatabase,ref,set,push,key,get} from 'firebase/database';
import {getBlob, getDownloadURL, getStorage,list,listAll,ref as sref} from 'firebase/storage'
import { async } from '@firebase/util';



// return format for the data should be
// {
//   adId: adId,
//   adData: adData
// }
// {
//   userId: userId,
//   userData: userData
// }
// {
//   adId: adId,
//   chatHistory: chatMessages
// }





// Function to add a user ad to Firebase and update myposts and the ad table
const addUserAd = (userId,ad) => {
    // const userId = 'H6GW5h0J2AfQ3DODVNHujNtRYSg2'
    // const ad = {
    //     postId: 'id1',
    //     ownerId: 'H6GW5h0J2AfQ3DODVNHujNtRYSg2',
    //     title: 'title',
    //     price: 'price',
    //     description: 'description',
    //     location: 'location',
    //     images: 'images',
    //     category: 'category'
    // }
    const db = getDatabase(app);
    const adsRef = ref(db, `ads`);

    // Generate a new ad key for the ad being added
    const newAdRef = push(adsRef);

    // Get the key of the new ad
    const newAdKey = newAdRef.key;

    // Set the ad data in the ad table
    set(newAdRef, ad);

    // Update the user's myposts array with the new ad key
    const userMypostsRef = ref(db, `users/${userId}/myAds/${newAdKey}`);
    set(userMypostsRef, true);
    return {userId: userId , adId : newAdKey}
  };
  // Function to remove a user ad from Firebase
  const removeUserAd = (adId) => {
    const db = getDatabase(app);
  // Get the owner ID (userid) from the ad
  const adRef = ref(db, `ads/${adId}`);
  get(adRef).then((adSnapshot) => {
    if (adSnapshot.exists()) {
      const ownerId = adSnapshot.val().ownerId;
      console.log(ownerId)
      console.log(adSnapshot.val())

      // Reference to the user's myposts array
      const userMypostsRef = ref(db, `users/${ownerId}/myposts/${adId}`);
      set(userMypostsRef, null);

      // Reference to the ad in the 'ads' table
      const adRef = ref(db, `ads/${adId}`);
      set(adRef, null);
    }
  });
};

  // Function to edit a user ad in Firebase
  const editUserAd = (adId, updatedAd) => {
    const db = getDatabase(app)
  // Reference to the ad in the 'ads' table
    const adRef = ref(db, `ads/${adId}`);
    // Set the updated ad data, which will replace the previous value
    set(adRef, updatedAd);
};

const getUserAds = (userId) => {
  const db = getDatabase(app)
  const myAdsRef = ref(db,`users/${userId}/myAds`);
  get(myAdsRef)
  .then(adSnapshot => {
      console.log(adSnapshot.val())
  })
  .catch(err =>{
      console.log('error for getuseradd')
  })
};

const getAllAds = async () => {
  try {
    const db = getDatabase(app);
    const adsRef = ref(db, 'ads');
    const result = await get(adsRef);
    return result.val();
  } catch (err) {
    console.log(err); // You may want to return an appropriate value in case of an error
  }
}
  const getCategoryAds = async (category) => {
    try {
      const storage = getDatabase(app);
      const adsRef = ref(storage, 'ads');
      const result = await get(adsRef);
      const ads = result.val();
      const categoryArray = []
      const keys = Object.keys(ads)
      for(let i = 0; i < keys.length; i++){
        let key = keys[i]
        if(ads[key].category===category){
          categoryArray.push({adId:key,adData:ads[key]})
        }
      }
      return categoryArray
    } catch (err) {
      console.log(err);
    }
  };

// Function to get an ad using the adId
const getAd = async (adId) => {
  try {
    const db = getDatabase(app);
    const adRef = ref(db, `ads/${adId}`);
    const response = await get(adRef);
    const adData = response.val()
    return adData
  } catch (err) {
    throw err
  }
};

  const getCoverImage = async (adId) => {
    try {
      const storage = getStorage(app);
      const coverImgRef = sref(storage, `images/${adId}`);
      const result = await list(coverImgRef);
      const downloadURL = await getDownloadURL(result.items[0]);
      return downloadURL;
    } catch (err) {
      throw err
    }
  }
  const getAllAdImages = async (adId) => {
    try {
      const storage = getStorage(app);
      const imagesRef = ref(storage, `images/${adId}`);
      const result = await listAll(imagesRef);
      const downloadURLs = [];
      for (const itemRef of result.items) {
          const url = await getDownloadURL(itemRef);
          downloadURLs.push(url);
      }
      return downloadURLs;
    } catch (err) {
      console.log('Error listing images in the folder:', err);
    }
  };



  const getFavoriteAds = async (userId) => {
    try {
      const db = getDatabase(app);
      const favoriteAdsRef = ref(db, `users/${userId}/favorites/`);
      const result = await get(favoriteAdsRef);
      let favoriteAdsIds = result.val() || [];
      let favoriteAdsArray = [];

      // Use map to create an array of promises
      const fetchPromises = favoriteAdsIds.map(async (adId) => {
        let foundAd = await getAd(adId);
        favoriteAdsArray.push({ adId: adId, adData: foundAd });
      });

      // Wait for all promises to resolve using Promise.all
      await Promise.all(fetchPromises);

      return favoriteAdsArray;
    } catch (err) {
      throw err;
    }
  };


  // Function to add an ad to a user's favorites
  const addToFavorites = async (userId, adId) => {
    const db = getDatabase(app);
    const favoritesRef = ref(db, `users/${userId}/favorites/`);
    try {
      const favoritesSnapshot = await get(favoritesRef);
      let favoritesArray = favoritesSnapshot.val() || [];
        favoritesArray.push(adId);
        await set(favoritesRef, favoritesArray);
        return 'Ad added to favorites';
    } catch (error) {
      console.log('Error in addToFavorites:', error);
      throw error;
    }
  };

const existsInFavorites = async(userId,adId)=>{
  const db = getDatabase(app);
  const favoritesRef = ref(db, `users/${userId}/favorites/`);
  try {
    const favoritesSnapshot = await get(favoritesRef);
    let favoritesArray = favoritesSnapshot.val() || [];
    return favoritesArray.includes(adId)
  } catch (error) {
    console.log('Error in addToFavorites:', error);
    throw error;
  }
}
  // Function to remove an ad from a user's favorites
  const removeFromFavorites = async (userId, adId) => {
    try {
      const db = getDatabase(app);
      const favoritesRef = ref(db, `users/${userId}/favorites`);
      // Fetch the current favorites array
      const favoritesSnapshot = await get(favoritesRef);
      let favoritesArray = favoritesSnapshot.val() || [];
        // Remove the adId from the favorites array
        favoritesArray = favoritesArray.filter(favId => favId !== adId);
        await set(favoritesRef, favoritesArray);
        return 'Ad removed from favorites.'

    } catch (error) {
      // console.error('Error removing ad from favorites:', error);
      throw error
    }
  };



const getAdChatsHistory= async (userId,adId) => {
  const db = getDatabase(app);
    const userRef = ref(db, `users/${userId}/chatsHistory/${adId}`);
    try{
      const response = await get(userRef)
      const chatHistory = response.val()
      return chatHistory
    }
    catch(err){
      throw err

    }
}

const getChatInteractionHistory=async(chatInteractionId)=>{
  try{
    const db = getDatabase(app)
    const chatInteractionRef = ref(db,`chatInteraction/${chatInteractionId}`)
    const response = await get(chatInteractionRef)
    const chats = response.val()
    return chats
  }
  catch(err){
    throw err
  }


}

const getAdsInteractedWith= async (userId) => {
  try{
    const db = getDatabase(app);
    const chatHistoryRef = ref(db, `users/${userId}/chatInteraction/`);
    const response = await get(chatHistoryRef)
    const chatHistory = response.val()
    const keys = Object.keys(chatHistory)
    const array = keys.map(async chatInteractionId=>{
      const adId =chatHistory[chatInteractionId].adId
      const ad = await getAd(adId)
      return {chatInteractionId: chatInteractionId,adId:adId,adData: ad}
    })
    const adsInteractedWith = await Promise.all(array)
    return adsInteractedWith
  }
  catch(err){
    throw err
  }
}

const sendMessage = async (adId,userId,message)=>{
  try{
    // first check if the ad exists in the interactionHistory
    const db = getDatabase(app);
    const userChatInteractionRef = ref(db, `users/${userId}/chatInteraction/`);
    const response = await get(userChatInteractionRef);
    const chatInteraction = response.val() || {};
    console.log(chatInteraction);
    const chatInteractionIds = Object.keys(chatInteraction);

    let existsInChatInteraction = false;

    for (const chatInteractionId of chatInteractionIds) {
      const item = chatInteraction[chatInteractionId];

      if (item.adId === adId) {
        console.log('h');
        existsInChatInteraction = true;

        const chatInteractionRef = ref(db, `chatInteraction/${chatInteractionId}/`);
        const chatInteractionResponse = await get(chatInteractionRef);
        const previousData = chatInteractionResponse.val() || [];
        const updatedData = [...previousData, { message: message, senderId: userId }];

        await set(chatInteractionRef, updatedData);
      }
    }

    // add the chatinteractionid to owner and user when first time interacted
    if(!existsInChatInteraction){
      const adRef = ref(db,`ads/${adId}`)
      const adResponse = await get(adRef)
      const ad = adResponse.val()
      const ownerId = ad.ownerId
      console.log(ownerId)
      console.log(userId)
      const chatInteractionRef =  ref(db,'chatInteraction/')
      const response = await push(chatInteractionRef,[{message:message,senderId: userId}])
      const chatInteractionId = response.key
      const userChatInteractionRef = ref(db, `users/${userId}/chatInteraction/${chatInteractionId}/`)
      const ownerChatInteractionRef = ref(db, `users/-${ownerId}/chatInteraction/${chatInteractionId}/`)
      await set(userChatInteractionRef,{adId:adId})
      await set(ownerChatInteractionRef,{adId:adId})
    }
  }
  catch(err){
    throw err
  }
}
  // Function to remove a user from messaging
  const removeFromMessaging = (senderId, receiverId) => {
    const db = app.database();
    const messagesRef = db.ref(`messages`);

    messagesRef.remove(); // This will remove the entire conversation, be careful with this operation.
  };

  export {
    addUserAd,
    removeUserAd,
    getUserAds,
    getAd,
    getFavoriteAds,
    addToFavorites,
    existsInFavorites,
    removeFromFavorites,
    getAllAds,
    getCategoryAds,
    getCoverImage,
    getAllAdImages,
    getAdsInteractedWith,
    getAdChatsHistory,
    sendMessage,
    getChatInteractionHistory
  }
