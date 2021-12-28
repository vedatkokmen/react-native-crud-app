import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import jsonServer from "../api/jsonServer";

const EditScreen = ({ route, navigation }) => {
  const [id, setId] = useState(route.params.id);
  const [title, setTitle] = useState(route.params.title);
  const [content, setContent] = useState(route.params.content);

  const editPost = () => {
    jsonServer.put(`/blogPosts/${id}`, {
      title,
      content,
    });
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={title}
        style={styles.input}
        onChangeText={(e) => setTitle(e)}
      />
      <TextInput
        value={content}
        style={{ ...styles.input, paddingVertical: 100 }}
        multiline
        editable
        onChangeText={(e) => setContent(e)}
      />
      <Button title="Edit post" onPress={() => editPost(id)} />
    </View>
  );
};

export default EditScreen;

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
