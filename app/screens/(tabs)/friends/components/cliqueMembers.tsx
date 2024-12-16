import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Button,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import firestore from "@react-native-firebase/firestore";
import { Alert } from "react-native";

const cliqueMembers = () => {
  const params = useLocalSearchParams();
  const router = useRouter();
  const groupName = Array.isArray(params.groupName)
    ? params.groupName[0]
    : params.groupName;
  const username = Array.isArray(params.username)
    ? params.username[0]
    : params.username;

  const [list, setList] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      const db = await firestore()
        .collection("cliques")
        .doc(username)
        .collection("groups")
        .doc(groupName);
      db.delete().then(() => console.log("group deleted"));
      router.back();
    } catch (error: any) {
      console.error("error when deleting group");
    }
  };

  const fetchClique = async () => {
    try {
      setLoading(true);
      const db = firestore()
        .collection("cliques")
        .doc(username)
        .collection("groups")
        .doc(groupName)
        .collection("members");
      const snapshot = await db.get();
      const memberList: string[] = [];
      snapshot.forEach((shot) => {
        const data = shot.data();
        if (data.name) {
          memberList.push(data.name);
        }
      });
      setList(memberList);
      console.log("Data fetched");
    } catch (Error) {
      console.error("Error in fetching members");
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchClique();
    }, [])
  );

  return (
    <SafeAreaView>
      <Button
        title="Add more friends?"
        onPress={() => {
          router.push({
            pathname: "/screens/friends/components/addFriends",
            params: { groupName: groupName, username: username },
          });
        }}
      />
      {loading ? (
        <ActivityIndicator size={"small"} color={"blue"} />
      ) : (
        <FlatList
          data={list}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <Text style={styles.Friends}>{item}</Text>}
          style={styles.list}
        />
      )}
      <Button
        title="Delete Group"
        onPress={() => {
          Alert.alert("Are you sure?", "", [
            {
              text: "No",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            },
            {
              text: "Yes",
              onPress: () => handleDelete(),
            },
          ]);
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
});

export default cliqueMembers;
