import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import LoginScreen from './app/screens/loginScreen';
import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';
import HomepageScreen from './app/screens/homepageScreen';
import CategoryResult from './app/screens/categoryResultScreen';
import SingupScreen from './app/screens/signupScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ItemDescription from './app/screens/itemDescriptionScreen';
import PostItem from './app/screens/postItemScreen';
import ReceivedMessagesScreen from './app/screens/receivedMessagesScreen';
import CategorieScreen from './app/screens/categorieScreen';
import SellerBuyerInteractionScreen from './app/screens/sellerBuyerInteractionScreen';
import { Provider } from 'react-redux';
import store from './app/state/store';
// import SuccessAdPostMessage from './app/state/successAdPostMessage';
import FavoritesScreen from './app/screens/favoritesScreen.js';
import MyAdsScreen from './app/screens/myAdsScreen';
import SearchResultScreen from './app/screens/SearchResultScreen';
import SplashScreen from './app/screens/splashScreen';
import Animation from './app/screens/animation';


export default function App() {
  const [isDarkMode, setIsDarkMode] = React.useState(true);
  const theme = {
    dark: isDarkMode,
    roundness: 2,
    colors: {
      primary: isDarkMode ? '#F2F2F2' : '#f46036', // Your primary color
      secondory: '#89E1B7',
      border: isDarkMode ? '#32de8a' : '#f46036',
      background: isDarkMode ? '#3749E4' : '#32de8a', // Background color
      text: isDarkMode ? 'white' : 'black', // Text color
      icon: '#FF6B6B'
    },
  };
  const Stack = createNativeStackNavigator();
  return (
    <Provider store = {store}>
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator>
        {/* <Stack.Screen name="animation" component={Animation} /> */}
        <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SingupScreen} />
          <Stack.Screen name="Home" component={HomepageScreen} />
          <Stack.Screen name="SearchResult" component={SearchResultScreen} />
          <Stack.Screen name="MyAds" component={MyAdsScreen} />
          <Stack.Screen name="CategoryResult" component={CategoryResult} />
          <Stack.Screen name="ItemDescription" component={ItemDescription} />
          <Stack.Screen name="Post" component={PostItem} />
          <Stack.Screen name="Categories" component={CategorieScreen} />
          <Stack.Screen name="Favorites" component={FavoritesScreen} />
          <Stack.Screen name="Message" component={ReceivedMessagesScreen} />
          <Stack.Screen name = "SellerBuyerInteractionScreen" component={SellerBuyerInteractionScreen}/>
          {/* <Stack.Screen name="AdPostSuccess" component={SuccessAdPostMessage} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'dodgerblue',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
