export interface User {
  id?: string;
  login: string;
  password?: string;
  age?: number;
  isDeleted?: boolean;
}

export interface Query {
  limit?: number;
  loginSubstring?: string;
}
