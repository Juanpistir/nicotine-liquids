import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { recipeService } from "@/services/recipeService";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const { user } = useAuth();
  const [recipes, setRecipes] = useState([]);
  const [stats, setStats] = useState({
    totalRecipes: 0,
    totalMixes: 0,
    lastActivity: null,
  });

  useEffect(() => {
    if (!user) return;
    const unsubscribe = recipeService.subscribeToUserRecipes(
      user.uid,
      (updatedRecipes: any[]) => {
        setRecipes(updatedRecipes);
      }
    );
    loadStats();
    return () => unsubscribe();
  }, [user]);

  const loadStats = async () => {
    if (!user) return;
    const snap = await getDoc(doc(db, "users", user.uid));
    if (snap.exists()) {
      const data = snap.data();
      if (data?.stats) setStats(data.stats);
    }
  };

  return (
    <div className="p-4">
      {/* Mostrar recetas y stats */}
      {/* ...existing code... */}
    </div>
  );
}
