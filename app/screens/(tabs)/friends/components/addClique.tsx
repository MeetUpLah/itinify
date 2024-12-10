import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
} from "react-native";

import React, { useState } from "react";
import createClique from "./createClique";
import { useRouter } from "expo-router";

export default function addClique() {
  const [userInput, setUserInput] = useState<string>("");
  const [groupName, setGroupName] = useState<string>("");
  const [list, setList] = useState<string[]>([]);
  const router = useRouter();

  const handleAddList = () => {
    if (userInput.trim()) {
      setList((prevItems) => [...prevItems, userInput.trim()]);
      setUserInput("");
    }
  };

  return (
    <SafeAreaView>
      <Text style={styles.questions}>What is your group name</Text>
      <TextInput
        placeholder="Groupname"
        value={groupName}
        onChangeText={setGroupName}
        style={styles.answerContainers}
      />
      <Text style={styles.questions}>Who do you want to add</Text>
      <TextInput
        placeholder="Friend"
        value={userInput}
        onChangeText={setUserInput}
        style={styles.answerContainers}
      />
      <Button title="Add Friend" onPress={handleAddList} />
      <FlatList
        data={list}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Text>{item}</Text>}
      />
      <Button
        title="Create Clique"
        onPress={async () => {
          try {
            await createClique(groupName, list, router);
            alert("Clique created successfully!");
          } catch (error: any) {
            alert(error.message);
          }
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  questions: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: 500,
    paddingTop: 50,
  },
  answerContainers: {
    borderRadius: 5,
    borderWidth: 3,
    height: 50,
  },
});
