/** @format */

import React, { useState } from "react";
import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  StatusBar,
  Image,
} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";

import Logo from "../components/logo";
import Caption from "../components/caption";

const SignUpPage = () => {
  const [isTextInputFocused, setIsTextInputFocused] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");

  const navigation = useNavigation();

  const testFun = () => {
    if (password === confirmPassword) {
      fetch("http://10.0.2.2:8080/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: name,
          lastName: surname,
          email: email,
          password: password,
        }),
      })
        .then((response) => response.text())
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      alert("Password not match");
    }
  };

  const handleLogin = () => {
    navigation.navigate("LoginPage");
  };

  const handleChange = (name, value) => {
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "confirmPassword") {
      setconfirmPassword(value);
    } else if (name === "name") {
      setName(value);
    } else if (name === "surname") {
      setSurname(value);
    } else {
      alert("error");
    }
  };
  const handleTextInputFocus = () => {
    setIsTextInputFocused(true);
  };

  const handleTextInputBlur = () => {
    setIsTextInputFocused(false);
  };

  return (
    <SafeAreaView style={style.container}>
      <View style={style.mainContainer}>
        <KeyboardAvoidingView
          behavior="height"
          style={style.keyboardAvoidingView}
        >
          <Image
            style={style.logo}
            source={require("../assets/img/logos/regiself-logo.png")}
          />
          {isTextInputFocused ? (
            <Caption caption="" />
          ) : (
            <Caption caption="CREATE ACCOUNT" />
          )}

          <View style={style.signUpPanel}>
            <View style={style.input}>
              <FontAwesome name="envelope" style={style.icons} />
              <TextInput
                style={[style.textInput, style.dataInput]}
                placeholder="EMAIL"
                placeholderTextColor={"#797676"}
                keyboardType="default"
                value={email}
                onChangeText={(value) => handleChange("email", value)}
                onFocus={handleTextInputFocus}
                onBlur={handleTextInputBlur}
              />
            </View>
            <View style={style.input}>
              <FontAwesome5 name="lock" style={style.icons} />
              <TextInput
                style={[style.textInput, style.passwordTextInput]}
                placeholder="PASSWORD"
                placeholderTextColor={"#797676"}
                secureTextEntry={!showPassword}
                keyboardType="default"
                value={password}
                onChangeText={(value) => handleChange("password", value)}
                onFocus={handleTextInputFocus}
                onBlur={handleTextInputBlur}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                {showPassword ? (
                  <FontAwesome5 name="eye" style={style.eyeIcon} />
                ) : (
                  <FontAwesome5 name="eye-slash" style={style.eyeIcon} />
                )}
              </TouchableOpacity>
            </View>
            <View style={style.input}>
              <FontAwesome5 name="lock" style={style.icons} />
              <TextInput
                style={[style.textInput, style.passwordTextInput]}
                placeholder="CONFIRM PASSWORD"
                placeholderTextColor={"#797676"}
                secureTextEntry={!showPassword1}
                keyboardType="default"
                value={confirmPassword}
                onChangeText={(value) => handleChange("confirmPassword", value)}
                onFocus={handleTextInputFocus}
                onBlur={handleTextInputBlur}
              />
              <TouchableOpacity
                onPress={() => setShowPassword1(!showPassword1)}
              >
                {showPassword1 ? (
                  <FontAwesome5 name="eye" style={style.eyeIcon} />
                ) : (
                  <FontAwesome5 name="eye-slash" style={style.eyeIcon} />
                )}
              </TouchableOpacity>
            </View>
            <View style={style.input}>
              <FontAwesome name="user" style={style.icons} />
              <TextInput
                style={[style.textInput, style.dataInput]}
                placeholder="NAME"
                placeholderTextColor={"#797676"}
                keyboardType="default"
                value={name}
                onChangeText={(value) => handleChange("name", value)}
                onFocus={handleTextInputFocus}
                onBlur={handleTextInputBlur}
              />
            </View>
            <View style={style.input}>
              <FontAwesome name="user" style={style.icons} />
              <TextInput
                style={[style.textInput, style.dataInput]}
                placeholder="SURNAME"
                placeholderTextColor={"#797676"}
                keyboardType="default"
                value={surname}
                onChangeText={(value) => handleChange("surname", value)}
                onFocus={handleTextInputFocus}
                onBlur={handleTextInputBlur}
              />
            </View>
            <View style={style.signUpButton}>
              <TouchableOpacity
                onPress={testFun}
                style={style.signUpButtonText}
              >
                <Text style={[style.signUpButtonTextColor]}>SIGN UP</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={[style.signIn]}>
            <Text style={style.alrHaveAcc}>Already have a account? </Text>
            <TouchableOpacity onPress={handleLogin}>
              <Text style={style.textSignIn}>Sign in</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};

export default SignUpPage;

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#A8DADC",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginTop: StatusBar.currentHeight || 0,
  },
  logo: {
    width: "100%",
    height: 77,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  mainContainer: {
    flex: 1,
    width: "100%",
    height: "10%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  keyboardAvoidingView: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  caption: {
    marginTop: 30,
  },

  inscription: {
    fontWeight: 700,
    fontSize: 40,
    color: "#1D3557",
    lineHeight: 54,
  },

  signUpPanel: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    width: "80%",
    height: 400,
    backgroundColor: "#457B9D",
    borderRadius: 28,
    marginTop: 20,
  },
  input: {
    backgroundColor: "#F1FAEE",
    width: "80%",
    height: 34,
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius: 12,
    flexDirection: "row",
  },
  textInput: {
    padding: 0,
  },
  icons: {
    marginLeft: 10,
    marginRight: 10,
    color: "#797676",
  },
  eyeIcon: {
    color: "#797676",
  },
  passwordTextInput: {
    width: "78%",
  },
  dataInput: {
    width: "87%",
  },
  signUpButton: {
    width: "75%",
    height: 34,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E63946",
    borderRadius: 12,
  },
  signUpButtonText: {
    width: "100%",
    alignItems: "center",
  },
  signUpButtonTextColor: {
    color: "#F1FAEE",
  },

  scrollContainer: {
    width: "100",
  },

  signIn: {
    flexDirection: "row",
    fontWeight: 400,
    fontSize: 15,
    textAlign: "center",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 40,
    marginBottom: 20,
  },

  textSignIn: {
    flexDirection: "row",
    color: "#E63946",
  },
  alrHaveAcc: {
    color: "#1D3557",
  },
});
