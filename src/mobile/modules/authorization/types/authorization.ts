import type {
    Attributes,
    Relationships,
} from '@desktop/modules/admin/types/clinics';

export interface ClientRegistration {
    email: string;
    password: string;
    c_password: string;
    type: string;
    first_name: string;
    last_name: string;
    phone: string;
}

export interface Doctors {
    type: string;
    id: string;
    attributes: Attributes;
    relationships?: Relationships;
}

export interface Recommendation {
    type: string;
    id: string;
    attributes: Attributes;
}
