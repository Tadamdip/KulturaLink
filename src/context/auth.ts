import { createContext } from "react";
import type { User } from "firebase/auth";
import type { AppUser, UserRole } from "../types/UserRole";

export type AuthContextType = {
    currentUser: User | null;
    profile: AppUser | null;
    role: UserRole | null;
    loading: boolean;
    isActive: boolean;
    can: (allowedRoles?: UserRole[]) => boolean;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
