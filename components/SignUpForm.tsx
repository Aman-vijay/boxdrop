"use client"
import {useForm} from "react-hook-form"
import {useSignUp} from "@clerk/nextjs"
import {z} from "zod"
import {zodResolver} from "@hookform/resolvers/zod"
import { signUpSchema } from "@/schemas/signUpSchema"
import { useState } from "react"
import {useRouter} from "next/navigation"
import {Card, CardHeader, CardBody, CardFooter} from "@heroui/card";
import {Divider} from "@heroui/divider";
import {Input} from "@heroui/input";
import {
  Mail,
  Lock,
AlertCircle,
  CheckCircle,
  Eye,
  EyeOff,
} from "lucide-react";

export default function SignUpForm (){
    const [verifying,setVerifying] = useState(false);
    const router  = useRouter();
    const [isSubmitting,setIsSubmitting] = useState(false);
    const [verificationCode,setVerificationCode] = useState("")
    const [verificationError,setVerificationError] = useState<string | null>(null)
    const [authError,setAuthError] = useState<string | null>(null)
    const {signUp,isLoaded,setActive} = useSignUp()

    const {register,handleSubmit,formState:{errors}}  = useForm<z.infer<typeof signUpSchema>>({
        resolver:zodResolver( signUpSchema ),
        defaultValues:{
            email:"",
            password:"",
            passwordConfirmation:""
        }
    })


    const onSubmit = async(data:z.infer<typeof signUpSchema>)=>{
         if(!isLoaded) return;
         setIsSubmitting(true);
         setAuthError(null);

         try{
            await signUp.create({
                emailAddress:data.email,
                password:data.password
            })
            await signUp.prepareEmailAddressVerification({
                strategy:"email_code"
            })
            setVerifying(true);
         }
         catch(error:any){
            console.error("Signup Error",error)
            setAuthError(error.errors?.[0]?.message ||"An error occured during the signup ")

         }
         finally{
            setIsSubmitting(false)
         }


    }

    const handleVerification = async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        if(!isLoaded || !signUp) return;
        setIsSubmitting(true);
        setAuthError(null);
        try{
           const result =  await signUp.attemptEmailAddressVerification({
            code:verificationCode
           })
           console.log(result)
           if(result.status === "complete"){
            await setActive({session:result.createdSessionId})
            router.push("/dashboard")

           }
           else{
            console.error("Verifiaction incomplete",result)
            setVerificationError("Verification could not be complete")

           }
 
        }
        catch(error:any){
            console.error(error)
            setVerificationError(error.errors?.[0]?.message ||"An error occured during the verification ")
        }
        finally{
            setIsSubmitting(false) 
        }
    }

    if(verifying){
        return(
           <Card className="w-full max-w-md border border-default-200 bg-default-50 shadow-xl">
            <CardHeader className="flex flex-col gap-1 items-center pb-2">
                <h1 className ="text-2xl font-bold">Verify your Email</h1>
                <p className ="text-default-500 text-center">Verification code has been sent your email</p>


            </CardHeader>
            <Divider/>
            <CardBody className="py-6">
                {verificationError &&(
                    <div className="bg-danger-50 text-danger-700 p-4 rounded-lg mb-6 flex items-center gap-2">
                        <AlertCircle className="h-5 w-5 flex-shrink-0"/>
                        <p>{verificationError}</p>
                    </div>
                )}
            </CardBody>

            <form onSubmit={handleVerification} className="space-y-6">
                <div className="space-y-2">
                    <label htmlFor = "verificationCode" className="text-sm font-medium text-default-900"
                    > Verification Code
                    </label>
                    <Input 
                    id="verificationCode" 
                    type="text"
                     placeholder="Type your 6 digit code"
                     value={verificationCode}
                     onChange ={(e)=>setVerificationCode(e.target.value)}
                     className="w-full"
                     autoFocus />

                </div>

            </form>
           </Card>
        )
    }

    return(
        <h1>SignUp Form</h1>
    )

}