import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const PostScreen = ({ route, navigation }) => {
  const { id, title, content } = route.params;
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{
          position: "absolute",
          top: 10,
          right: 20,
        }}
        onPress={() =>
          navigation.navigate("Edit", {
            id,
            title,
            content,
          })
        }
      >
        <AntDesign name="edit" size={32} color="black" />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.content}>{content}</Text>
    </View>
  );
};

export default PostScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
