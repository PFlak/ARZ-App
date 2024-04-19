import React from "react";
import { useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from "react-native";
import useFirebaseAuth from "../utils/useFirebaseAuth";
import { FIREBASE_AUTH } from "../../Firebase";
import { useNavigation } from "@react-navigation/native";
import styles, { COLORS } from "../utils/styles";

const LoginScreen = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    loading,
    signIn,
    signUp,
    signInWithGoogle,
  } = useFirebaseAuth();

  const auth = FIREBASE_AUTH;
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.replace("Home");
      }
    });

    return unsubscribe;
  }, []);

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.inputContainer}>

        <TextInput
          value={email}
          style={styles.input}
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
        />

        <TextInput
          secureTextEntry={true}
          value={password}
          style={styles.input}
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
        />

      </View>

      {loading ? (
        <ActivityIndicator size="large" color={COLORS.primary} />
      ) : (
        <View style={styles.buttonContainer}>

          <TouchableOpacity style={styles.button} onPress={signIn}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, styles.buttonOutline]} onPress={signUp}>
            <Text style={[styles.buttonText, styles.buttonOutlineText]}>Create account</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.googleButton, styles.buttonOutline]} onPress={signInWithGoogle}>
			<Image style={styles.googleIcon} source={require("../assets/google.png")}/>
            <Text style={[styles.buttonText, styles.buttonOutlineText]}>Login with Google</Text>
          </TouchableOpacity>

        </View>
      )}
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
