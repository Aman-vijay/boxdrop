import * as z from "zod";

export const signUpSchema = z.object(
    {
        email:z
                .string()
                .min(1,{message:"Email is requires"})
                .email({message:"Field must be a valid email"}),

        password:z
                 .string()
                 .min(1,{message:"Password is required"})
                 .min(6,{message:"Password must be of 6 characters"}),
        passwordConfirmation:z
                 .string()
                 .min(1,{message:"Please confirm your password"})
               
                                      
                 
                    
    
    }
) 
.refine((data)=> data.password ===data.passwordConfirmation,{
    message:"Password does not match",
    path:["passwordConfirmation"]
})