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

const LoginSchema = z.object({
  password: z.string().min(1, { message: 'Password is required' }),
});

type LoginDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

// This should be an environment variable in a real app
const ADMIN_PASSWORD = 'TohfafinoAdmin2024';

export function LoginDialog({ open, onOpenChange }: LoginDialogProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      password: '',
    },
  });

  function onSubmit(values: z.infer<typeof LoginSchema>) {
    setIsSubmitting(true);
    // Simulate network delay
    setTimeout(() => {
      if (values.password === ADMIN_PASSWORD) {
        sessionStorage.setItem('isAdmin', 'true');
        toast({
          title: 'Success',
          description: 'Welcome, Admin!',
        });
        onOpenChange(false);
        router.push('/admin');
      } else {
        toast({
          variant: 'destructive',
          title: 'Authentication Failed',
          description: 'The password you entered is incorrect.',
        });
        form.setError('password', { message: 'Incorrect password' });
      }
      setIsSubmitting(false);
    }, 500);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-background">
        <DialogHeader>
          <DialogTitle className="font-headline text-3xl text-primary flex items-center gap-2">
            <KeyRound className="w-6 h-6" /> Admin Access
          </DialogTitle>
          <DialogDescription>
            Enter the password to access the site management panel.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
