
"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { UserPlus } from 'lucide-react';

export type Role = "student" | "industry" | "admin";

interface SignupFormProps {
  initialRole?: Role;
}

export function SignupForm({ initialRole }: SignupFormProps) {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<Role>(initialRole || "student");
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (initialRole && ["student", "industry", "admin"].includes(initialRole)) {
      setSelectedRole(initialRole);
    }
  }, [initialRole]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    if (password !== confirmPassword) {
      toast({
        title: "Signup Failed",
        description: "Passwords do not match.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    // Simulate API call / account creation
    await new Promise(resolve => setTimeout(resolve, 1000));

    console.log(`Signing up ${selectedRole} named ${name} with email: ${email}`);

    toast({
      title: "Signup Successful (Mock)",
      description: "Your account has been created. Please login.",
    });

    router.push('/login'); 
    // No need to setIsLoading(false) as we are redirecting.
  };

  const handleRoleChange = (value: string) => {
    setSelectedRole(value as Role);
    // Clear fields on tab switch
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  const renderFormFields = (role: Role) => (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1">
        <Label htmlFor={`${role}-name`}>Full Name</Label>
        <Input
          id={`${role}-name`}
          type="text"
          placeholder="Your Full Name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={isLoading}
          className="text-base md:text-sm"
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor={`${role}-email`}>Email</Label>
        <Input
          id={`${role}-email`}
          type="email"
          placeholder="your.email@example.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
          className="text-base md:text-sm"
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor={`${role}-password`}>Password</Label>
        <Input
          id={`${role}-password`}
          type="password"
          placeholder="Create a password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
          className="text-base md:text-sm"
        />
      </div>
       <div className="space-y-1">
        <Label htmlFor={`${role}-confirm-password`}>Confirm Password</Label>
        <Input
          id={`${role}-confirm-password`}
          type="password"
          placeholder="Confirm your password"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          disabled={isLoading}
          className="text-base md:text-sm"
        />
      </div>
      <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 mt-2" disabled={isLoading}>
        {isLoading ? (
          `Creating Account...`
        ) : (
          <>
            <UserPlus className="mr-2 h-4 w-4" /> Create {role.charAt(0).toUpperCase() + role.slice(1)} Account
          </>
        )}
      </Button>
    </form>
  );

  return (
    <Card className="w-full max-w-md mx-auto shadow-xl border-border">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-headline text-primary">Create Account</CardTitle>
        <CardDescription>Join KaushalyaSetu. Select your role and fill in your details.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={selectedRole} onValueChange={handleRoleChange} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="student">Student</TabsTrigger>
            <TabsTrigger value="industry">Industry</TabsTrigger>
            <TabsTrigger value="admin">Admin</TabsTrigger>
          </TabsList>
          <TabsContent value="student" className="mt-6">
            {renderFormFields("student")}
          </TabsContent>
          <TabsContent value="industry" className="mt-6">
            {renderFormFields("industry")}
          </TabsContent>
          <TabsContent value="admin" className="mt-6">
            {renderFormFields("admin")}
          </TabsContent>
        </Tabs>
         <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link href="/login" className="font-semibold text-primary hover:text-primary/90 underline-offset-4 hover:underline">
            Login
          </Link>
        </p>
      </CardContent>
       <CardFooter className="flex justify-center text-xs text-muted-foreground pt-4">
        <p>This is a prototype. No actual accounts are created.</p>
      </CardFooter>
    </Card>
  );
}
