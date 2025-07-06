"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { z } from "zod";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Card, CardBody, CardHeader, CardFooter } from "@heroui/card";
import { Divider } from "@heroui/divider";
import { Mail, Lock, AlertCircle, Eye, EyeOff } from "lucide-react";
import { signInSchema } from "@/schemas/signInSchema";

export default function SignInForm() {
  const router = useRouter();
  const { signIn, isLoaded, setActive } = useSignIn();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    if (!isLoaded) return;

    setIsSubmitting(true);
    setAuthError(null);

    try {
      const result = await signIn.create({
        identifier: data.identifier,
        password: data.password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.push("/dashboard");
      } else {
        console.error("Sign-in incomplete:", result);
        setAuthError("Sign-in could not be completed. Please try again.");
      }
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
     catch (error: any) {
      console.error("Sign-in error:", error);
      setAuthError(
        error.errors?.[0]?.message ||
          "An error occurred during sign-in. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 rounded-2xl shadow-xl hover:shadow-indigo-500/10 backdrop-blur-sm transition-all duration-300">
      <CardHeader className="flex flex-col gap-2 items-center pb-4">
     
        <h1 className="text-2xl font-bold text-default-900">Welcome Back</h1>
        <p className="text-gray-400 text-center text-sm">
          Sign in to access your secure cloud storage
        </p>
      </CardHeader>

      <Divider className="bg-gray-700/50" />

      <CardBody className="py-6">
        {authError && (
          <div className="bg-red-500/10 text-red-400p-4 rounded-lg mb-6 flex items-center gap-2">
            <AlertCircle className="h-5 w-5 flex-shrink-0" />
            <p>{authError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <label
              htmlFor="identifier"
              className="text-sm font-medium text-default-900"
            >
              Email
            </label>
            <Input
              id="identifier"
              type="email"
              placeholder="your.email@example.com"
              startContent={<Mail className="h-4 w-4 mr-2 text-default-500" />}
              isInvalid={!!errors.identifier}
              errorMessage={errors.identifier?.message}
              {...register("identifier")}
                className="w-full bg-gray-800/50 text-gray-100 border-gray-700/50 focus:ring-indigo-500 focus:border-indigo-500 rounded-lg"
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
              startContent={<Lock className=" mr-2 h-4 w-4 text-default-500" />}
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
              className="w-full bg-gray-800/50 text-gray-100 border-gray-700/50 focus:ring-indigo-500 focus:border-indigo-500 rounded-lg"
            />
          </div>
  <div className=" flex justify-center">
          <Button
            type="submit"
            color="primary"
             className=" justify-center w-40 rounded-2xl bg-gradient-to-r p-2 from-indigo-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600 text-white font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] border-0"
            isLoading={isSubmitting}
          >
            {isSubmitting ? "Signing in..." : "Sign In"}
          </Button>
          </div>
        </form>
      </CardBody>

      <Divider className="bg-gray-700/50" />

      <CardFooter className="flex justify-center py-4">
        <p className="text-sm text-default-600">
          Don&#39;t have an account?{" "}
          <Link
            href="/sign-up"
           className="text-indigo-400 hover:text-indigo-300 hover:underline font-medium"
          >
            Sign up
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}