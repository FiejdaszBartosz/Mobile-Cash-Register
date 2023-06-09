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
  ScrollView,
  StatusBar,
  Image,
} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Logo from "../components/logo";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigation = useNavigation();
  const handleSignUp = () => {
    navigation.navigate("SignUpPage");
  };

  const handleLogin = (event) => {
    event.preventDefault();
    fetch('https://mobile-cash-register-production.up.railway.app/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password
      }),
    })
      .then(response => response.text())
      .then(data => {
        AsyncStorage.setItem('userId', data);
        AsyncStorage.getItem('userId')
        .then((value) => {
          if(value != "User not found"){
            AsyncStorage.removeItem("receiptId", null)
            navigation.navigate("HomePage")
          } else{
            alert("Niepoprawne dane logowania.")
          }
        })
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <SafeAreaView style={style.container}>
      <ScrollView contentContainerStyle={style.scrollContainer}>
        <View style={style.mainContainer}>
          <Image
            style={style.logo}
            source={require("../assets/img/logos/regiself-logo.png")}
          />
          <KeyboardAvoidingView
            behavior="height"
            style={style.keyboardAvoidingView}
          >
            <View style={style.caption}>
              <Text style={[style.inscriptionLogin]}>Login</Text>
              <Text style={[style.inscriptionPlease]}>
                Please sign in to continue
              </Text>
            </View>
            <View style={style.loginPanel}>
              <View style={style.login}>
                <FontAwesome name="envelope" style={style.icons} />
                <TextInput
                  style={[style.loginText]}
                  placeholder="EMAIL"
                  placeholderTextColor={"#797676"}
                  value={email}
                  onChangeText={text => setEmail(text)}
                />
              </View>
              <View style={style.password}>
                <FontAwesome5 name="lock" style={style.icons} />
                <TextInput
                  style={[style.passwordText]}
                  placeholder="PASSWORD"
                  placeholderTextColor={"#797676"}
                  keyboardType="default"
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={text => setPassword(text)}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FontAwesome5 name="eye" style={style.eyeIcon} />
                  ) : (
                    <FontAwesome5 name="eye-slash" style={style.eyeIcon} />
                  )}
                </TouchableOpacity>
              </View>
              {/* <View style={style.recovery}>
                <TouchableOpacity onPress={() => {}}>
                  <Text style={[style.recoveryColor]}>Recovery password</Text>
                </TouchableOpacity>
              </View> */}
              <View style={style.loginButton}>
                <TouchableOpacity
                  onPress={handleLogin}
                  style={style.loginButtonText}
                >
                  <Text style={[style.loginButtonTextColor]}>LOGIN</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={[style.textRemember]}>
              <Text style={style.notAMember}>Not a member? </Text>
              <TouchableOpacity onPress={handleSignUp}>
                <Text style={style.textRegister}>Register now</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginPage;

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#A8DADC",
    alignContent: "center",
    justifyContent: "center",
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
    alignItems: "center",
    justifyContent: "flex-start",
  },

  keyboardAvoidingView: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  caption: {
    marginTop: 75,
    marginRight: 40,
    marginBottom: 20,
  },

  inscriptionLogin: {
    fontWeight: 700,
    fontSize: 40,
    color: "#1D3557",
    lineHeight: 54,
  },

  inscriptionPlease: {
    fontWeight: 400,
    fontSize: 24,
    color: "#457B9D",
  },

  loginPanel: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
    height: 280,
    backgroundColor: "#457B9D",
    borderRadius: 28,
  },

  login: {
    width: "75%",
    height: 34,
    flexDirection: "row",
    justifyContent: "flex-start",
    backgroundColor: "#F1FAEE",
    borderRadius: 12,
    alignItems: "center",
    marginTop: -10,
    marginBottom: 40,
  },

  loginText: {
    width: "87%",
    padding: 0,
  },

  password: {
    width: "75%",
    height: 34,
    flexDirection: "row",
    justifyContent: "flex-start",
    backgroundColor: "#F1FAEE",
    borderRadius: 12,
    alignItems: "center",
  },

  icons: {
    marginLeft: 10,
    marginRight: 10,
    color: "#797676",
  },

  eyeIcon: {
    color: "#797676",
  },

  passwordText: {
    width: "78%",
    padding: 0,
  },

  recovery: {
    width: "100%",
    alignItems: "flex-end",
    marginRight: 90,
  },

  recoveryColor: {
    color: "#F1FAEE",
  },

  loginButton: {
    width: "75%",
    height: "10%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E63946",
    borderRadius: 12,
    marginTop: 40,
  },

  loginButtonText: {
    width: "100%",
    alignItems: "center",
  },

  loginButtonTextColor: {
    color: "#F1FAEE",
  },

  textRemember: {
    flexDirection: "row",
    fontWeight: 400,
    fontSize: 15,
    textAlign: "center",
    justifyContent: "space-between",
    marginTop: 50,
  },

  textRegister: {
    flexDirection: "row",
    color: "#E63946",
  },

  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  notAMember: {
    color: "#1D3557",
  },
});
