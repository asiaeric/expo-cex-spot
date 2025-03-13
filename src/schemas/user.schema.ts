import { t } from "i18next";
import { z } from "zod";

const passwordRequirements = z
  .string()
  .min(8, { message: "Password must be at least 8 characters long" })
  .regex(/[a-z]/, {
    message: "Password must contain at least one lowercase letter",
  })
  .regex(/[A-Z]/, {
    message: "Password must contain at least one uppercase letter",
  })
  .regex(/[0-9]/, { message: "Password must contain at least one number" })
  .regex(/[^a-zA-Z0-9]/, {
    message: "Password must contain at least one special character",
  });

export const SignUpSchema = z.object({
  firstName: z.string(),
  lastName: z.string().optional().default(""),
  email: z.string().email({ message: t("signup:invalidEmail") }),
  password: passwordRequirements,
});

export const SignInSchema = z.object({
  email: z.string().email({ message: "invalidEmail" }),
  password: z.string().min(8, { message: "passwordLength" }),
});

export const UserSchema = z.object({
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  id: z.string(),
});
