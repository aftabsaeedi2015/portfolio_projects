import React, { useState } from "react";
import { View, TextInput, Button } from "react-native";
import { sendMessage } from "../screens/data/dbOperations";
import { useSelector, useDispatch } from "react-redux";

const SellerMessageWithInput = ({ disabled, handleSendMessage }) => {
  const [inputMessage, setInputMessage] = useState("");
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const userId = user.userId;

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        marginBottom: 50

      }}
    >
      <TextInput
        style={{
          flex: 1,
          borderWidth: 1,
          borderColor: "gray",
          borderRadius: 4,
          padding: 8,
        }}
        placeholder="Type your message..."
        value={inputMessage}
        onChangeText={(text) => setInputMessage(text)}
      />
      <Button
        disabled={disabled}
        title="Send"
        onPress={() => {
          handleSendMessage(inputMessage);
          setInputMessage("");
        }}
      />
    </View>
  );
};

export default SellerMessageWithInput;
