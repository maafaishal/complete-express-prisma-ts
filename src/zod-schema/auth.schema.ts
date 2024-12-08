import { z } from 'zod';

const email = z.string().email();
const password = z.string().min(8);
const name = z.string().min(1).max(100);

export const register = z.object({
  email,
  password,
  name,
});

export const login = z.object({
  email,
  password,
});
