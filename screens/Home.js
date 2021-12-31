import React, { useEffect, useState } from "react";
import { StyleSheet, View, TouchableOpacity, FlatList } from "react-native";
import jsonServer from "../api/jsonServer";
import { AntDesign, Feather } from "@expo/vector-icons";
import {
  Box,
  Pressable,
  Text,
  Input,
  Icon,
  Flex,
  Center,
  Heading,
  useToast,
} from "native-base";

// Toast

const Home = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const toast = useToast();

  const fetchPosts = async () => {
    const response = await jsonServer.get("/blogPosts");
    setPosts(response.data);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      fetchPosts();
    });
    return unsubscribe;
  }, [navigation]);

  const deletePost = (id) => {
    jsonServer.delete(`/blogPosts/${id}`).then(() => {
      setPosts(posts.filter((post) => post.id !== id));
      toast.show({
        description: `Post with ID of ${id} deleted`,
        duration: 1000,
      });
    });
  };

  return (
    <Box safeArea>
      <Flex justifyContent={"flex-end"} alignItems={"flex-end"} mx={6}>
        <Pressable onPress={() => navigation.navigate("Add")}>
          <AntDesign name="pluscircleo" size={32} color="black" />
        </Pressable>
      </Flex>
      <Center pb={2}>
        <Text>
          Found <Text fontWeight={"bold"}>{posts.length}</Text> blog posts.
        </Text>
      </Center>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          return (
            <Flex
              direction="row"
              justifyContent={"space-between"}
              px={6}
              alignItems={"center"}
              bg={"white"}
              mx={4}
              my={2}
              rounded={"md"}
              py={1}
            >
              <Pressable
                onPress={() =>
                  navigation.navigate("Post", {
                    id: item.id,
                    title: item.title,
                    content: item.content,
                  })
                }
              >
                <Flex w={280}>
                  <Heading>{item.title}</Heading>
                  <Text fontSize={"sm"}>{item.content}...</Text>
                </Flex>
              </Pressable>
              <Pressable>
                <Feather
                  name="trash"
                  size={24}
                  color="black"
                  onPress={() => deletePost(item.id)}
                />
              </Pressable>
            </Flex>
          );
        }}
      />
    </Box>
  );
};

export default Home;

const styles = StyleSheet.create({});
