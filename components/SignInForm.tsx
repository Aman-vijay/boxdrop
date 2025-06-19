"use client"
import {useSignIn} from "@clerk/nextjs"
import {useRouter} from "next/navigation"
import {useState} from "react"
import {useForm} from "react-hook-form"
import {z} from "zod"
import {signInSchema} from "@/schemas/signInSchema"
import {zodResolver} from "@hookform/resolvers/zod"
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import {Card, CardHeader, CardBody, CardFooter} from "@heroui/card";   
import { Divider } from "@heroui/divider";
import {AlertCircle,Lock, Eye, EyeOff,MailIcon} from "lucide-react";
import Link from "next/link";


export default function SignInForm() {
    const router = useRouter();
    const {signIn, isLoaded,setActive} = useSignIn();
    const [submitting, setSubmitting] = useState(false);
    const [autherror, setAuthError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
     const {
    register,
    handleSubmit,
    formState: { errors },} = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });
    const onSubmit = async (data: z.infer<typeof signInSchema>) => {
        if(!isLoaded) return;
        setSubmitting(true);
        setAuthError(null);
        try{
            const signInAttempt = await signIn.create({
                identifier: data.identifier,
                password: data.password
            })
            if (signInAttempt.status === "complete") {
                await setActive({session: signInAttempt.createdSessionId});
                router.push("/dashboard");
            }
            else{
                console.error("Sign in failed:", signInAttempt);
                setAuthError("Sign in failed. Please check your credentials.");
            }
        }
        catch (error:any) {
            console.error("Sign in error:", error);
            setAuthError(error.erros?.[0]?.message || "An unexpected error occurred. Please try again.");
        }
        finally {
            setSubmitting(false);
        }
    }

    return (
       <Card className="w-full max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
       <CardHeader className="text-center flex flex-col gap-1 items-center">
        <h1 className="text-2xl font-bold">Sign In</h1>
        <p className="text-sm text-gray-500">Welcome back! Please sign in to your account.</p>
        <p className="text-gray-500 text-sm text-center">
            Sign in with your email and password to access your dashboard.
        </p>

       </CardHeader>
       <Divider/>
       <CardBody className="flex flex-col gap-4">
        {autherror && (
            <div className="text-red-500 text-sm mb-4">
                <AlertCircle className="h-5 w-5 flex-shrink-0 inline mr-2" />
                <p>{autherror}</p>
            </div>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <label htmlFor="identifier" className="block text-sm font-medium text-gray-700">Email or Username</label>
                <Input
                    id="identifier"
                    type="email"
                    placeholder="Enter your email "
                    startContent={<MailIcon className="h-5 w-5 text-gray-400" />}
                    isInvalid={!!errors.identifier

                    }
                    errorMessage={errors.identifier?.message}
                    {...register("identifier")}
                    className="mt-1 block w-full"
                    required
                />
            </div>
            <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label
                htmlFor="password"
                className="text-sm font-medium text-default-900"
              >
                Password
              </label>
            </div>
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              startContent={<Lock className="h-4 w-4 text-default-500" />}
              endContent={
                <Button
                  isIconOnly
                  variant="light"
                  size="sm"
                  onClick={() => setShowPassword(!showPassword)}
                  type="button"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-default-500" />
                  ) : (
                    <Eye className="h-4 w-4 text-default-500" />
                  )}
                </Button>
              }
              isInvalid={!!errors.password}
              errorMessage={errors.password?.message}
              {...register("password")}
              className="w-full"
            />
          </div>
             <Button
            type="submit"
            color="primary"
            className="w-full"
            isLoading={submitting}
          >
            {submitting ? "Signing in..." : "Sign In"}
          </Button>
        </form>
       </CardBody>
        <Divider />

        
      <CardFooter className="flex justify-center py-4">
        <p className="text-sm text-default-600">
          Don&apos;t have an account?{" "}
          <Link
            href="/sign-up"
            className="text-primary hover:underline font-medium"
          >
            Sign up
          </Link>
        </p>
      </CardFooter>

       </Card>
    )

}