'use client';

import { useCallback, useRef, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  CheckCircledIcon,
  ExclamationTriangleIcon,
} from '@radix-ui/react-icons';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { useSignInWithOtp } from '@kit/supabase/hooks/use-sign-in-with-otp';
import { Alert, AlertDescription, AlertTitle } from '@kit/ui/alert';
import { Button } from '@kit/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@kit/ui/form';
import { If } from '@kit/ui/if';
import { Input } from '@kit/ui/input';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@kit/ui/input-otp';
import { Trans } from '@kit/ui/trans';

import { useCaptchaToken } from '../captcha/client';

interface EmailStep {
  state: 'email';
  email: string;
}

interface OTPStep {
  state: 'otp';
  email: string;
}

type Step = EmailStep | OTPStep;

export function OTPSignInContainer({ redirectUrl }: { redirectUrl: string }) {
  const [step, setStep] = useState<Step>({ state: 'email', email: '' });
  const { captchaToken, resetCaptchaToken } = useCaptchaToken();
  const signInWithOtpMutation = useSignInWithOtp();
  const redirecting = useRef(false);

  const emailForm = useForm({
    resolver: zodResolver(
      z.object({
        email: z.string().email('Please enter a valid email'),
      }),
    ),
    defaultValues: {
      email: '',
    },
  });

  const otpForm = useForm({
    resolver: zodResolver(
      z.object({
        code: z.string().length(6, 'Code must be 6 digits'),
      }),
    ),
    defaultValues: {
      code: '',
    },
  });

  const onEmailSubmit = useCallback(
    async ({ email }: { email: string }) => {
      try {
        await signInWithOtpMutation.mutateAsync({
          email,
          options: {
            emailRedirectTo: redirectUrl,
            captchaToken,
            shouldCreateUser: true,
          },
        });
        toast.success('OTP sent to your email');
        setStep({ state: 'otp', email });
      } catch (error: any) {
        toast.error(error?.message || 'Failed to send OTP');
      } finally {
        resetCaptchaToken();
      }
    },
    [redirectUrl, captchaToken, signInWithOtpMutation, resetCaptchaToken],
  );

  const onOTPSubmit = useCallback(async () => {
    if (step.state !== 'otp') return;

    toast.error(
      'Supabase passwordless OTP via email does not allow manual code verification in the client.',
    );
  }, [step]);

  if (step.state === 'email') {
    return (
      <Form {...emailForm}>
        <form
          className="w-full space-y-4"
          onSubmit={emailForm.handleSubmit(onEmailSubmit)}
        >
          <div>
            <h3 className="mb-4 font-semibold">Sign in with Email OTP</h3>
            <p className="mb-6 text-sm text-gray-600">
              Enter your email address to receive a one-time password
            </p>
          </div>

          <FormField
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    {...field}
                    disabled={signInWithOtpMutation.isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={signInWithOtpMutation.isPending}
            className="w-full"
          >
            {signInWithOtpMutation.isPending ? 'Sending OTP...' : 'Send OTP'}
          </Button>

          {signInWithOtpMutation.error && (
            <Alert variant="destructive">
              <ExclamationTriangleIcon className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                {(signInWithOtpMutation.error as Error)?.message ||
                  'Failed to send OTP'}
              </AlertDescription>
            </Alert>
          )}
        </form>
      </Form>
    );
  }

  return (
    <Form {...otpForm}>
      <form
        className="w-full space-y-4"
        onSubmit={otpForm.handleSubmit(onOTPSubmit)}
      >
        <div>
          <h3 className="mb-4 font-semibold">Enter One-Time Password</h3>
          <p className="mb-6 text-sm text-gray-600">
            We sent a 6-digit code to <strong>{step.email}</strong>
          </p>
        </div>

        <FormField
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Verification Code</FormLabel>
              <FormControl>
                <div className="flex justify-center">
                  <InputOTP
                    maxLength={6}
                    {...field}
                    disabled={signInWithOtpMutation.isPending}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-2">
          <Button
            type="submit"
            disabled={
              signInWithOtpMutation.isPending ||
              otpForm.watch('code').length < 6
            }
            className="w-full"
          >
            {signInWithOtpMutation.isPending ? 'Verifying...' : 'Verify'}
          </Button>

          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={() => setStep({ state: 'email', email: '' })}
            disabled={signInWithOtpMutation.isPending}
          >
            Back
          </Button>
        </div>

        {signInWithOtpMutation.error && (
          <Alert variant="destructive">
            <ExclamationTriangleIcon className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              {(signInWithOtpMutation.error as Error)?.message ||
                'Failed to verify OTP'}
            </AlertDescription>
          </Alert>
        )}
      </form>
    </Form>
  );
}
