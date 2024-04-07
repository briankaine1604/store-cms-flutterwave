import * as z from "zod";
import { UserRole } from "@prisma/client";

export const CategorySchema = z.object({
  name: z.string().min(1),
  billboardId: z.string().min(1),
});

export const ProductSchema = z.object({
  name: z.string().min(1),
  categoryId: z.string().min(1),
  subcategoryId: z.string().optional(),
  sizeId: z.array(z.string()),
  colorId: z.string().min(1),
  price: z.coerce.number().min(1),
  brand: z.string().min(1),
  isFeatured: z.boolean().default(false).optional(),
  isArchived: z.boolean().default(false).optional(),
  images: z.object({ url: z.string() }).array(),
});

export const SubcategorySchema = z.object({
  name: z.string().min(1),
  billboardId: z.string().min(1),
  categoryId: z.string().min(1),
});

export const ColorSchema = z.object({
  name: z.string().min(1),
  value: z.string().min(1),
});

export const SizeSchema = z.object({
  name: z.string().min(1),
  value: z.string().min(1),
});

export const BillboardSchema = z.object({
  label: z.string().min(1),
  imageUrl: z.string().min(1),
});

export const SettingsSchema = z
  .object({
    name: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    role: z.enum([UserRole.USER, UserRole.ADMIN]),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6)),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        return false;
      }

      return true;
    },
    {
      message: "New Password is required!",
      path: ["newPassword"],
    }
  )
  .refine(
    (data) => {
      if (data.newPassword && !data.password) {
        return false;
      }

      return true;
    },
    {
      message: "Password is required!",
      path: ["password"],
    }
  );

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Minimum of 6 characters required",
  }),
});

export const LoginSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
  code: z.optional(z.string()),
});

export const ResetSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
});

export const RegisterSchema = z
  .object({
    email: z.string().email({ message: "Email is required" }),
    password: z.string().min(6, {
      message: "Minimum password is 6 characters",
    }),
    name: z.string().min(1, {
      message: "Name is required",
    }),
    confirmpassword: z.string().min(6, {
      message: "Minimum password is 6 characters",
    }),
  })
  .refine(
    (data) => {
      if (data.confirmpassword !== data.password) {
        return false;
      }
      return true;
    },
    {
      message: "Passwords do not match!",
      path: ["confirmpassword"],
    }
  );
