import {
    initializeApp
} from "firebase/app";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
    onAuthStateChanged,
    User,
} from "firebase/auth";
import {
    getFirestore,
    doc,
    setDoc,
    // getDoc,
    // updateDoc,
    // arrayUnion,
    // arrayRemove
} from "firebase/firestore";
import {
    useEffect,
    useState
} from "react";


const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);


export const useAuth = () => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
        });

        return () => unsubscribe();
    }, []);

    const handleLogout = () => {
        logout()
            .then(() => {
                console.log("Usuário deslogado");
                setUser(null);
            })
            .catch((error) => {
                console.log("Erro ao deslogar:", error);
            });
    };

    return { user, handleLogout };
};

export function authRegister(email: string, password: string, displayName: string) {
    return createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            return updateProfile(user, {displayName: displayName})
                .then(() => {
                    console.log('Usuário criado com nome:', user.displayName);

                    return setDoc(doc(db, "users", user.uid), {
                        displayName: displayName,
                    })

                });
        })
        .catch((error) => {
            console.log('Erro ao criar usuário:', error);
            throw new Error(error.message);
        });
}

export async function login(email: string, password: string) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log("Usuario logado:", user);
        return userCredential;
    } catch (error) {
        throw error;
    }
}

export function logout() {
    return signOut(auth);
}

// export async function addBookToBacklog(book: unknown) {
//     const user = auth.currentUser;
//     if (user) {
//         const userDocRef = doc(db, "users", user.uid);
//
//         await updateDoc(userDocRef, {
//             backlog: arrayUnion(book)
//         });
//     } else {
//         throw new Error("Usuário não autenticado");
//     }
// }

// export async function getBacklog() {
//     const user = auth.currentUser;
//     if (user) {
//         const userDocRef = doc(db, "users", user.uid);
//         const userDoc = await getDoc(userDocRef);
//         if (userDoc.exists()) {
//             return userDoc.data().backlog || [];
//         } else {
//             throw new Error("Dados do usuário não encontrados");
//         }
//     } else {
//         throw new Error("Usuário não autenticado");
//     }
// }
//
// export async function removeBookFromBacklog(book: unknown) {
//     const user = auth.currentUser;
//     if (user) {
//         const userDocRef = doc(db, "users", user.uid);
//         await updateDoc(userDocRef, {
//             backlog: arrayRemove(book)
//         });
//     } else {
//         throw new Error("Usuário não autenticado");
//     }
// }
