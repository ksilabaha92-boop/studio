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

    } catch (error: any) {
      // If user is not found, create a new admin user.
      const isUserNotFound = error.code === 'auth/user-not-found' || error.code === 'auth/invalid-credential';

      if (isUserNotFound) {
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
          const user = userCredential.user;

          // Add the new user to the 'admins' collection to grant privileges.
          if (firestore) {
             const adminRef = doc(firestore, 'admins', user.uid);
             // We set a basic object, the existence of the document is what grants admin rights.
             await setDoc(adminRef, { uid: user.uid, email: user.email, createdAt: serverTimestamp() });
          }
          
          toast({
            title: 'Admin Account Created',
            description: 'Welcome! You now have admin access.',
          });
          onOpenChange(false);
          router.push('/admin');

        } catch (creationError: any) {
          console.error('Admin creation failed:', creationError);
          let description = 'Could not create an admin account.';
          if (creationError.code) {
              if (creationError.code === 'auth/weak-password') {
                  description = 'The password is too weak. Please use at least 6 characters.';
              } else if (creationError.code === 'auth/email-already-in-use') {
                  description = 'This email is already in use by another account.';
              }
          }
          toast({
            variant: 'destructive',
            title: 'Account Creation Failed',
            description: description,
          });
          form.setError('email', { message: ' ' });
          form.setError('password', { message: ' ' });
        }
      } else {
        // Handle other errors like wrong password
        console.error('Admin login failed:', error);
        let description = 'The email or password you entered is incorrect.';
         if (error.code === 'auth/wrong-password') {
            description = 'The password you entered is incorrect.';
         }
        toast({
          variant: 'destructive',
          title: 'Authentication Failed',
          description: description,
        });
        form.setError('password', { message: 'Incorrect email or password' });
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
