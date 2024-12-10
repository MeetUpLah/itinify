import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import auth from "@react-native-firebase/auth";

export default function HomeScreen() {

    // Get the currently signed-in user
    const user = auth().currentUser;


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome {user?.displayName}!</Text>
            <View style={{alignItems: "center"}}>
                <TouchableOpacity style={styles.buttonContainer} onPress={() => auth().signOut()}>
                    <Text style={styles.buttonText}> Sign out</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        marginTop: 70,
        flex: 1,
        justifyContent: "flex-start"
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20
    },
    buttonContainer: {
        backgroundColor: 'black',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 10,
        width: 110
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16
    }
});
