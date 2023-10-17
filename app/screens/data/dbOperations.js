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
const getAd = (adId) => {
    const db = getDatabase(app);
    const adRef = ref(db, `ads/${adId}`);

    get(adRef)
      .then((adSnapshot) => {
          const adData = adSnapshot.val();
          console.log(adData)
      })
      .catch((error) => {
        console.error('Error getting ad:', error);
      });
  };
  const getCoverImage = async (adId) => {
    try {
      const storage = getStorage(app);
      const coverImgRef = sref(storage, `images/${adId}`);
      const result = await list(coverImgRef);
      const downloadURL = await getDownloadURL(result.items[0]);
      return downloadURL;
    } catch (error) {
      console.log('Error listing or getting download URL:', error);
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

  // Function to add an ad to a user's favorites
  const addToFavorites = async (userId, adId) => {
    const db = getDatabase(app);
    const favoritesRef = ref(db, `users/${userId}/favorites/`);
    try {
      const favoritesSnapshot = await get(favoritesRef);
      let favoritesArray = favoritesSnapshot.val() || [];
      if (!favoritesArray.includes(adId)) {
        favoritesArray.push(adId);
        await set(favoritesRef, favoritesArray);
        return 'added';
      } else {
        return 'exists';
      }
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
  const removeFromFavorites = (userId, adId) => {
    const db = getDatabase(app)
      const favoritesRef = ref(db, `users/${userId}/favorites`);

  // Fetch the current favorites array
  get(favoritesRef)
    .then((favoritesSnapshot) => {
      let favoritesArray = favoritesSnapshot.val() || [];

      if (favoritesArray.includes(adId)) {
        // Remove the adId from the favorites array
        favoritesArray = favoritesArray.filter(favId => favId !== adId);
        set(favoritesRef, favoritesArray)
          .then(() => {
            console.log('Ad removed from favorites.');
          })
          .catch((error) => {
            console.error('Error removing ad from favorites:', error);
          });
      } else {
        console.log('Ad is not in favorites.');
      }
    })
    .catch((error) => {
      console.error('Error getting favorites:', error);
    });
};

const getUserMessages = (userId) => {
    const db = getDatabase(app);

    // Reference to the user's data in the 'users' table
    const userRef = ref(db, `users/${userId}`);

    // Fetch the user's data
    get(userRef)
      .then((userSnapshot) => {
        if (userSnapshot.exists()) {
          const userData = userSnapshot.val();
          const messages = userData.messages || [];
          console.log('User Messages:', messages);
        } else {
          console.log('User not found');
        }
      })
      .catch((error) => {
        console.error('Error getting user messages:', error);
      });
  };

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
    addToFavorites,
    existsInFavorites,
    removeFromFavorites,
    getAllAds,
    getCategoryAds,
    getCoverImage,
    getAllAdImages
  }
