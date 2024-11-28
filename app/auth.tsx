    import {
    Text,
    View,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";

import InputWrapper from "@/components/InputWrapper";
import LeftIcon from "@/components/LeftIcon";
import RightIcon from "@/components/RightIcon";

import { Colors } from "@/core/constants/Colors";

import { useAuth } from "@/components/provider/AuthProvider";
import { AuthService } from "@/core/services/AuthService";
import { router } from "expo-router";

/**
 *
 * This is an example file for a screen in the app
 */

export default function AuthScreen() {


    const appAuth = useAuth();
    const authService = new AuthService();

    useEffect(()=>{
        if(appAuth.activeSession){
            router.navigate("/inventory");
            console.log("Será redirigido a la vista de inicio");
            
        }
    },[appAuth.activeSession])

    const initialState = {
        email: "",
        password: "",
    };

    const [showPassword, setShowPassword] = useState(false);
    const [form, setForm] = useState(initialState);



    const handleChangeForm = (key: string, value: string) =>
        setForm({ ...form, [key]: value });


    const handleSignIn = async () => {
        try {
            await appAuth.signInUser(form)
        } catch (error) {
            console.error(error);
            throw Alert.alert("Error", "Credentials are invalid");
        }
    };

    return (
        <View style={styles.container}>
            {/* Container form */}
            <View style={styles.form}>
                <View>
                    <Text style={styles.text}>Email</Text>
                    <InputWrapper style={styles.inputWrapper}>
                        <LeftIcon>
                            <Ionicons
                                name="mail"
                                size={24}
                                color={Colors.tertiaryDark}
                            />
                        </LeftIcon>
                        <TextInput
                            placeholder="email@example.com"
                            id="email"
                            textContentType="emailAddress"
                            onChange={({ nativeEvent }) =>
                                handleChangeForm("email", nativeEvent.text)
                            }
                            style={styles.input}
                        />
                    </InputWrapper>
                </View>
                <View>
                    <Text style={styles.text}>Password</Text>
                    <InputWrapper>
                        <LeftIcon>
                            <Ionicons
                                name="lock-closed"
                                size={24}
                                color={Colors.tertiaryDark}
                            />
                        </LeftIcon>
                        <TextInput
                            placeholder="password"
                            id="password"
                            textContentType="password"
                            secureTextEntry={!showPassword}
                            onChange={({ nativeEvent }) =>
                                handleChangeForm("password", nativeEvent.text)
                            }
                            style={styles.input}
                        />
                        <RightIcon>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => setShowPassword(!showPassword)}
                            >
                                <Ionicons
                                    name={showPassword ? "eye-off" : "eye"}
                                    size={24}
                                    color={Colors.tertiaryDark}
                                />
                            </TouchableOpacity>
                        </RightIcon>
                    </InputWrapper>
                </View>
                <TouchableOpacity onPress={handleSignIn} activeOpacity={0.9} style={styles.button}>
                    <Text style={styles.buttonText}>Sign In</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {},
    form: {
        width: "80%",
        padding: 20,
        backgroundColor: "white",
        borderRadius: 10,
        shadowColor: "black",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        gap: 10,
    },
    input: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: Colors.tertiary,
        paddingHorizontal: 10,
        paddingLeft: 50,
        outline: "none",
        width: "100%",
    },
    button: {
        backgroundColor: Colors.primary,
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: Colors.tintPrimaryColor,
        fontWeight: "bold",
        textAlign: "center",
    },
    inputWrapper: {
        flexDirection: "row",
    },
});
