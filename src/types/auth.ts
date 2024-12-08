import type { User as UserType } from '@prisma/client';

export type User = UserType;

export type UserDTO = Pick<User, 'id' | 'email' | 'name'>;

export type CreateDTO = Pick<User, 'email' | 'password' | 'name'>;
export type UpdateDTO = Partial<Pick<User, 'email' | 'password' | 'name'>>;

export type TokenPayload = Pick<User, 'id' | 'email'>;
