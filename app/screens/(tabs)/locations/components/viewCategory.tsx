import {View, Text, StyleSheet, SafeAreaView, TouchableOpacity, FlatList} from "react-native";
import {useLocalSearchParams, useRouter} from "expo-router";
import auth from "@react-native-firebase/auth";
import {useEffect, useState} from "react";
import firestore from "@react-native-firebase/firestore";

interface Place {
    key: string;
    Address?: string;
    Description?: string;
    Name?: string;
    createdAt?: any;

}

export default function ViewCategoryScreen() {

    const { category, country } = useLocalSearchParams<{category: string; country: string}>();
    const [places, setPlaces] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const userId = auth().currentUser?.uid;
    const router = useRouter();

    useEffect(() => {
        const subscriber = firestore()
            .collection('locations')
            .doc(userId)
            .collection('countries')
            .doc(country)
            .collection(category)
            .onSnapshot(querySnapshot => {
                const places: Place[] = [];

                querySnapshot.forEach(documentSnapshot => {
                    places.push({
                        ...documentSnapshot.data(),
                        key: documentSnapshot.id,
                    });
                });

                setPlaces(places);
                setLoading(false);
            });
        // Unsubscribe from events when no longer in use
        return () => subscriber();

    }, []);

    const renderPlaceCard = ({ item }: {item: Place}) => (
        <TouchableOpacity
            style={styles.placeCard}>
            <View style={styles.titleContainer}>
                <Text style ={styles.placeTitle}>{item.Name}</Text>
                <Text style ={styles.placeDescription}>{item.Description}</Text>
            </View>

            <View style={styles.addressContainer}>
                <Text style ={styles.placeAddress}>{item.Address}</Text>
            </View>

        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={() => router.back()}>
                <Text>Go Back</Text>
            </TouchableOpacity>

            <Text style={styles.categoryTitle}>{category}</Text>
            <Text style={styles.countryTitle}>{country}</Text>

            <FlatList data={places} renderItem={renderPlaceCard}/>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        marginHorizontal: 20,
    },
    placeContainer: {
        marginTop: 16,
    },
    placeCard: {
        backgroundColor: 'grey',
        paddingHorizontal: 20,
        borderRadius: 5,
        marginVertical: 8,
        height: 140,
        flex: 1,
        justifyContent: 'space-evenly'
    },
    placeTitle: {
        color: 'black',
        fontSize: 24,
        fontWeight: 'bold',
    },
    placeDescription: {
        color: 'white',
        fontSize: 16,
    },
    placeAddress: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold'
    },
    titleContainer: {
        alignItems: 'flex-start'
    },
    addressContainer: {
        alignItems: 'flex-end'
    },
    categoryTitle: {
        fontSize: 38,
        fontWeight: 'bold',
        marginBottom: 5
    },
    countryTitle: {
        fontSize: 20,
        color: 'grey',
        marginBottom: 10
    }
});
