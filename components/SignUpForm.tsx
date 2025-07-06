'use client';

import { useForm } from 'react-hook-form';
import { useSignUp } from '@clerk/nextjs';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUpSchema } from '@/schemas/signUpSchema';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardBody, CardFooter } from '@heroui/card';
import { Divider } from '@heroui/divider';
import { Input } from '@heroui/input';
import { Button } from '@heroui/button';
import Link from 'next/link';
import { Mail, Lock, AlertCircle, CheckCircle, Eye, EyeOff, Sparkles } from 'lucide-react';

export default function SignUpForm() {
  const [verifying, setVerifying] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { signUp, isLoaded, setActive } = useSignUp();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      password: '',
      passwordConfirmation: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    if (!isLoaded) return;
    setIsSubmitting(true);
    setError(null);

    try {
      await signUp.create({
        emailAddress: data.email,
        password: data.password,
      });
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
      setVerifying(true);
    } 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    catch (error: any) {
      setError(error.errors?.[0]?.message || 'An error occurred during signup.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerification = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isLoaded || !signUp) return;
    setIsSubmitting(true);
    setError(null);

    try {
      const result = await signUp.attemptEmailAddressVerification({
        code: verificationCode,
      });
      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId });
        router.push('/dashboard');
      } else {
        setError('Verification failed. Please check the code and try again.');
      }
    } 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    catch (error: any) {
      setError(error.errors?.[0]?.message || 'An error occurred during verification.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (verifying) {
    return (
      <Card className="w-full max-w-md mx-auto bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 rounded-2xl shadow-xl hover:shadow-indigo-500/10 backdrop-blur-sm transition-all duration-300">
        <CardHeader className="flex flex-col gap-2 items-center pb-4">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500/10 to-pink-500/10 border border-indigo-500/20 rounded-full px-4 py-2 text-indigo-300 font-medium text-sm backdrop-blur-sm">
            <Sparkles className="h-4 w-4" />
            Verify Your Email
          </div>
          <h1 className="text-2xl font-bold text-white">Verify Your Email</h1>
          <p className="text-gray-400 text-center text-sm">
            A verification code has been sent to your email.
          </p>
        </CardHeader>
        <Divider className="bg-gray-700/50" />
        <CardBody className="py-8">
          {error && (
            <div className="bg-red-500/10 text-red-400 p-4 rounded-lg mb-6 flex items-center gap-2">
              <AlertCircle className="h-5 w-5 flex-shrink-0" />
              <p className="text-sm">{error}</p>
            </div>
          )}
          <form onSubmit={handleVerification} className="space-y-6">
            <div className="space-y-2">
              <label
                htmlFor="verificationCode"
                className="text-sm font-medium text-white"
              >
                Verification Code
              </label>
              <Input
                id="verificationCode"
                type="text"
                placeholder="Enter 6-digit code"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                className="w-full bg-gray-800/50 text-gray-100 border-gray-700/50 focus:ring-indigo-500 focus:border-indigo-500 rounded-lg"
                autoFocus
                aria-describedby={error ? 'verification-error' : undefined}
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600 text-white font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] border-0"
              isLoading={isSubmitting}
              disabled={isSubmitting || verificationCode.length !== 6}
            >
              {isSubmitting ? 'Verifying...' : 'Verify Email'}
            </Button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400">
              Didn’t receive a code?{' '}
              <button
                onClick={async () => {
                  if (signUp) {
                    await signUp.prepareEmailAddressVerification({
                      strategy: 'email_code',
                    });
                  }
                }}
                className="text-indigo-400 hover:text-indigo-300 hover:underline font-medium"
                disabled={isSubmitting}
              >
                Resend code
              </button>
            </p>
          </div>
        </CardBody>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 rounded-2xl shadow-xl hover:shadow-indigo-500/10 backdrop-blur-sm transition-all duration-300">
      <CardHeader className="flex flex-col gap-2 items-center pb-4">
     
        <h1 className="text-2xl font-bold text-white">Create Your Account</h1>
        <p className="text-gray-400 text-center text-sm">
          Sign up to start managing your images securely
        </p>
      </CardHeader>
      <Divider className="bg-gray-700/50" />
      <CardBody className="py-8">
        {error && (
          <div className="bg-red-500/10 text-red-400 p-4 rounded-lg mb-6 flex items-center gap-2">
            <AlertCircle className="h-5 w-5 flex-shrink-0" />
            <p className="text-sm">{error}</p>
          </div>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-sm font-medium text-white"
            >
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              startContent={<Mail className="h-4 w-4 mr-2 text-gray-400" />}
              isInvalid={!!errors.email}
              errorMessage={errors.email?.message}
              {...register('email')}
              className="w-full bg-gray-800/50 text-gray-100 border-gray-700/50 focus:ring-indigo-500 focus:border-indigo-500 rounded-lg"
              aria-describedby={errors.email ? 'email-error' : undefined}
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="text-sm font-medium text-white"
            >
              Password
            </label>
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              startContent={<Lock className="h-4 w-4 mr-2 text-gray-400" />}
              endContent={
                <Button
                  isIconOnly
                  variant="light"
                  size="sm"
                  onClick={() => setShowPassword(!showPassword)}
                  type="button"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </Button>
              }
              isInvalid={!!errors.password}
              errorMessage={errors.password?.message}
              {...register('password')}
              className="w-full bg-gray-800/50 text-gray-100 border-gray-700/50 focus:ring-indigo-500 focus:border-indigo-500 rounded-lg"
              aria-describedby={errors.password ? 'password-error' : undefined}
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="passwordConfirmation"
              className="text-sm font-medium text-white"
            >
              Confirm Password
            </label>
            <Input
              id="passwordConfirmation"
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="••••••••"
              startContent={<Lock className="h-4 w-4 mr-2 text-gray-400" />}
              endContent={
                <Button
                  isIconOnly
                  variant="light"
                  size="sm"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  type="button"
                  aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </Button>
              }
              isInvalid={!!errors.passwordConfirmation}
              errorMessage={errors.passwordConfirmation?.message}
              {...register('passwordConfirmation')}
              className="w-full bg-gray-800/50 text-gray-100 border-gray-700/50 focus:ring-indigo-500 focus:border-indigo-500 rounded-lg"
              aria-describedby={errors.passwordConfirmation ? 'passwordConfirmation-error' : undefined}
            />
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle className="h-5 w-5 text-indigo-400 mt-0.5" />
            <p className="text-sm text-gray-400">
              By signing up, you agree to our{' '}
              <Link href="/terms" className="text-indigo-400 hover:text-indigo-300 hover:underline">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="/privacy" className="text-indigo-400 hover:text-indigo-300 hover:underline">
                Privacy Policy
              </Link>
            </p>
          </div>
          <div className=" flex justify-center">
          <Button
            type="submit"
            className=" justify-center w-40 rounded-2xl bg-gradient-to-r p-2 from-indigo-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600 text-white font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] border-0"
            isLoading={isSubmitting}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating account...' : 'Create Account'}
          </Button>
          </div>
        </form>
      </CardBody>
      <Divider className="bg-gray-700/50" />
      <CardFooter className="flex justify-center py-4">
        <p className="text-sm text-gray-400">
          Already have an account?{' '}
          <Link
            href="/sign-in"
            className="text-indigo-400 hover:text-indigo-300 hover:underline font-medium"
          >
            Sign in
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}