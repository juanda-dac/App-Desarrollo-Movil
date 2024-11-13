import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { Ionicons } from "@expo/vector-icons";
import CustomDrawerContent from "@/components/CustomDrawerContent";


export default function DrawerLayout(){
    return <GestureHandlerRootView>
        <Drawer drawerContent={CustomDrawerContent} >
            <Drawer.Screen name="index" options={{ 
                title:"Home",
                drawerLabel:"Inicio",
                drawerIcon: ({ color, size }) => (
                    <Ionicons name="home-outline" color={color} size={size} />
                ),
                
             }} />

            <Drawer.Screen name="delivers" options={{ 
                title: "Deliveries",
                drawerLabel: "Entregas",
                drawerIcon: ({ color, size }) => (
                    <Ionicons name="cube-outline" color={color} size={size} />
                ),
             }} />

            <Drawer.Screen name="auth" options={{ 
                title: "Auth",
                drawerLabel: "Autenticación",
                drawerIcon: ({ color, size }) => (
                    <Ionicons name="log-in-outline" color={color} size={size} />
                ),
             }} />
            
        </Drawer>
    </GestureHandlerRootView>
}