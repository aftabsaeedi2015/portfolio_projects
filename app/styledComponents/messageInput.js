import React, { useState } from "react";
import { View } from "react-native";
import { sendMessage } from "../screens/data/dbOperations";
import { useSelector, useDispatch } from "react-redux";
import { useTheme,Button,TextInput } from "react-native-paper";

const SellerMessageWithInput = ({ disabled, handleSendMessage }) => {
  const [inputMessage, setInputMessage] = useState("");
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const userId = user.userId;
  const [focus,setFocus] = useState(false)
  const theme = useTheme()

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        marginBottom: focus ? 340: 5,
        gap: 5

      }}
    >
      <TextInput
        mode="flat"

        style = {{
          backgroundColor: theme.colors.accent,
          borderWidth: 1,
          borderColor: theme.colors.accent,
          zIndex: -1,
          color: 'white',
          width: '80%',
          height: 50
        }}
        placeholder="Type your message..."
        value={inputMessage}
        onChangeText={(text) => setInputMessage(text)}
        onFocus = {()=>setFocus(true)}
        onBlur = {()=>setFocus(false)}
        activeUnderlineColor = {theme.colors.accentText}
      />
      <Button
        mode="filled"
        disabled={disabled}
        labelStyle={{color: theme.colors.accentText}}
        onPress={() => {
          handleSendMessage(inputMessage);
          setInputMessage("");
        }}
        style = {{backgroundColor: theme.colors.accent}}
        >
          Send
        </Button>
    </View>
  );
};

export default SellerMessageWithInput;
