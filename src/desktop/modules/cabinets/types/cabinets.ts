export interface Consultation {
    type: string | null;
    id: string;
    attributes: Attributes;
}

export interface Attributes {
    diagnose?: string;
    date?: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    name?: string;
    midName?: string;
    specialization?: string;
    experience?: string;
}

export interface ConsultationResult {
    type: string | null;
    id: string;
    attributes: Attributes;
}

export interface PatientAnswers {
    [key: string]: string[];
}

export interface DiseaseData {
    data: Disease[];
}

export interface Disease {
    type: string;
    id: string;
    attributes: DiseaseAttributes;
}

export interface DiseaseAttributes {
    name: string;
}
