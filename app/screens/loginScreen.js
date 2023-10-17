import React, { useState } from  'react';
import { View, StyleSheet } from 'react-native';
import { TextInput,Button,Card,useTheme,Text,HelperText} from 'react-native-paper';
import {app,auth} from '../../firebase'
import {signInWithEmailAndPassword} from 'firebase/auth';
import { addUserAd,removeUserAd,getUserAds,getAd,addToFavorites,removeFromFavorites } from './data/dbOperations';
import { useDispatch,useSelector } from 'react-redux';


const LoginScreen = ({navigation}) => {
  const [incorrectCredentials,setIncorrectCredentials]  = useState(false)
  const theme = useTheme()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch()
  const selector = useSelector(state=> state.user)

  const handleLogin = async () => {
    try {
      const response = await signInWithEmailAndPassword(auth,email, password);
      const user = response.user
      const user_id = user.uid
      dispatch({type: 'setUserId',payload: user_id})
      console.log(selector)
      // removeUserAd('-NgfyKbkWgLSheEfP_8R')
      
      // getUserAds('H6GW5h0J2AfQ3DODVNHujNtRYSg2')
      // getAd('-Ngg0KixCEo-FCAQuwuI')
      // addToFavorites('H6GW5h0J2AfQ3DODVNHujNtRYSg2','adidd')
      // removeFromFavorites('H6GW5h0J2AfQ3DODVNHujNtRYSg2','adid')
      navigation.navigate('Home');
    } catch (error) {
      setIncorrectCredentials(true);
      console.log(error)
    }
  };


  const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      gap: 40,

    },
    title: {
      fontSize: 25,
      color: 'white',
      textAlign: 'center',
      marginTop: 20
    },
    card: {
      width: '80%',
      backgroundColor: theme.colors.background,
      padding: 10
    },
    input: {
      borderBottomWidth: 1,
      padding: 0,
      '& label': {
        color: 'red'
      }
    },
    helperText: {
      color: 'orange'
    },
    button: {
      marginTop: 16,
    },
    signupLinkContainer: {
      marginTop: 15,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    },
    singupLink:{
      color: 'orange'
    },
    toggleButton: {
      marginTop: 8,
    },
    textColor: {
      color: 'white'
    }
  });


  return (
      <View style={styles.container}>
        <Card style={styles.card}>
        <Card.Title
         title="Please Login"
         titleStyle={styles.title}
          />
          <Card.Content>
            <TextInput
              mode='filled'
              label="Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={styles.input}
            />
            <HelperText type="error" visible={incorrectCredentials} style={styles.helperText}>
              Email address is invalid!
            </HelperText>
            <TextInput
              mode='filled'
              label="Password"
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={true}
              style={styles.input}
            />
            <HelperText type="error" visible={incorrectCredentials} style={styles.helperText}>
              Invalid password
            </HelperText>
            <Button mode="contained" onPress={handleLogin} style={styles.button}>
              Login
            </Button>
            <View style = {styles.signupLinkContainer}>
              <Text style={styles.textColor}>
                Don't have an account ?
              </Text>
              <Button
              mode="text"
              style={styles.singupLink}
              onPress = {()=>navigation.navigate('Signup')}
              >Register</Button>
            </View>
          </Card.Content>
        </Card>
      </View>
  );
};


export default LoginScreen;
