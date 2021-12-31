import React, { useState } from "react";
import { StyleSheet, View, TextInput } from "react-native";
import jsonServer from "../api/jsonServer";
import {
  Box,
  Pressable,
  Text,
  Toast,
  Input,
  Icon,
  Flex,
  Center,
  TextArea,
  Button,
  Heading,
} from "native-base";

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
    <Box safeArea mx={6}>
      <Flex justifyContent={"center"}>
        <Input
          value={title}
          placeholder="Title"
          bg={"white"}
          autoCorrect={false}
          autoComplete="off"
          onChangeText={(e) => setTitle(e)}
          variant={"outline"}
          rounded={"md"}
          py={3}
        />

        <TextArea
          h={48}
          my={2}
          autoCorrect={false}
          placeholder="Content"
          value={content}
          bg={"white"}
          onChangeText={(e) => setContent(e)}
        />
      </Flex>
      <Button
        size="md"
        variant="solid"
        title="Edit post"
        onPress={() => editPost(id)}
      >
        Edit Post
      </Button>
    </Box>
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
