export interface IndexedObject {
  [key: string]: any;
}

export interface Book {
  id: number;
  title: string;
  author: string;
  year: string;
  description: string;
}

export interface SuccessfulResponse {
  isValid: boolean;
  message: string[];
}
