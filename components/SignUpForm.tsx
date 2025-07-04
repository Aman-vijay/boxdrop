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
import { Mail, Lock, AlertCircle, CheckCircle, Eye, EyeOff } from 'lucide-react';

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
    } catch (error: any) {
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
    } catch (error: any) {
      setError(error.errors?.[0]?.message || 'An error occurred during verification.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (verifying) {
    return (
      <Card className="w-full max-w-md mx-auto border border-foreground/10 bg-background/80 dark:bg-background-dark/80 backdrop-blur-sm shadow-xl rounded-xl">
        <CardHeader className="flex flex-col gap-2 items-center pb-4">
          <h1 className="text-2xl font-bold text-foreground">Verify Your Email</h1>
          <p className="text-foreground/80 text-center text-sm">
            A verification code has been sent to your email.
          </p>
        </CardHeader>
        <Divider className="bg-foreground/10" />
        <CardBody className="py-8">
          {error && (
            <div className="bg-danger/10 dark:bg-danger-dark/10 text-danger dark:text-danger-dark p-4 rounded-lg mb-6 flex items-center gap-2">
              <AlertCircle className="h-5 w-5 flex-shrink-0" />
              <p className="text-sm">{error}</p>
            </div>
          )}
          <form onSubmit={handleVerification} className="space-y-6">
            <div className="space-y-2">
              <label
                htmlFor="verificationCode"
                className="text-sm font-medium text-foreground"
              >
                Verification Code
              </label>
              <Input
                id="verificationCode"
                type="text"
                placeholder="Enter 6-digit code"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                className="w-full bg-background dark:bg-background-dark text-foreground dark:text-foreground-dark border-foreground/20 focus:ring-primary dark:focus:ring-primary-dark"
                autoFocus
                aria-describedby={error ? 'verification-error' : undefined}
              />
            </div>
            <Button
              type="submit"
              color="primary"
              className="w-full bg-gradient-to-r from-primary to-secondary dark:from-primary-dark dark:to-secondary-dark text-white font-semibold hover:shadow-lg transition-all duration-300"
              isLoading={isSubmitting}
              disabled={isSubmitting || verificationCode.length !== 6}
            >
              {isSubmitting ? 'Verifying...' : 'Verify Email'}
            </Button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-sm text-foreground/80">
              Didn’t receive a code?{' '}
              <button
                onClick={async () => {
                  if (signUp) {
                    await signUp.prepareEmailAddressVerification({
                      strategy: 'email_code',
                    });
                  }
                }}
                className="text-primary dark:text-primary-dark hover:underline font-medium"
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
    <Card className="w-full max-w-md mx-auto border border-foreground/10 bg-background/80 dark:bg-background-dark/80 backdrop-blur-sm shadow-xl rounded-xl">
      <CardHeader className="flex flex-col gap-2 items-center pb-4">
        <h1 className="text-2xl font-bold text-foreground">Create Your Account</h1>
        <p className="text-foreground/80 text-center text-sm">
          Sign up to start managing your images securely
        </p>
      </CardHeader>
      <Divider className="bg-foreground/10" />
      <CardBody className="py-8">
        {error && (
          <div className="bg-danger/10 dark:bg-danger-dark/10 text-danger dark:text-danger-dark p-4 rounded-lg mb-6 flex items-center gap-2">
            <AlertCircle className="h-5 w-5 flex-shrink-0" />
            <p className="text-sm">{error}</p>
          </div>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-sm font-medium text-foreground"
            >
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              startContent={<Mail className="h-4 w-4 text-foreground/60" />}
              isInvalid={!!errors.email}
              errorMessage={errors.email?.message}
              {...register('email')}
              className="w-full bg-background dark:bg-background-dark text-foreground dark:text-foreground-dark border-foreground/20 focus:ring-primary dark:focus:ring-primary-dark"
              aria-describedby={errors.email ? 'email-error' : undefined}
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="text-sm font-medium text-foreground"
            >
              Password
            </label>
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              startContent={<Lock className="h-4 w-4 text-foreground/60" />}
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
                    <EyeOff className="h-4 w-4 text-foreground/60" />
                  ) : (
                    <Eye className="h-4 w-4 text-foreground/60" />
                  )}
                </Button>
              }
              isInvalid={!!errors.password}
              errorMessage={errors.password?.message}
              {...register('password')}
              className="w-full bg-background dark:bg-background-dark text-foreground dark:text-foreground-dark border-foreground/20 focus:ring-primary dark:focus:ring-primary-dark"
              aria-describedby={errors.password ? 'password-error' : undefined}
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="passwordConfirmation"
              className="text-sm font-medium text-foreground"
            >
              Confirm Password
            </label>
            <Input
              id="passwordConfirmation"
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="••••••••"
              startContent={<Lock className="h-4 w-4 text-foreground/60" />}
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
                    <EyeOff className="h-4 w-4 text-foreground/60" />
                  ) : (
                    <Eye className="h-4 w-4 text-foreground/60" />
                  )}
                </Button>
              }
              isInvalid={!!errors.passwordConfirmation}
              errorMessage={errors.passwordConfirmation?.message}
              {...register('passwordConfirmation')}
              className="w-full bg-background dark:bg-background-dark text-foreground dark:text-foreground-dark border-foreground/20 focus:ring-primary dark:focus:ring-primary-dark"
              aria-describedby={errors.passwordConfirmation ? 'passwordConfirmation-error' : undefined}
            />
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle className="h-5 w-5 text-primary dark:text-primary-dark mt-0.5" />
            <p className="text-sm text-foreground/80">
              By signing up, you agree to our{' '}
              <Link href="/terms" className="text-primary dark:text-primary-dark hover:underline">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="/privacy" className="text-primary dark:text-primary-dark hover:underline">
                Privacy Policy
              </Link>
            </p>
          </div>
          <Button
            type="submit"
            color="primary"
            className="w-full bg-gradient-to-r from-primary to-secondary dark:from-primary-dark dark:to-secondary-dark text-white font-semibold hover:shadow-lg transition-all duration-300"
            isLoading={isSubmitting}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating account...' : 'Create Account'}
          </Button>
        </form>
      </CardBody>
      <Divider className="bg-foreground/10" />
      <CardFooter className="flex justify-center py-4">
        <p className="text-sm text-foreground/80">
          Already have an account?{' '}
          <Link
            href="/sign-in"
            className="text-primary dark:text-primary-dark hover:underline font-medium"
          >
            Sign in
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}