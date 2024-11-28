import {createContext, useContext, useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

import {UserModel, UserStoredModel} from "@/core/models/UserModel";

import {AuthService} from "@/core/services/AuthService";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { firebaseConfig, app } from "@/core/libs/firebase";

interface AuthContextData {
    signInUser: (user: UserModel ) => void;
    getUserStored: () => any;
    getUserSession: () => any;
    logout: () => void;
    activeSession: boolean;
}

const AuthContext = createContext({} as AuthContextData);

export function AuthProvider ({ children }:any){

    const authService = new AuthService();
    const [activeSession, setActiveSession] = useState(false);
    const [user, setUser] = useState({});


    useEffect(()=>{
        try {
            const auth = getAuth(app);
            onAuthStateChanged(auth, (user) => {
                if(user) {
                    console.log("User is logged in");
                    setUser(user);
                    setActiveSession(true);
                } else {
                    console.log("User is not logged in");
                    setUser({});
                    setActiveSession(false);
                }
            })
            
        } catch (error) {
            console.log("Error!");
            
        }
        
    }, [])


    const signInUser = async ({ email, password }: UserModel) => {
        try {
            if(!password) return;
            await authService.login({ email, password});
        } catch (error) {
            Alert.alert("Error", "No se pudo guardar la información del usuario");    
        }
    }

    const getUserStored = async () => {
        try {
            const user = await AsyncStorage.getItem("user");
            return user;
        } catch (error) {
            throw "Error al obtener el usuario almacenado";
        }
    }

    const getUserSession = async (): Promise<any> => {
        try {
            return await authService.getSession();
        } catch (error) {
            throw "Error al obtener la sesión del usuario";
        }
    }

    const logout = async () => {
        try {
            await authService.logout();
            console.log("Logout from auth provider");
            setActiveSession(false);
        } catch (error:any) {
            console.log(error.message)
            throw "Error al cerrar sesión";
        }
    }

    return (
        <AuthContext.Provider value={{ signInUser, getUserStored, getUserSession, logout, activeSession }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);