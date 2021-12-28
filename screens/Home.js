import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import jsonServer from "../api/jsonServer";
import { AntDesign } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = ({ navigation }) => {
  const [posts, setPosts] = useState([]);

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
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ marginVertical: 5 }}>
        Found {posts.length} blog posts.
      </Text>
      <TouchableOpacity
        style={{
          position: "absolute",
          top: 10,
          right: 20,
        }}
        onPress={() => navigation.navigate("Add")}
      >
        <AntDesign name="pluscircleo" size={32} color="black" />
      </TouchableOpacity>
      <FlatList
        data={posts}
        style={styles.list}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          return (
            <View style={styles.item}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Post", {
                    id: item.id,
                    title: item.title,
                    content: item.content,
                  })
                }
              >
                <View>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.content}>{item.content}</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <AntDesign
                  name="delete"
                  size={24}
                  color="black"
                  onPress={() => deletePost(item.id)}
                />
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  list: {
    width: "100%",
    paddingHorizontal: 20,
  },
  item: {
    padding: 10,
    marginVertical: 2,
    backgroundColor: "#ffffff",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 10,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 22,
    marginBottom: 5,
  },
  content: {
    fontSize: 14,
  },
});
