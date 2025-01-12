import { useState, useEffect } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/hooks/useAuth";

export default function Profile() {
  const { user } = useAuth();
  const [displayName, setDisplayName] = useState("");
  const [photoURL, setPhotoURL] = useState("");

  useEffect(() => {
    if (user) loadProfile();
  }, [user]);

  const loadProfile = async () => {
    if (!user) return;
    const snap = await getDoc(doc(db, "users", user.uid));
    if (snap.exists()) {
      const data = snap.data();
      setDisplayName(data.displayName || "");
      setPhotoURL(data.photoURL || "");
    }
  };

  const updateProfile = async () => {
    if (!user) return;
    await updateDoc(doc(db, "users", user.uid), {
      displayName,
      photoURL,
    });
  };

  return (
    <div className="p-4">
      {/* Formulario para editar displayName y photoURL */}
      {/* ...existing code... */}
    </div>
  );
}
