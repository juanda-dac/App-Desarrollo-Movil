import { View, Button } from "react-native";
import { useAlert } from "./provider/CustomAlert";

export default function TestComponent() {
    const alert = useAlert();

    const handleOpenAlert = () => {
        alert.openAlert({
            title: "¡Hola!",
            message: "¡Hola Mundo!",
            type: "success",
        });
    };

    return (
        <View>
            <Button title="Open Modal" onPress={handleOpenAlert} />
        </View>
    );
}