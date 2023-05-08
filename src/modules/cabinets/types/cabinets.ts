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
}

export interface ConsultationResult {
  type: string | null;
  id: string;
  attributes: Attributes;
}
