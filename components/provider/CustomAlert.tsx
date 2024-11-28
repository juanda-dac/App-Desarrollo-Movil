import { createContext, useContext, useState } from "react";
import {
    View,
    Text,
    Modal,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
} from "react-native";

import { Colors } from "@/core/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

export type alertTypes = "success" | "error" | "warning";

interface CustomAlertData {
    open?: boolean;
    title?: string;
    message?: string;
    type?: alertTypes;
}

interface CustomAlertContextData extends CustomAlertData {
    onAccept: () => void;
    openAlert: (params: CustomAlertData | null) => void;
    close: () => void;
    openModal: () => void;
}

interface CustomAlertProviderProps extends CustomAlertData {
    children: React.ReactNode;
}

// Context
const CustomAlertManagerContext = createContext<CustomAlertContextData>(
    {} as CustomAlertContextData
);


const HeaderAlert = ({ type, title }: { type: alertTypes; title: string }) => {
    return (
        <>
            {type === "success" ? (
                <View
                    style={{
                        ...styles.header,
                        backgroundColor: Colors.successLight,
                        borderBottomColor: Colors.successDark,
                    }}
                >
                    <Ionicons
                        name="checkmark-circle"
                        size={24}
                        color={Colors.successDark}
                    />
                    <Text style={styles.titleSuccess}>{title}</Text>
                </View>
            ) : type === "warning" ? (
                <View
                    style={{
                        ...styles.header,
                        backgroundColor: Colors.warningLight,
                        borderBottomColor: Colors.warningDark,
                    }}
                >
                    <Ionicons
                        name="warning"
                        size={24}
                        color={Colors.warningDark}
                    />
                    <Text style={styles.titleWarning}>{title}</Text>
                </View>
            ) : type === "error" ? (
                <View
                    style={{
                        ...styles.header,
                        backgroundColor: Colors.errorLight,
                        borderBottomColor: Colors.errorDark,
                    }}
                >
                    <Ionicons
                        name="close-circle"
                        size={24}
                        color={Colors.errorDark}
                    />
                    <Text style={styles.titleError}>{title}</Text>
                </View>
            ) : null}
        </>
    );
};

export function CustomAlertManager() {
    const [open, setOpen] = useState<boolean>(false);
    const [title, setTitle] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [type, setType] = useState<alertTypes>("success");

    /**
     *
     * @param cb Is a function to execute when the user click on the accept button
     * @returns void
     */
    const onAccept = (cb?: () => void) => {
        setOpen(false);
        if (cb) cb();
    };

    /**
     * The function to show the alert modal with the title, message and type
     * @param param Is a object with the title, message and type of the alert
     */

    const openAlert = (params: CustomAlertData | null) => {
        setOpen(true);
    };

    /**
     * Close the alert modal
     * @returns void
     */
    const close = () => {
        setOpen(false);
    };

    return (
        <CustomAlertManagerContext.Provider
            value={{ open, title, message, type, onAccept, openAlert, close } as CustomAlertContextData}
        >
            {/* Custom alert modal */}
            <Modal
                transparent={true}
                visible={open}
                onRequestClose={() => {
                    console.log("Closing");
                }}
            >
                <View style={styles.container}>
                    <View style={styles.card}>
                        <HeaderAlert type={type} title="Test Title" />
                        <View style={styles.body}>
                            <Text style={styles.message}>Test Body</Text>
                        </View>
                        <View style={styles.buttons}>
                            {type === "success" ? (
                                <TouchableOpacity
                                    onPress={close}
                                    activeOpacity={0.5}
                                    style={{
                                        ...styles.button,
                                        backgroundColor: Colors.successDark,
                                    }}
                                >
                                    <Text
                                        style={{
                                            color: Colors.tintPrimaryColor,
                                            fontWeight: "bold",
                                        }}
                                    >
                                        Aceptar
                                    </Text>
                                </TouchableOpacity>
                            ) : type === "warning" ? (
                                <TouchableOpacity
                                    onPress={close}
                                    activeOpacity={0.5}
                                    style={{
                                        ...styles.button,
                                        backgroundColor: Colors.warningDark,
                                    }}
                                >
                                    <Text
                                        style={{
                                            color: Colors.tintPrimaryColor,
                                            fontWeight: "bold",
                                        }}
                                    >
                                        Ignore
                                    </Text>
                                </TouchableOpacity>
                            ) : type === "error" ? (
                                <TouchableOpacity
                                    onPress={close}
                                    activeOpacity={0.5}
                                    style={{
                                        ...styles.button,
                                        backgroundColor: Colors.errorDark,
                                    }}
                                >
                                    <Text
                                        style={{
                                            color: Colors.tintPrimaryColor,
                                            fontWeight: "bold",
                                        }}
                                    >
                                        Close
                                    </Text>
                                </TouchableOpacity>
                            ) : null}
                        </View>
                    </View>
                </View>
            </Modal>
        </CustomAlertManagerContext.Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
    },
    card: {
        width: "80%",
        flexDirection: "column",
        backgroundColor: Colors.tertiaryLight,
        borderRadius: 10,
        height: "auto",
        maxHeight: Dimensions.get("window").height,
    },
    header: {
        borderBottomWidth: 1,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        paddingLeft: 20,
        paddingRight: 10,
        gap: 10,
        paddingVertical: 10,
        flexDirection: "row",
        alignItems: "center",
    },
    title: {
        color: Colors.errorDark,
        fontWeight: "bold",
    },
    titleSuccess: {
        color: Colors.successDark,
        fontWeight: "bold",
    },
    titleError: {
        color: Colors.errorDark,
        fontWeight: "bold",
    },
    titleWarning: {
        color: Colors.warningDark,
        fontWeight: "bold",
    },
    body: {
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    message: {
        fontWeight: "bold",
    },
    buttons: {
        flexDirection: "row",
        justifyContent: "center",
        gap: 10,
        padding: 10,
    },
    button: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
    },
});

export const useAlertManager = () => useContext(CustomAlertManagerContext);
