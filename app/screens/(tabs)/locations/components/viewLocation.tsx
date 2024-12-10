import {View, Text, SafeAreaView, TouchableOpacity, StyleSheet, FlatList} from "react-native";
import {useLocalSearchParams, useRouter} from "expo-router";
import {useEffect, useState} from "react";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";


export default function ViewLocationScreen() {

    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState<string[]>([]);

    const { country } = useLocalSearchParams<{country: string}>();
    const router = useRouter();
    const userId = auth().currentUser?.uid;

    useEffect(() => {
        if (!country) return;

        const fetchCategories = async () => {
            try {
                const countryRef = firestore()
                    .collection('locations')
                    .doc(userId)
                    .collection('countries')
                    .doc(country);
                const doc = await countryRef.get();

                if (doc.exists) {
                    const data = doc.data()
                    if (data && data.categories) {
                        setCategories(data.categories);
                    }
                }


                setLoading(false)
            } catch (error) {
                console.error("Error fetching categories", error);
                setLoading(false)
            }
        };

        fetchCategories();
    }, [country]);

    const goToViewCategory = (category: string) => {
        router.push({
            pathname: "/screens/locations/components/viewCategory",
            params: {category: category, country: country}
        })
    }

    const renderCategoryCard = ({ item }: {item: string}) => (
        <TouchableOpacity
            style={styles.categoryCard}
            onPress={() => goToViewCategory(item)}
        >
            <Text style ={styles.categoryText}>{item}</Text>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={() => router.back()}>
                <Text>Go Back</Text>
            </TouchableOpacity>

            <Text style={styles.title}>{country}</Text>

            {categories.length === 0 ? (
                <Text>No categories</Text>
            ) : (
                <FlatList
                    data={categories}
                    renderItem={renderCategoryCard}
                    keyExtractor={(item) => item}
                />
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
    categoryContainer: {
        marginTop: 16,
    },
    categoryCard: {
        backgroundColor: 'grey',
        padding: 10,
        borderRadius: 5,
        marginVertical: 8,
        alignItems: 'center',
        height: 100,
        flex: 1,
        justifyContent: 'center'
    },
    categoryText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold'
    }
});
