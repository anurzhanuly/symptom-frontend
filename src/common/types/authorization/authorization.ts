import type { Attributes, Relationships } from '@/common/types/admin/clinics';

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
