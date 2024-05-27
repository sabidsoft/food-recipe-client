import { User as FirebaseUser } from "firebase/auth";

export interface FirebaseConfig {
    apiKey: string | undefined;
    authDomain: string | undefined;
    projectId: string | undefined;
    storageBucket: string | undefined;
    messagingSenderId: string | undefined;
    appId: string | undefined;
}

export interface SignInWithGoogleResult {
    user: FirebaseUser;
}
