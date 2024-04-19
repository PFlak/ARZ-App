import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { FIREBASE_AUTH } from "../../Firebase";
import { useNavigation } from "@react-navigation/native";
import styles from "../utils/styles";

const HomeScreen = () => {
  const auth = FIREBASE_AUTH;
  const navigation = useNavigation();

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error) => alert(error.message));
  };

  return (
    <View style={styles.container}>
      <Text>Email: {auth.currentUser?.email}</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleSignOut} style={styles.button}>
          <Text style={styles.buttonText}>Sign out</Text>
        </TouchableOpacity>
      </View>
	  
    </View>
  );
};

export default HomeScreen;
