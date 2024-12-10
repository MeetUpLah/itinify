import { Stack } from "expo-router";

export default function Layout()  {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="components/addLocation" options={{ headerShown: false }} />
            <Stack.Screen name="components/viewLocation" options={{ headerShown: false }} />
            <Stack.Screen name="components/viewCategory" options={{ headerShown: false}} />
        </Stack>
    );
}
