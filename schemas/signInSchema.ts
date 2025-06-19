import * as z from "zod";

export const signInSchema = z.object({
    identifier:z.
                string()
                .min(1,{message:"Email is required"})
                .email({message:"Email is not valid"}),
    password: z
               .string()
               .min(1,{message:"Password is required"})
               .min(6,{message:"Password must be of 6 character"})
                          
})
