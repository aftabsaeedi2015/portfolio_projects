import React from "react";
import { Button, Text } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import MainMenuBar from "../styledComponents/mainMenuBar";

const styles = StyleSheet.create({
  button: {},
});
function SuccessAdPostMessage() {
  return (
    <View>
      <Text>Ad Posted Successfully</Text>
      <Button mode="filled" onPress={() => {}} style={styles.button}>
        Preview Ad
      </Button>
      <MainMenuBar />
    </View>
  );
}
export default SuccessAdPostMessage;
