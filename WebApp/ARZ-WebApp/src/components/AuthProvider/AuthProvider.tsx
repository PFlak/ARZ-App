import { ReactNode } from "react";
import {
  User,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
  sendEmailVerification,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth, db, signInWithGooglePopup } from "../../config/firebase";
import { UserModel } from "../../models/user.model";
import {
  addDoc,
  collection,
  getDocs,
  limit,
  query,
  where,
} from "firebase/firestore";

export const AuthContext = createContext<AuthContextType | null>(null);
export interface AuthContextType {
  createUser: (email: string, password: string) => Promise<UserCredential>;
  signInWithGoogle: () => Promise<UserCredential>;
  user: UserModel | null;
  loginUser: (email: string, password: string) => Promise<UserCredential>;
  logOut: () => Promise<void>;
  loading: boolean;
  skipLoading: () => void;
  createUnAuthorizedUser: (uid: string, email: string) => Promise<boolean>;
  sendVerificationEmail: (user: User) => Promise<void>;
}

interface Props {
  children?: ReactNode;
}

const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<UserModel | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Google Firebase
  const createUser = (email: string, password: string) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = async () => {
    setLoading(true);
    return signInWithGooglePopup();
  };

  const loginUser = (email: string, password: string) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const sendVerificationEmail = (user: User) => {
    return sendEmailVerification(user);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  // ARZ API
  const createUnAuthorizedUser = async (uid: string, email: string) => {
    setLoading(true);
    return new Promise<boolean>(async (resolve) => {
      try {
        const docRef = await addDoc(collection(db, "UsersCollections"), {
          email: email,
          uid: uid,
        });
        resolve(true);
      } catch (err) {
        console.log(err);
        resolve(false);
      }
    });
  };

  const checkIfUserHasAdditionalParameters = async (uid: string) => {
    return new Promise<boolean>(async (resolve, reject) => {
      setLoading(true);
      const docRef = collection(db, "UsersCollections");
      const q = query(docRef, where("uid", "==", uid), limit(1));
      const data = getDocs(q);
      if ((await data).empty) {
        reject(-1);
      }
      (await data).forEach((user) => {
        console.log(user.data);
      });
    });
  };

  const getAdditionalInformation = async (uid: string) => {
    setLoading(true);
    return new Promise<any>(async (resolve, reject) => {
      try {
        const userRef = collection(db, "UsersCollections");
        const q = query(userRef, where("uid", "==", uid), limit(1));
        const querySnapschot = await getDocs(q);
        if (querySnapschot.empty) {
          reject("no document");
        }
        querySnapschot.forEach((doc) => {});
        resolve(querySnapschot.docs[0].data);
      } catch (error) {
        reject(error);
      }
    });
  };

  const skipLoading = () => {
    setLoading(false);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const authValue: AuthContextType = {
    createUser,
    signInWithGoogle,
    user,
    loginUser,
    logOut,
    loading,
    skipLoading,
    createUnAuthorizedUser,
    sendVerificationEmail,
  };

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
