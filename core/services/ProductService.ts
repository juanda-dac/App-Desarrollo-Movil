import { getFirestore } from "firebase/firestore";
import { app } from "@/core/libs/firebase";


export class ProductService {
    async getProducts() {
        return getFirestore(app);
    }
}