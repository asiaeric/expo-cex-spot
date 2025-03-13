import { z } from "zod";

import { SignInSchema, SignUpSchema, UserSchema } from "@/schemas";

type User = z.infer<typeof UserSchema>;
type SignInDTO = z.infer<typeof SignInSchema>;
type SignUpDTO = z.infer<typeof SignUpSchema>;

export { SignInDTO, SignUpDTO, User };
