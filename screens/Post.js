import React from "react";
import { StyleSheet, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
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

const PostScreen = ({ route, navigation }) => {
  const { id, title, content } = route.params;
  return (
    <Box safeArea>
      <Flex justifyContent={"flex-end"} alignItems={"flex-end"} mx={6}>
        <Pressable
          onPress={() =>
            navigation.navigate("Edit", {
              id,
              title,
              content,
            })
          }
        >
          <AntDesign name="edit" style={{ color: "#000" }} size={24} />
        </Pressable>
      </Flex>

      <Center my={24}>
        <Heading>{title}</Heading>
        <Text fontSize={"md"}>{content}</Text>
      </Center>
    </Box>
  );
};

export default PostScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    //justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  content: {
    fontSize: 18,
    marginBottom: 10,
  },
});
