import { Stack } from 'expo-router'
import React from 'react'

const FriendLayout = () => {
  return (
    <Stack>
        <Stack.Screen name='index' options={{headerShown:false}} />
        <Stack.Screen name='components/addClique' options={{headerShown:false}} />
    </Stack>
  )
}

export default FriendLayout
