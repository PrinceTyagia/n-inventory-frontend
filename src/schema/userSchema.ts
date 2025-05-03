import { z } from 'zod';

export const userSignupSchema = z.object({
  organisation: z
    .string()
    .min(2, "Company name must be at least 2 characters long")
    .max(100, "Company name cannot exceed 100 characters"),

  firstName: z
    .string()
    .min(1, "First name is required")
    .max(50, "First name cannot exceed 50 characters")
    .trim(),

  phoneNo: z
    .string()
    .regex(/^[0-9]{10}$/, "Phone number must be exactly 10 digits")
    .trim(),

  email: z
    .string()
    .email("Invalid email address"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .max(20, "Password cannot exceed 20 characters")
    .trim(),
});
export type SignupInputState = z.infer<typeof userSignupSchema>;
export const userLoginSchema = z.object({
  email: z
  .string()
  .email("Invalid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .trim(),
});
export type LoginInputState = z.infer<typeof userLoginSchema>
export const inviteSignupSchema = z.object({
  firstName: z
  .string()
  .min(1, "First name is required")
  .max(50, "First name cannot exceed 50 characters")
  .trim(),
  lastName: z
  .string()
  .min(1, "First name is required")
  .max(50, "First name cannot exceed 50 characters")
  .trim(),
  phoneNo: z
  .string()
  .regex(/^[0-9]{10}$/, "Phone number must be exactly 10 digits")
  .trim(),
  password: z
  .string()
  .min(6, "Password must be at least 6 characters long")
  .trim(),
})

export type InviteInputState = z.infer<typeof inviteSignupSchema>


// Define the Zod validation schema
// export const userSignupSchema = z.object({
//     organisation: z.string()
//     .min(2, "Company name must be at least 2 characters long")
//     .max(100, "Company name cannot exceed 100 characters")
//     .regex(/^[A-Za-z0-9\s]+$/, "Company name can only contain letters, numbers, and spaces")
//     .trim(),
//   email: z.string().email("Invalid email address"),
//   gstNumber: z.string().regex(
//     /^[A-Z]{2}[0-9]{4}[A-Z]{1}[0-9]{1}[A-Z0-9]{3}$/,
//     "Invalid GST number"
//   ),
  
//   address: z.string()
//     .min(5, "Address must be at least 5 characters long")
//     .regex(/^[A-Za-z0-9\s,.'-]+$/, "Address can only contain letters, numbers, spaces, and basic punctuation")
//     .trim(), 
//   aptSuite: z.string()
//     .min(1, "Apartment number must not be empty")
//     .regex(/^[A-Za-z0-9\-\/\s]+$/, "Apartment number can only contain letters, numbers, spaces, hyphens, or slashes")
//     .trim(),
// phoneNo: z.string()
//     .regex(/^[0-9]{10}$/, "Phone number must be exactly 10 digits")
//     .trim(),
//   password: z.string()
//     .min(6, "Password must be at least 6 characters long")
//     .max(20, "Password cannot exceed 20 characters")
//     .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
//     .regex(/[a-z]/, "Password must contain at least one lowercase letter")
//     .regex(/[0-9]/, "Password must contain at least one number")
//     .regex(/[\W_]/, "Password must contain at least one special character")
//     .trim(),
//   zipCode: z.string()
//     .regex(/^[0-9]{6}$/, "Zip code must be exactly 6 digits")
//     .trim(),
//   stateName: z.string()
//     .min(2, "State name must be at least 2 characters long")
//     .max(100, "State name cannot exceed 100 characters")
//     .trim(),
  
//   cityName: z.string()
//     .min(2, "City name must be at least 2 characters long")
//     .max(100, "City name cannot exceed 100 characters")
//     .trim(),
  
//   stateIso: z.string()
//     .length(2, "State ISO code must be exactly 2 characters")
//     .regex(/^[A-Z]{2}$/, "State ISO code must be uppercase letters")
//     .trim(),
// });





