import firebase from 'firebase';
import { LoginPage } from '../pages/login/login';


export class AuthService{
    public provider = new firebase.auth.GoogleAuthProvider();
    
    
    constructor(
        // public storage: Storage
    ) {}  
    
    
    signup(email: string,password: string) {
        return firebase.auth().createUserWithEmailAndPassword(email, password);
    }

    signin(email: string, password: string) {
        return firebase.auth().signInWithEmailAndPassword(email, password);
    }

    //Google SignIn 
    googleSignIn(){
        return firebase.auth().signInWithRedirect(this.provider);
    }

    logout() {
        // this.storage.clear();
        firebase.auth().signOut();
        // this.navCtrl.setRoot(LoginPage);
    }
}