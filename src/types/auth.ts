export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export type UserDTO = Pick<User, 'id' | 'email' | 'name'>;

export type TokenPayload = Pick<User, 'id' | 'email'>;
