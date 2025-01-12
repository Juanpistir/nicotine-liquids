import React, { createContext, useContext, useState, useEffect } from "react";
import { auth, db } from "@/lib/firebase";
import {
  onAuthStateChanged,
  User,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import {
  doc,
  setDoc,
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
} from "firebase/firestore";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  getUserRecipes: () => Promise<any[]>;
  saveUserRecipe: (recipe: any) => Promise<void>;
  deleteUserRecipe: (recipeId: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setError("Error al iniciar sesión");
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
    } catch (error) {
      setError("Error al cerrar sesión");
      throw error;
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (!result.user) {
        throw new Error("No se pudo obtener el usuario después del registro");
      }
      await setDoc(doc(db, "users", result.user.uid), {
        email: result.user.email,
        createdAt: new Date(),
      });
      return result.user;
    } catch (error) {
      setError("Error al registrarse");
      throw error;
    }
  };

  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      setError("Error al enviar el correo de restablecimiento de contraseña");
      throw error;
    }
  };

  const getUserRecipes = async () => {
    if (!user) return [];
    const q = query(collection(db, "recipes"), where("userId", "==", user.uid));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => doc.data());
  };

  const saveUserRecipe = async (recipe: any) => {
    if (!user) throw new Error("User not authenticated");
    await setDoc(doc(db, "recipes", recipe.id), {
      ...recipe,
      userId: user.uid,
    });
  };

  const deleteUserRecipe = async (recipeId: string) => {
    if (!user) throw new Error("User not authenticated");
    await deleteDoc(doc(db, "recipes", recipeId));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        signIn,
        signOut,
        signUp,
        resetPassword,
        getUserRecipes,
        saveUserRecipe,
        deleteUserRecipe,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de AuthProvider");
  }
  return context;
};

export { AuthContext };
