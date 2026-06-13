import type { Timestamp  } from "firebase/firestore";

export type UserRole = "admin" | "culturalOfficer" | "historian" | "researcher";
export type UserStatus = "active" | "pending";

export type AppUser = {
    uid: string;
    email: string;
    role: UserRole;
    status: UserStatus;
    createdAt?: Timestamp | null;
    updatedAt?: Timestamp | null;
};

export const HERITAGE_EDITOR_ROLES: UserRole[] = [
    "admin", "culturalOfficer", "historian",
];

export const ORGANIZATION_MANAGER_ROLES: UserRole[] = [
    "admin", "culturalOfficer",
];

