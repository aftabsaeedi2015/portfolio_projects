import React, { useState } from "react";
import { View, StyleSheet,Image } from "react-native";
import {
  TextInput,
  Button,
  Card,
  useTheme,
  Text,
  HelperText,
} from "react-native-paper";
import { app, auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";

const SingupScreen = ({ navigation }) => {
  const [incorrectCredentials, setIncorrectCredentials] = useState(false);
  const theme = useTheme();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validation, setValidation] = useState(false)

  const handleSignup = async () => {
    setValidation(true)
    try {
      const userCreds = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCreds.user;
      const user_id = user.uid;
      const db = getDatabase(app);
      const user_ref = ref(db, `users/${user_id}`);
      set(user_ref, {
        name: name,
        phone: phone,
        chatsHistory: { GgoMEaH1S0gEKDEiGiam6ttnWlq1: "hello how are you" },
      });
      navigation.navigate("Login");
    } catch (error) {
      console.log(error);
      setIncorrectCredentials(true);
    }
  };

  const styles = StyleSheet.create({
    container: {
      backgroundColor: "white",
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      gap: 40,
    },
    backgroundImage: {
      flex: 1,
      resizeMode: "cover",
      position: "absolute",
      width: "100%",
      height: "100%",
      zIndex: -1,
    },
    title: {
      fontSize: 25,
      color: "white",
      textAlign: "center",
      marginTop: 20,
    },
    card: {
      width: "80%",
      backgroundColor: theme.colors.secondary,
      padding: 10,
    },
    input: {
      backgroundColor: theme.colors.accent,
      borderWidth: 1,
      borderColor: theme.colors.accent,
      zIndex: -1,
      borderRadius: 5,
      color: 'white'
    },
    helperText: {
      color: "orange",
    },
    button: {
      marginTop: 16,
    },
    signupLinkContainer: {
      marginTop: 15,
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    singupLink: {
      color: "orange",
    },
    toggleButton: {
      marginTop: 8,
    },
    textColor: {
      color: "white",
    },
  });

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/splashScreenBackground.jpg")}
        style={styles.backgroundImage}
      />
      <Card style={styles.card}>
        <Card.Title title="Create your account" titleStyle={styles.title} />
        <Card.Content>
          <TextInput
            mode="filled"
            label="name"
            value={name}
            onChangeText={(text) => setName(text)}
            style={styles.input}
            activeUnderlineColor = {theme.colors.accentText}
          />
          <HelperText
            type="error"
            visible={validation && !name}
            style={styles.helperText}
          >
            enter your name please
          </HelperText>
          <TextInput
            mode="filled"
            label="phone number"
            value={phone}
            onChangeText={(text) => setPhone(text)}
            style={styles.input}
            activeUnderlineColor = {theme.colors.accentText}
          />
          <HelperText
            type="error"
            visible={validation && !phone}
            style={styles.helperText}
          >
            invalid phone number
          </HelperText>
          <TextInput
            mode="filled"
            label="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={styles.input}
            activeUnderlineColor = {theme.colors.accentText}
          />
          <HelperText
            type="error"
            visible={validation && !email}
            style={styles.helperText}
          >
            Invalid email address
          </HelperText>
          <TextInput
            mode="filled"
            label="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
            style={styles.input}
            activeUnderlineColor = {theme.colors.accentText}
          />
          <HelperText
            type="error"
            visible={validation && !password && password!=confirmPassword}
            style={styles.helperText}
          >
            passwords not matching
          </HelperText>
          <TextInput
            mode="filled"
            label="confirm password"
            value={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
            secureTextEntry={true}
            style={styles.input}
            activeUnderlineColor = {theme.colors.accentText}
          />
          <HelperText
            type="error"
            visible={validation && !password && password!=confirmPassword}
            style={styles.helperText}
          >
            passwords are not matching
          </HelperText>
          <Button mode="contained" onPress={handleSignup} style={styles.button}>
            Sign up
          </Button>
          <View style={styles.signupLinkContainer}>
            <Text style={styles.textColor}>Already registered ?</Text>
            <Button
              mode="text"
              style={styles.singupLink}
              onPress={() => navigation.navigate("Login")}
            >
              Sign in
            </Button>
          </View>
        </Card.Content>
      </Card>
    </View>
  );
};

export default SingupScreen;
