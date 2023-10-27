import React,{useEffect} from 'react'
import Animated,{Easing, useSharedValue, withSpring, withTiming} from 'react-native-reanimated';
import {StyleSheet,Text,View,Image,Button} from 'react-native'
import { useTheme } from 'react-native-paper';






function SplashScreen({navigation}) {
    const theme = useTheme()
    const width = useSharedValue(-100);

    const handlePress = () => {
        width.value = withTiming(0);
    };

    useEffect(() => {
        width.value = withSpring(300);
        setTimeout(() => {
            navigation.navigate('Login')
        }, 1000);

    }, []);
    const styles = StyleSheet.create({
        splashScreen:{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: require('../assets/splashScreenBackground.jpg')
        },
        backgroundImage:{
            flex: 1,
            resizeMode: 'cover',
            position: 'absolute',
            width: '100%',
            height: '100%'
        },
        welcomeText: {
            fontSize: 50,
        },
        loadingBar:{
            backgroundColor: theme.colors.background,
            width,
            height: 20,
            borderRadius: 10
        }

    })
    return (
        <View style={styles.splashScreen}>
          <Image
            source={require('../assets/splashScreenBackground.jpg')}
            style={styles.backgroundImage}
          />
            <Text style = {styles.welcomeText}>welcome </Text>
            <Animated.View
            style={styles.loadingBar}
        />

        </View>
      );
}

export default SplashScreen
