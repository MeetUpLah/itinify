import firestore from "@react-native-firebase/firestore";

const checkUser = async (username: string) => {
  const usersDB = await firestore().collection("users").get();
  let isUserInDB: boolean = false;
  usersDB.forEach((doc) => {
    const data = doc.data();
    if (data.username === username) {
      isUserInDB = true;
      console.log(username + "is in database");
    }
  });
  console.log("isUserInDB = " + isUserInDB);
  return isUserInDB;
};

export default checkUser;
