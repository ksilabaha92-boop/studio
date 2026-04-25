'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { KeyRound } from 'lucide-react';
import { useFirebase } from '@/firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

// Only validate the password field
const LoginSchema = z.object({
  password: z.string().min(1, { message: 'Password is required.' }),
});

type LoginDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

// This will be the hidden, single admin account email and the required password.
const ADMIN_EMAIL = 'admin@tohfa.com';
const ADMIN_PASSWORD = 'zxcvbnm';

export function LoginDialog({ open, onOpenChange }: LoginDialogProps) {
  const router = useRouter();
  const { auth, firestore } = useFirebase();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof LoginSchema>) {
    setIsSubmitting(true);

    // First, check if the entered password is correct.
    if (values.password !== ADMIN_PASSWORD) {
      toast({
        variant: 'destructive',
        title: 'Authentication Failed',
        description: 'The password you entered is incorrect.',
      });
      form.setError('password', { message: 'Incorrect password' });
      setIsSubmitting(false);
      return;
    }
    
    // If password is correct, proceed with the sign-in or create logic.
    try {
      // Try to sign in with the hardcoded credentials.
      await signInWithEmailAndPassword(auth, ADMIN_EMAIL, ADMIN_PASSWORD);
      toast({
        title: 'Success',
        description: 'Welcome back, Admin!',
      });
      onOpenChange(false);
      router.push('/admin');
    } catch (signInError: any) {
      // If sign-in fails, it's likely because the account doesn't exist yet.
      // Codes 'auth/invalid-credential' or 'auth/user-not-found' indicate this.
      if (signInError.code === 'auth/invalid-credential' || signInError.code === 'auth/user-not-found') {
        try {
          // Create the admin account for the first time.
          const userCredential = await createUserWithEmailAndPassword(auth, ADMIN_EMAIL, ADMIN_PASSWORD);
          const user = userCredential.user;

          // Add the user to the 'admins' collection to grant privileges.
          if (firestore) {
             const adminRef = doc(firestore, 'admins', user.uid);
             await setDoc(adminRef, { uid: user.uid, email: user.email, createdAt: serverTimestamp() });
          }
          
          toast({
            title: 'Admin Account Initialized',
            description: 'Welcome! The admin account has been set up.',
          });
          onOpenChange(false);
          router.push('/admin');

        } catch (creationError: any) {
          // This block should ideally not be hit if the password meets Firebase requirements,
          // but it's good for catching unexpected errors during first-time setup.
          console.error('Admin account creation failed unexpectedly:', creationError);
          toast({
              variant: 'destructive',
              title: 'Setup Error',
              description: 'Could not create the admin account. Please check the console.',
            });
        }
      } else {
        // Handle other, unexpected sign-in errors.
        console.error('Admin login failed:', signInError);
        toast({
          variant: 'destructive',
          title: 'Authentication Failed',
          description: 'An unexpected error occurred. Please try again.',
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-background">
        <DialogHeader>
          <DialogTitle className="font-headline text-3xl text-primary flex items-center gap-2">
            <KeyRound className="w-6 h-6" /> Admin Access
          </DialogTitle>
          <DialogDescription>
            Enter the site password to access the admin dashboard.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full btn-clay" disabled={isSubmitting}>
              {isSubmitting ? 'Verifying...' : 'Unlock'}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
