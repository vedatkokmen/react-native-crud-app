import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import jsonServer from "../api/jsonServer";

const AddScreen = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const addPost = () => {
    if ((title, content)) {
      jsonServer.post("/blogPosts", {
        title,
        content,
      });
    }
    navigation.navigate("Home");
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={title}
        placeholder="Title"
        autoCorrect={false}
        onChangeText={(e) => setTitle(e)}
      />
      <TextInput
        style={{ ...styles.input, paddingVertical: 100 }}
        value={content}
        multiline={true}
        editable={true}
        autoCorrect={false}
        placeholder="Content"
        onChangeText={(e) => setContent(e)}
      />
      <Button title="Add Blog Post" onPress={addPost} />
    </View>
  );
};

export default AddScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  input: {
    borderWidth: 1,
    borderColor: "black",
    width: "80%",
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
});
