import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

export default function TabLayout() {
    return (
        <Tabs screenOptions={{ tabBarActiveTintColor: 'blue', headerShown: false }}>
            <Tabs.Screen
                name="home"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
                }}
            />
            <Tabs.Screen
                name="locations"
                options={{
                    title: 'Locations',
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="map-marker" color={color} />,
                }}
            />
            <Tabs.Screen
                name="trips"
                options={{
                    title: 'Trips',
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="plane" color={color} />,
                }}
            />
            <Tabs.Screen
                name="friends/index"
                options={{
                    title: 'Friends',
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="users" color={color} />,
                }}
            />
            <Tabs.Screen
                name="profile/index"
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="cog" color={color} />,
                }}
            />
        </Tabs>
    );
}


