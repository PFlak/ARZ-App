import { StyleSheet } from "react-native";

export const COLORS = {
  primary: "#0782F9",
  white: "#FFFFFF",
  black: "#000000",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: COLORS.primary,
    marginTop: 5,
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonOutline: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.primary,
    borderWidth: 2,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonOutlineText: {
    color: COLORS.primary,
  },
  googleButton: {
    backgroundColor: COLORS.white,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    width: "100%",
    padding: 15,
    borderRadius: 10,
  },
  googleIcon: {
    marginRight: 10,
	height: 24,
    width: 24,
  },
});

export default styles;
