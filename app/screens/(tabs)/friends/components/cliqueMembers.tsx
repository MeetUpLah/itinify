import { View, Text } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const cliqueMembers = () => {
  const { groupName } = useLocalSearchParams();

  return (
    <SafeAreaView>
      <Text>{groupName}</Text>
    </SafeAreaView>
  );
};

export default cliqueMembers;
