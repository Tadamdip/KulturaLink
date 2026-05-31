import type { Timestamp } from "firebase/firestore";`r`n`r`nexport type Custodian = {
    id?: string;
    name: string;
    type: string; // e.g. Government, NGO, Private, Community
    contactEmail: string;
    contactPhone: string;
    address: string;
    description: string;
    establishedYear: string;
    createdBy?: string;
    createdAt?: Timestamp | null;
    officialRepresentative: string;
};
