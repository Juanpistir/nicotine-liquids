import { db } from "@/lib/firebase";
import { doc, collection, onSnapshot, updateDoc } from "firebase/firestore";

export const recipeService = {
  // ...existing code...

  subscribeToUserRecipes(userId: string, callback: any) {
    const ref = collection(db, "users", userId, "recipes");
    return onSnapshot(ref, (snapshot) => {
      const recipes = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      callback(recipes);
    });
  },
  async updateRecipe(userId: string, recipeId: string, data: any) {
    const recipeRef = doc(db, "users", userId, "recipes", recipeId);
    await updateDoc(recipeRef, {
      ...data,
      updatedAt: new Date(),
    });
    // Aquí se podría llamar a updateStats si es necesario
  },
  async shareRecipe(userId: string, recipeId: string) {
    // ...existing code...
  },
  async unshareRecipe(userId: string, recipeId: string) {
    // ...existing code...
  },
  async updateStats(userId: string, statsData: any) {
    // ...existing code...
  },
  // ...existing code...
};
