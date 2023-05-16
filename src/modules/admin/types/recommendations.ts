export interface Condition {
  value: string[] | string | number;
  type: string;
  compare: string;
  multiple: boolean;
  testCase: string;
  questionName: string;
  [key: number]: Condition;
}

export interface Recommendation {
  type: string;
  id: string;
  attributes: Attributes;
}

export interface Attributes {
  name: string;
}
