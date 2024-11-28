import { Ionicons } from "@expo/vector-icons";
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from "@react-navigation/drawer";
import {useAuth} from "@/components/provider/AuthProvider";
import {useEffect, useState} from "react";
import {Text, View} from "react-native";

export default function CustomDrawerContent(props:any){

    const auth = useAuth();
    const [activeUser, setActiveUser] = useState(false);

    const handleLogout = async () => {
        try {
            await auth.logout();
            setActiveUser(false);
        } catch (error) {
            throw "Error al cerrar la sesión";
        }
    }

    return (
        <DrawerContentScrollView {...props}>
            <View>
                <Text>{ auth.activeSession ? "Usuario Activo" : "Usuario inactivo" }</Text>
            </View>
            <DrawerItemList {...props} />
            {auth.activeSession ? (
                <DrawerItem label="Cerrar Sesión" onPress={handleLogout} />
            ) : (<></>)}

        </DrawerContentScrollView>
    )
}