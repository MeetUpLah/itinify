import {View, Text, StyleSheet, SafeAreaView, TouchableOpacity, FlatList, ActivityIndicator} from 'react-native';
import {useRouter} from "expo-router";
import {useEffect, useState} from "react";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";

interface Location {
    key: string;
    country?: string;
}

export default function LocationsScreen() {

    const [loading, setLoading] = useState(true);
    const [locations, setLocations] = useState<Location[]>([]);

    const router = useRouter();
    const userId = auth().currentUser?.uid

    const goToAddLocation = () => {
        router.push("/screens/locations/components/addLocation")
    }

    const goToViewLocation = (country: string) => {
        router.push({
            pathname: "/screens/locations/components/viewLocation",
            params: {country: country}
        })
    }

    useEffect(() => {
        const subscriber = firestore()
            .collection('locations')
            .doc(userId)
            .collection('countries')
            .onSnapshot(querySnapshot => {
                const locations: Location[] = [];

                querySnapshot.forEach(documentSnapshot => {
                    locations.push({
                        ...documentSnapshot.data(),
                        key: documentSnapshot.id,
                    });
                });

                setLocations(locations);
                setLoading(false);
            });
        // Unsubscribe from events when no longer in use
        return () => subscriber();

    }, []);

    const renderLocationCard = ({ item }: {item: Location}) => (
        <TouchableOpacity
            style={styles.locationCard}
            onPress={() => goToViewLocation(item.country || '')}>
            <Text style ={styles.locationText}>{item.country}</Text>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Locations</Text>
            <Text style={styles.titleDesc}>All your favourite places in a single location.</Text>

            <View style={{alignItems: 'flex-end'}}>
                <TouchableOpacity style={styles.buttonContainer} onPress={goToAddLocation}>
                    <Text style={styles.buttonText}>Go to Add Location</Text>
                </TouchableOpacity>
            </View>


            { loading ? (<ActivityIndicator size='small' color='blue' />) : (
                <>
                    <FlatList
                        style={styles.locationContainer}
                        data={locations}
                        renderItem={renderLocationCard}
                        ListEmptyComponent={() => (
                            <View>
                                <Text>No locations found</Text>
                            </View>
                        )}
                    />
                </>
            )}

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        marginHorizontal: 20,
    },
    title: {
        fontSize: 38,
        fontWeight: 'bold',
        marginBottom: 5
    },
    titleDesc: {
        fontSize: 20,
        color: 'grey',
    },
    buttonContainer: {
        backgroundColor: 'black',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 10,
        width: 110,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16
    },
    locationContainer: {
        marginTop: 16,
    },
    locationCard: {
        backgroundColor: 'grey',
        padding: 10,
        borderRadius: 5,
        marginVertical: 8,
        alignItems: 'center',
        height: 100,
        flex: 1,
        justifyContent: 'center'
    },
    locationText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold'
    }
});
