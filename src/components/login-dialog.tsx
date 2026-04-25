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

// Password needs to be at least 6 characters for Firebase Auth
const LoginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
});

type LoginDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function LoginDialog({ open, onOpenChange }: LoginDialogProps) {
  const router = useRouter();
  const { auth, firestore } = useFirebase();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof LoginSchema>) {
    setIsSubmitting(true);
    try {
      // First, try to sign in.
      await signInWithEmailAndPassword(auth, values.email, values.password);
      toast({
        title: 'Success',
        description: 'Welcome back, Admin!',
      });
      onOpenChange(false);
      router.push('/admin');
    } catch (signInError: any) {
      // If sign-in fails, it could be a wrong password or a new user.
      // The modern Firebase Auth SDK often uses 'auth/invalid-credential' for both.
      if (signInError.code === 'auth/invalid-credential' || signInError.code === 'auth/user-not-found') {
        // Let's try to create a new account.
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
          const user = userCredential.user;

          // If creation is successful, add to 'admins' collection.
          if (firestore) {
             const adminRef = doc(firestore, 'admins', user.uid);
             await setDoc(adminRef, { uid: user.uid, email: user.email, createdAt: serverTimestamp() });
          }
          
          toast({
            title: 'Admin Account Created',
            description: 'Welcome! You now have admin access.',
          });
          onOpenChange(false);
          router.push('/admin');

        } catch (creationError: any) {
          // If account creation fails...
          if (creationError.code === 'auth/email-already-in-use') {
            // ...it's because the email exists. So, the original password was wrong.
            toast({
              variant: 'destructive',
              title: 'Authentication Failed',
              description: 'The password you entered is incorrect.',
            });
            form.setError('password', { message: 'Incorrect password' });
          } else if (creationError.code === 'auth/weak-password') {
            // Handle weak password specifically.
            toast({
              variant: 'destructive',
              title: 'Account Creation Failed',
              description: 'The password is too weak. Please use at least 6 characters.',
            });
            form.setError('password', { message: 'Password must be at least 6 characters.' });
          } else {
            // A different, unexpected error during account creation.
            console.error('Admin creation failed:', creationError);
            toast({
                variant: 'destructive',
                title: 'An Error Occurred',
                description: 'Could not create an admin account. Please try again.',
              });
          }
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
            Enter your desired admin email and password. If the account doesn't exist, it will be created for you.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="admin@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
