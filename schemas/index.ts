import * as z from "zod";
import { UserRole } from "@prisma/client";

export const SettingsSchema = z
  .object({
    image: z.optional(z.string()),
    name: z.optional(z.string().min(4)),
    //storeName: z.optional(z.string().min(6)),
    address: z.optional(z.string().min(6)),
    /*  phoneNumber: z.optional(
      z
        .string()
        .min(6)
        .regex(/^\+?[0-9]{12}$/, "Invalid phone number") // .regex(/^\+?[0-9]{10,12}$/, "Invalid phone number")
    ), */
    phoneNumber: z
      .union([
        z.coerce
          .string()
          .min(4)
          .regex(/^\+?[0-9]{12}$/, "Invalid phone number"),
        z.coerce
          .string()
          .regex(/^(Not entered)|(null)$/, "Invalid phone number"),
      ])
      .optional()
      .transform((e) => (e === "" ? undefined : e)),
    /*  z.coerce
        .string()
        .min(6)
        .regex(/^\+?[0-9]{12}$/, "Invalid phone number")
        .optional()
        .or(z.literal("")), // .regex(/^\+?[0-9]{10,12}$/, "Invalid phone number") */

    //z.string().min(4, "Please enter a valid value").optional()

    isTwoFactorEnabled: z.optional(z.boolean()),
    role: z.enum([UserRole.MANAGER, UserRole.BRAND, UserRole.AFFILIATE]),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6)),
  })
  /*  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        return false;
      }
      return true;
    },
    {
      message: "To change a password enter your current one and a new one!",
      path: ["newPassword"],
    }
  ) */
  .refine(
    (data) => {
      if (data.newPassword && !data.password) {
        return false;
      }
      return true;
    },
    {
      message: "To change a password enter your current one!",
      path: ["password"],
    }
  );
/*   .refine(
    (data) => {
      if (!data.phoneNumber || !data.phoneNumber.match(/^\+?[0-9]{10,12}$/)) {
        return false;
      }
      return true;
    },
    {
      message: "Invalid phone number",
      path: ["phoneNumber"],
    }
  ); */

/* export default function validateEmail(email) {
    return !!String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );
  } */
export const MediaChannelSchema = z.object({
  userId: z.string().min(4),
  image: z.string().min(4),
  name: z.string().min(4),
  description: z.string().min(6),
  subscribers: z.coerce.number().int().positive().min(1), //.int("Enter a natural number"),
  views: z.coerce.number().int().positive().min(1),
  price: z.coerce
    .number()
    .positive()
    .min(1)
    .refine((x) => x * 100 - Math.trunc(x * 100) < Number.EPSILON), //.multipleOf(0.01)
});

export const CardSchema = z.object({
  userId: z.string().min(4),
  nameOnCard: z
    .string()
    .min(3, "Holder name is required")
    .regex(
      /^([\w-]+\ )*([\w-]+)$/,
      "Name must consist of groups of one space separated words, consisting of letters and -"
    ),
  //  /^([\w-]+\ )*([\w-]+)$/
  number: z
    .string()
    .regex(
      /^\d{4}\ \d{4}\ \d{4}\ \d{4}$/,
      "Card number must be 16 digits in 4 gpoups separated by spaces"
    ),
  //number: z.string().regex(/^\d{16}$/, "Card number must be 16 digits"),
  cvv: z.string().regex(/^\d{3,4}$/, "CVC must be 3 or 4 digits"),
  expirationDate: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Expiry date must be in MM/YY format"),
});

export const OfferSchema = z.object({
  authorId: z.string().min(4),
  name: z.string().min(4),
  brand: z.string().min(6),

  price: z.coerce
    .number()
    .positive()
    .min(1)
    .refine((x) => x * 100 - Math.trunc(x * 100) < Number.EPSILON), //.multipleOf(0.01)
  balance: z.coerce
    .number()
    .positive()
    .min(1)
    .refine((x) => x * 100 - Math.trunc(x * 100) < Number.EPSILON),
});

/* name      String
  brand     String
  price     Decimal
  balance   Decimal */

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Minimum of 6 characters required",
  }),
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
});

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
  code: z.optional(z.string()),
});

export const RegisterSchema = z
  .object({
    email: z.string().email({
      message: "Введіть коректний E-mail",
    }),
    password: z.string().min(8, {
      message: "Мінімально 8 символів",
    }),
    passwordRepeat: z.string().min(8, {
      message: "Мінімально 8 символів",
    }),
    name: z.string().min(4, {
      message: "Мінімально 4 символи",
    }),
    role: z.enum([UserRole.BRAND, UserRole.AFFILIATE]),
  })
  .refine(
    (data) => {
      if (data.passwordRepeat !== data.password) {
        return false;
      }
      return true;
    },
    {
      message: "Некоректне підтверждення паролю",
      path: ["passwordRepeat"],
    }
  );
