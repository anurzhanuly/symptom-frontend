import type {
    Attributes,
    Relationships,
} from '@desktop/modules/admin/types/clinics';

export interface Doctors {
    type: string;
    id: string;
    attributes: Attributes;
    relationships?: Relationships;
}
