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
import { ShieldCheck } from 'lucide-react';
import { useFirebase } from '@/firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

const LoginSchema = z.object({
  password: z.string().min(1, { message: 'Access code required.' }),
});

type LoginDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const ADMIN_EMAIL = 'admin@tigrafino.com';
const ADMIN_PASSWORD = 'zxcvbnm';

export function LoginDialog({ open, onOpenChange }: LoginDialogProps) {
  const router = useRouter();
  const { auth, firestore } = useFirebase();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: { password: '' },
  });

  async function onSubmit(values: z.infer<typeof LoginSchema>) {
    setIsSubmitting(true);

    if (values.password !== ADMIN_PASSWORD) {
      toast({
        variant: 'destructive',
        title: 'Access Denied',
        description: 'Invalid credentials for TigraFINO Command.',
      });
      form.setError('password', { message: 'Incorrect access code' });
      setIsSubmitting(false);
      return;
    }
    
    try {
      await signInWithEmailAndPassword(auth, ADMIN_EMAIL, ADMIN_PASSWORD);
      onOpenChange(false);
      router.push('/admin');
    } catch (signInError: any) {
      if (signInError.code === 'auth/invalid-credential' || signInError.code === 'auth/user-not-found') {
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, ADMIN_EMAIL, ADMIN_PASSWORD);
          if (firestore) {
             const adminRef = doc(firestore, 'admins', userCredential.user.uid);
             await setDoc(adminRef, { uid: userCredential.user.uid, email: ADMIN_EMAIL, createdAt: serverTimestamp() });
          }
          onOpenChange(false);
          router.push('/admin');
        } catch (creationError) {
          console.error(creationError);
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-card border-white/10">
        <DialogHeader>
          <DialogTitle className="font-headline text-3xl text-primary flex items-center gap-2 italic">
            <ShieldCheck className="w-8 h-8" /> Tigra Command
          </DialogTitle>
          <DialogDescription className="text-white/60">
            Authorized access only. Enter TigraFINO encrypted key.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs uppercase tracking-widest text-white/40">Access Code</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      className="bg-black/50 border-white/10 text-white focus:border-primary"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full btn-tigra py-6 font-bold uppercase tracking-widest" disabled={isSubmitting}>
              {isSubmitting ? 'Verifying...' : 'Unlock Portal'}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}