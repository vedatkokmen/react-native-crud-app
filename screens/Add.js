import React, { useState } from "react";
import { StyleSheet, View, TextInput, Dimensions } from "react-native";
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
  Heading,
  Button,
} from "native-base";

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

        <Button
          size="md"
          variant="solid"
          onPress={addPost}
          isDisabled={!title || !content ? true : false}
        >
          Add Blog Post
        </Button>
      </Flex>
    </Box>
  );
};

export default AddScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
