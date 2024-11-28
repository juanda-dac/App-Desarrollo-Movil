import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "@/core/libs/firebase";
import { UserModel, UserStoredModel } from "@/core/models/UserModel";




export class AuthService {

    auth = getAuth(app);

    async login(user: UserModel) {
        if (!user.password) return;
        const userLogged = await signInWithEmailAndPassword(this.auth, user.email, user.password);
        return userLogged;
    }

    async getSession(){
        return this.auth.currentUser;
    }

    async logout(){
        return getAuth(app).signOut();
    }

}