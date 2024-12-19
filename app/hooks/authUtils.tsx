import auth from '@react-native-firebase/auth';
import firestore from "@react-native-firebase/firestore";

// Authentication functions
export const signIn = async (email: string, password: string, setLoading: (loading: boolean) => void) => {
    setLoading(true);
    try {
        await auth().signInWithEmailAndPassword(email, password);
        alert('Logged in');
    } catch (e: any) {
        alert("Login failed: " + e.message);
    } finally {
        setLoading(false);
    }
}

export const signUp = async (email: string, password: string,
                             username: string, phoneNumber: string,
                             setLoading: (loading: boolean) => void) => {
    setLoading(true);
    try {
        const userCredential = await auth().createUserWithEmailAndPassword(email, password);

        const user = userCredential.user;

        // set the user's display name in the metadata created by firebase
        // this can be used to add user's profile picture url as well
        await user.updateProfile({
            displayName: username,
        });

        alert('Account created');
    } catch (e: any) {
        alert("Registration failed: " + e.message);

    } finally {
        // Add user to the firestore database (excluding password)
        firestore()
            .collection('users')
            .doc(auth().currentUser?.uid)
            .set({
                email: email,
                username: username,
                phoneNumber: phoneNumber,
                createdAt: firestore.FieldValue.serverTimestamp(),
            })
            .catch((error) => {
                console.error('Error creating user:', error);
            });

        setLoading(false);
    }
}
