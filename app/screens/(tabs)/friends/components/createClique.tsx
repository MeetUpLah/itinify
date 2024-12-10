import { View, Text } from 'react-native'
import React from 'react'
import firestore from '@react-native-firebase/firestore'
import { useLocalSearchParams, useRouter } from 'expo-router';

const createClique = async(groupName:string, group:string[], router:any) => {

    if (!groupName.trim()) {
        throw new Error('Group name cannot be empty.');
      }
    
      if (group.length === 0) {
        throw new Error('Group must have at least one member.');
      }
      try {
        const db = firestore().collection('cliques').doc(groupName)
        const subcollection = db.collection('members')
        db.set({name: 'Bob', groupName})
        for(let i = 0; i < group.length; i++) {
            const memberName = group[i];
            if (memberName.trim()) {
                await subcollection.doc(memberName).set({ name: memberName });
      }
        }
        console.log('successfully added')
        router.back();
      } catch(error) {
        console.error('Problem as occured')
      }
};

export default createClique