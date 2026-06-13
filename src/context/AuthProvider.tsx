import { useEffect, useMemo, useState, type ReactNode } from "react";
import type { User } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebaseConfig";
import type { AppUser, UserRole } from "../types/UserRole";
import { AuthContext } from "./auth";

const validRoles: UserRole[] = [
  "admin",
  "culturalOfficer",
  "historian",
  "researcher",
];

function isUserRole(value: unknown): value is UserRole {
  return typeof value === "string" && validRoles.includes(value as UserRole);
}

function defaultProfile(user: User): AppUser {
  return {
    uid: user.uid,
    email: user.email || "",
    role: "researcher",
    status: "active",
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);

      if (!user) {
        setProfile(null);
        setLoading(false);
        return;
      }

      console.log("Logged in UID:", user.uid);


      try {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const data = userSnap.data();

          setProfile({
            uid: user.uid,
            email: user.email || "",
            role: isUserRole(data.role) ? data.role : "researcher",
            status: data.status === "pending" ? "pending" : "active",
            createdAt: data.createdAt || null,
            updatedAt: data.updatedAt || null,
          });
        } else {
          const newProfile = defaultProfile(user);

          await setDoc(userRef, {
            ...newProfile,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          });

          setProfile(newProfile);
        }
      } catch (error) {
        console.error("Failed to load user role:", error);
        setProfile(defaultProfile(user));
      } finally {
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  const value = useMemo(() => {
    const isActive = profile?.status === "active";

    return {
      currentUser,
      profile,
      role: profile?.role || null,
      loading,
      isActive,
      can: (allowedRoles?: UserRole[]) => {
        if (!profile || !isActive) return false;
        if (!allowedRoles || allowedRoles.length === 0) return true;

        return allowedRoles.includes(profile.role);
      },
    };
  }, [currentUser, profile, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}