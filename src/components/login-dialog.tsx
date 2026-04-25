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
      // First, try to sign in. If it succeeds, the user is an existing admin.
      await signInWithEmailAndPassword(auth, values.email, values.password);
      toast({
        title: 'Success',
        description: 'Welcome back, Admin!',
      });
      onOpenChange(false);
      router.push('/admin');
    } catch (error: any) {
      // If sign-in fails, check the error code.
      if (error.code === 'auth/user-not-found') {
        // If the user does not exist, create a new admin account.
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
          const user = userCredential.user;

          // Add the new user to the 'admins' collection to grant privileges.
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
          console.error('Admin creation failed:', creationError);
          let description = 'Could not create an admin account.';
          if (creationError.code === 'auth/weak-password') {
              description = 'The password is too weak. Please use at least 6 characters.';
          }
          // The 'auth/email-already-in-use' case during creation is less likely with this logic
          // but kept as a safeguard.
          else if (creationError.code === 'auth/email-already-in-use') {
              description = 'This email is already in use. Please try logging in.';
          }
          toast({
            variant: 'destructive',
            title: 'Account Creation Failed',
            description: description,
          });
        }
      } else {
        // Handle other login errors, like incorrect password.
        // 'auth/invalid-credential' is the modern code for wrong password.
        console.error('Admin login failed:', error);
        toast({
          variant: 'destructive',
          title: 'Authentication Failed',
          description: 'The email or password you entered is incorrect.',
        });
        // Set a single error message that applies to the form, not a specific field.
        form.setError('email', { message: ' ' }); // Use a space to show the field is in error without a message
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
