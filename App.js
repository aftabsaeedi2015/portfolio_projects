import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import LoginScreen from './app/screens/loginScreen';
import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';
import HomepageScreen from './app/screens/homepageScreen';
import SearchResultScreen from './app/screens/searchResultScreen';
import SingupScreen from './app/screens/signupScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ItemDescription from './app/screens/itemDescription';
import PostItem from './app/screens/postItem';
import Favorites from './app/screens/favoriteItems';
import receivedMessagesScreen from './app/screens/receivedMessagesScreen';
import CategorieScreen from './app/screens/categorieScreen';
import MessageItem from './app/styledComponents/messageItem';
import SellerBuyerInteractionScreen from './app/screens/sellerBuyerInteractionScreen';
import { Provider } from 'react-redux';
import store from './app/state/store';
import SuccessAdPostMessage from './app/screens/successAdPostMessage';


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
          <Stack.Screen name="Login" component={LoginScreen} />
          {/* <Stack.Screen name="Signup" component={SingupScreen} /> */}
          <Stack.Screen name="Home" component={HomepageScreen} />
          <Stack.Screen name="SearchResult" component={SearchResultScreen} />
          <Stack.Screen name="ItemDescription" component={ItemDescription} />
          {/* <Stack.Screen name="Post" component={PostItem} /> */}
          {/* <Stack.Screen name="Categories" component={CategorieScreen} /> */}
          <Stack.Screen name="Favorites" component={Favorites} />
          {/* <Stack.Screen name="Message" component={receivedMessagesScreen} /> */}
          {/* <Stack.Screen name = "SellerBuyerInteractionScreen" component={SellerBuyerInteractionScreen}/> */}
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
