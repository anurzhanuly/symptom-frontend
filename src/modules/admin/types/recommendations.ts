export interface Condition {
  value: string[];
  type: string;
  compare: string;
  multiple: boolean;
  testCase: string;
  questionName: string;
}

export interface Recommendation {
  type: string;
  id: string;
  attributes: Attributes;
}

export interface Attributes {
  name: string;
}
