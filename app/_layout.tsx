import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { Ionicons } from "@expo/vector-icons";
import CustomDrawerContent from "@/components/CustomDrawerContent";
import { AuthProvider } from "@/components/provider/AuthProvider";

export default function DrawerLayout() {
    return (
        <GestureHandlerRootView>
            <AuthProvider>
                <Drawer drawerContent={CustomDrawerContent}>
                    <Drawer.Screen
                        name="inventory"
                        options={{
                            title: "Inventario",
                            drawerLabel: "Inventario",
                            drawerIcon: ({ color, size }) => (
                                <Ionicons
                                    name="paper-plane-sharp"
                                    color={color}
                                    size={size}
                                />
                            ),
                        }}
                    />

                    <Drawer.Screen
                        name="providers"
                        options={{
                            title: "Proveedores",
                            drawerLabel: "Proveedores",
                            drawerIcon: ({ color, size }) => (
                                <Ionicons
                                    name="people-outline"
                                    color={color}
                                    size={size}
                                />
                            ),
                            
                        }}
                    />

                    <Drawer.Screen
                        name="auth"
                        options={{
                            title: "Auth",
                            drawerLabel: "Autenticación",
                            drawerIcon: ({ color, size }) => (
                                <Ionicons
                                    name="log-in-outline"
                                    color={color}
                                    size={size}
                                />
                            ),
                        }}
                    />
                </Drawer>
            </AuthProvider>
        </GestureHandlerRootView>
    );
}
