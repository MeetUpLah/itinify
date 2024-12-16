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
import { useLocalSearchParams, useRouter } from "expo-router";
import checkUser from "./checkUser";

export default function addClique() {
  const [userInput, setUserInput] = useState<string>("");
  const [groupName, setGroupName] = useState<string>("");
  const [list, setList] = useState<string[]>([]);
  const router = useRouter();
  const params = useLocalSearchParams();
  const username = Array.isArray(params.username)
    ? params.username[0]
    : params.username;

  const handleAddList = async () => {
    if (userInput.trim()) {
      const isUserInDB = await checkUser(userInput.trim());
      if (isUserInDB) {
        setList((prevItems) => [...prevItems, userInput.trim()]);
        setUserInput("");
      } else {
        alert("User not in database");
      }
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
      {groupName && <Text style={styles.groupName}>{groupName}</Text>}
      {list.length > 0 && (
        <FlatList
          data={list}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <Text style={styles.Friends}>{item}</Text>}
          style={styles.list}
        />
      )}
      <Button
        title="Create Clique"
        onPress={async () => {
          try {
            await createClique(groupName, list, router, username);
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
    width: 260,
    alignSelf: "center",
    textAlign: "center",
    fontSize: 25,
  },
  Friends: {
    textAlign: "center",
    fontSize: 25,
    backgroundColor: "aquamarine",
    margin: 5,
    borderWidth: 2,
    paddingVertical: 20,
  },
  list: {
    marginTop: 30,
  },
  groupName: {
    textAlign: "center",
    fontWeight: "300",
    fontSize: 50,
    borderWidth: 2,
    backgroundColor: "red",
    width: 400,
    alignSelf: "center",
    color: "white",
  },
});
