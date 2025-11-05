import { z } from "zod";

export const personalInfoSchema = z.object({
  name: z.string()
    .min(2, "Name must be at least 2 characters long")
    .max(50, "Name must be less than 50 characters")
    .regex(/^[A-Za-z\s]+$/, "Name must only contain letters"),
    
  email: z.string()
    .email("Invalid email address")
    .min(5, "Email must be at least 5 characters long"),
    
  phone: z.string()
    .regex(/^[1-9]\d{9}$/, "Phone number must be 10 digits and cannot start with 0"),
    
  gender: z.string()
    .min(1, "Please select your gender"),
    
  dob: z.string()
    .min(10, "Please select your date of birth")
    .refine((dob) => {
      const today = new Date();
      const birthDate = new Date(dob);
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      
      // Check if user is at least 13 years old
      if (age > 5) return true;
      if (age === 5 && monthDiff >= 0) return true;
      return false;
    }, "You must be at least 5 years old"),
    
  permanentAddress: z.string()
    .min(5, "Permanent address must be at least 5 characters long")
    .max(200, "Permanent address must be less than 200 characters"),
    
  currentAddress: z.string()
    .min(5, "Current address must be at least 5 characters long")
    .max(200, "Current address must be less than 200 characters"),
}).refine((data) => data.permanentAddress !== data.currentAddress, {
  message: "Current address cannot be the same as permanent address",
  path: ["currentAddress"],
});