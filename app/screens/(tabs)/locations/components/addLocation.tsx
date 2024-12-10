import {View, Text, StyleSheet, TouchableOpacity, TextInput} from 'react-native';
import { useRouter } from "expo-router";
import { useState } from "react";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";



export default function AddLocationScreen() {

    const router = useRouter();

    const [country, setCountry] = useState('');

    // The details of the place of interest
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [address, setAddress] = useState('');
    const [category, setCategory] = useState('');

    // Retrieve the current user logged in
    const currentUser = auth().currentUser;
    const userId = currentUser?.uid;

    //Add trip by user id and by place
    const handleAddLocation = () => {
        if (!currentUser) {
            console.error("No user logged in");
            return;
        }

        if (!country || !name || !description || !address || !category) {
            alert('Please fill in all fields');
            return;
        }

        firestore().collection('locations')
            .doc(userId)
            .collection('countries')
            .doc(country)
            .set({
                country: country,
                categories: firestore.FieldValue.arrayUnion(category)
            }, { merge: true}) // Add country into country field and category into categories field
            .then(() => {
                return firestore().collection('locations')
                    .doc(userId)
                    .collection('countries')
                    .doc(country)
                    .collection(category)
                    .add({
                        Name: name,
                        Description: description,
                        Address: address,
                        createdAt: firestore.FieldValue.serverTimestamp(),
                    });
            })
            .then(() => {
                console.log('Location added!');
                setName('');
                setDescription('');
                setAddress('');
                setCountry('');
                setCategory('');
                alert('Location added!');
            })
            .catch((error) => {
                console.error('Error adding location:', error);
            });

            router.back();
        }

    return (
        <View style={styles.container}>
            <Text style={{fontWeight: "bold", fontSize: 20, marginBottom:10}}>
                Add Locations Page
            </Text>
            <TouchableOpacity onPress={() => router.back()}>
                <Text>Go back</Text>
            </TouchableOpacity>

            <TextInput
                style={styles.input}
                placeholder='Country'
                value={country}
                onChangeText={setCountry}
                keyboardType='email-address'
            />
            <TextInput
                style={styles.input}
                placeholder='Category'
                value={category}
                onChangeText={setCategory}
                keyboardType='email-address'
            />
            <TextInput
                style={styles.input}
                placeholder='Name'
                value={name}
                onChangeText={setName}
                keyboardType='email-address'
            />
            <TextInput
                style={styles.input}
                placeholder='Description'
                value={description}
                onChangeText={setDescription}
                keyboardType='email-address'
            />
            <TextInput
                style={styles.input}
                placeholder='Address'
                value={address}
                onChangeText={setAddress}
                keyboardType='email-address'
            />

            <TouchableOpacity onPress={handleAddLocation}>
                <Text>Add</Text>
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        marginVertical: 4,
        height: 50,
        borderRadius: 4,
        borderWidth: 1,
        padding: 10,
        backgroundColor: `#fff`,
        width: 300
    },
});
