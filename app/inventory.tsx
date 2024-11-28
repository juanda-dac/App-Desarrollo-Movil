import { useAuth } from "@/components/provider/AuthProvider";
import { app } from "@/core/libs/firebase";
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getFirestore,
    onSnapshot,
    query,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import {
    View,
    TouchableOpacity,
    Text,
    FlatList,
    StyleSheet,
    Modal,
    Dimensions,
    TextInput,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context"; 
import { Colors } from "@/core/constants/Colors";


function ModalViewData({ open, onClose, onDelete, data }: any) {

    return (
        <Modal transparent visible={open}>
            <View style={stylesModalView.mainContainer}>
                <View style={stylesModalView.container}>
                    
                    <ScrollView>
                        <Text style={stylesModalView.title}>{data.name}</Text>
                        <View>
                            <Text style={stylesModalView.text}>
                                Cantidad: {data.stock} Unds
                            </Text>
                            <Text style={stylesModalView.text}>
                                Fecha: {data.date}
                            </Text>
                        </View>
                    </ScrollView>
                    <View style={stylesModalView.buttons}>
                        <TouchableOpacity onPress={onClose} style={{ ...stylesModalView.button, backgroundColor:Colors.primary }}>
                            <Text style={{ color: "#fff" }}>Cerrar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=> onDelete(data.id)} style={{ ...stylesModalView.button, backgroundColor:Colors.error }}>
                            <Text style={{ color: "#fff" }}>Borrar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const stylesModalView = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    container: {
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 10,
        elevation: 5,
        width: Dimensions.get("window").width - 40,
        
    },
    closeButton: {
        fontSize: 20,
        textAlign: "right",
        marginBottom: 20,
    },
    title: {
        fontSize: 30,
        marginBottom: 20,
        textAlign: "center",
    },
    text: {
        fontSize: 20,
        color: Colors.tertiary,
    },
    buttons:{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        gap: 10,
    },
    button:{
        padding: 10,
        borderRadius: 5,
    }
});


function ModalScreen({ open, onSubmit }: any) {
    const [product, setProduct] = useState<any>({});
    const [error, setError] = useState("");

    useEffect(() => {
        setProduct({
            ...product,
            date: new Date().toLocaleDateString(),
        })
    }, []);

    return (
        <>
            <Modal transparent visible>
                <View style={stylesModal.mainContainer}>
                    <View style={stylesModal.container}>
                        <View style={stylesModal.inputWrapper}>
                            {error && <Text>{error}</Text>}
                            <TextInput
                                style={stylesModal.inputBox}
                                onChangeText={(text) => {
                                    setProduct({ ...product, name: text })
                                    setError("")
                                }}
                                placeholder="Nombre del producto"
                            />
                            <TextInput
                                style={stylesModal.inputBox}
                                onChangeText={(text) =>{
                                    setProduct({ ...product, stock: parseInt(text) });
                                    setError("")
                                }
                                }
                                placeholder="Cantidad"
                            />
                        </View>
                        <TouchableOpacity
                            onPress={() => {
                                if(product.name && product.stock){
                                    onSubmit(product);
                                    setProduct({});
                                    return;
                                }
                                setError("Todos los campos son requeridos");

                            }}
                            style={stylesModal.button}
                            activeOpacity={0.9}
                        >
                            <Text style={stylesModal.buttonText}>Guardar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </>
    );
}

const stylesModal = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "flex-end",
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    container: {
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 10,
        elevation: 5,
        width: Dimensions.get("window").width,
    },
    inputWrapper: {
        marginBottom: 20,
    },
    inputBox: {
        borderWidth: 1,
        borderColor: Colors.tertiary,
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
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
});

export default function InventoryScreen() {
    const [products, setProducts] = useState<any>([]);
    const [product,setProduct] = useState<any>({});
    const [openModalProduct, setOpenModalProduct] = useState(false);
    const [open, setOpen] = useState(false);

    const auth = useAuth();
    const firestore = getFirestore(app);


    useEffect(() => {}, [auth.activeSession]);

    useEffect(() => {
        const getProducts = async () => {
            const productsCollection = await collection(firestore, "inventory");
            const q = await query(productsCollection);
            setProducts([]);
            onSnapshot(q, (snapShot) => {                
                setProducts(
                    snapShot.docs.map((doc) => ({
                        id: doc.id,
                        name: doc.data().name,
                        stock: doc.data().stock,
                        date: doc.data().date,
                    }))
                );
            });
        };

        getProducts();
    }, []);

    const addProduct = async (product:any) => {        
        try {
            const document = await addDoc(
                collection(firestore, "inventory"),
                product
            );
            console.log("Document written with ID: ", document.id);
        } catch (error) {
            console.error(error);
        }
        setOpen(false);
    };

    const getDocument = async (id:string) => {
        const document = await getDoc(doc(firestore, "inventory", id));
        setProduct({...document.data(), id: document.id});
        setOpenModalProduct(true);
    }

    const deleteDocument = async (id:string) => {
        await deleteDoc(doc(firestore, "inventory", id));
        setOpenModalProduct(false);
    }

    return (
        <View style={styles.container}>
            {open && <ModalScreen onSubmit={addProduct} />}
            {openModalProduct && <ModalViewData open={openModalProduct} onDelete={deleteDocument} onClose={()=>setOpenModalProduct(false)} data={product} />}
            <Text style={styles.title}>Inventario</Text>
            <View>
                <SafeAreaView>
                    <FlatList
                        ListEmptyComponent={()=><Text>No hay productos</Text>}
                        data={products}
                        style={styles.list}
                        renderItem={(data) => (
                            <TouchableOpacity onPress={()=> getDocument(data.item.id)} style={styles.item}>
                                <View>
                                    <Text style={styles.itemTitle}>
                                        {data.item.name}
                                    </Text>
                                    <Text style={styles.text}>
                                        {data.item.stock} Unds
                                    </Text>
                                    <Text style={styles.text}>
                                        Fecha: {data.item.date}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                </SafeAreaView>

                <View>
                    <TouchableOpacity
                        onPress={() => setOpen(true)}
                        style={styles.button}
                        activeOpacity={0.9}
                    >
                        <Text
                            style={{
                                fontSize: 16,
                                color: Colors.tintPrimaryColor,
                                fontWeight: "bold",
                                textAlign: "center",
                            }}
                        >
                            Agregar Producto
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 30,
        marginBottom: 20,
        textAlign: "center",
    },
    list: {
        borderColor: "#000",
        borderWidth: 1,
        height: 350,
    },
    item: {
        borderBottomWidth: 1,
        borderBottomColor: "#000",
        padding: 10,
    },
    itemTitle: {
        fontSize: 20,
    },
    text: {
        fontSize: 12,
        color: Colors.tertiary,
    },
    button: {
        backgroundColor: Colors.primary,
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
    },
});
